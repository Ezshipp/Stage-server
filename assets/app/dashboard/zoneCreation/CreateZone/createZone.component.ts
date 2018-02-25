import { CreateZoneModel } from '../../../front_end_models/CreateZoneModel';
import { ZoneModal } from '../../../front_end_models/ZoneEdit.model';
import { ManualOrderModel } from '../../../front_end_models/manualorderModel';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
declare var google: any;
@Component({
    selector: 'app-createZOne',
    templateUrl: './createZone.component.html',
    styleUrls: ['./createZone.component.css']
})
export class CreateZoneComponent implements OnInit {
    Zonetitle = ''
    polygonPaths: any[] = [];
    ZoneData: any = [];
    Find_All_Zones: any;
    cityname: any;
    CityID: any;
    Find_city: any;
    CountryID: any;
    url: string = '';
    sample: any[];
    iscreate_Zone: boolean;
    all_overlays = [];
    selectedShape;
    map: any;
    drawingManager: any;
    newpolygone: any
    constructor(private router: Router, private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private _eref: ElementRef) { }

    ngOnInit() {
        var input = document.getElementById('pac-input');

        this.All_City()
        var polygon1 = {
            draggable: true,
            editable: true,
            fillColor: "#f00"
        };
        var rect1 = {
            draggable: true,
            editable: true,
            fillColor: "#0f0"
        };
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 17.4471, lng: 78.454 },
            zoom: 10,
            fullscreenControl: true
        });
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', (event) => {

            var place = autocomplete.getPlace();
            if (!place.geometry) {

                window.alert("No details available for input: '" + place.name + "'");
                return;
            } else {
                this.map.setCenter(place.geometry.location);
                this.map.setZoom(17);  // Why 17? Because it looks good.
            }
        })
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            polygonOptions: polygon1,
          

            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']

            }
        });

        this.drawingManager.setMap(this.map);
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
            // Polygon drawn

            this.all_overlays.push(event);
            this.newpolygone = event.overlay.getPath()
            this.polygonPaths = event.overlay.getPath().getArray();
            polygon1 = {
                draggable: true,
                editable: true,
                fillColor: "#f00"
            };


            if (event.type != google.maps.drawing.OverlayType.MARKER) {
                this.drawingManager.setDrawingMode(null);

                var newShape = event.overlay;
                newShape.type = event.type;
                google.maps.event.addListener(newShape, 'click', (event) => {
                    this.setSelection(newShape);
                });
                this.setSelection(newShape);
            }

            google.maps.event.addListener(this.drawingManager, 'drawingmode_changed', (event) => {
                this.clearSelection()

            });
            google.maps.event.addListener(this.newpolygone, 'set_at', (event) => {
                this.getnewpahts(this.newpolygone)


            });
            google.maps.event.addListener(this.newpolygone, 'insert_at', (event) => {
                this.getnewpahts(this.newpolygone)

            });
        });

    }
    clearSelection() {

        if (this.selectedShape) {

            this.selectedShape.setMap(null);

        }


    }


    setSelection(shape) {
        this.clearSelection();
        this.selectedShape = shape;
        shape.setEditable(true);
    }
    ondelete() {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
        this.polygonPaths = []
    }
  
    getnewpahts(polygon) {

        this.polygonPaths = []
        polygon.getArray().forEach((path, index) => {
            const line = {
                lat: path.lat(),
                lng: path.lng()

            }
            this.polygonPaths.push(line)

            var polygon1 = {
                draggable: true,
                editable: true,
                fillColor: "#f00",
                paths: this.polygonPaths
            };


        })

    }

    All_City() {

        let uid = this._cookieService.get('ez_cusID')
        const body1 = new ManualOrderModel(this.CountryID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Cities', body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {

                    this.Find_city = data.json().extras.CityData

                    this.CityID = data.json().extras.CityData[0].CityID
                    this.cityname = data.json().extras.CityData[0].name

                    if (this.Find_city.length > 0) {
                        this.select_city(this.CityID)
                    }


                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);

                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')
                        this.router.navigate(['/signissssn']);
                    }

                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)

                }
            }
            )
    }
    select_city(CityID) {


        this.CityID = CityID

        this.ZoneData = []
        this.Find_All_ZonesofCity('/Find_All_Zones_of_City', 1)
        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2)
    }
    Find_All_ZonesofCity(url, type) {


        const body1 = new ZoneModal(null, null, null, null, this.CityID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {
                    if (type == 1) {
                        this.Find_All_Zones = data.json().extras.ZoneData


                    }
                    else if (type == 2) {
                        this.ZoneData = data.json().extras.ZoneData

                        if (this.ZoneData.length > 0) {
                            for (var y = 0; y < this.ZoneData.length; y++) {
                                this.createEditablePolygon(this.ZoneData[y].ZonePaths, this.ZoneData[y]);
                            }
                        } else {
                        }

                    }


                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);

                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')
                        this.router.navigate(['/signissssn']);
                    }

                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)

                }
            }
            )

    }
    createEditablePolygon(latlngs, zonePath_Row) {
        var sample = [];
        for (var z = 0; z < latlngs.length; z++) {
            sample.push(new google.maps.LatLng(parseFloat(latlngs[z].lat), parseFloat(latlngs[z].lng)));
        }
        var boundary = new google.maps.Polygon({
            paths: sample,
            strokeColor: zonePath_Row.strokeColor,
            strokeWeight: zonePath_Row.strokeWeight,
            fillColor: zonePath_Row.fillColor,
            fillOpacity: zonePath_Row.fillOpacity,
            zIndex: 1,
            content: 'title ' + zonePath_Row.ZoneTitle
        });
        boundary.set("Info", 'idy');
        boundary.setMap(this.map);
        var infoWindow = new google.maps.InfoWindow;



        boundary.addListener('click', (event) => {

            infoWindow.setContent(zonePath_Row.ZoneTitle);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(this.map);
        });


    }
    onclear() {

    }
    onsave() {
        if (this.Zonetitle.length > 0) {
            var color = this.getRandomColor()
            const body1 = new CreateZoneModel(null, "#035612", 0.2, 2, color, 0.35, true, false, true, this.polygonPaths, this._cookieService.get('ez_admin_cusID'), this.Zonetitle, this.CityID)

            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Create_Zone_Paths', body1, { headers: headers })

                .subscribe(
                data => {
                    if (data.json().success) {
                        let message = "Zone created sucessfully"
                        this.ErrorService.handleError(message)
                        this.polygonPaths = []
                        this.clearSelection()
                        this.Zonetitle=''
                        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2)
                    }
                    else {

                        const msgNumber: number = parseInt(data.json().extras.msg);

                        if (msgNumber == 21) {
                            this._cookieService.remove('ez_cusID')
                            this.router.navigate(['/signissssn']);
                        }

                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)

                    }
                })
        }
        else {
            let message = "Please enter zone title"
            this.ErrorService.handleError(message)

        }

    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}