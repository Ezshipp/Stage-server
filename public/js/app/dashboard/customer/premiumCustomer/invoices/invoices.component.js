var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InvoiceModel } from './../../../../front_end_models/invoice.mode';
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { ErrorService } from './../../../../errors/error.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
var InvoicesComponent = /** @class */ (function () {
    function InvoicesComponent(http, _ApiMessageService, ngZone, _cookieService, router, ErrorService, _cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ngZone = ngZone;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this.dueAmount = '';
        this.p = 1;
        this.isrefresh_link = false;
        this.pdfData_cus = [];
        this.skip_value = 0;
        this.index = 0;
        this.array = [];
        this.url = '';
        this.pdfData = [];
    }
    InvoicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new premiumCustomerModal(null, null, 0);
        this.isRequesting = true;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Invoices', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.pdfData = data.json().extras.InvoiceData;
                if (_this.pdfData.length < 0) {
                    _this.isData = true;
                }
                else {
                    _this.getStyle(_this.index);
                    _this.Total_Count = data.json().extras.Count;
                    var count = parseInt(data.json().extras.Count);
                    var count1 = Math.floor(count / 10);
                    var count2 = count % 10;
                    if (count2 == 0) {
                        _this.array.length = count1;
                    }
                    else {
                        _this.array.length = count1 + 1;
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
    InvoicesComponent.prototype.getStyle = function (index) {
        if (index == this.index) {
            return "#795548";
        }
    };
    InvoicesComponent.prototype.OneditDate = function (item) {
        this.isEditDate = true;
        this.CustomerID = item.CustomerID;
        this.First_name = item.CustomerName;
    };
    InvoicesComponent.prototype.onCloseEditDate = function () {
        this.isEditDate = false;
    };
    InvoicesComponent.prototype.OnRefresh = function (item) {
        var _this = this;
        var body = new InvoiceModel(item.CustomerID, item.CustomerInvoiceID);
        this.isRequesting = true;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Get_Customer_Monthly_Invoice', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                var pdfData_cus = data.json().extras.InvoiceData;
                if (pdfData_cus.PDFLink) {
                    _this.isrefresh_link = true;
                    _this.pdfLinkRefresh = pdfData_cus.PDFLink;
                }
                else {
                    _this.isrefresh_link = false;
                }
            }
        });
    };
    InvoicesComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    InvoicesComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new premiumCustomerModal(null, null, skip_value);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Invoices', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.pdfData = data.json().extras.InvoiceData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    InvoicesComponent.prototype.OnFromDate = function (Frm) {
        var value = Frm.split('-');
        var FromDate = value[2] + '/' + value[1] + '/' + value[0];
        this.from_date = FromDate;
    };
    InvoicesComponent.prototype.OnTodate = function (to) {
        var value = to.split('-');
        var FromDate = value[2] + '/' + value[1] + '/' + value[0];
        this.to_date = FromDate;
    };
    InvoicesComponent.prototype.getpdf = function (FromDate, Todate, CustomerID) {
        var _this = this;
        var body = new premiumCustomerModal(null, CustomerID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, FromDate, Todate, this.dueAmount);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Premium_Customer_Monthly_Invoice_Processing', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.isEditDate = false;
                _this.ngOnInit();
                var msg = 'Your Request has been processing';
                _this.ErrorService.handleError(msg);
                _this.dueAmount = '';
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    InvoicesComponent.prototype.exportPdf = function () {
        this.getpdf(this.from_date, this.to_date, this.CustomerID);
    };
    InvoicesComponent = __decorate([
        Component({
            selector: 'app-invoices',
            templateUrl: './invoices.component.html',
            styleUrls: ['./invoices.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            NgZone,
            CookieService,
            Router,
            ErrorService, ChangeDetectorRef])
    ], InvoicesComponent);
    return InvoicesComponent;
}());
export { InvoicesComponent };
