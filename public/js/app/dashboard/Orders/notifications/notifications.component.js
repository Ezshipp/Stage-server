var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { animate, keyframes, state, style, transition, trigger, group } from '@angular/animations';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiMessageService } from "../../../authentication/apimessages.service";
import { CookieService } from "angular2-cookie/services";
import { ErrorService } from "../../../errors/error.service";
import { OrdersModel_admin } from "../../../front_end_models/OrdersModel";
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
import { FormBuilder } from '@angular/forms';
import { FilterModel } from '../../../front_end_models/filterModel';
var notificationsComponent = /** @class */ (function () {
    function notificationsComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref, _fb) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this._fb = _fb;
        this.Whether_SameDay_BookingType = false;
        this.Whether_Instant_BookingType = false;
        this.Whether_FoursHrs_BookingType = false;
        this.Payment_Not_Captured = false;
        this.Payment_Captured = false;
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.filterName = "";
        this.Whether_Name_Filter = false;
        this.CLEAR_ALL = true;
        this.filterBiker = "";
        this.Whether_Driver_Filter = false;
        this.filterPhoneNumber = "";
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_New_Jobs_Filter = false;
        this.Whether_Ongoing_Jobs_Filter = false;
        this.Whether_Completed_Jobs_Filter = false;
        this.Whether_Expired_Jobs_Filter = false;
        this.Whether_Date_Filter = false;
        this.filter = "./img/filter_click.png";
        this.filter_search_date = false;
        // filter_search_order: boolean = false;
        this.click_all_ordertype = false;
        this.click_all_filter = false;
        this.filter_search_name = false;
        this.filter_search_phone = false;
        this.limit = 10;
        this.ZonesLogs = [];
        this.onselectitem = 0;
        this.offers = ["Zones Logs"];
        this.p = 1;
        this.DriverData = [];
        this.ReasonData = [];
        this.testdata = [];
        this.jobType = 0;
        this.zoom = 15;
        this.isData = false;
        this.skip_value = 0;
        this.index = 0;
        this.mymodel = '';
        this.array = [];
        this.allordersdata = [];
        this.allnotifications = [];
        this.url = '';
        this.NotifyData = ['User', 'Biker'];
    }
    notificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this._cookieService.put('itemcount','20')
        this.executenotificationHttp();
        this.callbackafter30();
        if (this._cookieService.get('itemcount')) {
            this.limit = +this._cookieService.get('itemcount');
            console.log("1");
        }
        else {
            this.limit = 20;
        }
        console.log("ent " + this.limit);
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.p = 1;
                _this.allordersdata = data.json().extras.OrderData;
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
    notificationsComponent.prototype.callbackafter30 = function () {
        var _this = this;
        this.executenotificationHttp();
        setTimeout(function () {
            _this.callbackafter30();
        }, 30000);
    };
    notificationsComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
        this.views = null;
    };
    notificationsComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        // console.log("this.CLEAR_ALL " + this.CLEAR_ALL);
        if (this.CLEAR_ALL == false) {
            var body = new FilterModel(skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, this.Whether_New_Jobs_Filter, this.Whether_Ongoing_Jobs_Filter, this.Whether_Completed_Jobs_Filter, this.Whether_Expired_Jobs_Filter, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType);
            // console.log("filter body " + JSON.stringify(body))
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.allordersdata = data.json().extras.OrderData;
                    _this.click_all_filter = false;
                    //this.CLEAR_ALL = true;
                    _this.isRequesting = false;
                    _this.issearch = false;
                    // console.log("this.allordersdata " + JSON.stringify(this.allordersdata));
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
                    // console.log("count " + this.Total_Count);
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
            // ----  vishwanth code --- ///
            var empid = this._cookieService.get('EmployeeID');
            var result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
            var body = JSON.stringify(result_table_data);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.isRequesting = false;
                    _this.issearch = false;
                    _this.allordersdata = data.json().extras.OrderData;
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
    notificationsComponent.prototype.valuechange = function (newValue) {
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
                    _this.issearch = true;
                    var resultdata = [];
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
    notificationsComponent.prototype.edit = function (item, i) {
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
        this.status = item.status;
        this.DriverID = item.DriverID;
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
        this.Email = item.Email;
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
        this.views = i;
        this.OfferDescription = item.OfferDescription;
        this.orderType = item.orderType;
        if (item.Driver_Assigned == true) {
            this.Driver_Email = item.Driver_Email;
            this.isDriver_Assigned = true;
        }
        else {
            this.isDriver_Assigned = false;
        }
        this.Order_Accepted_Time = item.Order_Accepted_Time;
        this.Order_Completed_Time = item.Order_Completed_Time;
        this.Shipping_Distance = item.Shipping_Distance;
        this.Order_Journey_Time = item.Order_Journey_Time;
    };
    notificationsComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.edit(item, i);
        this.order_Index = i;
    };
    notificationsComponent.prototype.onClose_details_View = function () {
        this.isdetails_View = false;
    };
    notificationsComponent.prototype.change_location_pik = function (item, i) {
        this.edit(item, i);
        this.isedit_pick = true;
    };
    notificationsComponent.prototype.change_location_drop = function (item, i) {
        this.edit(item, i);
        this.isedit_drop = true;
        this.show_map_drop = false;
    };
    notificationsComponent.prototype.onsubmit_droplocation = function () {
        this.show_map_drop = false;
        this.get_Address(this.dropAddress, 2);
    };
    notificationsComponent.prototype.get_Address = function (address, type) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var address = address;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
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
    notificationsComponent.prototype.onsubmit_Edit_drop = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.isedit_drop = false;
                    _this.ngOnInit();
                    _this.cdref.detectChanges();
                    _this.isRequesting = false;
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
    notificationsComponent.prototype.onclose_editpick = function () {
        this.isedit_pick = false;
    };
    notificationsComponent.prototype.onsubmit_pickUplocation = function () {
        this.show_map_pick = false;
        this.get_Address(this.pickAddress, 1);
    };
    notificationsComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.pickLatitude = pos.coords.lat;
        this.pickLongitude = pos.coords.lng;
    };
    notificationsComponent.prototype.onsubmit_Edit_pick = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.isRequesting = false;
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
    notificationsComponent.prototype.onclose_editDrop = function () {
        this.isedit_drop = false;
    };
    notificationsComponent.prototype.pos_drop = function ($event) {
        var pos = ($event);
        this.dropLatitude = pos.coords.lat;
        this.dropLongitude = pos.coords.lng;
    };
    notificationsComponent.prototype.onDelete = function (item, index) {
        this.orderId = item.orderId;
        this.index_delete = index;
        this.Fordelete = index;
        this.First_name = item.First_name;
        this.orderseqId = item.orderseqId;
    };
    notificationsComponent.prototype.onClose_Delete = function () {
        this.index_delete = -1;
    };
    notificationsComponent.prototype.remove_Order = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        this.busy = this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.index_delete = -1;
                    _this.isRequesting = false;
                    _this.cdref.detectChanges();
                    _this.allordersdata.splice(_this.Fordelete, 1);
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
    notificationsComponent.prototype.getvie = function (i, item) {
        this.vietable = i;
        this.testdata = item;
    };
    notificationsComponent.prototype.close = function () {
        this.views = -1;
    };
    notificationsComponent.prototype.sortColumn = function (key) {
        console.log("kde" + key);
        var backendkey;
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
        this.sortOptions[this.valu] = sort;
        if (this.CLEAR_ALL == false) {
            this.filterApply();
        }
        else {
            this.ngOnInit();
        }
        this.p = 1;
    };
    notificationsComponent.prototype.OnchangeStatus = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.DriverID, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Job_Completed_If_Mobile_Fails', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.onCloseCompleteOrder();
                _this.views = -1;
                _this.allordersdata.splice(_this.order_Index, 1);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    notificationsComponent.prototype.OnchangeStatus_Cancel = function () {
        var _this = this;
        this.isRequesting = true;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.DriverID, null, this.Reason, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Driver_Cancelled_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.onCloseCancelOrder();
                _this.views = -1;
                _this.allordersdata.splice(_this.order_Index, 1);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    notificationsComponent.prototype.onCompleteOrder = function () {
        this.isCompleteOrder = true;
    };
    notificationsComponent.prototype.onCancelOrder = function () {
        var _this = this;
        this.isCancelOrder = true;
        var body = new OrdersModel_admin();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Cancellation_Reason', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ReasonData = data.json().extras.ReasonData;
                _this.ReasonID = _this.ReasonData[0].ReasonID;
                _this.Reason = _this.ReasonData[0].Reason;
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
    notificationsComponent.prototype.select = function (val, event) {
        var values = val;
        var splitvalue = values.split('/');
        this.ReasonID = splitvalue[0];
        this.Reason = splitvalue[1];
    };
    notificationsComponent.prototype.onCloseCancelOrder = function () {
        this.isCancelOrder = false;
    };
    notificationsComponent.prototype.onCloseCompleteOrder = function () {
        this.isCompleteOrder = false;
    };
    notificationsComponent.prototype.onClickManual = function () {
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
    notificationsComponent.prototype.onCloseManualRoute = function () {
        this.isManualRoute = false;
    };
    notificationsComponent.prototype.select_Driver = function (value, event) {
        var bikerD = value;
        var id_name = bikerD.split('/');
        this.DriverID = id_name[0];
        this.Driver_Name = id_name[1];
    };
    notificationsComponent.prototype.onSubmitManualRoute = function () {
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
                // this.allordersdata.splice(this.order_Index, 1)
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
    notificationsComponent.prototype.Onselect = function (m, itemss, item) {
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
    notificationsComponent.prototype.OnselectCount = function (event) {
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
            this.filterApply();
        }
    };
    notificationsComponent.prototype.click_name_filter = function () {
        this.filter_search_name = !this.filter_search_name;
        // this.filter_search_phone = false
    };
    notificationsComponent.prototype.click_phone_filter = function () {
        this.filter_search_phone = !this.filter_search_phone;
        // this.filter_search_name = false
    };
    notificationsComponent.prototype.click_biker_filter = function () {
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
    notificationsComponent.prototype.click_filter_view = function () {
        this.click_all_filter = true;
        this.click_all_ordertype = false;
    };
    notificationsComponent.prototype.click_ordertype_view = function () {
        this.click_all_ordertype = true;
        this.click_all_filter = false;
    };
    notificationsComponent.prototype.clear_filter = function (type) {
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
    notificationsComponent.prototype.onSelectFilter = function (event) {
        this.Name_Query_Type = event;
        // console.log("Name_Query_Type " + this.Name_Query_Type);
    };
    notificationsComponent.prototype.click_payment_type = function () {
        this.filter_search_payment_type = !this.filter_search_payment_type;
    };
    notificationsComponent.prototype.click_date_filter = function () {
        this.filter_search_date = !this.filter_search_date;
    };
    notificationsComponent.prototype.payTypeCheck = function (event) {
        if (event.target.id == "cashCheck") {
            this.Whether_Cash_Filter = !this.Whether_Cash_Filter;
        }
        else {
            this.Whether_Online_Filter = !this.Whether_Online_Filter;
            this.isOnlineClicked = !this.isOnlineClicked;
        }
    };
    notificationsComponent.prototype.bookingType_Filter = function () {
        this.isbookingTypeFilterOptions = !this.isbookingTypeFilterOptions;
    };
    notificationsComponent.prototype.bookingTypeCheck = function (event) {
        console.log(event.target.id);
        if (event.target.id == 'Instant') {
            console.log("Instant");
            this.Whether_Instant_BookingType = !this.Whether_Instant_BookingType;
        }
        else if (event.target.id == 'Fourhours') {
            console.log("Fourhours");
            this.Whether_FoursHrs_BookingType = !this.Whether_FoursHrs_BookingType;
        }
        else if (event.target.id == 'sameDay') {
            console.log("sameDay");
            this.Whether_SameDay_BookingType = !this.Whether_SameDay_BookingType;
        }
    };
    notificationsComponent.prototype.statusCheck = function (event) {
        if (event.target.id == "newCheck") {
            this.Whether_New_Jobs_Filter = !this.Whether_New_Jobs_Filter;
            // // console.log("this.Whether_New_Jobs_Filter " + this.Whether_New_Jobs_Filter);
        }
        else if (event.target.id == "ongoingCheck") {
            this.Whether_Ongoing_Jobs_Filter = !this.Whether_Ongoing_Jobs_Filter;
            // // console.log("this.Whether_Ongoing_Jobs_Filter " + this.Whether_Ongoing_Jobs_Filter);
        }
        else if (event.target.id == "completeCheck") {
            this.Whether_Completed_Jobs_Filter = !this.Whether_Completed_Jobs_Filter;
            // // console.log("this.Whether_Completed_Jobs_Filter " + this.Whether_Completed_Jobs_Filter);
        }
        else if (event.target.id == "expiredCheck") {
            this.Whether_Expired_Jobs_Filter = !this.Whether_Expired_Jobs_Filter;
            // // console.log("this.Whether_Expired_Jobs_Filter " + this.Whether_Expired_Jobs_Filter);
        }
    };
    notificationsComponent.prototype.capturedCheck = function (event) {
        if (event.target.id == "capturedCheck") {
            this.Payment_Captured = !this.Payment_Captured;
        }
        else if (event.target.id == "capturedNotCheck") {
            this.Payment_Not_Captured = !this.Payment_Not_Captured;
        }
    };
    notificationsComponent.prototype.filterApply = function () {
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
            // // console.log("filterPhoneNumber " + this.filterPhoneNumber + " " + this.Whether_PhoneNumber_Filter);
        }
        else {
            this.Whether_PhoneNumber_Filter = false;
            // // console.log("filterPhoneNumber " + this.filterPhoneNumber + " " + this.Whether_PhoneNumber_Filter);
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
                        _this.allordersdata = data.json().extras.OrderData;
                        _this.click_all_filter = false;
                        // this.CLEAR_ALL = true;
                        _this.isRequesting = false;
                        // // console.log("this.allordersdata " + JSON.stringify(this.allordersdata));
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
    notificationsComponent.prototype.click_to_clear = function () {
        this.fiterElementsActive = false;
        this.clear_filter(1);
        // this.sortOptions = {}
        this.ngOnInit();
    };
    notificationsComponent.prototype.onCloseDriverAssign = function () {
        this.isAssignDriver = false;
    };
    notificationsComponent.prototype.select_Biker = function (name, id) {
        this.filterBiker = name;
        this.DriverID = id;
        this.isAssignDriver = false;
        this.Whether_Driver_Filter = true;
        // console.log("name " + this.filterBiker + " id " + this.DriverID + " wheter " + this.Whether_Driver_Filter);
    };
    notificationsComponent.prototype.clearFilterSpecific = function (value) {
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
        else if (value == 5) {
            this.Whether_New_Jobs_Filter = false;
            this.filterApply();
        }
        else if (value == 6) {
            this.Whether_Ongoing_Jobs_Filter = false;
            this.filterApply();
        }
        else if (value == 7) {
            this.Whether_Completed_Jobs_Filter = false;
            this.filterApply();
        }
        else if (value == 8) {
            this.Whether_Expired_Jobs_Filter = false;
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
    };
    notificationsComponent.prototype.refresh = function () {
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
            this.filterApply();
        }
    };
    notificationsComponent.prototype.changeuser = function (selecteduser) {
        this.selecteduser = selecteduser;
    };
    notificationsComponent.prototype.onCloseNotifyRoute = function () {
        this.isNotifyRoute = false;
    };
    notificationsComponent.prototype.onNotifyManual = function () {
        this.isNotifyRoute = true;
    };
    notificationsComponent.prototype.onSubmitNotifyRoute = function (selecteduserinfo, textmessage) {
        console.log(" on click " + selecteduserinfo + "  " + textmessage);
        if (selecteduserinfo != '' && textmessage != '') {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/notify_user_or_driver', null, { headers: headers })
                .subscribe(function (data) {
                console.log(data);
            });
        }
        else
            alert("please provide details");
    };
    notificationsComponent.prototype.executenotificationHttp = function () {
        var _this = this;
        var isInTestMode = true;
        if (isInTestMode) {
            var headers = new Headers();
            headers.append('Authorization', 'Basic NzE5MzkyMWQtNjIxNi00MDlkLWExM2ItYzQ4YTNjNDBlYjY4');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            var content = JSON.stringify({
                "en": "New Order"
            });
            var hash = {};
            hash['en'] = "New Order";
            var hash1 = {};
            hash1['foo'] = "bar";
            //"OneSignalDebugnotifications_appId": "8ba52843-cfed-437c-9369-cf6f3062cbfe",
            //"OneSignalProductionnotifications_appId": "56a48eb3-1904-43ab-9610-ad96b03d18c1",       
            return this.http.get("https://onesignal.com/api/v1/notifications?app_id=56a48eb3-1904-43ab-9610-ad96b03d18c1&limit=50&offset=0", {
                headers: headers
            }).subscribe(function (data) {
                _this.allnotifications = data.json().notifications;
                console.log(data);
                console.log(data.json().notifications);
                console.log(data.json().total_count);
            }, function (err) { console.log(err); });
        }
        else {
            var headers = new Headers();
            headers.append('Authorization', 'Basic N2QxMTJhNWUtNjczZC00ZGNkLWEyZGUtZDA5MmVjODA0Mzk3');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            var content = JSON.stringify({
                "en": "New Order"
            });
            var hash = {};
            hash['en'] = "New Order";
            var hash1 = {};
            hash1['foo'] = "bar";
            return this.http.get("https://onesignal.com/api/v1/notifications?app_id=dddfe189-1334-427d-a2a1-3dd5fc8f1201&limit=50&offset=0", {
                headers: headers
            }).subscribe(function (data) {
                _this.allnotifications = data.json().notifications;
                console.log(data);
                console.log(data.json().notifications);
                console.log(data.json().total_count);
            }, function (err) { console.log(err); });
        }
    };
    notificationsComponent = __decorate([
        Component({
            selector: 'app-all',
            templateUrl: "./notifications.component.html",
            animations: [
                trigger('itemAnim', [
                    transition(':enter', [
                        style({ transform: 'translateY(-100%)' }),
                        animate(350)
                    ]),
                    transition(':leave', [
                        group([
                            animate('0.2s ease', style({
                                transform: 'translate(150px,25px)'
                            })),
                            animate('0.5s 0.2s ease', style({
                                opacity: 0
                            }))
                        ])
                    ])
                ]), trigger('itemAnim1', [
                    transition(':enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate(350)
                    ]),
                    transition(':leave', [
                        group([
                            animate('0.2s ease', style({
                                transform: 'translate(150px,25px)'
                            })),
                            animate('0.5s 0.2s ease', style({
                                opacity: 0
                            }))
                        ])
                    ])
                ]), trigger('focusPanel', [
                    state('inactive', style({
                        transform: 'scale(1)',
                    })),
                    state('active', style({
                        transform: 'scale(1.1)',
                    })),
                    transition('inactive => active', animate('100ms ease-in')),
                    transition('active => inactive', animate('100ms ease-out'))
                ]),
                trigger('movePanel', [
                    transition('void => *', [
                        animate(600, keyframes([
                            style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
                            style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
                            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                        ]))
                    ])
                ]), trigger('visibilityChanged', [
                    state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
                    state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
                    transition('1 => 0', animate('300ms')),
                    transition('0 => 1', animate('900ms'))
                ])
            ],
            styleUrls: ["./notifications.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef,
            FormBuilder])
    ], notificationsComponent);
    return notificationsComponent;
}());
export { notificationsComponent };
