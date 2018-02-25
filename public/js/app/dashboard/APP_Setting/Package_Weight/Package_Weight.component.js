var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { PayServiceModel } from '../../../front_end_models/payServiceModel';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
var PackageWeightComponent = /** @class */ (function () {
    function PackageWeightComponent(_cookieService, _ApiMessageService, ErrorService, http) {
        this._cookieService = _cookieService;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.http = http;
        this.url = '';
    }
    PackageWeightComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_Execeded_Price', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Enable_Exceeding_Weight = data.json().extras.Enable_Exceeding_Weight;
                _this.Price = data.json().extras.Price;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    PackageWeightComponent.prototype.enableCheck = function (event) {
        if (event.target.id == 'enableCheck') {
            this.Enable_Exceeding_Weight = !this.Enable_Exceeding_Weight;
        }
    };
    PackageWeightComponent.prototype.updatePrice = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, null, this.Price);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Exceeded_Weight_Price', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = 'Package Exceeded Weight Price updated Successfully';
                _this.ErrorService.handleError(message);
                _this.isRequesting = false;
                _this.ngOnInit();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message_1);
            }
        });
    };
    PackageWeightComponent.prototype.updateEnable = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, this.Enable_Exceeding_Weight, null);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Enable_or_Disable_Exceeded_Weight', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OncloseConfirmation();
                _this.updatePrice();
                _this.isRequesting = true;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    PackageWeightComponent.prototype.OncloseConfirmation = function () {
        this.isConfirmation = false;
    };
    PackageWeightComponent.prototype.confirmation = function () {
        this.isConfirmation = true;
    };
    PackageWeightComponent = __decorate([
        Component({
            selector: 'app-package-weight',
            templateUrl: './Package_Weight.component.html',
            styleUrls: ['./Package_Weight.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            ApiMessageService,
            ErrorService,
            Http])
    ], PackageWeightComponent);
    return PackageWeightComponent;
}());
export { PackageWeightComponent };
