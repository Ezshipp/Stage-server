var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from '../../errors/error.service';
import { OrdersModel_admin } from '../../front_end_models/OrdersModel';
var LogsComponent = /** @class */ (function () {
    function LogsComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref, _fb) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this._fb = _fb;
        this.currentPage = 1;
        this.index = 0;
        this.LogData = [];
        this.url = '';
    }
    LogsComponent.prototype.ngOnInit = function () {
        this.getLogs();
    };
    LogsComponent.prototype.getLogs = function () {
        var _this = this;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/All_Super_Admin_Logs', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.LogData = data.json().extras.LogData;
                /* pagination*/
                _this.TotalLogsCount = data.json().extras.Count;
                var count = parseInt(data.json().extras.Count);
                var count1 = Math.floor(count / 10);
                var count2 = count % 10;
                /* completed*/
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
    LogsComponent.prototype.pageChanged_Logs = function (event) {
        this.currentPage = event;
        this.nextpage_orders(this.currentPage - 1);
    };
    LogsComponent.prototype.nextpage_orders = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var body1 = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'));
        var body = JSON.stringify(body1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/All_Super_Admin_Logs', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.LogData = data.json().extras.LogData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    LogsComponent = __decorate([
        Component({
            selector: 'logs',
            templateUrl: 'logs.component.html',
            styleUrls: ['logs.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef,
            FormBuilder])
    ], LogsComponent);
    return LogsComponent;
}());
export { LogsComponent };
