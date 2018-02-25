import { CreateZoneModel } from '../../../front_end_models/CreateZoneModel';
import { ZoneModal } from '../../../front_end_models/ZoneEdit.model';
import { ManualOrderModel } from '../../../front_end_models/manualorderModel';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
declare var google: any;
@Component({
    selector: 'app-viewzones',
    templateUrl: './viewZones.component.html',
    styleUrls: ['./viewZones.component.css']
})
export class ViewZonesComponent implements OnInit {
    ind_Zones: any[] = [];
    zone_Id: any;
    zonePaths: any[] = [];
    singleZonePath: any = [];
    isconformation_savePaths: boolean;
    map: any;
    ZoneData: any = [];
    Find_All_Zones: any;
    cityname: any;
    CityID: any;
    Find_city: any;
    url: string = '';
    CountryID: any;
    Center = { lat: 17.3850, lng: 78.4867 }
    constructor(private router: Router, private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private _eref: ElementRef) { }

    ngOnInit() {
        this.All_City()
        
        this.loadMap()

    }
    loadMap() {
        var input = document.getElementById('pac-input');
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.Center,
            zoom: 10,
            fullscreenControl: true,

        });
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        
         var autocomplete = new google.maps.places.Autocomplete(input);
 
         autocomplete.addListener('place_changed', (event) => {
 
             var place = autocomplete.getPlace();
             if (!place.geometry) {
 
                 window.alert("No details available for input: '" + place.name + "'");
                 return;
             } else {
                 this.map.setCenter(place.geometry.location);
                 this.map.setZoom(10);  // Why 17? Because it looks good.
             }
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

        this.Find_All_ZonesofCity('/Find_All_Zones_of_City', 1)
        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2)
    }
    Find_All_ZonesofCity(url, type, zone_id?) {

        const body1 = new ZoneModal(zone_id, null, null, null, this.CityID, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))

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


                        for (var y = 0; y < this.ZoneData.length; y++) {
                            this.createEditablePolygon(this.ZoneData[y].ZonePaths, this.ZoneData[y]);
                        }


                    }
                    else if (type == 3) {
                        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2)
                        google.maps.event.addDomListener(window, 'load', this.loadMap());
                       
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
            content: 'Tittle :' + zonePath_Row.ZoneTitle,
            draggable: false,
            editable: zonePath_Row.editable
        });
        boundary.setMap(this.map);

        var infoWindow = new google.maps.InfoWindow;

        google.maps.event.addListener(boundary, 'click', (event) => {
            infoWindow.setContent(boundary.content);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(this.map);
            this.Find_All_ZonesofCity('/Make_City_Zone_Editable', 3, zonePath_Row.ZoneID)

        });
        google.maps.event.addListener(boundary.getPath(), 'set_at', (event) => {

            this.getnewpahts(boundary.getPath(), zonePath_Row)


        });
        google.maps.event.addListener(boundary.getPath(), 'insert_at', (event) => {

            this.getnewpahts(boundary.getPath(), zonePath_Row)

        });

    }

    getnewpahts(polygon, zonePath_Row) {
        this.singleZonePath = zonePath_Row


        let polygonPaths = []
        polygon.getArray().forEach((path, index) => {
            const line = {
                lat: path.lat(),
                lng: path.lng()

            }
            polygonPaths.push(line)

            this.zonePaths = polygonPaths


        })
    }
    onsaveConfirmation() {
        this.isconformation_savePaths = true
    }
    onCloseConformation() {
        this.isconformation_savePaths = false
    }
    onsavePaths() {
        const body1 = new CreateZoneModel(this.singleZonePath.ZoneID, this.singleZonePath.strokeColor, this.singleZonePath.strokeOpacity, this.singleZonePath.strokeWeight, this.singleZonePath.fillColor, this.singleZonePath.fillOpacity, this.singleZonePath.draggable, this.singleZonePath.editable, this.singleZonePath.visible, this.zonePaths, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Edit_Zone_Path_Position', body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {
                    let message = "Zone paths updated"
                    this.ErrorService.handleError(message)

                    this.onCloseConformation()
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

}