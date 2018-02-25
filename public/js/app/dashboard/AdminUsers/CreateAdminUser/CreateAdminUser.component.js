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
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CreateAdminModel } from '../../../front_end_models/create_adminUserModel';
var CreateAdminUserComponent = /** @class */ (function () {
    function CreateAdminUserComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.url = '';
        this.isSalary = false;
        this.isUsersSection = false;
    }
    CreateAdminUserComponent.prototype.ngOnInit = function () { };
    CreateAdminUserComponent.prototype.onSubmit_User = function (form) {
        var _this = this;
        this.userForm = form;
        if (form.value.password == form.value.Confirm_password) {
            var body1 = new CreateAdminModel(form.value.Name, form.value.Email, form.value.password, form.value.isSalary, form.value.isUsersSection);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Create_Super_Admin_with_Permissions', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var message = "Admin created sucessfully";
                    _this.ErrorService.handleError(message);
                    form.reset();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            var message = "Password is Not Matched";
            this.ErrorService.handleError(message);
        }
    };
    CreateAdminUserComponent = __decorate([
        Component({
            selector: 'CreateAdminUser',
            templateUrl: 'CreateAdminUser.component.html',
            styleUrls: ['./CreateAdminUser.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], CreateAdminUserComponent);
    return CreateAdminUserComponent;
}());
export { CreateAdminUserComponent };
