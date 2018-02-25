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
var In_Active_AdminUsersComponent = /** @class */ (function () {
    function In_Active_AdminUsersComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.p = 1;
        this.url = '';
        this.skip = 0;
        this.limit = 10;
        this.AdminData = [];
    }
    In_Active_AdminUsersComponent.prototype.ngOnInit = function () {
        this.findUsers(1, '/Find_All_Inactive_Super_Admins');
    };
    In_Active_AdminUsersComponent.prototype.findUsers = function (type, url, searchValue) {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), this.skip, this.limit);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.isSearch = false;
                    _this.AdminData = data.json().extras.AdminData;
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.AdminData = data.json().extras.AdminData;
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.AdminData = data.json().extras.AdminData;
                        if (_this.AdminData.length == 0) {
                            _this.isSearch = false;
                        }
                    }, 2000);
                }
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
    };
    In_Active_AdminUsersComponent.prototype.pageChanged = function (event) {
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.isRequesting = true;
        this.findUsers(2, '/Find_All_Inactive_Super_Admins');
    };
    In_Active_AdminUsersComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    In_Active_AdminUsersComponent.prototype.onActiveConformation = function (item) {
        this.isresetpassword = true;
        this.AdminName = item.AdminName;
        this.AdminID = item.AdminID;
    };
    In_Active_AdminUsersComponent.prototype.onClose_Delete = function () {
        this.isresetpassword = false;
    };
    In_Active_AdminUsersComponent.prototype.OnReset_password = function () {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, this.AdminID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Activate_Super_Admin', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                var message = "Admin User Activated Successfully";
                _this.ErrorService.handleError(message);
                _this.onClose_Delete();
                _this.ngOnInit();
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
    };
    In_Active_AdminUsersComponent = __decorate([
        Component({
            selector: 'app-InActive',
            templateUrl: './In_Active_AdminUsers.component.html',
            styleUrls: ['./In_Active_AdminUsers.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], In_Active_AdminUsersComponent);
    return In_Active_AdminUsersComponent;
}());
export { In_Active_AdminUsersComponent };
