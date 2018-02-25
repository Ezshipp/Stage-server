var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { ApiMessageService } from "../../../authentication/apimessages.service";
import { OrdersModel_admin } from "../../../front_end_models/OrdersModel";
import { CookieService } from "angular2-cookie/services";
import { ErrorService } from "../../../errors/error.service";
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
import { FilterModel } from '../../../front_end_models/filterModel';
var CompletedOrdersComponent = /** @class */ (function () {
    function CompletedOrdersComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.isOnlineClicked = false;
        this.filter_search_biker = false;
        this.isAssignDriver = false;
        this.DriverData = [];
        this.filterPhoneNumber = '';
        this.filterName = '';
        this.Whether_Date_Filter = false;
        this.filter_search_date = false;
        this.filter_search_name = false;
        this.filter_search_phone = false;
        this.CLEAR_ALL = true;
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_Name_Filter = false;
        this.filterBiker = '';
        this.Whether_Driver_Filter = false;
        this.Payment_Not_Captured = false;
        this.Payment_Captured = false;
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.filter_search_payment_type = false;
        this.fiterElementsActive = false;
        this.Whether_Pick_Zone_Filter = false;
        this.Whether_Drop_Zone_Filter = false;
        this.filter_zones_drop = false;
        this.ZoneData = [];
        this.filter_zones = false;
        this.PickZoneArray = [];
        this.DropZoneArray = [];
        this.Whether_SameDay_BookingType = false;
        this.Whether_Instant_BookingType = false;
        this.Whether_FoursHrs_BookingType = false;
        this.click_all_filter = false;
        this.sortOptions = {};
        this.filter = "./img/filter_click.png";
        this.limit = 10;
        this.ZonesLogs = [];
        this.onselectitem = 0;
        this.offers = ["Zones Logs", "Notifications"];
        this.alordersData_json = [];
        this.ResultData_search = [];
        this.filteredData = null;
        this.jobType = 1;
        this.isData = false;
        this.skip_value = 0;
        this.index = 0;
        this.mymodel = '';
        this.array = [];
        this.allordersdata = [];
        this.url = '';
    }
    CompletedOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.allordersdata = data.json().extras.OrderData;
                _this.alordersData_json = data.json().extras.OrderData;
                _this.Total_Count = data.json().extras.Count;
                for (var i = 0; i < _this.allordersdata.length; i++) {
                    var str = '';
                    var pick = _this.allordersdata[i].pickAddress;
                    _this.allordersdata[i].pickAddress = pick.replace('Telangana', '');
                    _this.allordersdata[i].pickAddress = _this.allordersdata[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.allordersdata.length; i++) {
                    var str = '';
                    var pick = _this.allordersdata[i].dropAddress;
                    _this.allordersdata[i].dropAddress = pick.replace('Telangana', '');
                    _this.allordersdata[i].dropAddress = _this.allordersdata[i].dropAddress.replace(', India', '');
                }
                if (!_this.allordersdata.length) {
                    _this.isData = true;
                }
                else {
                    _this.issearch = false;
                    _this.isData = false;
                }
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
    CompletedOrdersComponent.prototype.getStyle = function (index) {
        if (index == this.index) {
            return "#795548";
        }
    };
    CompletedOrdersComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        this.nextpage(this.p - 1);
    };
    CompletedOrdersComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        if (this.CLEAR_ALL == false) {
            var body = new FilterModel(skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, null, null, null, null, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Completed_Orders_Filtering', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.allordersdata = data.json().extras.OrderData;
                    _this.click_all_filter = false;
                    _this.isRequesting = false;
                    _this.issearch = false;
                    _this.alordersData_json = data.json().extras.OrderData;
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].pickAddress;
                        _this.allordersdata[i].pickAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].pickAddress = _this.allordersdata[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].dropAddress;
                        _this.allordersdata[i].dropAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].dropAddress = _this.allordersdata[i].dropAddress.replace(', India', '');
                    }
                    if (!_this.allordersdata.length) {
                        _this.isData = true;
                    }
                    else {
                        _this.issearch = false;
                        _this.isData = false;
                    }
                    /* pagination*/
                    _this.Total_Count = data.json().extras.Count;
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
            var empid = this._cookieService.get('EmployeeID');
            var result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
            var body = JSON.stringify(result_table_data);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.close();
                    _this.isRequesting = false;
                    _this.issearch = false;
                    _this.allordersdata = data.json().extras.OrderData;
                    _this.orderseqId = _this.allordersdata.orderseqId;
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].pickAddress;
                        _this.allordersdata[i].pickAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].pickAddress = _this.allordersdata[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].dropAddress;
                        _this.allordersdata[i].dropAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].dropAddress = _this.allordersdata[i].dropAddress.replace(', India', '');
                    }
                    _this.skip_value = _this.index * _this.limit;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
    };
    CompletedOrdersComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.views = null;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.allordersdata = [];
            this.array = [];
            this.skip_value = 0;
            var body1 = new adminOrder_SearchModal(this.jobType, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Orders_Ezshipp', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.array.length = 0;
                    var resultdata = [];
                    _this.issearch = true;
                    _this.views = -1;
                    _this.allordersdata = data.json().extras.OrderData;
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].pickAddress;
                        _this.allordersdata[i].pickAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].pickAddress = _this.allordersdata[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.allordersdata.length; i++) {
                        var str = '';
                        var pick = _this.allordersdata[i].dropAddress;
                        _this.allordersdata[i].dropAddress = pick.replace('Telangana', '');
                        _this.allordersdata[i].dropAddress = _this.allordersdata[i].dropAddress.replace(', India', '');
                    }
                    _this.array.length = 0.;
                }
            });
        }
        else {
            this.allordersdata = [];
            this.ngOnInit();
            this.array.length = 0;
            this.index = 0;
        }
    };
    CompletedOrdersComponent.prototype.edit = function (item, i) {
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
        this.orderType = item.orderType;
        this.views = i;
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item);
        }
        else {
        }
        if (this.itemImage.length) {
            this.isimage = true;
        }
        else {
            this.isimage = false;
        }
        this.order_datetime = item.order_datetime;
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
        this.Order_Accepted_Time = item.Order_Accepted_Time;
        this.Order_Completed_Time = item.Order_Completed_Time;
        this.Shipping_Distance = item.Shipping_Distance;
        this.Order_Journey_Time = item.Order_Journey_Time;
        this.OfferDescription = item.OfferDescription;
        this.orderType = item.orderType;
        if (item.Driver_Assigned == true) {
            this.Driver_Email = item.Driver_Email;
        }
        else {
        }
    };
    CompletedOrdersComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.edit(item, i);
        this.isdetails_View = true;
    };
    CompletedOrdersComponent.prototype.onClose_details_View = function () {
        this.isdetails_View = false;
    };
    CompletedOrdersComponent.prototype.onDelete = function (item, index) {
        this.isDelete = index;
        this.orderId = item.orderId;
        this.index_delete = index;
        this.First_name = item.First_name;
        this.orderseqId = item.orderseqId;
        this.Driver_Name = item.Driver_Name;
        this.receiverName = item.receiverName;
        this.receiverPhone = item.receiverPhone;
        this.Phone = item.Phone;
        if (this.views != null) {
            this.close();
        }
    };
    CompletedOrdersComponent.prototype.onClose_Delete = function () {
        this.index_delete = -1;
    };
    CompletedOrdersComponent.prototype.remove_Order = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.index_delete = -1;
                    _this.isRequesting = false;
                    _this.cdref.detectChanges();
                    _this.allordersdata.splice(_this.isDelete, 1);
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
    CompletedOrdersComponent.prototype.row_View = function (row_View, i) {
        this.Driver_Name = row_View.Driver_Name;
        this.Driver_PhoneNumber = row_View.Driver_PhoneNumber;
        this.Driver_Email = row_View.Driver_Email;
        this.status = row_View.status;
        this.DeviceType = row_View.DeviceType;
        this.views = i;
    };
    CompletedOrdersComponent.prototype.sortColumn = function (key) {
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
    CompletedOrdersComponent.prototype.close = function () {
        this.views = null;
    };
    CompletedOrdersComponent.prototype.Onselect = function (m, itemss, item) {
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
    CompletedOrdersComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
            && this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
            && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false &&
            this.Whether_Pick_Zone_Filter == false && this.Whether_Drop_Zone_Filter == false) {
            this.ngOnInit();
            this.p = 1;
        }
        else {
            this.skip_value = 0;
            this.filterApply();
        }
    };
    CompletedOrdersComponent.prototype.click_filter_view = function () {
        this.click_all_filter = true;
    };
    CompletedOrdersComponent.prototype.click_name_filter = function () {
        this.filter_search_name = !this.filter_search_name;
    };
    CompletedOrdersComponent.prototype.click_phone_filter = function () {
        this.filter_search_phone = !this.filter_search_phone;
    };
    CompletedOrdersComponent.prototype.click_biker_filter = function () {
        var _this = this;
        this.filter_search_biker = !this.filter_search_biker;
        this.isAssignDriver = true;
        var body = new OrdersModel_admin();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriverData = data.json().extras.DriverData;
                _this.DriverID = _this.DriverData[0].DriverID;
                _this.Driver_Name = _this.DriverData[0].name;
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
    CompletedOrdersComponent.prototype.onSelectFilter = function (event) {
        this.Name_Query_Type = event;
    };
    CompletedOrdersComponent.prototype.click_payment_type = function () {
        this.filter_search_payment_type = !this.filter_search_payment_type;
    };
    CompletedOrdersComponent.prototype.click_date_filter = function () {
        this.filter_search_date = !this.filter_search_date;
    };
    CompletedOrdersComponent.prototype.payTypeCheck = function (event) {
        if (event.target.id == "cashCheck") {
            this.Whether_Cash_Filter = !this.Whether_Cash_Filter;
        }
        else {
            this.Whether_Online_Filter = !this.Whether_Online_Filter;
            this.isOnlineClicked = !this.isOnlineClicked;
        }
    };
    CompletedOrdersComponent.prototype.bookingType_Filter = function () {
        this.isbookingTypeFilterOptions = !this.isbookingTypeFilterOptions;
    };
    CompletedOrdersComponent.prototype.bookingTypeCheck = function (event) {
        if (event.target.id == 'Instant') {
            this.Whether_Instant_BookingType = !this.Whether_Instant_BookingType;
        }
        else if (event.target.id == 'Fourhours') {
            this.Whether_FoursHrs_BookingType = !this.Whether_FoursHrs_BookingType;
        }
        else if (event.target.id == 'sameDay') {
            this.Whether_SameDay_BookingType = !this.Whether_SameDay_BookingType;
        }
    };
    CompletedOrdersComponent.prototype.capturedCheck = function (event) {
        if (event.target.id == "capturedCheck") {
            this.Payment_Captured = !this.Payment_Captured;
        }
        else if (event.target.id == "capturedNotCheck") {
            this.Payment_Not_Captured = !this.Payment_Not_Captured;
        }
    };
    CompletedOrdersComponent.prototype.zone_filter = function () {
        var _this = this;
        this.filter_zones = !this.filter_zones;
        if (this.filter_zones == true) {
            var body = new FilterModel();
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.ZoneData = data.json().extras.ZoneData;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
    };
    CompletedOrdersComponent.prototype.drop_zone_filter = function () {
        var _this = this;
        this.filter_zones_drop = !this.filter_zones_drop;
        if (this.filter_zones_drop == true) {
            var body = new FilterModel();
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.ZoneData = data.json().extras.ZoneData;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
    };
    CompletedOrdersComponent.prototype.zoneDCheck = function (event, seq, index, title) {
        if (event.target.checked == true) {
            var val = event.target.value;
            this.DropZoneArray.push(val);
        }
        else if (!event.target.checked == true) {
            var val_1 = event.target.value;
            var inde = this.DropZoneArray.indexOf(val_1);
            if (inde == -1) {
            }
            else {
                this.DropZoneArray.splice(inde, 1);
            }
        }
    };
    CompletedOrdersComponent.prototype.zonePCheck = function (event, seq, index, title) {
        if (event.target.checked == true) {
            var val = event.target.value;
            this.PickZoneArray.push(val);
        }
        else if (!event.target.checked == true) {
            var val_2 = event.target.value;
            var inde = this.PickZoneArray.indexOf(val_2);
            if (inde == -1) {
            }
            else {
                this.PickZoneArray.splice(inde, 1);
            }
        }
    };
    CompletedOrdersComponent.prototype.filterApply = function () {
        var _this = this;
        this.views = null;
        this.CLEAR_ALL = false;
        this.isRequesting = true;
        this.p = 1;
        if (this.PickZoneArray.length) {
            this.Whether_Pick_Zone_Filter = true;
        }
        else {
            this.Whether_Pick_Zone_Filter = false;
        }
        if (this.DropZoneArray.length) {
            this.Whether_Drop_Zone_Filter = true;
        }
        else {
            this.Whether_Drop_Zone_Filter = false;
        }
        if (this.filterName.length > 1) {
            this.CLEAR_ALL = false;
            this.Whether_Name_Filter = true;
        }
        else {
            this.Whether_Name_Filter = false;
        }
        if (this.filterPhoneNumber.length > 1) {
            this.CLEAR_ALL = false;
            this.Whether_PhoneNumber_Filter = true;
        }
        else {
            this.Whether_PhoneNumber_Filter = false;
        }
        if (this.from_date == undefined || this.to_date == undefined || this.from_date == null, this.to_date == null) {
            this.Whether_Date_Filter = false;
        }
        else {
            this.CLEAR_ALL = false;
            this.Whether_Date_Filter = true;
            var fdate = this.from_date.split('-');
            this.from_date_back = fdate[2] + '/' + fdate[1] + '/' + fdate[0];
            var tdate = this.to_date.split('-');
            this.to_date_back = tdate[2] + '/' + tdate[1] + '/' + tdate[0];
        }
        if (this.CLEAR_ALL == false) {
            if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
                && this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
                && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false &&
                this.Whether_Pick_Zone_Filter == false && this.Whether_Drop_Zone_Filter == false) {
                this.click_to_clear();
            }
            else {
                this.fiterElementsActive = true;
                var body = new FilterModel(this.skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, null, null, null, null, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray);
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + '/Find_All_Completed_Orders_Filtering', body, { headers: headers })
                    .subscribe(function (data) {
                    if (data.json().success) {
                        _this.allordersdata = data.json().extras.OrderData;
                        _this.click_all_filter = false;
                        _this.isRequesting = false;
                        _this.alordersData_json = data.json().extras.OrderData;
                        for (var i = 0; i < _this.allordersdata.length; i++) {
                            var str = '';
                            var pick = _this.allordersdata[i].pickAddress;
                            _this.allordersdata[i].pickAddress = pick.replace('Telangana', '');
                            _this.allordersdata[i].pickAddress = _this.allordersdata[i].pickAddress.replace(', India', '');
                        }
                        for (var i = 0; i < _this.allordersdata.length; i++) {
                            var str = '';
                            var pick = _this.allordersdata[i].dropAddress;
                            _this.allordersdata[i].dropAddress = pick.replace('Telangana', '');
                            _this.allordersdata[i].dropAddress = _this.allordersdata[i].dropAddress.replace(', India', '');
                        }
                        if (!_this.allordersdata.length) {
                            _this.isData = true;
                        }
                        else {
                            _this.issearch = false;
                            _this.isData = false;
                        }
                        /* pagination*/
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
            }
        }
    };
    CompletedOrdersComponent.prototype.click_to_clear = function () {
        this.fiterElementsActive = false;
        this.clear_filter(1);
        this.ngOnInit();
    };
    CompletedOrdersComponent.prototype.onCloseDriverAssign = function () {
        this.isAssignDriver = false;
    };
    CompletedOrdersComponent.prototype.select_Biker = function (name, id) {
        this.filterBiker = name;
        this.DriverID = id;
        this.isAssignDriver = false;
        this.Whether_Driver_Filter = true;
    };
    CompletedOrdersComponent.prototype.clearFilterSpecific = function (value) {
        if (value == 1) {
            this.Whether_Name_Filter = false;
            this.filterName = "";
            this.Name_Query_Type = null;
            this.filterApply();
        }
        else if (value == 2) {
            this.Whether_PhoneNumber_Filter = false;
            this.filterPhoneNumber = "";
            this.filterApply();
        }
        else if (value == 3) {
            this.filterBiker = "";
            this.Whether_Driver_Filter = false;
            this.DriverID = "";
            this.filterApply();
        }
        else if (value == 4) {
            this.Whether_Date_Filter = false;
            this.from_date_back = "";
            this.to_date_back = "";
            this.from_date = undefined;
            this.to_date = undefined;
            this.filterApply();
        }
        else if (value == 9) {
            this.Whether_Cash_Filter = false;
            this.filterApply();
        }
        else if (value == 10) {
            this.Whether_Online_Filter = false;
            this.filterApply();
        }
        else if (value == 11) {
            this.Payment_Captured = false;
            this.filterApply();
        }
        else if (value == 12) {
            this.Payment_Not_Captured = false;
            this.filterApply();
        }
        else if (value == 13) {
            this.Whether_Instant_BookingType = false;
            this.filterApply();
        }
        else if (value == 14) {
            this.Whether_FoursHrs_BookingType = false;
            this.filterApply();
        }
        else if (value == 15) {
            this.Whether_SameDay_BookingType = false;
            this.filterApply();
        }
        else if (value == 16) {
            this.Whether_Pick_Zone_Filter = false;
            this.PickZoneArray = [];
            this.filterApply();
        }
        else if (value == 17) {
            this.Whether_Drop_Zone_Filter = false;
            this.DropZoneArray = [];
            this.filterApply();
        }
    };
    CompletedOrdersComponent.prototype.clear_filter = function (type) {
        this.click_all_filter = false;
        this.filter_search_phone = false;
        this.filter_search_name = false;
        this.filter_search_date = false;
        if (type == 1) {
            this.CLEAR_ALL = true;
        }
        else {
        }
        this.Whether_Name_Filter = false;
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_Date_Filter = false;
        this.filterName = "";
        this.filterPhoneNumber = "";
        this.from_date_back = "";
        this.to_date_back = "";
        this.from_date = undefined;
        this.to_date = undefined;
        this.filterBiker = "";
        this.Whether_Driver_Filter = false;
        this.DriverID = "";
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.Payment_Captured = false;
        this.Payment_Not_Captured = false;
        this.Whether_Instant_BookingType = false;
        this.Whether_FoursHrs_BookingType = false;
        this.Whether_SameDay_BookingType = false;
        this.Whether_Drop_Zone_Filter = false;
        this.Whether_Pick_Zone_Filter = false;
        this.PickZoneArray = [];
        this.DropZoneArray = [];
    };
    CompletedOrdersComponent = __decorate([
        Component({
            selector: 'app-complete',
            templateUrl: "completedOrders.component.html",
            styleUrls: ["./../allorders/allorders.component.css"]
        })
        /* css file is all order css file */
        ,
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], CompletedOrdersComponent);
    return CompletedOrdersComponent;
}());
export { CompletedOrdersComponent };
