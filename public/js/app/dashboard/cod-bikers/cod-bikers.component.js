var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { driverModel } from "../../front_end_models/driverModel";
import { ErrorService } from "../../errors/error.service";
import { ApiMessageService } from "../../authentication/apimessages.service";
import { Http, Headers } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
import { Component } from "@angular/core";
var CodBikersComponent = /** @class */ (function () {
    function CodBikersComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.op = 1;
        this.OrderData = [];
        this.DriverData_json = [];
        this.p = 1;
        this.DriverData = [];
        this.url = "";
        this.skip_value = 0;
        this.orderSkip = 0;
        this.orderLimit = 4;
        this.limit = 10;
        var d = new Date();
        var month = d.getMonth() + 1;
        var ds = d.getDate() + "/" + month + "/" + d.getFullYear();
        this.toDate = ds;
        var d3 = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
        var lastWeek = this.getLastWeek(new Date());
        var lastWeekMonth = lastWeek.getMonth() + 1;
        var lastWeekDay = lastWeek.getDate();
        var lastWeekYear = lastWeek.getFullYear();
        this.fromDate = lastWeekDay + "/" + lastWeekMonth + "/" + lastWeekYear;
    }
    CodBikersComponent.prototype.getLastWeek = function (date) {
        date = date || new Date();
        var lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        return lastWeek;
    };
    CodBikersComponent.prototype.ngOnInit = function () {
        this.skip_value = 0;
        this.findAllActiveDrivers(1, "/Find_All_Active_Drivers", this.fromDate, this.toDate, "");
    };
    CodBikersComponent.prototype.OnFromDate = function (fromdate) { };
    CodBikersComponent.prototype.Ondateto = function (todate) { };
    CodBikersComponent.prototype.onSubmit = function (fromdate, todate) {
        var fd = fromdate.split("-");
        this.fromDate = fd[2] + "/" + fd[1] + "/" + fd[0];
        var td = todate.split("-");
        this.toDate = td[2] + "/" + td[1] + "/" + td[0];
        this.ngOnInit();
    };
    CodBikersComponent.prototype.findAllActiveDrivers = function (type, url, date_from, date_to, searchValue) {
        var _this = this;
        this.isRequesting = true;
        var body = new driverModel(this.skip_value, null, null, date_from, date_to);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.DriverData = data.json().extras.DriverData;
                    _this.DriverData_json = data.json().extras.DriverData;
                    _this.Total_Count = data.json().extras.Count;
                    if (_this.DriverData.length) {
                        _this.isData = false;
                        _this.isSearch = false;
                    }
                    else {
                        _this.isData = true;
                    }
                }
                else if (type == 2) {
                    _this.DriverData = data.json().extras.DriverData;
                    _this.Total_Count = data.json().extras.Count;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    CodBikersComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip_value = skip_value;
        this.findAllActiveDrivers(2, "/Find_All_Active_Drivers", this.fromDate, this.toDate, "");
    };
    CodBikersComponent.prototype.valuechange = function (value) {
        var _this = this;
        this.isRequesting = true;
        this.views = -1;
        var length = value.length;
        if (length >= 3) {
            this.DriverData = [];
            var body = new driverModel(null, value, null, this.fromDate, this.toDate);
            var headers = new Headers({ "Content-Type": "application/json" });
            return this.http
                .post(this.url + "/Search_All_Active_Drivers", body, {
                headers: headers
            })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.isRequesting = false;
                    _this.DriverData = data.json().extras.DriverData;
                    _this.DriverData_json = data.json().extras.DriverData;
                    _this.Total_Count = data.json().extras.Count;
                    if (_this.DriverData.length) {
                        _this.isData = false;
                        _this.isSearch = false;
                        _this.activeId = null;
                    }
                    else {
                        _this.isData = true;
                    }
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            this.DriverData = [];
            this.ngOnInit();
        }
    };
    CodBikersComponent.prototype.sortColumn = function (key) {
        this.valu = key;
        this.IsAsc = !this.IsAsc;
        this.sortResults(this.valu, this.IsAsc);
    };
    CodBikersComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    CodBikersComponent.prototype.sortResults = function (prop, asc) {
        this.DriverData = this.DriverData_json.sort(function (a, b) {
            if (asc) {
                return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
            }
            else {
                return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
            }
        });
        return this.DriverData;
    };
    CodBikersComponent.prototype.closeOrders = function () {
        this.views = -1;
    };
    CodBikersComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip_value = 0;
        this.ngOnInit();
        this.p = 1;
    };
    CodBikersComponent.prototype.getOrderDetails = function (driverData, DetailView_index, type, ordersCount) {
        this.OrderData = [];
        if (ordersCount == 0) {
            var message = " No Orders Found";
            this.ErrorService.handleError("No Orders Found");
        }
        else {
            this.DriverName = driverData.name;
            this.views = DetailView_index;
            this.detailsOrders_driverId = driverData.DriverID;
            this.op = 1;
            if (type == 1) {
                this.amountType = 1;
                this.detailOrders_url =
                    "/Find_All_Driver_Completed_Orders_Subtotal_Total_Amount";
                this.detailOrders_searchRul =
                    "/Search_All_Driver_Completed_Orders_Subtotal_Total_Amount";
            }
            else if (type == 2) {
                this.amountType = 2;
                this.detailOrders_url =
                    "/Find_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount";
                this.detailOrders_searchRul =
                    "/Search_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount";
            }
            else if (type == 3) {
                this.amountType = 3;
                this.detailOrders_url =
                    "/Find_All_Driver_Completed_Orders_Exceeded_Amount";
                this.detailOrders_searchRul =
                    "/Search_All_Driver_Completed_Orders_Exceeded_Amount";
            }
            var body = new driverModel(0, null, this.detailsOrders_driverId, this.fromDate, this.toDate, null, null, null, null, null, null, null, null, null, null, null, this.orderLimit);
            this.getOrdersDetail_view_backend(body, this.detailOrders_url, 1);
        }
    };
    CodBikersComponent.prototype.getOrdersDetail_view_backend = function (body, url, type) {
        var _this = this;
        this.isRequesting = true;
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.isSearchOrder = false;
                    /* while first time and all types of orders like Subtotal_Total_Amount,Delivery_and_Total_Amount and Orders_Exceeded_Amount*/
                    _this.OrderData = data.json().extras.OrderData;
                    _this.OrderTotal_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.isSearchOrder = false;
                    _this.OrderData = data.json().extras.OrderData;
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.OrderData = data.json().extras.OrderData;
                        _this.isSearchOrder = true;
                    }, 2000);
                }
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    CodBikersComponent.prototype.pageChangedOrder = function (event) {
        this.op = event;
        var skip = this.op - 1;
        var skip_value = skip * this.orderLimit;
        var body = new driverModel(skip_value, null, this.detailsOrders_driverId, this.fromDate, this.toDate, null, null, null, null, null, null, null, null, null, null, null, this.orderLimit);
        this.getOrdersDetail_view_backend(body, this.detailOrders_url, 2);
    };
    CodBikersComponent.prototype.valuechange_Order = function (value) {
        var body = new driverModel(null, value, this.detailsOrders_driverId, this.fromDate, this.toDate, null, null, null, null, null, null, null, null, null, null, null, this.orderLimit);
        if (value.length >= 3) {
            this.getOrdersDetail_view_backend(body, this.detailOrders_searchRul, 3);
        }
        else if (value.length == 0) {
            this.getOrdersDetail_view_backend(body, this.detailOrders_url, 1);
        }
    };
    CodBikersComponent.prototype.search = function (value, url) {
        var _this = this;
        var body = new driverModel(null, value, this.DriverID, this.fromDate, this.toDate);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                setTimeout(function () {
                    _this.OrderData = data.json().extras.OrderData;
                }, 2000);
                if (_this.OrderData.length) {
                }
                else {
                    var message = "No Orders Found";
                    _this.ErrorService.handleError(message);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message_1);
            }
        });
    };
    CodBikersComponent = __decorate([
        Component({
            selector: "cod-bikers",
            templateUrl: "./cod-bikers.component.html",
            styleUrls: ["./cod-bikers.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Http,
            ApiMessageService,
            ErrorService])
    ], CodBikersComponent);
    return CodBikersComponent;
}());
export { CodBikersComponent };
