var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
var ManualOrderComponent = /** @class */ (function () {
    function ManualOrderComponent(_cookieService, router, http, _ApiMessageService, _errorService) {
        this._cookieService = _cookieService;
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._errorService = _errorService;
        this.url = '';
        this.ZoneData = [];
        this.OrderData = [];
        this.DriverData = [];
        this.issucess = false;
    }
    ManualOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ManualOrderModel(this._cookieService.get('ez_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
                _this.zoneseq = data.json().extras.ZoneData[0].zoneseq;
                _this.ZoneID = data.json().extras.ZoneData[0].ZoneID;
                _this.orders();
            }
            else {
            }
        });
    };
    ManualOrderComponent.prototype.select = function (value, event) {
        this.orderidss = -1;
        this.orderindex = -1;
        this.driveridss = -1;
        this.driverindexxx = -1;
        this.orderId = null;
        this.DriverID = null;
        this.val = value;
        var slipfunc = this.val.split('/');
        this.zoneseq = slipfunc[0];
        this.ZoneID = slipfunc[1];
        this.orders();
    };
    ManualOrderComponent.prototype.zoness = function (i) {
        this.index = i;
    };
    ManualOrderComponent.prototype.orders = function () {
        var _this = this;
        this.val = this.zoneseq;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ManualOrderModel(this.val);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Zone', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OrderData = data.json().extras.OrderData;
                for (var i = 0; i < _this.OrderData.length; i++) {
                    var str = '';
                    var pick = _this.OrderData[i].pickAddress;
                    _this.OrderData[i].pickAddress = pick.replace('Telangana', '');
                    _this.OrderData[i].pickAddress = _this.OrderData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.OrderData.length; i++) {
                    var str = '';
                    var pick = _this.OrderData[i].dropAddress;
                    _this.OrderData[i].dropAddress = pick.replace('Telangana', '');
                    _this.OrderData[i].dropAddress = _this.OrderData[i].dropAddress.replace(', India', '');
                }
                _this.drivers();
            }
            else {
            }
        });
    };
    ManualOrderComponent.prototype.refresh_drivers = function () {
        this.drivers();
    };
    ManualOrderComponent.prototype.refresh_orders = function () {
        this.orders();
    };
    ManualOrderComponent.prototype.drivers = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ManualOrderModel(null, this.ZoneID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriverData = data.json().extras.DriverData;
            }
            else {
            }
        });
    };
    ManualOrderComponent.prototype.onclickforOrderDatas = function (val, i) {
        this.orderidss = val;
        this.orderindex = i;
    };
    ManualOrderComponent.prototype.onclickforDriversDatass = function (valu, name, i) {
        this.driveridss = valu;
        this.driverindexxx = i;
        this.driverName = name;
    };
    ManualOrderComponent.prototype.ondriver_selects = function (i) {
        this.driverindexsel = i;
        if (this.driverindexsel == this.driverindexxx) {
            return "#12a6f1";
        }
    };
    ManualOrderComponent.prototype.onorder_selects = function (i) {
        this.orderindexsel = i;
        if (this.orderindexsel == this.orderindex) {
            return "#12a6f1";
        }
    };
    ManualOrderComponent.prototype.orderconfirm = function () {
        var _this = this;
        if (this.orderidss != null && this.driveridss != null) {
            var body = new ManualOrderModel(null, this.ZoneID, this.orderidss, this.driveridss, null, this._cookieService.get('ez_admin_cusID'));
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Manual_Ordering', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.OrderData.splice(_this.orderindex, 1);
                    _this.DriverData.splice(_this.driverindexxx, 1);
                    _this.isdriver_name = true;
                    setTimeout(function () {
                        _this.isdriver_name = false;
                    }, 2000);
                }
                else {
                }
            });
        }
        else {
        }
    };
    ManualOrderComponent.prototype.onErrorHandled = function () {
        this.issucess = false;
    };
    ManualOrderComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 2) {
            this.OrderData = [];
            var uid = this._cookieService.get('ez_cusID');
            var body = new ManualOrderModel(this.zoneseq, null, null, null, this.mymodel);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Searching_All_Orders_Zone', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.OrderData = data.json().extras.OrderData;
                }
            });
        }
        else {
            this.OrderData = [];
            if (length == 0) {
                this.orders();
            }
        }
    };
    ManualOrderComponent.prototype.valuechange_search_driver = function (newValue) {
        var _this = this;
        this.mymodel_search_driver = newValue;
        var length = newValue.length;
        if (length >= 2) {
            this.DriverData = [];
            var uid = this._cookieService.get('ez_cusID');
            var body = new ManualOrderModel(null, this.ZoneID, null, null, this.mymodel_search_driver);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Drivers_of_Zones', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.DriverData = data.json().extras.DriverData;
                }
                else {
                }
            });
        }
        else {
            this.OrderData = [];
            if (length == 0) {
                this.drivers();
            }
        }
    };
    ManualOrderComponent = __decorate([
        Component({
            selector: 'app-manual_order',
            templateUrl: './manual_order.component.html',
            styleUrls: ['./manual_order.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Router,
            Http,
            ApiMessageService,
            ErrorService])
    ], ManualOrderComponent);
    return ManualOrderComponent;
}());
export { ManualOrderComponent };
