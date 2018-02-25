var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Observable';
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
import { FilterModel } from '../../../front_end_models/filterModel';
var OngoingJobsComponent = /** @class */ (function () {
    function OngoingJobsComponent(router, http, _ApiMessageService, _cookieService, ErrorService, mapsAPILoader, ngZone, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.cdref = cdref;
        this.filter_search_biker = false;
        this.filter_search_payment_type = false;
        this.click_all_ordertype = false;
        this.filter_search_date = false;
        this.filter_search_name = false;
        this.filter_search_phone = false;
        this.isbookingTypeFilterOptions = false;
        this.filter_zones_drop = false;
        this.ZoneData = [];
        this.fiterElementsActive = false;
        this.isAssignDriver = false;
        this.PickZoneArray = [];
        this.DropZoneArray = [];
        this.Whether_Drop_Zone_Filter = false;
        this.Whether_Pick_Zone_Filter = false;
        this.Whether_SameDay_BookingType = false;
        this.Whether_FoursHrs_BookingType = false;
        this.Whether_Instant_BookingType = false;
        this.Payment_Not_Captured = false;
        this.Payment_Captured = false;
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.filterBiker = '';
        this.Whether_Driver_Filter = false;
        this.filterPhoneNumber = '';
        this.filterName = '';
        this.CLEAR_ALL = true;
        this.filter = "./img/filter_click.png";
        this.sortOptions = {};
        this.limit = 10;
        this.ZonesLogs = [];
        this.onselectitem = 0;
        this.offers = ["Zones Logs", "Notifications"];
        this.od = '59bb576d626f062303dc7e2b';
        this.p = 1;
        this.DriverData = [];
        this.ReasonData = [];
        this.headers = [
            "ID",
            "C.Name",
            "C.Phone",
            "Date",
            "O.Type",
            "P.Zone",
            "D.Zone",
            "kms"
        ];
        this.dsc = false;
        this.asc = false;
        this.increment = 0;
        this.Ongoing_OrderData_json = [];
        this.jobType = 5;
        this.skip_value = 0;
        this.array = [];
        this.isData = false;
        this.index = 0;
        this.display = 'none';
        this.show_map_drop = false;
        this.Ongoing_OrderData = [];
        this.zoom = 15;
        this.url = '';
    }
    OngoingJobsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions);
        this.isRequesting = true;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Ongoing_OrderData = data.json().extras.OrderData;
                _this.Ongoing_OrderData_json = data.json().extras.OrderData;
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
                /* pagination*/
                _this.Total_Count = parseInt(data.json().extras.Count);
                if (_this.Total_Count < 10) {
                    _this.issearch = true;
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
    OngoingJobsComponent.prototype.edit = function (item, i) {
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
        this.Phone = item.Phone;
        this.Email = item.Email;
        this.order_datetime = item.order_datetime;
        this.DiscountPercentage = item.DiscountPercentage;
        this.paymentType = item.paymentType;
        this.OfferApplied_Boolean = item.OfferApplied;
        this.Driver_PhoneNumber = item.Driver_PhoneNumber;
        this.status = item.status;
        this.DriverID = item.DriverID;
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item);
        }
        else {
        }
        if (this.OfferApplied_Boolean) {
            this.OfferApplied = 'Yes';
            this.OfferName = item.OfferName;
            this.OfferCode = item.OfferCode;
        }
        else {
            this.OfferApplied = 'No';
        }
        if (this.itemImage.length) {
            this.isimage = true;
        }
        else {
            this.isimage = false;
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
            this.isDriver_Assigned = true;
        }
        else {
            this.isDriver_Assigned = false;
        }
    };
    OngoingJobsComponent.prototype.change_location_pik = function (item, i) {
        this.edit(item, i);
        this.isedit_pick = true;
    };
    OngoingJobsComponent.prototype.change_location_drop = function (item, i) {
        this.edit(item, i);
        this.isedit_drop = true;
        this.show_map_drop = false;
    };
    OngoingJobsComponent.prototype.onsubmit_Edit_pick = function () {
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
    OngoingJobsComponent.prototype.onsubmit_Edit_drop = function () {
        var _this = this;
        var body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.isedit_drop = false;
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
    OngoingJobsComponent.prototype.onsubmit_droplocation = function () {
        this.show_map_drop = false;
        this.get_Address(this.dropAddress, 2);
    };
    OngoingJobsComponent.prototype.onsubmit_pickUplocation = function () {
        this.show_map_pick = false;
        this.get_Address(this.pickAddress, 1);
    };
    OngoingJobsComponent.prototype.get_Address = function (address, type) {
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
    OngoingJobsComponent.prototype.onclose_editDrop = function () {
        this.isedit_drop = false;
    };
    OngoingJobsComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.pickLatitude = pos.coords.lat;
        this.pickLongitude = pos.coords.lng;
    };
    OngoingJobsComponent.prototype.pos_drop = function ($event) {
        var pos = ($event);
        this.dropLatitude = pos.coords.lat;
        this.dropLongitude = pos.coords.lng;
    };
    OngoingJobsComponent.prototype.onSubmit_picApi = function () {
    };
    OngoingJobsComponent.prototype.onclose_editpick = function () {
        this.isedit_pick = false;
    };
    OngoingJobsComponent.prototype.onDelete = function (item, index) {
        this.delete = index;
        this.orderId = item.orderId;
        this.isdelete = true;
        this.index = index;
        this.First_name = item.First_name;
        this.orderseqId = item.orderseqId;
        this.edit(item, index);
    };
    OngoingJobsComponent.prototype.onClose_Delete = function () {
        this.delete = -1;
    };
    OngoingJobsComponent.prototype.remove_Order = function () {
        var _this = this;
        var body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.ngOnInit();
                    _this.cdref.detectChanges();
                    _this.Ongoing_OrderData.splice(_this.delete, 1);
                    _this.onClose_Delete();
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
    OngoingJobsComponent.prototype.getGeocoding = function (address) {
        var _this = this;
        return Observable.create(function (observer) {
            try {
                _this.mapsAPILoader.load().then(function () {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: address }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            var place = results[0].geometry.location;
                            observer.next(place);
                            observer.complete();
                        }
                        else {
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            }
                            else {
                                observer.error(status);
                            }
                            observer.complete();
                        }
                    });
                });
            }
            catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }
        });
    };
    OngoingJobsComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        this.nextpage(this.p - 1);
    };
    OngoingJobsComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        if (this.CLEAR_ALL == false) {
            var body = new FilterModel(skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, false, true, false, false, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.Ongoing_OrderData = data.json().extras.OrderData;
                    _this.click_all_filter = false;
                    _this.isRequesting = false;
                    _this.issearch = false;
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
                    _this.isRequesting = false;
                    _this.issearch = false;
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
    OngoingJobsComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.views = null;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.Ongoing_OrderData = [];
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
    OngoingJobsComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.views = i;
        this.edit(item, i);
        this.order_Index = i;
    };
    OngoingJobsComponent.prototype.onClose_details_View = function () {
        this.views = null;
    };
    OngoingJobsComponent.prototype.sortColumn = function (i, item) {
        this.activeId = i;
        this.arrow_Index = i;
        var key;
        if (i == 0) {
            key = 'orderseqId';
        }
        else if (i == 1) {
            key = 'customerName';
        }
        else if (i == 2) {
            key = 'customerPhone';
        }
        else if (i == 3) {
            key = 'Date';
        }
        else if (i == 4) {
            key = 'bookingType';
        }
        else if (i == 5) {
            key = 'pickupdeponame';
        }
        else if (i == 6) {
            key = 'deliverydeponame';
        }
        else if (i == 7) {
            key = 'Shipping_Distance';
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
        this.sortOptions[key] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    OngoingJobsComponent.prototype.OnchangeStatus = function () {
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
                _this.Ongoing_OrderData.splice(_this.order_Index, 1);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    OngoingJobsComponent.prototype.OnchangeStatus_Cancel = function () {
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
                _this.Ongoing_OrderData.splice(_this.order_Index, 1);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    OngoingJobsComponent.prototype.onCompleteOrder = function () {
        this.isCompleteOrder = true;
    };
    OngoingJobsComponent.prototype.onCancelOrder = function () {
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
    OngoingJobsComponent.prototype.select = function (val, event) {
        var values = val;
        var splitvalue = values.split('/');
        this.ReasonID = splitvalue[0];
        this.Reason = splitvalue[1];
    };
    OngoingJobsComponent.prototype.onCloseCancelOrder = function () {
        this.isCancelOrder = false;
    };
    OngoingJobsComponent.prototype.onCloseCompleteOrder = function () {
        this.isCompleteOrder = false;
    };
    OngoingJobsComponent.prototype.onClickManual = function () {
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
    OngoingJobsComponent.prototype.onCloseManualRoute = function () {
        this.isManualRoute = false;
    };
    OngoingJobsComponent.prototype.select_Driver = function (value, event) {
        var bikerD = value;
        var id_name = bikerD.split('/');
        this.DriverID = id_name[0];
        this.Driver_Name = id_name[1];
    };
    OngoingJobsComponent.prototype.onSubmitManualRoute = function () {
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
    OngoingJobsComponent.prototype.Onselect = function (m, itemss, item) {
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
    OngoingJobsComponent.prototype.OnselectCount = function (event) {
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
    OngoingJobsComponent.prototype.click_name_filter = function () {
        this.filter_search_name = !this.filter_search_name;
    };
    OngoingJobsComponent.prototype.click_phone_filter = function () {
        this.filter_search_phone = !this.filter_search_phone;
    };
    OngoingJobsComponent.prototype.click_biker_filter = function () {
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
    OngoingJobsComponent.prototype.click_filter_view = function () {
        this.click_all_filter = true;
        this.click_all_ordertype = false;
    };
    OngoingJobsComponent.prototype.click_ordertype_view = function () {
        this.click_all_ordertype = true;
        this.click_all_filter = false;
    };
    OngoingJobsComponent.prototype.clear_filter = function (type) {
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
    OngoingJobsComponent.prototype.onSelectFilter = function (event) {
        this.Name_Query_Type = event;
    };
    OngoingJobsComponent.prototype.click_payment_type = function () {
        this.filter_search_payment_type = !this.filter_search_payment_type;
    };
    OngoingJobsComponent.prototype.click_date_filter = function () {
        this.filter_search_date = !this.filter_search_date;
    };
    OngoingJobsComponent.prototype.payTypeCheck = function (event) {
        if (event.target.id == "cashCheck") {
            this.Whether_Cash_Filter = !this.Whether_Cash_Filter;
        }
        else {
            this.Whether_Online_Filter = !this.Whether_Online_Filter;
            this.isOnlineClicked = !this.isOnlineClicked;
        }
    };
    OngoingJobsComponent.prototype.bookingType_Filter = function () {
        this.isbookingTypeFilterOptions = !this.isbookingTypeFilterOptions;
    };
    OngoingJobsComponent.prototype.bookingTypeCheck = function (event) {
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
    OngoingJobsComponent.prototype.capturedCheck = function (event) {
        if (event.target.id == "capturedCheck") {
            this.Payment_Captured = !this.Payment_Captured;
        }
        else if (event.target.id == "capturedNotCheck") {
            this.Payment_Not_Captured = !this.Payment_Not_Captured;
        }
    };
    OngoingJobsComponent.prototype.zone_filter = function () {
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
    OngoingJobsComponent.prototype.drop_zone_filter = function () {
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
    OngoingJobsComponent.prototype.zoneDCheck = function (event, seq, index, title) {
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
    OngoingJobsComponent.prototype.zonePCheck = function (event, seq, index, title) {
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
    OngoingJobsComponent.prototype.filterApply = function () {
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
                var body = new FilterModel(this.skip_value, this.limit, this._cookieService.get('ez_admin_cusID'), this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName, this.Whether_PhoneNumber_Filter, this.filterPhoneNumber, false, true, false, false, this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter, this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray);
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                    .subscribe(function (data) {
                    if (data.json().success) {
                        _this.Ongoing_OrderData = data.json().extras.OrderData;
                        _this.click_all_filter = false;
                        _this.isRequesting = false;
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
    OngoingJobsComponent.prototype.click_to_clear = function () {
        this.fiterElementsActive = false;
        this.clear_filter(1);
        // this.sortOptions = {}
        this.ngOnInit();
    };
    OngoingJobsComponent.prototype.onCloseDriverAssign = function () {
        this.isAssignDriver = false;
    };
    OngoingJobsComponent.prototype.select_Biker = function (name, id) {
        this.filterBiker = name;
        this.DriverID = id;
        this.isAssignDriver = false;
        this.Whether_Driver_Filter = true;
    };
    OngoingJobsComponent.prototype.clearFilterSpecific = function (value) {
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
    OngoingJobsComponent = __decorate([
        Component({
            selector: 'app-ongoing',
            templateUrl: "Ongoingjosb.component.html",
            styleUrls: ["Ongoingjosb.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            MapsAPILoader,
            NgZone,
            ChangeDetectorRef])
    ], OngoingJobsComponent);
    return OngoingJobsComponent;
}());
export { OngoingJobsComponent };
