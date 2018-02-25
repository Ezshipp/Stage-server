var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { PayServiceModel } from '../../front_end_models/payServiceModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { setTimeout } from 'core-js/library/web/timers';
var RazorpayServiceChargeComponent = /** @class */ (function () {
    function RazorpayServiceChargeComponent(_cookieService, _ApiMessageService, ErrorService, http) {
        this._cookieService = _cookieService;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.http = http;
        this.ServiceChargeData = [];
        this.url = '';
    }
    RazorpayServiceChargeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Razorpay_Service_Charge', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ServiceChargeData = data.json().extras.ServiceChargeData;
                _this.Service_Charge = _this.ServiceChargeData.Service_Charge;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    RazorpayServiceChargeComponent.prototype.updateServiceCharge = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), this.Service_Charge);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Service_Charge', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var Status = data.json().extras.Status;
                _this.ErrorService.handleError(Status);
                setTimeout(function () {
                    this.ngOnInit();
                }.bind(_this), 1000);
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    RazorpayServiceChargeComponent = __decorate([
        Component({
            selector: 'RazorpayServiceCharge',
            templateUrl: './RazorpayServiceCharge.component.html',
            styleUrls: ['./RazorpayServiceCharge.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            ApiMessageService,
            ErrorService,
            Http])
    ], RazorpayServiceChargeComponent);
    return RazorpayServiceChargeComponent;
}());
export { RazorpayServiceChargeComponent };
