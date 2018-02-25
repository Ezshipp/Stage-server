var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OnGoingBikersModal } from '../../../front_end_models/ongoingBikersModel';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
import { ErrorService } from "../../../errors/error.service";
import { ApiMessageService } from "../../../authentication/apimessages.service";
var OnGoingBikersComponent = /** @class */ (function () {
    function OnGoingBikersComponent(router, http, _ApiMessageService, _cookieService, ErrorService) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.p = 1;
        this.skip_value = 0;
        this.index = 0;
        this.OrderData = [];
        this.array = [];
        this.limit = 10;
        this.Bikers = [];
        this.Bikers_json = [];
        this.url = "";
    }
    OnGoingBikersComponent.prototype.ngOnInit = function () {
        this.inItMethod();
    };
    OnGoingBikersComponent.prototype.inItMethod = function () {
        var _this = this;
        this.isRequesting = true;
        var body1 = new OnGoingBikersModal(0, this.limit);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Find_All_Drivers_With_Ongoing_Orders", body1, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Bikers = data.json().extras.DriverData;
                _this.Bikers_json = data.json().extras.DriverData;
                if (!_this.Bikers.length) {
                    _this.isData = true;
                    _this.issearch = false;
                }
                else {
                    _this.issearch = true;
                    _this.isData = false;
                }
                /* pagination*/
                _this.Total_Count = data.json().extras.Count;
                var count = parseInt(data.json().extras.Count);
                var count1 = Math.floor(count / 10);
                var count2 = count % 10;
                if (count2 == 0) {
                    _this.array.length = count1;
                }
                else {
                    _this.array.length = count1 + 1;
                }
                /* completed*/
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove("ez_cusID");
                    _this.router.navigate(["/signissssn"]);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    OnGoingBikersComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.views = -1;
        this.realIndex = -1;
        this.sortResults(this.valu, this.IsAsc);
    };
    OnGoingBikersComponent.prototype.sortResults = function (prop, asc) {
        this.Bikers = this.Bikers_json.sort(function (a, b) {
            if (asc) {
                return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
            }
            else {
                return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
            }
        });
        return this.Bikers;
    };
    OnGoingBikersComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.OrderData = item.OrderData;
        if (this.realIndex == i) {
            this.views = -1;
            this.realIndex = -1;
        }
        else {
            this.views = i;
            this.realIndex = i;
        }
    };
    OnGoingBikersComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    OnGoingBikersComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        var body = new OnGoingBikersModal(skip_value, this.limit);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Find_All_Drivers_With_Ongoing_Orders", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = true;
                _this.Bikers = data.json().extras.DriverData;
                _this.Bikers_json = data.json().extras.DriverData;
                _this.skip_value = _this.index * _this.limit;
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    OnGoingBikersComponent = __decorate([
        Component({
            selector: "on-going-bikers",
            templateUrl: "./on-going-bikers.component.html",
            styleUrls: ["./on-going-bikers.component.css"],
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService])
    ], OnGoingBikersComponent);
    return OnGoingBikersComponent;
}());
export { OnGoingBikersComponent };
