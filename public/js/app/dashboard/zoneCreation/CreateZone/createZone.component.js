var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CreateZoneModel } from '../../../front_end_models/CreateZoneModel';
import { ZoneModal } from '../../../front_end_models/ZoneEdit.model';
import { ManualOrderModel } from '../../../front_end_models/manualorderModel';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
var CreateZoneComponent = /** @class */ (function () {
    function CreateZoneComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _eref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._eref = _eref;
        this.Zonetitle = '';
        this.polygonPaths = [];
        this.ZoneData = [];
        this.url = '';
        this.all_overlays = [];
    }
    CreateZoneComponent.prototype.ngOnInit = function () {
        var _this = this;
        var input = document.getElementById('pac-input');
        this.All_City();
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
        autocomplete.addListener('place_changed', function (event) {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            else {
                _this.map.setCenter(place.geometry.location);
                _this.map.setZoom(17); // Why 17? Because it looks good.
            }
        });
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
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
            // Polygon drawn
            _this.all_overlays.push(event);
            _this.newpolygone = event.overlay.getPath();
            _this.polygonPaths = event.overlay.getPath().getArray();
            polygon1 = {
                draggable: true,
                editable: true,
                fillColor: "#f00"
            };
            if (event.type != google.maps.drawing.OverlayType.MARKER) {
                _this.drawingManager.setDrawingMode(null);
                var newShape = event.overlay;
                newShape.type = event.type;
                google.maps.event.addListener(newShape, 'click', function (event) {
                    _this.setSelection(newShape);
                });
                _this.setSelection(newShape);
            }
            google.maps.event.addListener(_this.drawingManager, 'drawingmode_changed', function (event) {
                _this.clearSelection();
            });
            google.maps.event.addListener(_this.newpolygone, 'set_at', function (event) {
                _this.getnewpahts(_this.newpolygone);
            });
            google.maps.event.addListener(_this.newpolygone, 'insert_at', function (event) {
                _this.getnewpahts(_this.newpolygone);
            });
        });
    };
    CreateZoneComponent.prototype.clearSelection = function () {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
    };
    CreateZoneComponent.prototype.setSelection = function (shape) {
        this.clearSelection();
        this.selectedShape = shape;
        shape.setEditable(true);
    };
    CreateZoneComponent.prototype.ondelete = function () {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
        this.polygonPaths = [];
    };
    CreateZoneComponent.prototype.getnewpahts = function (polygon) {
        var _this = this;
        this.polygonPaths = [];
        polygon.getArray().forEach(function (path, index) {
            var line = {
                lat: path.lat(),
                lng: path.lng()
            };
            _this.polygonPaths.push(line);
            var polygon1 = {
                draggable: true,
                editable: true,
                fillColor: "#f00",
                paths: _this.polygonPaths
            };
        });
    };
    CreateZoneComponent.prototype.All_City = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new ManualOrderModel(this.CountryID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Cities', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Find_city = data.json().extras.CityData;
                _this.CityID = data.json().extras.CityData[0].CityID;
                _this.cityname = data.json().extras.CityData[0].name;
                if (_this.Find_city.length > 0) {
                    _this.select_city(_this.CityID);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    CreateZoneComponent.prototype.select_city = function (CityID) {
        this.CityID = CityID;
        this.ZoneData = [];
        this.Find_All_ZonesofCity('/Find_All_Zones_of_City', 1);
        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2);
    };
    CreateZoneComponent.prototype.Find_All_ZonesofCity = function (url, type) {
        var _this = this;
        var body1 = new ZoneModal(null, null, null, null, this.CityID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.Find_All_Zones = data.json().extras.ZoneData;
                }
                else if (type == 2) {
                    _this.ZoneData = data.json().extras.ZoneData;
                    if (_this.ZoneData.length > 0) {
                        for (var y = 0; y < _this.ZoneData.length; y++) {
                            _this.createEditablePolygon(_this.ZoneData[y].ZonePaths, _this.ZoneData[y]);
                        }
                    }
                    else {
                    }
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    CreateZoneComponent.prototype.createEditablePolygon = function (latlngs, zonePath_Row) {
        var _this = this;
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
        boundary.addListener('click', function (event) {
            infoWindow.setContent(zonePath_Row.ZoneTitle);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(_this.map);
        });
    };
    CreateZoneComponent.prototype.onclear = function () {
    };
    CreateZoneComponent.prototype.onsave = function () {
        var _this = this;
        if (this.Zonetitle.length > 0) {
            var color = this.getRandomColor();
            var body1 = new CreateZoneModel(null, "#035612", 0.2, 2, color, 0.35, true, false, true, this.polygonPaths, this._cookieService.get('ez_admin_cusID'), this.Zonetitle, this.CityID);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Create_Zone_Paths', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var message = "Zone created sucessfully";
                    _this.ErrorService.handleError(message);
                    _this.polygonPaths = [];
                    _this.clearSelection();
                    _this.Zonetitle = '';
                    _this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2);
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    if (msgNumber == 21) {
                        _this._cookieService.remove('ez_cusID');
                        _this.router.navigate(['/signissssn']);
                    }
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            var message = "Please enter zone title";
            this.ErrorService.handleError(message);
        }
    };
    CreateZoneComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    CreateZoneComponent = __decorate([
        Component({
            selector: 'app-createZOne',
            templateUrl: './createZone.component.html',
            styleUrls: ['./createZone.component.css']
        }),
        __metadata("design:paramtypes", [Router, Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ElementRef])
    ], CreateZoneComponent);
    return CreateZoneComponent;
}());
export { CreateZoneComponent };
