var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
var InActiveCustomerComponent = /** @class */ (function () {
    function InActiveCustomerComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.p = 1;
        this.AddressLog = [];
        this.Devices = [];
        this.skip_value = 0;
        this.index = 0;
        this.url = '';
        this.active_CustomersData = [];
    }
    InActiveCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_InActive_Customers', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.active_CustomersData = data.json().extras.CustomerData;
                if (_this.active_CustomersData.length == 0) {
                    _this.isData = true;
                }
                /* pagination*/
                _this.Total_Count = data.json().extras.Count;
                if (_this.active_CustomersData.length == 0) {
                    _this.isData = true;
                }
                /* completed*/
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
    InActiveCustomerComponent.prototype.pageChanged = function (ev) {
        this.p = ev;
        this.nextpage(this.p - 1);
    };
    InActiveCustomerComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_InActive_Customers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.active_CustomersData = data.json().extras.CustomerData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    InActiveCustomerComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.mymodel = newValue;
        this.activeId = null;
        var length = newValue.length;
        if (length >= 3) {
            this.active_CustomersData = [];
            this.skip_value = 0;
            var body1 = new adminOrder_SearchModal(null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_InActive_Customers', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var resultdata = [];
                    _this.active_CustomersData = data.json().extras.CustomerData;
                }
            });
        }
        else {
            this.active_CustomersData = [];
            this.ngOnInit();
            this.index = 0;
        }
    };
    InActiveCustomerComponent.prototype.edit = function (item) {
        this.Devices = item.Devices;
        this.AddressLog = item.AddressLog;
        this.CustomerID = item.CustomerID;
        this.First_name = item.First_name;
        this.Email = item.Email;
        this.Phone = item.Phone;
    };
    InActiveCustomerComponent.prototype.onDeviceInfo = function (item) {
        this.edit(item);
        this.isdetails_View_devices = true;
    };
    InActiveCustomerComponent.prototype.onAddressInfo = function (item) {
        this.edit(item);
        this.isdetails_View_AddressLog = true;
    };
    InActiveCustomerComponent.prototype.onInactive = function (item, index) {
        this.isdelete = true;
        this.edit(item);
        this.CustomerID = item.CustomerID;
        this.index_delete = index;
    };
    InActiveCustomerComponent.prototype.OnDelete = function () {
        var _this = this;
        var body1 = new adminOrder_SearchModal(null, null, this.CustomerID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Make_Customer_Active', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.active_CustomersData.splice(_this.index_delete, 1);
                _this.isdelete = false;
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
    InActiveCustomerComponent.prototype.onClose_Delete = function () {
        this.isdelete = false;
    };
    InActiveCustomerComponent.prototype.onClose_details_View = function () {
        this.isdetails_View_devices = false;
    };
    InActiveCustomerComponent.prototype.onClose_details_View_AddressLog = function () {
        this.isdetails_View_AddressLog = false;
    };
    InActiveCustomerComponent.prototype.sortColumn = function (key) {
        if (this.sortKey != key) {
            this.sortKey = key;
            var sort = 1;
        }
        else {
            var sort = -1;
        }
        this.sortOptions = {};
        this.sortOptions[key] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    InActiveCustomerComponent = __decorate([
        Component({
            selector: 'app-inactive',
            templateUrl: "./InactiveCustomers.component.html",
            styleUrls: ["./InactiveCustomers.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], InActiveCustomerComponent);
    return InActiveCustomerComponent;
}());
export { InActiveCustomerComponent };
