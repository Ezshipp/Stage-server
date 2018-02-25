var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiMessageService } from "./../../../../authentication/apimessages.service";
import { ErrorService } from "./../../../../errors/error.service";
import { premiumCustomerModal } from "./../../../../front_end_models/premiumCustomerModal";
import { Http, Headers } from "@angular/http";
import { Component } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { Router } from "@angular/router";
import { GenReportModal } from "../../../../front_end_models/genReportModel";
import { CodReportModel } from "../../../../front_end_models/CodReportModel";
var ClientsCODComponent = /** @class */ (function () {
    function ClientsCODComponent(http, _ApiMessageService, _cookieService, router, ErrorService) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this.premuCust_data = [];
        this.isRequesting = false;
        this.sortOptions = {};
        this.currentPage_cod = 1;
        this.CodReportsData = [];
        this.url = "";
        this.limit = 10;
    }
    ClientsCODComponent.prototype.ngOnInit = function () {
        this.getcodReport();
    };
    ClientsCODComponent.prototype.getcodReport = function () {
        var body1 = new GenReportModal(this._cookieService.get("ez_admin_cusID"), null, null, null, 0, this.limit, {});
        this.getData_backend(body1, "/Find_All_Customer_Cod_Reports", 1);
    };
    ClientsCODComponent.prototype.OnpageChanege_cod = function (pageNumber) {
        this.currentPage_cod = pageNumber;
        var skip = this.currentPage_cod - 1;
        skip = skip * this.limit;
        var body1 = new GenReportModal(this._cookieService.get("ez_admin_cusID"), null, null, null, skip, this.limit, this.sortOptions);
        this.getData_backend(body1, "/Find_All_Customer_Cod_Reports", 2);
    };
    ClientsCODComponent.prototype.OnRefresh = function (codReportData, index) {
        this.CustomerID = codReportData.CustomerID;
        var body = new CodReportModel(codReportData.CustomerInvoiceID, codReportData.CustomerID);
        this.getData_backend(body, "/Get_Customer_COD_Report", 3);
    };
    ClientsCODComponent.prototype.onClickCOdReport = function () {
        this.premuCust_data = [];
        this.allPremiumCustomers = true;
        this.getPremicustomersData();
        this.createForm = false;
    };
    ClientsCODComponent.prototype.getPremicustomersData = function () {
        var body1 = new premiumCustomerModal(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {});
        this.isLoadinPremiumCust = true;
        this.getData_backend(body1, "/Find_All_Active_Premium_Customers", 4);
    };
    ClientsCODComponent.prototype.OnpageChanege_premiumCust = function (pageNumber) {
        this.currentPage_premiumCust = pageNumber;
        this.isLoadinPremiumCust = true;
        var skip = this.currentPage_premiumCust - 1;
        skip = skip * this.limit;
        var body1 = new premiumCustomerModal(null, null, skip, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {});
        this.getData_backend(body1, "/Find_All_Active_Premium_Customers", 5);
    };
    ClientsCODComponent.prototype.OnselectPreCustomers = function (item, pageNumber) {
        this.First_name = item.First_name;
        this.createCOd_CustomerID = item.CustomerID;
        this.createForm = true;
        this.allPremiumCustomers = false;
    };
    ClientsCODComponent.prototype.exportPdf = function (fromdate, to_date) {
        if (fromdate == "" || to_date == "") {
            var message = 'Enter From Date and To Date';
            this.ErrorService.handleError(message);
        }
        else {
            var dat = fromdate.split('-');
            var FromDate = dat[2] + '/' + dat[1] + '/' + dat[0];
            var date1 = to_date.split('-');
            var Todate = date1[2] + '/' + date1[1] + '/' + date1[0];
            this.isRequesting = true;
            var result_table_data = new GenReportModal(null, this.createCOd_CustomerID, FromDate, Todate);
            this.getData_backend(result_table_data, '/Create_Client_COD_Report', 6);
        }
    };
    ClientsCODComponent.prototype.getData_backend = function (body, url, type) {
        var _this = this;
        this.isRequesting = true;
        var headers = new Headers({ "Content-Type": "application/json" });
        var req = this.http
            .post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    /* =>>>intial cod Reports*/
                    _this.currentPage_cod = 1;
                    _this.CodReportsData = data.json().extras.InvoiceData;
                    _this.Total_Count_cod = data.json().extras.Count;
                }
                else if (type == 2) {
                    /* =>>> pagination cod Reports*/
                    _this.CodReportsData = data.json().extras.InvoiceData;
                }
                else if (type == 3) {
                    /* =>>>> refresh cod Reports*/
                    // this.getcodReport()
                    var codReport_Refresh = [];
                    codReport_Refresh = data.json().extras.InvoiceData;
                    for (var i = 0; i < _this.CodReportsData.length; i++) {
                        if (_this.CustomerID == _this.CodReportsData[i].CustomerID) {
                            _this.CodReportsData[i].PDFLink = codReport_Refresh.PDFLink;
                            _this.CodReportsData[i].ProcessStage = codReport_Refresh.ProcessStage;
                        }
                    }
                }
                else if (type == 4) {
                    /* =>>>intial premuCust_data*/
                    _this.currentPage_premiumCust = 1;
                    _this.isLoadinPremiumCust = false;
                    _this.premuCust_data = data.json().extras.CustomerData;
                    _this.premiumCust_Count = data.json().extras.Count;
                }
                else if (type == 5) {
                    /* =>>> pagination premuCust_data*/
                    _this.isLoadinPremiumCust = false;
                    _this.premuCust_data = data.json().extras.CustomerData;
                }
                else if (type == 6) {
                    /* =>>> create  cod*/
                    var Status = 'Your Orders Record is in Processing';
                    _this.ErrorService.handleError(Status);
                    _this.createForm = false;
                    _this.getcodReport();
                }
            }
            else {
                _this.isRequesting = false;
                _this.isLoadinPremiumCust = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ClientsCODComponent = __decorate([
        Component({
            selector: "app-clientcod",
            templateUrl: "./client_cod.component.html",
            styleUrls: ["./client_cod.component.css"]
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            CookieService,
            Router,
            ErrorService])
    ], ClientsCODComponent);
    return ClientsCODComponent;
}());
export { ClientsCODComponent };
