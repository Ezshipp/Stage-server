var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { smsCampaignModel } from '../../../front_end_models/smscampaignModel';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
var CreatecampaignComponent = /** @class */ (function () {
    function CreatecampaignComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.Campaign_TypeData = [];
        this.url = '';
        this.isRequesting = false;
        this.Status_OK = false;
    }
    CreatecampaignComponent.prototype.ngOnInit = function () {
        this.getCampaignType();
    };
    CreatecampaignComponent.prototype.getCampaignType = function () {
        var _this = this;
        var body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/List_Available_Campaign_Type_with_Count', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Campaign_TypeData = data.json().extras.CampaignInformation;
            }
        });
    };
    CreatecampaignComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.value.CampaignName.length > 0 && form.value.CampaignMessage.length > 0) {
            this.isRequesting = true;
            var body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), form.value.CampaignName, form.value.CampaignType, form.value.CampaignMessage);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Create_Campaign_and_Send_SMS', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.isRequesting = false;
                    _this.Status_OK = true;
                    form.reset();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    _this.isRequesting = false;
                    if (msgNumber == 21) {
                        _this._cookieService.remove('ez_cusID');
                    }
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else if (form.value.CampaignName.length <= 0) {
            var message = "Please enter Campaign Name";
            this.ErrorService.handleError(message);
        }
        else if (form.value.CampaignMessage.length <= 0) {
            var message = "Please enter Campaign Message";
            this.ErrorService.handleError(message);
        }
        else {
            var message = "Please enter AllFields";
            this.ErrorService.handleError(message);
        }
    };
    CreatecampaignComponent.prototype.onSelectCampaignType = function (ev) {
    };
    CreatecampaignComponent = __decorate([
        Component({
            selector: 'createcampaign',
            templateUrl: 'createcampaign.component.html',
            styleUrls: ["./createcampaign.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Http,
            ApiMessageService,
            ErrorService])
    ], CreatecampaignComponent);
    return CreatecampaignComponent;
}());
export { CreatecampaignComponent };
