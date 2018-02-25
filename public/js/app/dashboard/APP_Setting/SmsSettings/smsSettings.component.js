var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { driverModel } from '../../../front_end_models/driverModel';
import { Component } from '@angular/core';
var SmsSettingsComponent = /** @class */ (function () {
    function SmsSettingsComponent(http, _ApiMessageService, ErrorService) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ProvidersData = [];
        this.url = '';
    }
    SmsSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Listing_All_SMS_Providers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ProvidersData = data.json().extras.ProviderData;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    SmsSettingsComponent.prototype.Onselect_MsgProvider = function (item) {
        this.ProviderID = item.ProviderID;
    };
    SmsSettingsComponent.prototype.onSub = function () {
        this.isconfirmation = true;
    };
    SmsSettingsComponent.prototype.onCloseConfirmation = function () {
        this.isconfirmation = false;
    };
    SmsSettingsComponent.prototype.onSubmit = function () {
        var _this = this;
        var body = new driverModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ProviderID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Change_Service_Provider', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ngOnInit();
                var message = "service provided sucessfully";
                _this.ErrorService.handleError(message);
                _this.isconfirmation = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    SmsSettingsComponent = __decorate([
        Component({
            selector: 'app-settingssms',
            templateUrl: './smsSettings.component.html',
            styleUrls: ['./smsSettings.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            ErrorService])
    ], SmsSettingsComponent);
    return SmsSettingsComponent;
}());
export { SmsSettingsComponent };
