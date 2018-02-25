var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ErrorService } from './../../../../errors/error.service';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, NgZone, ViewChild, ElementRef } from '@angular/core';
var viewPremiumCustomerComponent = /** @class */ (function () {
    function viewPremiumCustomerComponent(http, _ApiMessageService, ngZone, _cookieService, router, ErrorService, _cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ngZone = ngZone;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this.p = 1;
        this.Gst = '';
        this.dueAmount = '';
        this.Miscellaneous_Dues = '';
        this.month = 1;
        this.pdfData = [];
        this.Flat_Monthly_Price = '';
        this.lng_map = 17.2548;
        this.lat_map = 78.254;
        this.zoom = 10;
        this.Premium_Instant_Pricing = '';
        this.Premium_Same_Day_Pricing = '';
        this.Premium_4hours_Pricing = '';
        this.Premium_4hours_Pricing_discount = '';
        this.Premium_Same_Day_Pricing_discount = '';
        this.Premium_Instant_Pricing_discount = '';
        this.Premium_min_ordercount = 100;
        this.CustomerData = [];
        this.url = '';
        this.skip_value = 0;
        this.columns = [
            { title: "Order Id", dataKey: "Job_No" },
            { title: "Pickup Address", dataKey: "pickAddress" },
            { title: "Drop Address", dataKey: "dropAddress" },
            { title: "Distance", dataKey: "Shipping_Distance" },
            { title: "Duration", dataKey: "Order_Journey_Time" },
        ];
    }
    viewPremiumCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new premiumCustomerModal(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
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
    viewPremiumCustomerComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    viewPremiumCustomerComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new premiumCustomerModal(null, null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.CustomerData = data.json().extras.CustomerData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    viewPremiumCustomerComponent.prototype.Delete = function (item, i) {
        this.isdelete = true;
        this.CustomerID = item.CustomerID;
        this.First_name = item.First_name;
        this.index_Delete = i;
    };
    viewPremiumCustomerComponent.prototype.delete_Final = function () {
        var _this = this;
        var body = new premiumCustomerModal(null, this.CustomerID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Make_Premium_Customer_Inactive', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.CustomerData.splice(_this.index_Delete, 1);
                _this.isdelete = false;
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
    viewPremiumCustomerComponent.prototype.onClose_Delete = function () {
        this.isdelete = false;
    };
    viewPremiumCustomerComponent.prototype.edit = function (item) {
        this.First_name = item.First_name;
        this.CustomerID = item.CustomerID;
        this.Premium_Pricing_Set = item.Premium_Pricing_Set;
        this.OnPriceingSet(item.Premium_Pricing_Set);
        if (item.Premium_Pricing_Set) {
            this.Premium_Instant_Pricing = item.Premium_Instant_Pricing;
            this.Premium_Same_Day_Pricing = item.Premium_Same_Day_Pricing;
            this.Premium_4hours_Pricing = item.Premium_4hours_Pricing;
            this.Premium_Instant_Pricing_discount = item.Premium_Instant_Pricing_discount;
            this.Premium_4hours_Pricing_discount = item.Premium_4hours_Pricing_discount;
            this.Premium_Same_Day_Pricing_discount = item.Premium_Same_Day_Pricing_discount;
            this.Premium_min_ordercount = item.Premium_min_ordercount;
        }
        else {
            this.Premium_Instant_Pricing = '';
            this.Premium_Same_Day_Pricing = '';
            this.Premium_4hours_Pricing = '';
            this.Premium_Instant_Pricing_discount = '';
            this.Premium_4hours_Pricing_discount = '';
            this.Premium_Same_Day_Pricing_discount = '';
            this.Premium_min_ordercount = 100;
        }
        if (item.Flat_Monthly_Price_Available) {
            this.isFlat = true;
            this.Flat_Monthly_Price = item.Flat_Monthly_Price;
        }
        else {
            this.isFlat = false;
            this.Flat_Monthly_Price = '';
        }
        this.OnMonthlyInvoice(item.Monthly_Invoice);
        this.Monthly_Invoice = item.Monthly_Invoice;
        this.Default_Pickup_Location_Exist = item.Default_Pickup_Location_Exist;
        if (item.Default_Pickup_Location_Exist) {
            this.Default_Pickup_Address = item.Default_Pickup_Address;
            this.lat = +item.Default_Pickup_Latitude;
            this.lng = +item.Default_Pickup_Longitude;
            this.lat_map = this.lat;
            this.lng_map = this.lat;
        }
        else {
            this.Default_Pickup_Address = '';
            this.lat = '';
            this.lng = '';
        }
    };
    viewPremiumCustomerComponent.prototype.Edit_offer = function (item) {
        this.isEdit = true;
        this.edit(item);
    };
    viewPremiumCustomerComponent.prototype.OncloseEdit = function () {
        this.isEdit = false;
    };
    viewPremiumCustomerComponent.prototype.OnPriceingSet = function (value) {
        if (value == true) {
            this.Premium_Pricing_Set = true;
        }
        else {
            this.Premium_Pricing_Set = false;
        }
    };
    viewPremiumCustomerComponent.prototype.OnMonthlyInvoice = function (value) {
        this.Monthly_Invoice = value;
        if (value == true) {
            this.Monthly_Invoice = true;
        }
        else {
            this.isFlat = false;
            this.Flat_Monthly_Price = '';
            this.Monthly_Invoice = false;
        }
    };
    viewPremiumCustomerComponent.prototype.OnDefaultPickup = function (value) {
        this.Default_Pickup_Location_Exist = value;
        if (value == true) {
            this.Default_Pickup_Location_Exist = true;
        }
        else {
            this.Default_Pickup_Location_Exist = false;
        }
    };
    viewPremiumCustomerComponent.prototype.autocomplete = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var address = this.Default_Pickup_Address;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.lat = results[0].geometry.location.lat();
                _this.lng = results[0].geometry.location.lng();
                _this.lat_map = _this.lat;
                _this.lng_map = _this.lng;
                _this._cdref.detectChanges();
                _this._cdref.markForCheck();
            }
            else {
                alert("No address Found");
            }
        });
    };
    viewPremiumCustomerComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.lat = pos.coords.lat;
        this.lng = pos.coords.lng;
        this.getGeoLocation(this.lat, this.lng);
    };
    viewPremiumCustomerComponent.prototype.FormsubmitFunction = function (form) {
        this.form = form;
        var body = new premiumCustomerModal(null, this.CustomerID, 0, this.Premium_Pricing_Set, this.Monthly_Invoice, this.Default_Pickup_Location_Exist, this.Premium_Instant_Pricing, this.Premium_Same_Day_Pricing, this.Premium_4hours_Pricing, this.Premium_Instant_Pricing_discount, this.Premium_Same_Day_Pricing_discount, this.Premium_4hours_Pricing_discount, this.Premium_min_ordercount, this.Default_Pickup_Address, this.lat, this.lng, this.isFlat, this.Flat_Monthly_Price);
        var Premium_Same_Day_Pricing = form.value.Premium_Same_Day_Pricing;
        this.EditFinal(body);
    };
    viewPremiumCustomerComponent.prototype.EditFinal = function (body) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Premium_User_Options', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.ngOnInit();
                    _this.isEdit = false;
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
    viewPremiumCustomerComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    var rsltAdrComponent = result.address_components;
                    var resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        var pickadd = results[0].formatted_address;
                        _this.Default_Pickup_Address = pickadd;
                    }
                    else {
                        alert("No address available!");
                    }
                }
                else {
                    alert("No address available!");
                }
            });
        }
    };
    viewPremiumCustomerComponent.prototype.OnFlatPrice = function (value) {
        if (value) {
            this.isFlat = true;
        }
        else {
            this.isFlat = false;
            this.Flat_Monthly_Price = '';
        }
    };
    viewPremiumCustomerComponent.prototype.OnPdf = function (item) {
        this.isdownload = true;
        this.edit(item);
    };
    viewPremiumCustomerComponent.prototype.onClose_Download = function () {
        this.isdownload = false;
    };
    viewPremiumCustomerComponent.prototype.seclectMonth = function (Frm, to) {
    };
    viewPremiumCustomerComponent.prototype.getpdf = function (FromDate, Todate, CustomerID) {
        var _this = this;
        var body = new premiumCustomerModal(null, CustomerID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, FromDate, Todate, this.dueAmount, this.Miscellaneous_Dues, null, this.Gst);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Premium_Customer_Monthly_Invoice_Processing', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.pdfData = data.json().extras.InvoiceData;
                _this.isdownload = false;
                _this.invoice = _this.pdfData.InvoiceNumber;
                var msg = 'Invlice No:' + _this.invoice + '. Request is in Process Please check in Invoice Section';
                _this.ErrorService.handleError(msg);
                _this.dueAmount = '';
                _this.Miscellaneous_Dues = '';
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    viewPremiumCustomerComponent.prototype.seclectYear = function (value) {
        this.month = value;
    };
    viewPremiumCustomerComponent.prototype.OnFromDate = function (Frm) {
        var value = Frm.split('-');
        var FromDate = value[2] + '/' + value[1] + '/' + value[0];
        this.from_date = FromDate;
    };
    viewPremiumCustomerComponent.prototype.OnTodate = function (to) {
        var value = to.split('-');
        var FromDate = value[2] + '/' + value[1] + '/' + value[0];
        this.to_date = FromDate;
    };
    viewPremiumCustomerComponent.prototype.exportPdf = function () {
        this.getpdf(this.from_date, this.to_date, this.CustomerID);
    };
    viewPremiumCustomerComponent.prototype.sortColumn = function (key) {
        if (this.sortKey != key) {
            this.sortKey = key;
            var sort = 1;
        }
        else {
            var sort = -1;
        }
        this.sortOptions = {};
        this.sortOptions[key] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    __decorate([
        ViewChild('test'),
        __metadata("design:type", ElementRef)
    ], viewPremiumCustomerComponent.prototype, "el", void 0);
    viewPremiumCustomerComponent = __decorate([
        Component({
            selector: 'app-view',
            templateUrl: "./viewallPremiumCustomer.component.html",
            styleUrls: ["./viewallPremiumCustomer.component.css"]
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            NgZone,
            CookieService,
            Router,
            ErrorService, ChangeDetectorRef])
    ], viewPremiumCustomerComponent);
    return viewPremiumCustomerComponent;
}());
export { viewPremiumCustomerComponent };
