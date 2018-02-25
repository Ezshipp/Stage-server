var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SeasonalModel } from './../../../front_end_models/seasonalModel';
import { ManualOrderModel } from './../../../front_end_models/manualorderModel';
import { FirstTime_offerModel } from './../../../front_end_models/FirstTime_OfferModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, animate, transition, group, keyframes } from '@angular/animations';
var ViewallOffersComponent = /** @class */ (function () {
    function ViewallOffersComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this.isdiscount = true;
        this.state = 'inactive';
        this.visibility = 'shown';
        this.moreDetails_Offer = [];
        this.url1 = '';
        this.ZoneData = [];
        this.Whether_All_Zones = 'false';
        this.update_Offer_Full_Details = false;
        this.all_offersData = [];
        this.url = '';
        this.offers = ["First Time Offer", "Seasonal Offer", "Referral Offer", "Lottery Offer", "View All Offers"];
    }
    ViewallOffersComponent.prototype.ngOnInit = function () {
        this.offer_select(0, 'First Time Offer');
    };
    ViewallOffersComponent.prototype.offer_select = function (i, item) {
        this.Offers_index = i;
        this.offerType = item;
        if (item == 'First Time Offer') {
            this.url1 = '/updateFirstOrderOffer';
            this.url_discount = '/Update_DiscountPercentage';
            this.offerType_Number = 1;
            this.viewall_offers(this.offerType_Number);
            this.isdiscount = true;
        }
        else if (item == 'Seasonal Offer') {
            this.offerType_Number = 2;
            this.url1 = '/updateSessionalOffer';
            this.url_discount = '/Update_DiscountPercentage';
            this.viewall_offers(this.offerType_Number);
            this.isdiscount = true;
        }
        else if (item == 'Referral Offer') {
            this.offerType_Number = 3;
            this.url1 = '/updateReferralOffer';
            this.viewall_offers(this.offerType_Number);
            this.isdiscount = true;
        }
        else if (item == 'Lottery Offer') {
            this.url1 = '/updateLotteryOffer';
            this.offerType_Number = 4;
            this.viewall_offers(this.offerType_Number);
            this.isdiscount = false;
        }
        else {
            this.offerType_Number = 0;
            this.viewall_offers(this.offerType_Number);
        }
    };
    ViewallOffersComponent.prototype.viewall_offers = function (offerType) {
        var _this = this;
        var body = new FirstTime_offerModel(null, null, null, null, null, null, null, offerType);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/ViewOffersList', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.all_offersData = data.json().extras.OffersList;
                if (_this.all_offersData.length > 0) {
                    _this.isData = false;
                }
                else {
                    _this.isData = true;
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
    ViewallOffersComponent.prototype.Edit_offer = function (item) {
        if (item.OfferType == 1) {
            this.url1 = '/updateFirstOrderOffer';
            this.url_discount = '/Update_DiscountPercentage';
            this.offerType_Number = 1;
            this.isdiscount = true;
        }
        else if (item.OfferType == 2) {
            this.offerType_Number = 2;
            this.url1 = '/updateSessionalOffer';
            this.url_discount = '/Update_DiscountPercentage';
            this.isdiscount = true;
        }
        else if (item.OfferType == 3) {
            this.url_discount = '/Update_DiscountPercentage';
            this.url1 = '/updateReferralOffer';
            this.offerType_Number = 3;
            this.isdiscount = true;
        }
        else if (item.OfferType == 4) {
            this.offerType_Number = 4;
            this.url1 = '/updateLotteryOffer';
            this.url_discount = '/Update_DiscountPercentage';
            this.isdiscount = false;
        }
        this.ismoredetails = false;
        if (item.OfferType == 1) {
        }
        else {
        }
        if (item.OfferType == 1) {
            var OfferValidFrom = item.OfferValidFrom;
            this.OfferValidTo = item.OfferValidTo;
        }
        else {
            var d112 = new Date(item.OfferValidFrom);
            var d25 = new Date(item.OfferValidTo);
            this.OfferValidFrom = this.toDateString(d112);
            this.OfferValidTo = this.toDateString(d25);
        }
        this.update_Offer_Full_Details = true;
        this.OfferName = item.OfferName;
        this.OfferDescription = item.OfferDescription;
        this.BookingType = item.BookingType;
        this.OfferID = item.OfferID;
        this.OfferCode = item.OfferCode;
        this.OfferType = item.OfferType;
        this.DiscountPercentage = item.DiscountPercentage;
        var Whether_All_Zones = item.Whether_All_Zones;
        if (Whether_All_Zones) {
            this.Whether_All_Zones = 'true';
            this.all_zone = true;
            this.ZoneID = '';
        }
        else {
            this.Whether_All_Zones = 'false';
            this.Whether_All_zone_no();
            this.all_zone = false;
            this.ZoneID = item.ZoneID;
        }
    };
    ViewallOffersComponent.prototype.Whether_All_zone_no = function () {
        var _this = this;
        this.all_zone = false;
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
    ViewallOffersComponent.prototype.updat_Offer_details = function () {
        this.update_Offer_details = true;
        this.update_offerDiscount = false;
    };
    ViewallOffersComponent.prototype.onClose_updateOffer = function () {
        this.update_Offer_Full_Details = false;
    };
    ViewallOffersComponent.prototype.Whether_All_zone = function () {
        this.all_zone = true;
        this.ZoneID = '';
    };
    ViewallOffersComponent.prototype.valuechange_bookingType = function (value) {
        this.BookingType = value;
    };
    ViewallOffersComponent.prototype.valuechange = function (value) {
        this.ZoneID = value;
    };
    ViewallOffersComponent.prototype.updat_OfferDiscount = function () {
        this.update_Offer_details = false;
        this.update_offerDiscount = true;
    };
    ViewallOffersComponent.prototype.onSubmit_OfferDiscount_Details = function (form) {
        var _this = this;
        var body = new FirstTime_offerModel(null, null, null, null, null, null, form.value.Discount, null, null, null, this.OfferID, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        this.busy1 = this.http.post(this.url + this.url_discount, body, { headers: headers })
            .subscribe((function (data) {
            if (data.json().success) {
                _this.loading = true;
                setTimeout(function () {
                    _this.update_Offer_Full_Details = false;
                    _this.viewall_offers(_this.offerType_Number);
                }, 4000);
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
        }));
    };
    ViewallOffersComponent.prototype.onSubmit_Add_Details = function (form) {
        var _this = this;
        var offer_code = form.value.OfferCode;
        offer_code = offer_code.toUpperCase();
        if (this.offerType_Number !== 1) {
            var d1 = form.value.OfferValidFrom;
            var date_From = d1.split('T');
            var Final_date_from = date_From[0] + ',' + date_From[1];
            var d2 = form.value.OfferValidTo;
            var date_to = d2.split('T');
            var Final_date_To = date_to[0] + ',' + date_to[1];
        }
        var body = new SeasonalModel(this.OfferID, this.offerType_Number, form.value.Offer_name, form.value.OfferDescription, offer_code, this.all_zone, this.ZoneID, this.BookingType, Final_date_from, Final_date_To, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        this.busy_updateDetails = this.http.post(this.url + this.url1, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                setTimeout(function () {
                    _this.update_Offer_Full_Details = false;
                    _this.viewall_offers(_this.offerType_Number);
                }, 4000);
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
    ViewallOffersComponent.prototype.More_offer = function (item) {
        var _this = this;
        this.OfferName = item.OfferName;
        this.OfferID = item.OfferID;
        this.ismoredetails = true;
        this.update_Offer_Full_Details = false;
        var body = new SeasonalModel(this.OfferID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/viewOfferByOfferID', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.moreDetails_Offer = data.json().extras.OfferData;
                _this.OfferName = _this.moreDetails_Offer.OfferName;
                _this.OfferDescription = _this.moreDetails_Offer.OfferDescription;
                _this.OfferCode = _this.moreDetails_Offer.OfferCode;
                _this.DiscountPercentage = _this.moreDetails_Offer.DiscountPercentage;
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
    ViewallOffersComponent.prototype.CloseMoreDetails = function () {
        this.ismoredetails = false;
    };
    ViewallOffersComponent.prototype.toggleMove = function () {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    };
    ViewallOffersComponent.prototype.toDateString = function (date) {
        return (date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2))
            + 'T' + date.toTimeString().slice(0, 5);
    };
    ViewallOffersComponent.prototype.Delete = function (item, i) {
        this.isdelete = true;
        this.OfferName = item.OfferName;
        this.OfferID = item.OfferID;
        this.index_Delete = i;
    };
    ViewallOffersComponent.prototype.delete_Final = function () {
        var _this = this;
        var body = new SeasonalModel(this.OfferID, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Inactivate_Offer', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.all_offersData.splice(_this.index_Delete, 1);
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
    ViewallOffersComponent.prototype.onClose_Delete = function () {
        this.isdelete = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ViewallOffersComponent.prototype, "update_Offer_Full_Details", void 0);
    ViewallOffersComponent = __decorate([
        Component({
            selector: 'app-first_off',
            templateUrl: "firstTimeBooking.component.html",
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
            styleUrls: ["firstTimeBooking.component.css"]
        }),
        __metadata("design:paramtypes", [Router, Http, ApiMessageService, CookieService, ErrorService, ChangeDetectorRef])
    ], ViewallOffersComponent);
    return ViewallOffersComponent;
}());
export { ViewallOffersComponent };
