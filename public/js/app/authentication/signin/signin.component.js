var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../apimessages.service';
import { AuthenticationModel } from './../../front_end_models/authenticationModel';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
var SigninComponent = /** @class */ (function () {
    function SigninComponent(_cookieService, router, http, _ApiMessageService, _errorService) {
        this._cookieService = _cookieService;
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._errorService = _errorService;
        this.data = false;
        this.AdminData = [];
        this.url = '';
        this.imageURL = "./images/logo-blue-1.png";
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.notsignup = true;
        if (this._cookieService.get('ez_admin_cusID') == null) {
            this.router.navigateByUrl('/signin');
        }
        else {
            this.router.navigateByUrl('/dashboard');
        }
        this.loading = true;
        setTimeout(function () {
            this.loading = false;
            this.data = true;
        }.bind(this), 5000);
    };
    SigninComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var email = form.value.EmailID;
        var pwd = form.value.Password;
        var body = new AuthenticationModel(null, email, null, null, null, null, null, pwd);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Admin_Login', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.AdminData = data.json().extras.AdminData;
                _this.AdminID = _this.AdminData.AdminID;
                _this.Admin_Name = _this.AdminData.Admin_Name;
                _this._cookieService.put('ez_admin_cusID', _this.AdminID);
                _this._cookieService.put('ez_admin_Name', _this.Admin_Name);
                _this._cookieService.put('HR_SALARY_PERMISSIONS', _this.AdminData.HR_SALARY_PERMISSIONS);
                _this._cookieService.put('ADMIN_USER_PERMISSIONS', _this.AdminData.ADMIN_USER_PERMISSIONS);
                _this.router.navigateByUrl('/dashboard');
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    SigninComponent = __decorate([
        Component({
            selector: 'app-signin',
            templateUrl: "./signin.component.html",
            styleUrls: ["./signin.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Router,
            Http,
            ApiMessageService,
            ErrorService])
    ], SigninComponent);
    return SigninComponent;
}());
export { SigninComponent };
