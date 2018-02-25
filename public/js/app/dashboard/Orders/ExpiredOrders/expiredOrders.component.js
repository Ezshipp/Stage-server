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
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ExpiredJobsModel } from '../../../front_end_models/expiredModel';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Component, ChangeDetectorRef } from '@angular/core';
var ExpiredOrdersComponent = /** @class */ (function () {
    function ExpiredOrdersComponent(http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.p = 1;
        this.ExpiredJobsData_json = [];
        this.ExpiredJobsData = [];
        this.url = '';
        this.JobType = 2;
        this.skip = 0;
        this.limit = 10;
    }
    ExpiredOrdersComponent.prototype.ngOnInit = function () {
        this.getExpiredJobs(1, '/Find_All_Orders_Ezshipp');
    };
    ExpiredOrdersComponent.prototype.getExpiredJobs = function (type, url, searchValue) {
        var _this = this;
        var body = new ExpiredJobsModel(this.JobType, this.skip, this.limit, searchValue, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.isSearch = false;
                    _this.ExpiredJobsData = data.json().extras.OrderData;
                    _this.ExpiredJobsData_json = data.json().extras.OrderData;
                    for (var i = 0; i < _this.ExpiredJobsData.length; i++) {
                        var str = '';
                        var pick = _this.ExpiredJobsData[i].pickAddress;
                        _this.ExpiredJobsData[i].pickAddress = pick.replace('Telangana', '');
                        _this.ExpiredJobsData[i].pickAddress = _this.ExpiredJobsData[i].pickAddress.replace(', India', '');
                    }
                    for (var i = 0; i < _this.ExpiredJobsData.length; i++) {
                        var str = '';
                        var pick = _this.ExpiredJobsData[i].dropAddress;
                        _this.ExpiredJobsData[i].dropAddress = pick.replace('Telangana', '');
                        _this.ExpiredJobsData[i].dropAddress = _this.ExpiredJobsData[i].dropAddress.replace(', India', '');
                    }
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.ExpiredJobsData = data.json().extras.OrderData;
                    _this.ExpiredJobsData_json = data.json().extras.OrderData;
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.ExpiredJobsData = data.json().extras.OrderData;
                        if (_this.ExpiredJobsData.length == 0) {
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
    ExpiredOrdersComponent.prototype.pageChanged = function (event) {
        this.views = null;
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.isRequesting = true;
        this.getExpiredJobs(2, '/Find_All_Orders_Ezshipp');
    };
    ExpiredOrdersComponent.prototype.edit = function (item, i) {
        this.views = i;
    };
    ExpiredOrdersComponent.prototype.close = function () {
        this.views = -1;
    };
    ExpiredOrdersComponent.prototype.sortColumn = function (key) {
        var backendkey;
        if (key == 'First_name') {
            backendkey = 'customerName';
        }
        else if (key == 'Phone ') {
            backendkey = 'customerPhone';
        }
        else {
            backendkey = key;
        }
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
        this.sortOptions = {};
        this.sortOptions[backendkey] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    ExpiredOrdersComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    ExpiredOrdersComponent.prototype.valuechange = function (value) {
        var _this = this;
        this.views = null;
        this.mymodel = value;
        var length = value.length;
        setTimeout(function () {
            if (length >= 3) {
                _this.isSearch = true;
                _this.activeId = null;
                _this.ExpiredJobsData = [];
                _this.isRequesting = true;
                _this.getExpiredJobs(3, '/Search_All_Orders_Ezshipp', _this.mymodel);
            }
            else {
                _this.activeId = null;
                _this.skip = 0;
                _this.ngOnInit();
            }
        }, 2000);
    };
    ExpiredOrdersComponent = __decorate([
        Component({
            selector: 'app-expired',
            templateUrl: './expiredOrders.component.html',
            styleUrls: ['./expiredOrders.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], ExpiredOrdersComponent);
    return ExpiredOrdersComponent;
}());
export { ExpiredOrdersComponent };
