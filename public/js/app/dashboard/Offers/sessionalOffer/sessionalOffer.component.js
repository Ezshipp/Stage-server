var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FirstTime_offerModel } from './../../../front_end_models/FirstTime_OfferModel';
import { ManualOrderModel } from './../../../front_end_models/manualorderModel';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var CreateOfferComponent = /** @class */ (function () {
    function CreateOfferComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this.isdiscount = true;
        this.offerType_Number = 1;
        this.offerType = 'First Time Offer';
        this.Offers_index = 0;
        this.bookingType = '1';
        this.zones = true;
        this.ZoneData = [];
        this.url = '';
        this.zones1 = 'true';
        this.maxIncidentDescriptionLength = 120;
        this.offers = ["First Time Offer", "Seasonal Offer", "Referral Offer", "Lottery Offer"];
    }
    CreateOfferComponent.prototype.ngOnInit = function () {
        this.Whether_All_zone();
        this.offer_select(0, 'First Time Offer');
    };
    CreateOfferComponent.prototype.Whether_All_zone_no = function () {
        var _this = this;
        this.zones = false;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ManualOrderModel(this._cookieService.get('ez_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .catch(function (err) {
            return Observable.throw(err.json());
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
            }
            else {
            }
        }, function (err) {
        });
    };
    CreateOfferComponent.prototype.Whether_All_zone = function () {
        this.zones = true;
        this.Zoneid = '';
    };
    CreateOfferComponent.prototype.valuechange = function (value) {
        this.Zoneid = value;
    };
    CreateOfferComponent.prototype.valuechange_bookingType = function (value) {
        this.bookingType = value;
    };
    CreateOfferComponent.prototype.onSubmit_First_Offer = function (form) {
        var _this = this;
        var offer_code = form.value.Offer_code;
        offer_code = offer_code.toUpperCase();
        if (this.offerType_Number == 1) {
            var body = new FirstTime_offerModel(form.value.Offer_name, form.value.Offer_Desc, offer_code, this.zones, this.Zoneid, this.bookingType, form.value.Discount, 2, Final_date_from, Final_date_To, null, this._cookieService.get('ez_admin_cusID'));
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + this.url_offer_router, body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.offer_select(_this.Offers_index, _this.offerType);
                    form.controls['Offer_name'].reset();
                    form.controls['Offer_Desc'].reset();
                    form.controls['Offer_date'].reset();
                    form.controls['Offer_date_exp'].reset();
                    form.controls['Offer_code'].reset();
                    var message = "Register sucessfully";
                    _this.bookingType = '1';
                    _this.ErrorService.handleError(message);
                    _this._cdref.detectChanges();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    form.resetForm();
                    _this._cdref.detectChanges();
                    _this.bookingType = '1';
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
            this.today = new Date();
            var startdat = new Date(form.value.Offer_date);
            var endDate = new Date(form.value.Offer_date_exp);
            if (startdat <= endDate) {
                var d1 = form.value.Offer_date;
                var date_From = d1.split('T');
                var Final_date_from = date_From[0] + ',' + date_From[1];
                var d2 = form.value.Offer_date_exp;
                var date_to = d2.split('T');
                var Final_date_To = date_to[0] + ',' + date_to[1];
                var body1 = new FirstTime_offerModel(form.value.Offer_name, form.value.Offer_Desc, offer_code, this.zones, this.Zoneid, this.bookingType, form.value.Discount, 2, Final_date_from, Final_date_To, null, this._cookieService.get('ez_admin_cusID'));
                var headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + this.url_offer_router, body1, { headers: headers })
                    .subscribe(function (data) {
                    if (data.json().success) {
                        form.controls['Offer_name'].reset();
                        form.controls['Offer_Desc'].reset();
                        form.controls['Offer_date'].reset();
                        form.controls['Offer_date_exp'].reset();
                        form.controls['Discount'].reset();
                        form.controls['Offer_code'].reset();
                        _this.offer_select(_this.Offers_index, _this.offerType);
                        var message = "Register sucessfully";
                        _this.ErrorService.handleError(message);
                        _this._cdref.detectChanges();
                    }
                    else {
                        var msgNumber = parseInt(data.json().extras.msg);
                        form.resetForm();
                        _this.bookingType = '1';
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
                var message = "From date must be greater than todate";
                this.ErrorService.handleError(message);
            }
        }
    };
    CreateOfferComponent.prototype.offer_select = function (i, item) {
        this.Offers_index = i;
        this.offerType = item;
        if (item == 'First Time Offer') {
            this.zones1 = 'true';
            this.offerType_Number = 1;
            this.url_offer_router = '/createFisrtOrderOffer';
            this.isdiscount = true;
        }
        else if (item == 'Seasonal Offer') {
            this.zones1 = 'true';
            this.offerType_Number = 2;
            this.url_offer_router = '/createSessionalOffer';
            this.isdiscount = true;
        }
        else if (item == 'Referral Offer') {
            this.zones1 = 'true';
            this.url_offer_router = '/createReferralOffer';
            this.offerType_Number = 3;
            this.isdiscount = true;
        }
        else if (item == 'Lottery Offer') {
            this.zones1 = 'true';
            this.offerType_Number = 4;
            this.url_offer_router = '/createLotteryOffer';
            this.isdiscount = false;
        }
    };
    CreateOfferComponent = __decorate([
        Component({
            selector: 'app-sessional',
            templateUrl: "sessionalOffer.component.html",
            styleUrls: ["sessionalOffer.component.css"]
        }),
        __metadata("design:paramtypes", [Router, Http, ApiMessageService, CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], CreateOfferComponent);
    return CreateOfferComponent;
}());
export { CreateOfferComponent };
