var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { ApiMessageService } from "../../../../authentication/apimessages.service";
import { CookieService } from "angular2-cookie/services";
import { ErrorService } from "../../../../errors/error.service";
import { OrdersModel_admin } from "../../../../front_end_models/OrdersModel";
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { adminOrder_SearchModal } from "../../../../front_end_models/adminOrderSearchModal";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FilterModel } from '../../../../front_end_models/filterModel';
var PendingOrdersComponent = /** @class */ (function () {
    function PendingOrdersComponent(router, http, _ApiMessageService, _cookieService, ErrorService, mapsAPILoader, ngZone, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.cdref = cdref;
        this.Whether_SameDay_BookingType = false;
        this.Whether_Instant_BookingType = false;
        this.Whether_FoursHrs_BookingType = false;
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.Whether_Name_Filter = false;
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_New_Jobs_Filter = false;
        this.Whether_Ongoing_Jobs_Filter = false;
        this.Whether_Completed_Jobs_Filter = false;
        this.Whether_Expired_Jobs_Filter = false;
        this.Whether_Date_Filter = false;
        this.Whether_Driver_Filter = false;
        this.Payment_Not_Captured = false;
        this.Payment_Captured = false;
        this.CLEAR_ALL = true;
        this.filterName = "";
        this.filterPhoneNumber = "";
        this.click_all_filter = false;
        this.filter_search_name = false;
        this.filter_search_phone = false;
        this.filter_search_date = false;
        this.filterBiker = "";
        this.jobType = 6;
        this.limit = 40;
        this.ZonesLogs = [];
        this.onselectitem = 0;
        this.offers = ["Zones Logs", "Notifications"];
        this.p = 1;
        this.DriverData = [];
        this.Ongoing_OrderData_json = [];
        this.mymodel = '';
        this.skip_value = 0;
        this.array = [];
        this.isData = false;
        this.index = 0;
        this.display = 'none';
        this.show_map_drop = false;
        this.Ongoing_OrderDate_filter = [];
        this.Ongoing_OrderData = [];
        this.zoom = 15;
        this.url = '';
        this.isRequesting = true;
    }
    PendingOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        this.Ongoing_OrderDate_filter = [];
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Ongoing_OrderData = data.json().extras.OrderData;
                _this.Ongoing_OrderData_json = data.json().extras.OrderData;
                // this.dbtime=this.alordersData_json.order_datetime
                _this.isRequesting = false;
                for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Ongoing_OrderData[i].pickAddress;
                    _this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '');
                    _this.Ongoing_OrderData[i].pickAddress = _this.Ongoing_OrderData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Ongoing_OrderData[i].dropAddress;
                    _this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '');
                    _this.Ongoing_OrderData[i].dropAddress = _this.Ongoing_OrderData[i].dropAddress.replace(', India', '');
                }
                if (!_this.Ongoing_OrderData.length) {
                    _this.isData = true;
                }
                else {
                    _this.issearch = false;
                    _this.isData = false;
                }
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
                for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                    var str = '';
                    var pick = _this.Ongoing_OrderData[i].dropAddress;
                    _this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '');
                    _this.Ongoing_OrderData[i].dropAddress = _this.Ongoing_OrderData[i].dropAddress.replace(', India', '');
                    if (_this.Ongoing_OrderData[i].Color != 0) {
                        _this.Ongoing_OrderDate_filter.push(_this.Ongoing_OrderData[i]);
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
    PendingOrdersComponent.prototype.edit = function (item, i) {
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
        this.paymentType = item.paymentType;
        this.OfferApplied_Boolean = item.OfferApplied;
        this.Driver_PhoneNumber = item.Driver_PhoneNumber;
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
        if (this.OfferApplied_Boolean) {
            this.OfferApplied = 'Yes';
            this.OfferName = item.OfferName;
            this.OfferCode = item.OfferCode;
            this.OfferDescription = item.OfferDescription;
            this.DiscountPercentage = item.DiscountPercentage;
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
        if (item.Driver_Assigned) {
            this.Driver_Name = item.Driver_Name;
            this.Driver_PhoneNumber = item.Driver_PhoneNumber;
            this.Driver_Email = item.Driver_Email;
        }
    };
    PendingOrdersComponent.prototype.change_location_pik = function (item, i) {
        this.edit(item, i);
        this.isedit_pick = true;
    };
    PendingOrdersComponent.prototype.change_location_drop = function (item, i) {
        this.edit(item, i);
        this.isedit_drop = true;
        this.show_map_drop = false;
    };
    PendingOrdersComponent.prototype.onsubmit_Edit_pick = function () {
        var _this = this;
        var body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.isedit_pick = false;
                    _this.ngOnInit();
                    _this.cdref.detectChanges();
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
    PendingOrdersComponent.prototype.onsubmit_Edit_drop = function () {
        var _this = this;
        var body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isSuccess_Manual = true;
                setTimeout(function () {
                    _this.isedit_drop = false;
                    _this.ngOnInit();
                    _this.cdref.detectChanges();
                    _this.isSuccess_Manual = false;
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
    PendingOrdersComponent.prototype.onsubmit_droplocation = function () {
        this.show_map_drop = false;
        this.get_Address(this.dropAddress, 2);
    };
    PendingOrdersComponent.prototype.onsubmit_pickUplocation = function () {
        this.show_map_pick = false;
        this.get_Address(this.pickAddress, 1);
    };
    PendingOrdersComponent.prototype.get_Address = function (address, type) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var address = address;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                _this.display = 'block';
                if (type == 1) {
                    _this.pickLatitude = lat;
                    _this.pickLongitude = lng;
                    _this.show_map_pick = true;
                }
                else {
                    _this.dropLatitude = lat;
                    _this.dropLongitude = lng;
                    _this.show_map_drop = true;
                }
                _this.cdref.detectChanges();
            }
        });
    };
    PendingOrdersComponent.prototype.onclose_editDrop = function () {
        this.isedit_drop = false;
    };
    PendingOrdersComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.pickLatitude = pos.coords.lat;
        this.pickLongitude = pos.coords.lng;
    };
    PendingOrdersComponent.prototype.pos_drop = function ($event) {
        var pos = ($event);
        this.dropLatitude = pos.coords.lat;
        this.dropLongitude = pos.coords.lng;
    };
    PendingOrdersComponent.prototype.onSubmit_picApi = function () {
    };
    PendingOrdersComponent.prototype.onclose_editpick = function () {
        this.isedit_pick = false;
    };
    PendingOrdersComponent.prototype.onDelete = function (item, index) {
        this.orderId = item.orderId;
        this.isdelete = true;
        this.Delete_index = index;
        this.First_name = item.First_name;
        this.orderseqId = item.orderseqId;
        this.edit(item, index);
    };
    PendingOrdersComponent.prototype.onClose_Delete = function () {
        this.isdelete = false;
        this.Delete_index = -1;
    };
    PendingOrdersComponent.prototype.remove_Order = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.index = -1;
                    _this.isRequesting = false;
                    _this.cdref.detectChanges();
                    _this.Ongoing_OrderData.splice(_this.Delete_index, 1);
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
    PendingOrdersComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.views = null;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.Ongoing_OrderData = [];
            this.array = [];
            this.skip_value = 0;
            var body1 = new adminOrder_SearchModal(6, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Orders_Ezshipp', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.array.length = 0;
                    var resultdata = [];
                    _this.issearch = true;
                    _this.views = -1;
                    _this.Ongoing_OrderData = data.json().extras.OrderData;
                    _this.Ongoing_OrderData_json = data.json().extras.OrderData;
                    for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                        var str = '';
                        var pick = _this.Ongoing_OrderData[i].pickAddress;
                        _this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '');
                        _this.Ongoing_OrderData[i].pickAddress = _this.Ongoing_OrderData[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                        var str = '';
                        var pick = _this.Ongoing_OrderData[i].dropAddress;
                        _this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '');
                        _this.Ongoing_OrderData[i].dropAddress = _this.Ongoing_OrderData[i].dropAddress.replace(', India', '');
                    }
                    _this.array.length = 0.;
                }
            });
        }
        else {
            this.Ongoing_OrderData = [];
            this.ngOnInit();
            this.array.length = 0;
            this.index = 0;
        }
    };
    PendingOrdersComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.views = i;
        this.edit(item, i);
        this.order_Index = i;
    };
    PendingOrdersComponent.prototype.onClose_details_View = function () {
        this.views = null;
    };
    PendingOrdersComponent.prototype.sortColumn = function (key) {
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
            console.log('1 ');
        }
        else {
            console.log('2 ');
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
        this.sortOptions[this.valu] = sort;
        if (this.CLEAR_ALL == false) {
        }
        else {
            this.ngOnInit();
        }
        this.p = 1;
    };
    PendingOrdersComponent.prototype.onClickManual = function () {
        var _this = this;
        this.isManualRoute = true;
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
    PendingOrdersComponent.prototype.onCloseManualRoute = function () {
        this.isManualRoute = false;
    };
    PendingOrdersComponent.prototype.select_Driver = function (value, event) {
        var bikerD = value;
        var id_name = bikerD.split('/');
        this.DriverID = id_name[0];
        this.Driver_Name = id_name[1];
    };
    PendingOrdersComponent.prototype.onSubmitManualRoute = function () {
        var _this = this;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.DriverID, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Manual_Ordering', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isSuccess_Manual = true;
                setTimeout(function () {
                    _this.isSuccess_Manual = false;
                    _this.onCloseManualRoute();
                }, 3000);
                _this.views = -1;
                _this.Ongoing_OrderData.splice(_this.order_Index, 1);
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
    PendingOrdersComponent.prototype.Onselect = function (m, itemss, item) {
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
    PendingOrdersComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.ErrorService.itemCount = this.limit;
        this._cookieService.put('itemcount', this.limit.toString());
        if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
            && this.Whether_New_Jobs_Filter == false && this.Whether_Ongoing_Jobs_Filter == false &&
            this.Whether_Completed_Jobs_Filter == false && this.Whether_Expired_Jobs_Filter == false &&
            this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
            && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false) {
            this.ngOnInit();
            // console.log("No filter");
            this.p = 1;
        }
        else {
            // console.log("Filter apply");
            this.skip_value = 0;
        }
    };
    PendingOrdersComponent.prototype.filterApply = function () {
        var _this = this;
        this.views = null;
        this.CLEAR_ALL = false;
        this.isRequesting = true;
        this.p = 1;
        if (this.filterName.length > 1) {
            this.CLEAR_ALL = false;
            this.Whether_Name_Filter = true;
            this.Name_Query_Type = 1;
            // console.log("name " + this.filterName + " " + this.Whether_Name_Filter+" query type true "+this.Name_Query_Type);
        }
        else {
            this.Whether_Name_Filter = false;
            // console.log("name " + this.filterName + " " + this.Whether_Name_Filter+" query type false "+this.Name_Query_Type);
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
            // // console.log("from date s " + this.from_date + " to " + this.to_date + " fi " + this.Whether_Date_Filter);
        }
        else {
            this.CLEAR_ALL = false;
            this.Whether_Date_Filter = true;
            var fdate = this.from_date.split('-');
            this.from_date_back = fdate[2] + '/' + fdate[1] + '/' + fdate[0];
            var tdate = this.to_date.split('-');
            this.to_date_back = tdate[2] + '/' + tdate[1] + '/' + tdate[0];
            // // console.log("from date " + this.from_date + " to " + this.to_date + " fi " + this.Whether_Date_Filter);
        }
        if (this.CLEAR_ALL == false) {
            if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
                && this.Whether_New_Jobs_Filter == false && this.Whether_Ongoing_Jobs_Filter == false &&
                this.Whether_Completed_Jobs_Filter == false && this.Whether_Expired_Jobs_Filter == false &&
                this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
                && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false) {
                this.click_to_clear();
            }
            else {
                // // console.log("this.CLEAR_ALL " + this.CLEAR_ALL);
                this.fiterElementsActive = true;
                var body = new FilterModel(this.skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, this.Whether_New_Jobs_Filter, this.Whether_Ongoing_Jobs_Filter, this.Whether_Completed_Jobs_Filter, this.Whether_Expired_Jobs_Filter, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType);
                // console.log("filter body " + JSON.stringify(body))
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                    .subscribe(function (data) {
                    if (data.json().success) {
                        _this.Ongoing_OrderData = data.json().extras.OrderData;
                        _this.click_all_filter = false;
                        // this.CLEAR_ALL = true;
                        _this.isRequesting = false;
                        // // console.log("this.allordersdata " + JSON.stringify(this.allordersdata));
                        _this.Ongoing_OrderData_json = data.json().extras.OrderData;
                        for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                            var str = '';
                            var pick = _this.Ongoing_OrderData[i].pickAddress;
                            _this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '');
                            _this.Ongoing_OrderData[i].pickAddress = _this.Ongoing_OrderData[i].pickAddress.replace(', India', '');
                        }
                        for (var i = 0; i < _this.Ongoing_OrderData.length; i++) {
                            var str = '';
                            var pick = _this.Ongoing_OrderData[i].dropAddress;
                            _this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '');
                            _this.Ongoing_OrderData[i].dropAddress = _this.Ongoing_OrderData[i].dropAddress.replace(', India', '');
                        }
                        if (!_this.Ongoing_OrderData.length) {
                            _this.isData = true;
                        }
                        else {
                            _this.issearch = false;
                            _this.isData = false;
                        }
                        /* pagination*/
                        _this.Total_Count = data.json().extras.Count;
                        // let count: number = parseInt(data.json().extras.Count)
                        // let count1: number = Math.floor(count / 10);
                        // let count2 = count % 10
                        // if (count2 == 0) {
                        //     this.array.length = count1
                        // } else {
                        //     this.array.length = count1 + 1
                        // }
                        // // console.log("count " + this.Total_Count);
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
    PendingOrdersComponent.prototype.click_to_clear = function () {
        this.fiterElementsActive = false;
        this.clear_filter(1);
        // this.sortOptions = {}
        this.ngOnInit();
    };
    PendingOrdersComponent.prototype.clear_filter = function (type) {
        this.click_all_filter = false;
        this.filter_search_phone = false;
        this.filter_search_name = false;
        this.filter_search_date = false;
        // sanjay -- >  here we need to set clear all filter is true becoz we are clearing filter here..
        if (type == 1) {
            this.CLEAR_ALL = true;
        }
        else {
            // this.CLEAR_ALL = false;
        }
        this.Whether_Name_Filter = false;
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_New_Jobs_Filter = false;
        this.Whether_Ongoing_Jobs_Filter = false;
        this.Whether_Completed_Jobs_Filter = false;
        this.Whether_Expired_Jobs_Filter = false;
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
    };
    PendingOrdersComponent.prototype.pendingrefresh = function () {
        if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
            && this.Whether_New_Jobs_Filter == false && this.Whether_Ongoing_Jobs_Filter == false &&
            this.Whether_Completed_Jobs_Filter == false && this.Whether_Expired_Jobs_Filter == false &&
            this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
            && this.Payment_Captured == false &&
            this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false) {
            this.sortOptions = null;
            this.activeId = null;
            this.ngOnInit();
        }
        else {
        }
    };
    PendingOrdersComponent = __decorate([
        Component({
            selector: 'app-pendingorders',
            templateUrl: "./pendingorders.component.html",
            styleUrls: ["./pendingorders.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            MapsAPILoader,
            NgZone,
            ChangeDetectorRef])
    ], PendingOrdersComponent);
    return PendingOrdersComponent;
}());
export { PendingOrdersComponent };
