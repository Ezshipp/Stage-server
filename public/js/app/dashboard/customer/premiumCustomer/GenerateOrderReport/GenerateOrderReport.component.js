var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../errors/error.service';
import { GenReportModal } from '../../../../front_end_models/genReportModel';
import { premiumCustomerModal } from '../../../../front_end_models/premiumCustomerModal';
var GenerateOrderReportComponent = /** @class */ (function () {
    function GenerateOrderReportComponent(http, _ApiMessageService, _cookieService, router, ErrorService) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this.isCreate = false;
        this.RecordData = [];
        this.pO = 1;
        this.limit = 10;
        this.skip_value_O = 0;
        this.p = 1;
        this.skip_value = 0;
        this.allPremiumCustomers = false;
        this.CustomerData = [];
        this.url = '';
    }
    GenerateOrderReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sortOptions = {};
        var body1 = new GenReportModal(this._cookieService.get('ez_admin_cusID'), null, null, null, this.skip_value_O, this.limit, this.sortOptions);
        this.isRequesting = true;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Customer_Order_Records', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.RecordData = data.json().extras.RecordData;
                _this.Total_CountO = data.json().extras.Count;
                _this.createForm = false;
                if (_this.RecordData.length > 0) {
                    _this.isDataOrders = false;
                }
                else {
                    _this.isDataOrders = true;
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
    GenerateOrderReportComponent.prototype.pageChangedOrders = function (event) {
        this.pO = event;
        this.nextpageOrders(this.pO - 1);
    };
    GenerateOrderReportComponent.prototype.nextpageOrders = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        this.skip_value_O = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var body1 = new GenReportModal(this._cookieService.get('ez_admin_cusID'), null, null, null, this.skip_value_O, this.limit, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Customer_Order_Records', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.RecordData = data.json().extras.RecordData;
                _this.skip_value_O = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    GenerateOrderReportComponent.prototype.onCreateReport = function () {
        var _this = this;
        this.allPremiumCustomers = true;
        this.createForm = false;
        this.from_date = '';
        this.to_date = '';
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new premiumCustomerModal(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.CustomerData = data.json().extras.CustomerData;
                if (_this.CustomerData.length == 0) {
                    _this.isData = true;
                }
                _this.Total_Count = data.json().extras.Count;
            }
            else {
                _this.isRequesting = false;
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
    GenerateOrderReportComponent.prototype.pageChanged = function (event) {
        console.log("event" + event);
        this.p = event;
        this.nextpage(this.p - 1);
    };
    GenerateOrderReportComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        console.log("1");
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new premiumCustomerModal(null, null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                console.log("2");
                _this.isRequesting = false;
                _this.CustomerData = data.json().extras.CustomerData;
                _this.skip_value = _this.index * 10;
            }
            else {
                console.log("3");
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    GenerateOrderReportComponent.prototype.onClosePreCustomers = function () {
        this.allPremiumCustomers = false;
        this.isCreate = false;
    };
    GenerateOrderReportComponent.prototype.selectPreCustomers = function (item, index) {
        this.createForm = true;
        this.allPremiumCustomers = false;
        this.CustomerID = item.CustomerID;
        this.First_name = item.First_name;
        this.isCreate = true;
    };
    GenerateOrderReportComponent.prototype.OnFromDate = function (date) {
        var dat = date.split('-');
        this.from_date = dat[2] + '/' + dat[1] + '/' + dat[0];
    };
    GenerateOrderReportComponent.prototype.OnTodate = function (date) {
        var dat = date.split('-');
        this.to_date = dat[2] + '/' + dat[1] + '/' + dat[0];
    };
    GenerateOrderReportComponent.prototype.exportPdf = function () {
        var _this = this;
        if (this.from_date == "" || this.to_date == "") {
            var message = 'Enter From Date and To Date';
            this.ErrorService.handleError(message);
        }
        else {
            this.isRequesting = true;
            var result_table_data = new GenReportModal(this._cookieService.get('ez_admin_cusID'), this.CustomerID, this.from_date, this.to_date);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Premium_Customer_Records_in_Date_Range', result_table_data, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.isRequesting = false;
                    var Status = 'Your Orders Record is in Processing';
                    _this.ErrorService.handleError(Status);
                    _this.createForm = false;
                    _this.ngOnInit();
                }
                else {
                    _this.isRequesting = false;
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message_1);
                }
            });
        }
    };
    GenerateOrderReportComponent.prototype.OnRefresh = function () {
        this.ngOnInit();
    };
    GenerateOrderReportComponent = __decorate([
        Component({
            selector: 'GenerateOrderReport',
            templateUrl: './GenerateOrderReport.component.html',
            styleUrls: ['./GenerateOrderReport.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            CookieService,
            Router,
            ErrorService])
    ], GenerateOrderReportComponent);
    return GenerateOrderReportComponent;
}());
export { GenerateOrderReportComponent };
