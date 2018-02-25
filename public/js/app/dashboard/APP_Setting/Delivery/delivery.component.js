var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppsettingModel } from './../../../front_end_models/settingModel';
import { Component } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ApiMessageService } from "../../../authentication/apimessages.service";
import { ErrorService } from "../../../errors/error.service";
import { driverModel } from "../../../front_end_models/driverModel";
var DeliveryComponent = /** @class */ (function () {
    function DeliveryComponent(http, _ApiMessageService, ErrorService) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.url = '';
        this.employee_data = false;
    }
    DeliveryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Get_Delivery_Settings', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.SettingData = data.json().extras.SettingData;
                _this.SettingID = _this.SettingData.SettingID;
                _this.Same_Day_Time = _this.SettingData.Same_Day_Time,
                    _this.Four_Hours_Time = _this.SettingData.Four_Hours_Time;
                _this.Instant_Time = _this.SettingData.Instant_Time;
                _this.Instant_Message = _this.SettingData.Instant_Message;
                _this.Four_Hours_Message = _this.SettingData.Four_Hours_Message;
                _this.Same_Day_Message = _this.SettingData.Same_Day_Message;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    DeliveryComponent.prototype.button_click = function () {
        this.employee_data = true;
    };
    DeliveryComponent.prototype.back_button = function () {
        this.employee_data = false;
    };
    DeliveryComponent.prototype.setMoment = function (moment) {
        this.momentValueDOB = moment;
        var strDOB = this.momentValueDOB.split(' ');
        var datesDOB = strDOB[0];
        var final_dateDOB = datesDOB.split('-');
        this.finalDOB = final_dateDOB[2] + '/' + final_dateDOB[1] + '/' + final_dateDOB[0];
        var timeDOB = strDOB[1];
    };
    DeliveryComponent.prototype.setDateofjoining = function (moment) {
        this.momentValueDOJ = moment;
        var strDOJ = this.momentValueDOJ.split(' ');
        var datesDOJ = strDOJ[0];
        var final_dateDOJ = datesDOJ.split('-');
        this.finalDOJ = final_dateDOJ[2] + '/' + final_dateDOJ[1] + '/' + final_dateDOJ[0];
        var timeDOJ = strDOJ[1];
    };
    DeliveryComponent.prototype.OnEdite = function (Same_Day_Time) {
        this.isEditFirstRow = true;
    };
    DeliveryComponent.prototype.Onclose = function () {
        this.isEditFirstRow = false;
    };
    DeliveryComponent.prototype.Onsubmit_First = function (Same_Day_Time, Instant_Time, Four_Hours_Time) {
    };
    DeliveryComponent.prototype.Onclose_secound = function () {
        this.isEditsecoundRow = false;
    };
    DeliveryComponent.prototype.OnEdit_secound = function () {
        this.isEditsecoundRow = true;
    };
    DeliveryComponent.prototype.OnEdit_messages = function (Same_Day_Time, Same_Day_Message, Four_Hours_Time, Four_Hours_Message, Instant_Time, Instant_Message) {
        var _this = this;
        var body = new AppsettingModel(this.SettingID, this.Same_Day_Time, this.Four_Hours_Time, this.Instant_Time, this.Instant_Message, this.Four_Hours_Message, this.Same_Day_Message);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Delivery_Settings', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    DeliveryComponent = __decorate([
        Component({
            selector: 'app-delivery',
            templateUrl: './delivery.component.html',
            styleUrls: ['./delivery.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            ErrorService])
    ], DeliveryComponent);
    return DeliveryComponent;
}());
export { DeliveryComponent };
