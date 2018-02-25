var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { driverModel } from './../../../front_end_models/driverModel';
import { Component } from '@angular/core';
var NewBikersComponent = /** @class */ (function () {
    function NewBikersComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.driver_json = [];
        this.p = 1;
        this.limit = 10;
        this.index = 0;
        this.jobType = 0;
        this.ZoneData = [];
        this.OperatorData = [];
        this.array = [];
        this.DriverData = [];
        this.url = '';
        this.skip_value = 0;
        this.isData = false;
    }
    NewBikersComponent.prototype.ngOnInit = function () {
        this.getNewBikers(1);
    };
    NewBikersComponent.prototype.getNewBikers = function (type) {
        var _this = this;
        this.isRequesting = true;
        var body = new driverModel(this.skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_New_or_Inactive_Drivers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isSearch = false;
                _this.isRequesting = false;
                if (type == 1) {
                    _this.DriverData = data.json().extras.DriverData;
                    _this.driver_json = data.json().extras.DriverData;
                    _this.Total_Count = data.json().extras.Count;
                    if (!_this.DriverData.length) {
                        _this.isData = true;
                    }
                    else {
                        _this.isData = false;
                    }
                }
                if (type == 2) {
                    _this.driver_json = data.json().extras.DriverData;
                    _this.DriverData = data.json().extras.DriverData;
                }
                _this.Operators();
                _this.zones();
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NewBikersComponent.prototype.pageChanged = function (ev) {
        this.p = ev;
        var p = this.p - 1;
        this.activeId = null;
        var skip_value = p * this.limit;
        this.skip_value = skip_value;
        this.getNewBikers(2);
    };
    NewBikersComponent.prototype.Operators = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Operators', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OperatorData = data.json().extras.OperatorData;
                _this.OperatorID = _this.OperatorData[0].OperatorID;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NewBikersComponent.prototype.zones = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
                _this.ZoneID = _this.ZoneData[0].ZoneID;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NewBikersComponent.prototype.Approve_Driver = function () {
        var _this = this;
        var body = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, this.OperatorID, this.ZoneID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Approve_Driver', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.Status = data.json().extras.Status;
                var message = "Biker activated sucessfully";
                _this.ErrorService.handleError(message);
                _this.views = null;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NewBikersComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.isSearch = true;
        this.mymodel = newValue;
        var length = newValue.length;
        this.isRequesting = true;
        if (length >= 3) {
            this.DriverData = [];
            this.array_O = [];
            this.skip_value = 0;
            var body1 = new driverModel(null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_New_or_Inactive_Drivers', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.array.length = 0;
                    _this.DriverData = data.json().extras.DriverData;
                    _this.isRequesting = false;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            this.ngOnInit();
        }
    };
    NewBikersComponent.prototype.select = function (value, event) {
        this.OperatorID = value;
    };
    NewBikersComponent.prototype.select_zone = function (value, event) {
        this.ZoneID = value;
    };
    NewBikersComponent.prototype.close = function () {
        this.views = -1;
    };
    NewBikersComponent.prototype.OnmoreInfo_order = function (id, i) {
        this.DriverID = id;
        this.views = i;
    };
    NewBikersComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.sortResults(this.valu, this.IsAsc);
    };
    NewBikersComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    NewBikersComponent.prototype.sortResults = function (prop, asc) {
        this.DriverData = this.driver_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.DriverData;
    };
    NewBikersComponent = __decorate([
        Component({
            selector: 'app-newBikers',
            templateUrl: './newBikers.component.html',
            styleUrls: ['./newBikers.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], NewBikersComponent);
    return NewBikersComponent;
}());
export { NewBikersComponent };
