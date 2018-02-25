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
import { CookieService } from 'angular2-cookie/services';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../errors/error.service';
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
var VendorsApiRequestsComponent = /** @class */ (function () {
    function VendorsApiRequestsComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.sortOptions = {};
        this.limit = 10;
        this.skip = 0;
        this.apiRequestData = [];
        this.url = '';
    }
    VendorsApiRequestsComponent.prototype.ngOnInit = function () {
        this.findApiRequest(1, '/Find_All_Business_Apis_Customer_Request', this.skip, this.limit);
    };
    VendorsApiRequestsComponent.prototype.findApiRequest = function (type, url, skip, limit, searchValue) {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), skip, limit, this.sortOptions, searchValue);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.isSearch = false;
                    _this.apiRequestData = data.json().extras.API_Request_Data;
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.apiRequestData = data.json().extras.API_Request_Data;
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.apiRequestData = data.json().extras.API_Request_Data;
                        if (_this.apiRequestData.length == 0) {
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
    VendorsApiRequestsComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    VendorsApiRequestsComponent.prototype.OnClick_Row = function (item, i) {
        if (this.detailviewIndex == i) {
            this.detailviewIndex = -1;
        }
        else {
            this.detailviewIndex = i;
        }
    };
    VendorsApiRequestsComponent.prototype.valuechange = function (value) {
        var _this = this;
        this.detailviewIndex = null;
        this.searchValue = value;
        var length = value.length;
        this.activeId = null;
        setTimeout(function () {
            if (length >= 3) {
                _this.isSearch = true;
                _this.activeId = null;
                _this.apiRequestData = [];
                _this.isRequesting = true;
                _this.findApiRequest(3, '/Find_All_Business_Apis_Customer_Request', _this.skip, _this.limit, _this.searchValue);
            }
            else {
                _this.activeId = null;
                _this.skip = 0;
                _this.ngOnInit();
            }
        }, 2000);
    };
    VendorsApiRequestsComponent.prototype.sortColumn = function (key) {
        var backendkey;
        this.detailviewIndex = -1;
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
        this.sortOptions[this.valu] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    VendorsApiRequestsComponent.prototype.pageChanged = function (event) {
        this.detailviewIndex = null;
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.activeId = null;
        this.isRequesting = true;
        this.detailviewIndex = null;
        this.findApiRequest(2, '/Find_All_Business_Apis_Customer_Request', this.skip, this.limit);
    };
    VendorsApiRequestsComponent = __decorate([
        Component({
            selector: 'app-vendorsApiRequests',
            templateUrl: "./vendorsApiRequests.component.html",
            styleUrls: ["./vendorsApiRequests.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], VendorsApiRequestsComponent);
    return VendorsApiRequestsComponent;
}());
export { VendorsApiRequestsComponent };
