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
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
var CancelOrderComponent = /** @class */ (function () {
    function CancelOrderComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.limit = 10;
        this.ZonesLogs = [];
        this.onselectitem = 0;
        this.offers = ["Zones Logs", "Notifications"];
        this.p = 1;
        this.Cancel_OrderData_json = [];
        this.jobType = 3;
        this.skip_value = 0;
        this.index = 0;
        this.array = [];
        this.Cancel_OrderData = [];
        this.url = '';
    }
    CancelOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Cancel_OrderData = data.json().extras.OrderData;
                _this.Cancel_OrderData_json = data.json().extras.OrderData;
                for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Cancel_OrderData[i].pickAddress;
                    _this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '');
                    _this.Cancel_OrderData[i].pickAddress = _this.Cancel_OrderData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Cancel_OrderData[i].dropAddress;
                    _this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '');
                    _this.Cancel_OrderData[i].dropAddress = _this.Cancel_OrderData[i].dropAddress.replace(', India', '');
                }
                if (!_this.Cancel_OrderData.length) {
                    _this.isData = true;
                }
                else {
                    _this.issearch = false;
                    _this.isData = false;
                }
                /* pagination*/
                _this.Total_Count = data.json().extras.Count;
                /* pagination*/
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
    /* copy for more details*/
    CancelOrderComponent.prototype.OnmoreDetails = function (item, i) {
        this.pickLatitude = item.pickLatitude;
        this.pickLongitude = item.pickLongitude;
        this.pickAddress = item.pickAddress;
        this.dropAddress = item.dropAddress;
        this.dropLatitude = item.dropLatitude;
        this.dropLongitude = item.dropLongitude;
        this.orderId = item.orderId;
        this.bookingType = item.bookingType;
        this.receiverName = item.receiverName;
        this.receiverPhone = item.receiverPhone;
        this.itemName = item.itemName;
        this.itemDescription = item.itemDescription;
        this.itemImage = item.itemImage;
        this.deliverycharge = item.deliverycharge;
        this.item_actual_cost = item.item_actual_cost;
        this.Driver_Name = item.Driver_Name;
        this.orderseqId = item.orderseqId;
        this.First_name = item.First_name;
        this.Phone = item.Phone;
        this.Email = item.Email;
        this.Cancelled_Time = item.Cancelled_Time;
        this.Cancellation_Reason = item.Cancellation_Reason;
        this.orderType = item.orderType;
        if (this.itemImage.length) {
            this.isimage = true;
        }
        else {
            this.isimage = false;
        }
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item);
        }
        else {
        }
        this.DiscountPercentage = item.DiscountPercentage;
        this.paymentType = item.paymentType;
        this.OfferApplied_Boolean = item.OfferApplied;
        this.Driver_PhoneNumber = item.Driver_PhoneNumber;
        if (this.OfferApplied_Boolean) {
            this.OfferApplied = 'Yes';
            this.OfferName = item.OfferName;
            this.OfferCode = item.OfferCode;
        }
        else {
            this.OfferApplied = 'No';
        }
        if (this.paymentType == 1) {
            this.paymentType_string = 'Cash On Delivery';
        }
        else {
            this.paymentType_string = 'Online';
        }
        this.DeviceType = item.DeviceType;
        if (this.DeviceType == 1) {
            this.device_stirng = 'Ios';
        }
        else if (this.DeviceType == 2) {
            this.device_stirng = 'Android';
        }
        else if (this.DeviceType == 3) {
            this.device_stirng = 'Web';
        }
        this.OfferDescription = item.OfferDescription;
        this.orderType = item.orderType;
        if (item.Driver_Assigned == true) {
            this.Driver_Email = item.Driver_Email;
        }
        else {
        }
    };
    CancelOrderComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        this.nextpage(this.p - 1);
    };
    CancelOrderComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.Cancel_OrderData = data.json().extras.OrderData;
                _this.Cancel_OrderData_json = data.json().extras.OrderData;
                for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Cancel_OrderData[i].pickAddress;
                    _this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '');
                    _this.Cancel_OrderData[i].pickAddress = _this.Cancel_OrderData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Cancel_OrderData[i].dropAddress;
                    _this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '');
                    _this.Cancel_OrderData[i].dropAddress = _this.Cancel_OrderData[i].dropAddress.replace(', India', '');
                }
                _this.skip_value = _this.index * _this.limit;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    CancelOrderComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.views = null;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.Cancel_OrderData = [];
            this.array = [];
            this.skip_value = 0;
            var body1 = new adminOrder_SearchModal(this.jobType, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Orders_Ezshipp', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.issearch = true;
                    _this.array.length = 0;
                    var resultdata = [];
                    _this.views = -1;
                    _this.Cancel_OrderData = data.json().extras.OrderData;
                    _this.Cancel_OrderData_json = data.json().extras.OrderData;
                    for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                        var str = '';
                        var pick = _this.Cancel_OrderData[i].pickAddress;
                        _this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '');
                        _this.Cancel_OrderData[i].pickAddress = _this.Cancel_OrderData[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.Cancel_OrderData.length; i++) {
                        var str = '';
                        var pick = _this.Cancel_OrderData[i].dropAddress;
                        _this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '');
                        _this.Cancel_OrderData[i].dropAddress = _this.Cancel_OrderData[i].dropAddress.replace(', India', '');
                    }
                    _this.array.length = 0.;
                }
            });
        }
        else {
            this.Cancel_OrderData = [];
            this.ngOnInit();
            this.array.length = 0;
            this.index = 0;
        }
    };
    CancelOrderComponent.prototype.onDelete = function (item, index) {
        this.orderId = item.orderId;
        this.isdelete = true;
        this.Fordelete = index;
        this.index_delete = index;
        this.First_name = item.First_name;
        this.orderseqId = item.orderseqId;
    };
    CancelOrderComponent.prototype.onClose_Delete = function () {
        this.index_delete = -1;
    };
    CancelOrderComponent.prototype.remove_Order = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.isRequesting = false;
                    _this.index_delete = -1;
                    _this.cdref.detectChanges();
                    _this.Cancel_OrderData.splice(_this.Fordelete, 1);
                    _this.isdelete = false;
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
    CancelOrderComponent.prototype.close = function () {
        this.views = null;
    };
    CancelOrderComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.views = i;
        this.OnmoreDetails(item, i);
    };
    CancelOrderComponent.prototype.sortColumn = function (key) {
        var backendkey;
        if (key == 'First_name') {
            backendkey = 'customerName';
        }
        else if (key == 'Phone ') {
            backendkey = 'customerPhone';
        }
        else {
            backendkey = key;
        }
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
        this.sortOptions[backendkey] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    CancelOrderComponent.prototype.Onselect = function (m, itemss, item) {
        var _this = this;
        this.onselectitem = m;
        if (itemss == "Zones Logs") {
            var body = new OrdersModel_admin(null, null, item.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Zone_Orders_Logs', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.ZonesLogs = data.json().extras.ZoneOrderLogData;
                    if (_this.ZonesLogs.length) {
                        _this.barcodeId = _this.ZonesLogs[0].barcodeid;
                    }
                    else {
                        _this.itemMsg = 'No zones logs Found';
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
        }
        else {
            this.ZonesLogs = [];
            this.itemMsg = 'No Notification Found';
        }
    };
    CancelOrderComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.ngOnInit();
        this.p = 1;
    };
    CancelOrderComponent = __decorate([
        Component({
            selector: 'app-cancel',
            templateUrl: "cancelOrders.component.html",
            styleUrls: ["cancelOrders.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], CancelOrderComponent);
    return CancelOrderComponent;
}());
export { CancelOrderComponent };
