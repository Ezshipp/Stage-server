var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MapsAPILoader } from 'angular2-google-maps/core';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { Http, Headers } from '@angular/http';
import { Component, NgZone } from '@angular/core';
import { GetLatLngModel } from '../../../../front_end_models/getLatLngModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
var RegisterPremiumCustomerComponent = /** @class */ (function () {
    function RegisterPremiumCustomerComponent(http, _ApiMessageService, _loader, ngZone, _errorService, mapsAPILoader) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._loader = _loader;
        this.ngZone = ngZone;
        this._errorService = _errorService;
        this.mapsAPILoader = mapsAPILoader;
        this.flatPrice = '';
        this.flatS = 'false';
        this.isFlat = false;
        this.lat_map = 17.2587;
        this.lng_map = 78.52454;
        this.zoom = 8;
        this.Premium_4hours_Pricing = '';
        this.Premium_Same_Day_Pricing = '';
        this.Premium_Instant_Pricing = '';
        this.Premium_4hours_Pricing_discount = '';
        this.Premium_Same_Day_Pricing_discount = '';
        this.Premium_Instant_Pricing_discount = '';
        this.Premium_min_ordercount = 100;
        this.isPriceSet_Boolean = false;
        this.premiumCustomer = false;
        this.ispremiumCustomer = true;
        this.url = '';
        this.CustomerData = [];
        this.array = [];
    }
    RegisterPremiumCustomerComponent.prototype.ngOnInit = function () {
        // this.autocomplete()
    };
    RegisterPremiumCustomerComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.CustomerData = [];
            this.array = [];
            this.skip_value = 0;
            var body1_1 = new premiumCustomerModal(this.mymodel);
            setTimeout(function () {
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return _this.http.post(_this.url + '/Search_All_Active_Customers', body1_1, { headers: headers })
                    .debounceTime(500)
                    .subscribe(function (data) {
                    if (data.json().success) {
                        var resultdata = [];
                        _this.array.length = 0;
                        setTimeout(function () {
                            _this.CustomerData = data.json().extras.CustomerData;
                            _this.ispremiumCustomer = true;
                            _this.array.length = 0;
                        }, 1000);
                    }
                });
            }, 1000);
        }
        else {
            this.CustomerData = [];
            this.ngOnInit();
            this.array.length = 0;
            this.index = 0;
        }
    };
    RegisterPremiumCustomerComponent.prototype.checkPremium_Click = function (item) {
        var _this = this;
        this.CustomerID = item.CustomerID;
        var body1 = new premiumCustomerModal(null, this.CustomerID);
        this.CustomerName = item.First_name;
        this.Phone = item.Phone;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Check_Whether_Customer_Premium', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.ispremiumCustomer = false;
                _this.premiumCustomer = true;
                _this.OnPriceingSet('pricesetTrue');
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    RegisterPremiumCustomerComponent.prototype.OnPriceingSet = function (value) {
        this.OnMonthlyInvoice('true');
        this.OnDefaultPickup('true');
        this.pricingValue = value;
        if (value == 'pricesetTrue') {
            this.isPriceSet_Boolean = true;
        }
        else {
            this.isPriceSet_Boolean = false;
        }
    };
    RegisterPremiumCustomerComponent.prototype.OnMonthlyInvoice = function (value) {
        this.MonthlyInvoice = value;
        if (value == 'true') {
            this.isFlatPrice = true;
            this.isFlat = true;
            this.flatS = 'true';
            this.Monthly_Invoice = true;
        }
        else {
            this.isFlatPrice = false;
            this.isFlat = false;
            this.flatPrice = '';
            this.flatS = 'false';
            this.Monthly_Invoice = false;
        }
    };
    RegisterPremiumCustomerComponent.prototype.OnDefaultPickup = function (value) {
        this.DefalutPick = value;
        if (value == 'true') {
            this.ispickup = true;
        }
        else {
            this.ispickup = false;
        }
    };
    RegisterPremiumCustomerComponent.prototype.onsubmit_premiumCust = function () {
        var _this = this;
        var body = new GetLatLngModel(this.Default_Pickup_Address);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var address = data.json().extras.Data;
                if (address.latlong == true) {
                    console.log((address.latitude));
                    _this.onsubmit(address.latitude, address.longitude);
                }
                else {
                    alert("No address Found");
                }
            }
            else {
                alert("No address Found");
            }
        });
    };
    RegisterPremiumCustomerComponent.prototype.onsubmit = function (lat, lng) {
        var _this = this;
        if (this.isPriceSet_Boolean) {
            if (this.Premium_4hours_Pricing.length > 0 && this.Premium_Instant_Pricing.length > 0 && this.Premium_Same_Day_Pricing.length > 0 && this.Premium_4hours_Pricing_discount.length > 0 && this.Premium_Instant_Pricing_discount.length > 0 && this.Premium_Same_Day_Pricing_discount.length > 0) {
                if (this.isFlat) {
                    if (this.flatPrice.length > 0) {
                        var body1 = new premiumCustomerModal(null, this.CustomerID, null, this.isPriceSet_Boolean, this.Monthly_Invoice, this.ispickup, this.Premium_Instant_Pricing, this.Premium_Same_Day_Pricing, this.Premium_4hours_Pricing, this.Premium_Instant_Pricing_discount, this.Premium_Same_Day_Pricing_discount, this.Premium_4hours_Pricing_discount, this.Premium_min_ordercount, this.Default_Pickup_Address, lat, lng, this.isFlat, this.flatPrice);
                        var headers = new Headers({ 'Content-Type': 'application/json' });
                        return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
                            .subscribe(function (data) {
                            if (data.json().success) {
                                _this.Status = data.json().extras.Status;
                                var msg = "Register Sucessfully";
                                _this._errorService.handleError(msg);
                                _this.ispickup = false;
                                _this.pickAddress = '';
                                _this.Premium_Instant_Pricing = '';
                                _this.Premium_Same_Day_Pricing = '';
                                _this.Premium_4hours_Pricing = '';
                                _this.Premium_Instant_Pricing_discount = '';
                                _this.Premium_Same_Day_Pricing_discount = '';
                                _this.Premium_4hours_Pricing_discount = '';
                                _this.Premium_min_ordercount = 100;
                                _this.premiumCustomer = false;
                                _this.flatPrice = '';
                                _this.isFlat = false;
                                _this.mymodel = '';
                            }
                            else {
                                var msgNumber = parseInt(data.json().extras.msg);
                                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                                _this._errorService.handleError(message);
                            }
                        });
                    }
                    else {
                        alert("Please set Flat Price");
                    }
                }
                else {
                    this.flatPrice = '';
                    var body1 = new premiumCustomerModal(null, this.CustomerID, null, this.isPriceSet_Boolean, this.Monthly_Invoice, this.ispickup, this.Premium_Instant_Pricing, this.Premium_Same_Day_Pricing, this.Premium_4hours_Pricing, this.Premium_Instant_Pricing_discount, this.Premium_Same_Day_Pricing_discount, this.Premium_4hours_Pricing_discount, this.Premium_min_ordercount, this.pickAddress, lat, lng, this.isFlat, this.flatPrice);
                    var headers = new Headers({ 'Content-Type': 'application/json' });
                    return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
                        .subscribe(function (data) {
                        if (data.json().success) {
                            _this.Status = data.json().extras.Status;
                            var msg = "Register Sucessfully";
                            _this._errorService.handleError(msg);
                            _this.ispickup = false;
                            _this.pickAddress = '';
                            _this.Premium_Instant_Pricing = '';
                            _this.Premium_Same_Day_Pricing = '';
                            _this.Premium_4hours_Pricing = '';
                            _this.Premium_Instant_Pricing_discount = '';
                            _this.Premium_Same_Day_Pricing_discount = '';
                            _this.Premium_4hours_Pricing_discount = '';
                            _this.Premium_min_ordercount = 100;
                            _this.premiumCustomer = false;
                            _this.flatPrice = '';
                            _this.isFlat = false;
                            _this.mymodel = '';
                        }
                        else {
                            var msgNumber = parseInt(data.json().extras.msg);
                            var message = _this._ApiMessageService.ApiMessages[msgNumber];
                            _this._errorService.handleError(message);
                        }
                    });
                }
            }
            else {
                alert("Please set premium Price");
            }
        }
        else {
            if (this.isFlat) {
                if (this.flatPrice.length > 0) {
                    var body1 = new premiumCustomerModal(null, this.CustomerID, null, this.isPriceSet_Boolean, this.Monthly_Invoice, this.ispickup, this.Premium_Instant_Pricing, this.Premium_Same_Day_Pricing, this.Premium_4hours_Pricing, this.Premium_Instant_Pricing_discount, this.Premium_Same_Day_Pricing_discount, this.Premium_4hours_Pricing_discount, this.Premium_min_ordercount, this.pickAddress, lat, lng, this.isFlat, this.flatPrice);
                    var headers = new Headers({ 'Content-Type': 'application/json' });
                    return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
                        .subscribe(function (data) {
                        if (data.json().success) {
                            _this.Status = data.json().extras.Status;
                            var msg = "Register Sucessfully";
                            _this._errorService.handleError(msg);
                            _this.ispickup = false;
                            _this.pickAddress = '';
                            _this.Premium_Instant_Pricing = '';
                            _this.Premium_Same_Day_Pricing = '';
                            _this.Premium_4hours_Pricing = '';
                            _this.Premium_Instant_Pricing_discount = '';
                            _this.Premium_Same_Day_Pricing_discount = '';
                            _this.Premium_4hours_Pricing_discount = '';
                            _this.Premium_min_ordercount = 100;
                            _this.premiumCustomer = false;
                            _this.flatPrice = '';
                            _this.isFlat = false;
                            _this.mymodel = '';
                        }
                        else {
                            var msgNumber = parseInt(data.json().extras.msg);
                            var message = _this._ApiMessageService.ApiMessages[msgNumber];
                            _this._errorService.handleError(message);
                        }
                    });
                }
                else {
                    alert("Please set Flat Price");
                }
            }
            else {
                this.flatPrice = '';
                var body1 = new premiumCustomerModal(null, this.CustomerID, null, this.isPriceSet_Boolean, this.Monthly_Invoice, this.ispickup, this.Premium_Instant_Pricing, this.Premium_Same_Day_Pricing, this.Premium_4hours_Pricing, this.Premium_Instant_Pricing_discount, this.Premium_Same_Day_Pricing_discount, this.Premium_4hours_Pricing_discount, this.Premium_min_ordercount, this.pickAddress, lat, lng, this.isFlat, this.flatPrice);
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
                    .subscribe(function (data) {
                    if (data.json().success) {
                        _this.Status = data.json().extras.Status;
                        var msg = "Register Sucessfully";
                        _this._errorService.handleError(msg);
                        _this.ispickup = false;
                        _this.pickAddress = '';
                        _this.Premium_Instant_Pricing = '';
                        _this.Premium_Same_Day_Pricing = '';
                        _this.Premium_4hours_Pricing = '';
                        _this.Premium_Instant_Pricing_discount = '';
                        _this.Premium_Same_Day_Pricing_discount = '';
                        _this.Premium_4hours_Pricing_discount = '';
                        _this.Premium_min_ordercount = 100;
                        _this.premiumCustomer = false;
                        _this.flatPrice = '';
                        _this.isFlat = false;
                        _this.mymodel = '';
                    }
                    else {
                        var msgNumber = parseInt(data.json().extras.msg);
                        var message = _this._ApiMessageService.ApiMessages[msgNumber];
                        _this._errorService.handleError(message);
                    }
                });
            }
        }
    };
    RegisterPremiumCustomerComponent.prototype.autocomplete = function () {
        var _this = this;
        var autocomplete;
        var options = { componentRestrictions: { country: "IN" } };
        this.inputAddress = document.getElementById('autocompleteInput');
        autocomplete = new google.maps.places.Autocomplete(this.inputAddress, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this.ngZone.run(function () {
                _this.zoom = 17;
                var place = autocomplete.getPlace();
                _this.pickAddress = place.name + ',' + place.formatted_address;
                var plac = place.name + ',';
                var address = place.formatted_address.indexOf(plac);
                if (address == 0) {
                    _this.pickAddress = place.formatted_address.replace(plac, plac);
                }
                else {
                }
                _this.lat = place.geometry.location.lat();
                _this.lng = place.geometry.location.lng();
            });
        });
    };
    RegisterPremiumCustomerComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.lat = pos.coords.lat;
        this.lng = pos.coords.lng;
        this.getGeoLocation(this.lat, this.lng);
    };
    RegisterPremiumCustomerComponent.prototype.getGeoLocation = function (lat, lng) {
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
                        _this.pickAddress = pickadd;
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
    RegisterPremiumCustomerComponent.prototype.OnFlatPrice = function (value) {
        if (value == 'true') {
            this.flatS = 'true';
            this.isFlat = true;
        }
        else {
            this.isFlat = false;
            this.flatS = 'false';
            this.flatPrice = '';
        }
    };
    RegisterPremiumCustomerComponent = __decorate([
        Component({
            selector: 'app-registerPremiumCustomer',
            templateUrl: './registerPremiumCustomer.component.html',
            styleUrls: ['./registerPremiumCustomer.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            MapsAPILoader,
            NgZone,
            ErrorService, MapsAPILoader])
    ], RegisterPremiumCustomerComponent);
    return RegisterPremiumCustomerComponent;
}());
export { RegisterPremiumCustomerComponent };
