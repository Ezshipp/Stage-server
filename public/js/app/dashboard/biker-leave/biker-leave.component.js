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
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { CookieService } from 'angular2-cookie/services';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
var BikerLeaveComponent = /** @class */ (function () {
    function BikerLeaveComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ind_empl = [];
        this.isRequesting = false;
        this.p = 1;
        this.leavesRequestsData = [];
        this.sortoptions = {};
        this.url = "";
        this.skip = 0;
        this.limit = 10;
    }
    BikerLeaveComponent.prototype.ngOnInit = function () {
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get("ez_admin_cusID"), 0, this.limit, this.sortoptions);
        this.getLeaveRequesDrivers("/List_All_Employee_Leave_Request", body, 1);
    };
    BikerLeaveComponent.prototype.getLeaveRequesDrivers = function (url, body, type) {
        var _this = this;
        this.isRequesting = true;
        // const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), this.skip, this.limit,this.sortoptions)
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    /* get all orders*/
                    _this.leavesRequestsData = data.json().extras.RequestData;
                    //   console.log("body "+JSON.stringify(data.json().extras.RequestData))
                    _this.Total_Count = data.json().extras.Count;
                    if (_this.Total_Count == 0) {
                        _this.islength_leavesData = true;
                    }
                }
                else if (type == 2) {
                    /*pagination */
                    _this.leavesRequestsData = data.json().extras.RequestData;
                }
                else if (type == 3) {
                    //   this.activeId=null
                    _this.onLeaveConformation = false;
                    _this.pageChanged(_this.p);
                }
                else if (type == 4) {
                    // this.activeId=null
                    _this.onLeaveConformation = false;
                    _this.pageChanged(_this.p);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                _this.isRequesting = false;
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    BikerLeaveComponent.prototype.sortColumn = function (key) {
        var backendkey;
        if (this.valu != key) {
            this.valu = key;
            this.IsAsc = true;
        }
        else {
            this.IsAsc = !this.IsAsc;
        }
        if (this.IsAsc == true) {
            var sort = 1;
        }
        else if (this.IsAsc == false) {
            sort = -1;
        }
        this.sortoptions = {};
        this.sortoptions[this.valu] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    BikerLeaveComponent.prototype.pageChanged = function (event) {
        this.p = event;
        var skip = this.p - 1;
        skip = skip * this.limit;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get("ez_admin_cusID"), skip, this.limit, this.sortoptions);
        this.getLeaveRequesDrivers("/List_All_Employee_Leave_Request", body, 2);
    };
    BikerLeaveComponent.prototype.onLeaveStatus = function (event, item) {
        this.onLeaveConformation = true;
        this.requestId = item.RequestID;
        this.ind_empl = item;
        if (event.target.id == 1) {
            this.leave = 'Approve';
        }
        else if (event.target.id == 2) {
            this.leave = 'Rejecte';
        }
    };
    BikerLeaveComponent.prototype.getLeaveStatus = function () {
        if (this.leave == 'Approve') {
            this.getLeaveStatus_Final(1);
        }
        else if (this.leave == 'Rejecte') {
            this.getLeaveStatus_Final(2);
        }
    };
    BikerLeaveComponent.prototype.getLeaveStatus_Final = function (number) {
        var url = "";
        console.log(number);
        // console.log(item.RequestID);
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get("ez_admin_cusID"), null, this.limit, this.sortoptions, null, this.requestId);
        if (number == 1) {
            this.getLeaveRequesDrivers("/Approve_Employee_Leave", body, 3);
        }
        else if (number == 2) {
            this.getLeaveRequesDrivers("/Reject_Employee_Leave", body, 4);
        }
    };
    BikerLeaveComponent.prototype.onClose_leaveConformation = function () {
        this.onLeaveConformation = false;
    };
    BikerLeaveComponent = __decorate([
        Component({
            selector: 'biker-leave',
            templateUrl: 'biker-leave.component.html',
            styleUrls: ['biker-leave.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http,
            ApiMessageService,
            ErrorService])
    ], BikerLeaveComponent);
    return BikerLeaveComponent;
}());
export { BikerLeaveComponent };
