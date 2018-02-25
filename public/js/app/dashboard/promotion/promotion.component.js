var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { ApiMessageService } from "../../authentication/apimessages.service";
import { CookieService } from "angular2-cookie/core";
import { ErrorService } from "../../errors/error.service";
import { FormBuilder } from "@angular/forms";
import { OrdersModel_admin } from "../../front_end_models/OrdersModel";
var PromotionComponent = /** @class */ (function () {
    function PromotionComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref, _fb) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this._fb = _fb;
        this.index = 1;
        this.currentPage = 1;
        this.PromotionD = [];
        this.url = "";
    }
    PromotionComponent.prototype.ngOnInit = function () {
        this.GetPromotionData();
    };
    PromotionComponent.prototype.GetPromotionData = function () {
        var _this = this;
        var uid = this._cookieService.get("ez_cusID");
        var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get("ez_admin_cusID"));
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Listing_All_Campaign_Information", body1, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.PromotionD = data.json().extras.CampaignData;
                /* pagination*/
                _this.TotalLogsCount = data.json().extras.Count;
                /* completed*/
            }
            else {
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
    PromotionComponent.prototype.pageChanged_Logs = function (event) {
        this.currentPage = event;
        this.nextpage_orders(this.currentPage - 1);
    };
    PromotionComponent.prototype.nextpage_orders = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get("EmployeeID");
        var body1 = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get("ez_admin_cusID"));
        var body = JSON.stringify(body1);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Listing_All_Campaign_Information", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.PromotionD = data.json().extras.CampaignData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    PromotionComponent = __decorate([
        Component({
            selector: "promotion",
            templateUrl: "promotion.component.html",
            styleUrls: ["promotion.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef,
            FormBuilder])
    ], PromotionComponent);
    return PromotionComponent;
}());
export { PromotionComponent };
