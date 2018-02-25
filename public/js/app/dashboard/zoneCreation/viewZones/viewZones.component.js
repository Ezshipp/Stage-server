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
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
var ViewZonesComponent = /** @class */ (function () {
    function ViewZonesComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _eref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._eref = _eref;
        this.ind_Zones = [];
        this.zonePaths = [];
        this.singleZonePath = [];
        this.ZoneData = [];
        this.url = '';
        this.Center = { lat: 17.3850, lng: 78.4867 };
    }
    ViewZonesComponent.prototype.ngOnInit = function () {
        this.All_City();
        this.loadMap();
    };
    ViewZonesComponent.prototype.loadMap = function () {
        var _this = this;
        var input = document.getElementById('pac-input');
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.Center,
            zoom: 10,
            fullscreenControl: true,
        });
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function (event) {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            else {
                _this.map.setCenter(place.geometry.location);
                _this.map.setZoom(10); // Why 17? Because it looks good.
            }
        });
    };
    ViewZonesComponent.prototype.All_City = function () {
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
    ViewZonesComponent.prototype.select_city = function (CityID) {
        this.CityID = CityID;
        this.Find_All_ZonesofCity('/Find_All_Zones_of_City', 1);
        this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2);
    };
    ViewZonesComponent.prototype.Find_All_ZonesofCity = function (url, type, zone_id) {
        var _this = this;
        var body1 = new ZoneModal(zone_id, null, null, null, this.CityID, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.Find_All_Zones = data.json().extras.ZoneData;
                }
                else if (type == 2) {
                    _this.ZoneData = data.json().extras.ZoneData;
                    for (var y = 0; y < _this.ZoneData.length; y++) {
                        _this.createEditablePolygon(_this.ZoneData[y].ZonePaths, _this.ZoneData[y]);
                    }
                }
                else if (type == 3) {
                    _this.Find_All_ZonesofCity('/Find_All_Zone_with_Postions', 2);
                    google.maps.event.addDomListener(window, 'load', _this.loadMap());
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
    ViewZonesComponent.prototype.createEditablePolygon = function (latlngs, zonePath_Row) {
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
            content: 'Tittle :' + zonePath_Row.ZoneTitle,
            draggable: false,
            editable: zonePath_Row.editable
        });
        boundary.setMap(this.map);
        var infoWindow = new google.maps.InfoWindow;
        google.maps.event.addListener(boundary, 'click', function (event) {
            infoWindow.setContent(boundary.content);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(_this.map);
            _this.Find_All_ZonesofCity('/Make_City_Zone_Editable', 3, zonePath_Row.ZoneID);
        });
        google.maps.event.addListener(boundary.getPath(), 'set_at', function (event) {
            _this.getnewpahts(boundary.getPath(), zonePath_Row);
        });
        google.maps.event.addListener(boundary.getPath(), 'insert_at', function (event) {
            _this.getnewpahts(boundary.getPath(), zonePath_Row);
        });
    };
    ViewZonesComponent.prototype.getnewpahts = function (polygon, zonePath_Row) {
        var _this = this;
        this.singleZonePath = zonePath_Row;
        var polygonPaths = [];
        polygon.getArray().forEach(function (path, index) {
            var line = {
                lat: path.lat(),
                lng: path.lng()
            };
            polygonPaths.push(line);
            _this.zonePaths = polygonPaths;
        });
    };
    ViewZonesComponent.prototype.onsaveConfirmation = function () {
        this.isconformation_savePaths = true;
    };
    ViewZonesComponent.prototype.onCloseConformation = function () {
        this.isconformation_savePaths = false;
    };
    ViewZonesComponent.prototype.onsavePaths = function () {
        var _this = this;
        var body1 = new CreateZoneModel(this.singleZonePath.ZoneID, this.singleZonePath.strokeColor, this.singleZonePath.strokeOpacity, this.singleZonePath.strokeWeight, this.singleZonePath.fillColor, this.singleZonePath.fillOpacity, this.singleZonePath.draggable, this.singleZonePath.editable, this.singleZonePath.visible, this.zonePaths, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Zone_Path_Position', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = "Zone paths updated";
                _this.ErrorService.handleError(message);
                _this.onCloseConformation();
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
    ViewZonesComponent = __decorate([
        Component({
            selector: 'app-viewzones',
            templateUrl: './viewZones.component.html',
            styleUrls: ['./viewZones.component.css']
        }),
        __metadata("design:paramtypes", [Router, Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ElementRef])
    ], ViewZonesComponent);
    return ViewZonesComponent;
}());
export { ViewZonesComponent };
