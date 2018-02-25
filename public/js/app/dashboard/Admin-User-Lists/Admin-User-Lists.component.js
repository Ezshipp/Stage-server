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
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
var UserListsComponent = /** @class */ (function () {
    function UserListsComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.Logs_admin = 1;
        this.skip_Logs = 0;
        this.limit_logs = 10;
        this.LogsData_Admin = [];
        this.AdminData_json = [];
        this.AdminData = [];
        this.skip = 0;
        this.limit = 10;
        this.p = 1;
        this.url = '';
    }
    UserListsComponent.prototype.ngOnInit = function () {
        this.findUsers(1, '/Find_All_Super_Admins');
    };
    UserListsComponent.prototype.findUsers = function (type, url, searchValue) {
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
                    _this.AdminData_json = data.json().extras.AdminData;
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.AdminData = data.json().extras.AdminData;
                    _this.AdminData_json = data.json().extras.AdminData;
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
    UserListsComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.isRequesting = true;
        this.detailviewIndex = null;
        this.findUsers(2, '/Find_All_Super_Admins');
    };
    UserListsComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    UserListsComponent.prototype.OnLogs_user = function (item, i) {
        if (this.detailviewIndex == i) {
            this.detailviewIndex = -1;
            this.Total_Count_logs = 0;
        }
        else {
            this.detailviewIndex = i;
            this.adminId = item.AdminID;
            this.LogsData_Admin = [];
        }
        this.getAdmin_logs(this.adminId, this.skip_Logs, this.limit_logs, 1, '/Super_Admin_Logs_By_Admin');
    };
    UserListsComponent.prototype.getAdmin_logs = function (adminid, skip_adminlogs, limit_adminLogs, type, url, searchValue) {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, adminid, skip_adminlogs, limit_adminLogs);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.Logs_admin = 1;
                    _this.LogsData_Admin = data.json().extras.LogData;
                    _this.Total_Count_logs = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.LogsData_Admin = data.json().extras.LogData;
                }
                else if (type == 3) {
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
    UserListsComponent.prototype.pageChanged_logs = function (ev) {
        this.Logs_admin = ev;
        var p = this.Logs_admin - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit_logs;
        this.isRequesting = true;
        this.getAdmin_logs(this.adminId, skip_value, this.limit_logs, 2, '/Super_Admin_Logs_By_Admin');
    };
    UserListsComponent.prototype.onReseteConformation = function (item) {
        this.isresetpassword = true;
        this.AdminName = item.AdminName;
        this.AdminEmail = item.AdminEmail;
    };
    UserListsComponent.prototype.onClose_Delete = function () {
        this.isresetpassword = false;
    };
    UserListsComponent.prototype.OnReset_password = function () {
        var _this = this;
        var body = new CreateAdminModel(null, this.AdminEmail);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'Admin_Forgot_Password', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                var message = "Password Reset Sucessfully";
                _this.ErrorService.handleError(message);
                _this.onClose_Delete();
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
    UserListsComponent.prototype.onInActive = function (item) {
        this.isresetpassword_InActive = true;
        this.AdminName = item.AdminName;
        this.AdminID = item.AdminID;
    };
    UserListsComponent.prototype.onClose_In_Active = function () {
        this.isresetpassword_InActive = false;
    };
    UserListsComponent.prototype.onIn_Active = function () {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, this.AdminID);
        console.log("Body " + JSON.stringify(body));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Inactivate_Super_Admin', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                var message = "Admin User In-Activated Successfully";
                _this.ErrorService.handleError(message);
                _this.onClose_In_Active();
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
    UserListsComponent = __decorate([
        Component({
            selector: 'User-Lists',
            templateUrl: './Admin-User-Lists.component.html',
            styleUrls: ['./Admin-User-Lists.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], UserListsComponent);
    return UserListsComponent;
}());
export { UserListsComponent };
