var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ZoneModal } from './../../front_end_models/ZoneEdit.model';
import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';
import { GetLatLngModel } from '../../front_end_models/getLatLngModel';
var ZonesComponent = /** @class */ (function () {
    function ZonesComponent(router, ngZone, http, _ApiMessageService, _cookieService, ErrorService) {
        this.router = router;
        this.ngZone = ngZone;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.newHubName = '';
        this.HubName = '';
        this.lat_map = 17.457;
        this.lng_map = 78.154;
        this.zoom = 16;
        this.isArea = true;
        this.NewAreaName = '';
        this.zonesSUb = ["Areas", "Hubs", " Set Zonal Pricing"];
        this.view = -1;
        this.SelecIndex = 0;
        this.editZonalPrice = [];
        this.Find_All_Zones_PricingData = [];
        this.Find_city = [];
        this.Find_All_Countries = [];
        this.url = '';
    }
    ZonesComponent.prototype.ngOnInit = function () {
        this.All_City();
    };
    ZonesComponent.prototype.All_City = function () {
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
                _this.Selectedcity_index = 0;
                _this.Find_All_ZonesofCity();
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
    ZonesComponent.prototype.select_city = function (index, item) {
        this.Selectedcity_index = index;
        this.CityID = item.CityID;
        this.Find_All_ZonesofCity();
    };
    ZonesComponent.prototype.Find_All_ZonesofCity = function () {
        var _this = this;
        this.iseditZonalPrice = false;
        var body1 = new ZoneModal(null, null, null, null, this.CityID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones_of_City', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Find_All_Zones_PricingData = data.json().extras.ZoneData;
                _this.isRequesting = false;
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
    ZonesComponent.prototype.ZonalPrice = function (index, item) {
        this.isRequesting = true;
        this.SelecIndex = index;
        this.ZoneID = item.ZoneID;
        this.ZoneName = item.ZoneName;
        this.get_PriceData(item.ZoneID, this.CityID);
        this.iseditZonalPrice = true;
    };
    ZonesComponent.prototype.back = function () {
        this.iseditZonalPrice = false;
        this.isRequesting = false;
        this.zonesArray(0, "Areas ");
    };
    ZonesComponent.prototype.edit_ZonePrice = function (instantdelivery, hrdelivery, samedaydelivery, PriceSet, item) {
        var _this = this;
        var body1 = new ZoneModal(this.ZoneID, instantdelivery, hrdelivery, samedaydelivery, null, PriceSet, item.zoneid);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/ADD_UPDATE_ZONAL_PRICING', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
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
    ZonesComponent.prototype.get_PriceData = function (ZoneID, CityID) {
        var _this = this;
        var body = new ZoneModal(ZoneID, null, null, null, CityID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_Individual_Zones_Pricing', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.editZonalPrice = data.json().extras.PriceData;
                _this.isRequesting = false;
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
    ZonesComponent.prototype.closeDetailsView = function () {
        this.view = -1;
        this.AreaDataIndex = -1;
    };
    ZonesComponent.prototype.viewAreas_Hubs = function (i, item) {
        this.ZoneID = item.ZoneID;
        this.ZoneName = item.ZoneName;
        this.view = i;
        this.zonesArray(0, "Areas ");
    };
    ZonesComponent.prototype.zonesArray = function (j, zonesSUb, item, i) {
        this.AreaDataIndex = -1;
        this.view_active = j;
        if (j == 0) {
            this.FindAll_areasAnd_hubs(1, '/Find_All_Zone_Area');
            this.isareaAdd = true;
        }
        else if (j == 1) {
            this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs');
        }
        else if (j == 2) {
            this.ZonalPrice(i, item);
        }
    };
    ZonesComponent.prototype.FindAll_areasAnd_hubs = function (type, url) {
        var _this = this;
        var body = new ZoneModal(this.ZoneID, null, null, null);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.isArea = true;
                    _this.AreaData = data.json().extras.AreaData;
                }
                else if (type == 2) {
                    _this.isArea = false;
                    _this.HubsData = data.json().extras.HubData;
                    if (_this.HubsData.length) {
                        _this.OnselectHub(_this.HubsData[0], 0);
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
    ZonesComponent.prototype.OnAddArea = function () {
        this.isareaAdd = false;
        this.isAreaAddRow = true;
    };
    ZonesComponent.prototype.OndeleteArea = function (item, m) {
        this.AreaDataIndex = m;
        this.hubRowData = item;
    };
    ZonesComponent.prototype.remove_AreaConform = function () {
        this.onUdateArea_Remove(this.hubRowData, '/Remove_Zone_Area', 2);
    };
    ZonesComponent.prototype.onCloseAreaDelete = function () {
        this.AreaDataIndex = -1;
    };
    ZonesComponent.prototype.onUdateArea = function (item) {
        this.onUdateArea_Remove(item, '/Update_Zone_Area', 1);
    };
    ZonesComponent.prototype.onUdateArea_Remove = function (item, url, type) {
        var _this = this;
        var body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, item.AreaName, item.AreaID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.isareaAdd = true;
                    _this.isAreaAddRow = false;
                    _this.NewAreaName = '';
                    _this.Find_All_ZonesofCity();
                }
                else if (type == 2) {
                    _this.AreaData.splice(_this.AreaDataIndex, 1);
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
    ZonesComponent.prototype.onsubmitArea = function () {
        var _this = this;
        var body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, this.NewAreaName);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Zone_Area', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.AreaData.push({
                    'AreaName': _this.NewAreaName
                });
                _this.isareaAdd = true;
                _this.isAreaAddRow = false;
                _this.NewAreaName = '';
                setTimeout(function () {
                    _this.FindAll_areasAnd_hubs(1, '/Find_All_Zone_Area');
                }, 2000);
                _this.AreaDataIndex = -1;
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
    ZonesComponent.prototype.OndeleteAreaRow = function () {
        this.isareaAdd = true;
        this.isAreaAddRow = false;
        this.NewAreaName = '';
    };
    ZonesComponent.prototype.OnselectHub = function (HubsData, h) {
        this.view_hub = h;
        this.ZoneHubName = HubsData.ZoneHubName;
        this.ZoneHubID = HubsData.ZoneHubID;
        this.HubsData_Latitude = HubsData.Latitude;
        this.HubsData_Longitude = HubsData.Longitude;
        this.Zone_Address = HubsData.Address;
    };
    ZonesComponent.prototype.StoreAddress = function () {
        var _this = this;
        var autocomplete;
        var options = { componentRestrictions: { country: "IN" } };
        this.address_new = document.getElementById('address');
        autocomplete = new google.maps.places.Autocomplete(this.address_new, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this.ngZone.run(function () {
                _this.zoom = 17;
                var place = autocomplete.getPlace();
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }
                _this.Zone_Address = place.formatted_address;
                _this.HubsData_Latitude = place.geometry.location.lat();
                _this.HubsData_Longitude = place.geometry.location.lng();
            });
        });
    };
    ZonesComponent.prototype.StoreAddress_add = function () {
        var _this = this;
        var autocomplete;
        var options = { componentRestrictions: { country: "IN" } };
        this.address_add = document.getElementById('onadd');
        autocomplete = new google.maps.places.Autocomplete(this.address_add, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this.ngZone.run(function () {
                _this.zoom = 17;
                var place = autocomplete.getPlace();
                if (place.geometry === undefined || place.geometry === null) {
                    alert("place not found");
                    return;
                }
                _this.OnAddressHub = place.formatted_address;
                _this.lat = place.geometry.location.lat();
                _this.lng = place.geometry.location.lng();
            });
        });
    };
    ZonesComponent.prototype.OnaddHUb = function () {
        this.isaddHub = true;
    };
    ZonesComponent.prototype.OncloseAddHub = function () {
        this.isaddHub = false;
    };
    ZonesComponent.prototype.onsubmit_premiumCust = function (HubName) {
        var _this = this;
        var body = new GetLatLngModel(HubName);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var address = data.json().extras.Data;
                if (address.latlong == true) {
                    _this.lat = address.latitude;
                    _this.lng = address.longitude;
                    _this.OnAddressHub = HubName;
                    _this.Onsubmit();
                }
                else {
                    alert("No address Found");
                }
            }
            else {
                alert("No address Found");
            }
        });
    };
    ZonesComponent.prototype.Onsubmit = function () {
        var _this = this;
        if (this.lat == null) {
            this.onsubmit_premiumCust(this.HubName);
        }
        else {
            var body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, null, null, this.newHubName, this.OnAddressHub, this.lat, this.lng);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Create_Zone_Hub', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.newHubName = '';
                    _this.OnAddressHub = '';
                    _this.lat_map = 17.1877;
                    _this.lng_map = 78.2554;
                    _this.lat = null;
                    _this.lng = null;
                    _this.OncloseAddHub();
                    _this.Find_All_ZonesofCity();
                    _this.view = -1;
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
    };
    ZonesComponent.prototype.onUpdate_Hub = function () {
        var _this = this;
        var body = new ZoneModal(null, null, null, null, null, null, null, null, null, this.ZoneHubName, this.Zone_Address, this.HubsData_Latitude, this.HubsData_Longitude, this.ZoneHubID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Zone_Hub', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs');
                }, 2000);
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
    ZonesComponent.prototype.onDeleteConformation = function () {
        this.isdelete_zonehub = true;
    };
    ZonesComponent.prototype.onClose_Delete = function () {
        this.isdelete_zonehub = false;
    };
    ZonesComponent.prototype.OnDeleteHub = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ZoneModal(null, null, null, null, null, null, null, null, null, null, null, null, null, this.ZoneHubID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Inactive_Remove_Zone_Hub', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.HubsData.splice(_this.view_hub, 1);
                _this.isdelete_zonehub = false;
                _this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs');
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
    ZonesComponent = __decorate([
        Component({
            selector: 'app-zones',
            templateUrl: "Zones.component.html",
            styleUrls: ["Zones.component.css"],
        }),
        __metadata("design:paramtypes", [Router, NgZone,
            Http,
            ApiMessageService,
            CookieService, ErrorService])
    ], ZonesComponent);
    return ZonesComponent;
}());
export { ZonesComponent };
