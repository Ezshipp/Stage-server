var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ExpiredJobsModel } from '../../front_end_models/expiredModel';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../errors/error.service';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component } from '@angular/core';
var O_DeliveryReportComponent = /** @class */ (function () {
    function O_DeliveryReportComponent(http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.btn_Text = 'Export Data';
        this.excellData = [];
        this.sortOptions = null;
        this.limit = 10;
        this.skip = 0;
        this.url = '';
        this.p = 1;
        this.completedOrders_Data = [];
    }
    O_DeliveryReportComponent.prototype.ngOnInit = function () {
        this.getCompeted_Orders(1, '/Completed_Order_Delivery_Reports');
    };
    O_DeliveryReportComponent.prototype.getCompeted_Orders = function (type, url, searchValue) {
        var _this = this;
        this.isRequesting = true;
        var body = new ExpiredJobsModel(null, this.skip, this.limit, searchValue, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    // this.isSearch=false
                    _this.completedOrders_Data = data.json().extras.OrderData;
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.isRequesting = false;
                    _this.completedOrders_Data = data.json().extras.OrderData;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    O_DeliveryReportComponent.prototype.pageChanged = function (event) {
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.isRequesting = true;
        this.getCompeted_Orders(2, '/Completed_Order_Delivery_Reports');
    };
    O_DeliveryReportComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    O_DeliveryReportComponent.prototype.sortColumn = function (key) {
        if (this.valu != key) {
            this.valu = key;
            this.IsAsc = true;
        }
        else {
            this.IsAsc = !this.IsAsc;
        }
        if (this.IsAsc == true) {
            var sort = 1;
        }
        else if (this.IsAsc == false) {
            sort = -1;
        }
        this.sortOptions = {};
        this.sortOptions[key] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    O_DeliveryReportComponent.prototype.OnExcel_Download = function () {
        this.btn_Text = 'downloading ..';
        this.getPromotional_Excel(0);
    };
    O_DeliveryReportComponent.prototype.getPromotional_Excel = function (skip) {
        var _this = this;
        var sortoptions = {
            orderseqId: -1
        };
        // this.isRequesting = true
        var body = new ExpiredJobsModel(null, skip, 50, null, sortoptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Completed_Order_Delivery_Reports', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var resultdata = [];
                resultdata = data.json().extras.OrderData;
                if (resultdata.length == 0) {
                    _this.btn_Text = 'Export data';
                    var csvData = _this.ErrorService.ConvertToCSV(_this.excellData);
                    var a = document.createElement("a");
                    a.setAttribute('style', 'display:none;');
                    document.body.appendChild(a);
                    var blob = new Blob([csvData], { type: 'text/csv' });
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'DeliveryReport.csv';
                    a.click();
                    return 'success';
                }
                else {
                    skip = skip + resultdata.length;
                    Array.prototype.push.apply(_this.excellData, resultdata);
                    _this.getPromotional_Excel(skip);
                }
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    O_DeliveryReportComponent = __decorate([
        Component({
            selector: 'app-delivey',
            templateUrl: './o.DeliveryReport.component.html',
            styleUrls: ['./o.DeliveryReport.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], O_DeliveryReportComponent);
    return O_DeliveryReportComponent;
}());
export { O_DeliveryReportComponent };
