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
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CancelReasonsModel } from './../../../front_end_models/ReasonsModel';
import { Component, ElementRef } from '@angular/core';
var CancelReasonsComponent = /** @class */ (function () {
    function CancelReasonsComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _eref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._eref = _eref;
        this.ReasonData = [];
        this.url = '';
    }
    CancelReasonsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new CancelReasonsModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Cancellation_Reason', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ReasonData = data.json().extras.ReasonData;
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
    CancelReasonsComponent.prototype.onEdit = function (item, i) {
        this.ReasonID = item.ReasonID;
        this.index = i;
        this.isIndex = true;
    };
    CancelReasonsComponent.prototype.Ondelete = function (item, i) {
    };
    CancelReasonsComponent.prototype.onsubmitEdit = function (item) {
        var _this = this;
        var body = new CancelReasonsModel(this.ReasonID, item.Reason);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Driver_Cancellation_Reason', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.index = -1;
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
    CancelReasonsComponent.prototype.onClick = function () {
        this.index = -1;
    };
    CancelReasonsComponent.prototype.onCreateReason = function () {
        this.onCreate_Reason = true;
    };
    CancelReasonsComponent.prototype.onCloseCreate_Reason = function () {
        this.onCreate_Reason = false;
    };
    CancelReasonsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var Reason = form.value.Reason;
        this.isRequesting = true;
        var body = new CancelReasonsModel(null, Reason);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Create_Driver_Cancellation_Reason', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Status_OK = true;
                setTimeout(function () {
                    _this.Status_OK = false;
                }, 2000);
                _this.Status = data.json().extras.Status;
                _this.onCloseCreate_Reason();
                _this.ngOnInit();
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
    CancelReasonsComponent = __decorate([
        Component({
            selector: 'app-cancelReasons',
            templateUrl: './cancelReasons.component.html',
            styleUrls: ['./cancelReasons.component.css']
        }),
        __metadata("design:paramtypes", [Router, Http, ApiMessageService, CookieService, ErrorService,
            ElementRef])
    ], CancelReasonsComponent);
    return CancelReasonsComponent;
}());
export { CancelReasonsComponent };
