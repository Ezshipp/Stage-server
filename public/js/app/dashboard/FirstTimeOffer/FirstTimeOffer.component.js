var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { PayServiceModel } from '../../front_end_models/payServiceModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { Http, Headers } from '@angular/http';
import * as moment from 'moment';
var Moment = moment.default || moment;
var FirstTimeOfferComponent = /** @class */ (function () {
    function FirstTimeOfferComponent(_cookieService, _ApiMessageService, ErrorService, http) {
        this._cookieService = _cookieService;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.http = http;
        this.OfferData = [];
        this.url = '';
    }
    FirstTimeOfferComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_First_Time_Offer_Settings', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OfferData = data.json().extras.OfferData;
                _this.DiscountPercentage = _this.OfferData.DiscountPercentage;
                _this.viewdate = _this.OfferData.ExpiryDate;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    FirstTimeOfferComponent.prototype.onExpiryDate = function (date) {
    };
    FirstTimeOfferComponent.prototype.updateOffer = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, null, this.DiscountPercentage);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_First_Time_Offer_Discount', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var Status = data.json().extras.Status;
                _this.ErrorService.handleError(Status);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    FirstTimeOfferComponent.prototype.updateDate = function () {
        var _this = this;
        this.ExpiryDate = this.viewdate.split('-');
        this.viewdate = this.ExpiryDate[2] + '/' + this.ExpiryDate[1] + '/' + this.ExpiryDate[0];
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, this.viewdate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_First_Time_Offer_Expiry', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var Status = data.json().extras.Status;
                _this.ErrorService.handleError(Status);
                _this.ngOnInit();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    FirstTimeOfferComponent = __decorate([
        Component({
            selector: 'FirstTimeOffer',
            templateUrl: './FirstTimeOffer.component.html',
            styleUrls: ['./FirstTimeOffer.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            ApiMessageService,
            ErrorService,
            Http])
    ], FirstTimeOfferComponent);
    return FirstTimeOfferComponent;
}());
export { FirstTimeOfferComponent };
