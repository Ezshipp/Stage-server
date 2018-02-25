var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Component } from "@angular/core";
import { CookieService } from "angular2-cookie/core";
import { animate, query, state, style, transition, trigger } from "@angular/animations";
import { ApiMessageService } from "../authentication/apimessages.service";
import { PayServiceModel } from "../front_end_models/payServiceModel";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { NgProgress } from "ngx-progressbar";
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(cookieService, router, _errorService, _ApiMessageService, http, ngProgress) {
        var _this = this;
        this.cookieService = cookieService;
        this.router = router;
        this._errorService = _errorService;
        this._ApiMessageService = _ApiMessageService;
        this.http = http;
        this.ngProgress = ngProgress;
        this.url = "";
        this.marginLeft = 190;
        this.menuState = "in";
        this.routerState = "in";
        this.isSideNav = true;
        this.imgLogo = "./img/logo-blue-1.png";
        this.imgLogo_new = "./img/ezshippLogoNew.png";
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.isUserSection =
            this.cookieService.get("ADMIN_USER_PERMISSIONS") == "true";
        if (this.cookieService.get("ez_admin_cusID") == null) {
            this.router.navigateByUrl("/signin");
        }
        else {
            // this.router.navigateByUrl("/dashboard");
            this.adminName = this.cookieService.get("ez_admin_Name");
        }
        this.height = window.innerHeight;
    };
    DashboardComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof NavigationStart) {
            // this.loading = true
            this.ngProgress.start();
        }
        if (event instanceof NavigationEnd) {
            // this.loading = false
            this.ngProgress.done();
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            // this.loading = false
            this.ngProgress.done();
        }
        if (event instanceof NavigationError) {
            // this.loading = false
            this.ngProgress.done();
        }
    };
    DashboardComponent.prototype.logout = function () {
        this.cookieService.removeAll();
        this.router.navigateByUrl("/signin");
    };
    DashboardComponent.prototype.onselect_nav = function () {
        this.menuState = this.menuState === "out" ? "in" : "out";
        this.routerState = this.routerState === "out" ? "in" : "out";
        if (this.menuState == "out") {
            this.marginLeft = 0;
        }
        else {
            this.marginLeft = 190;
        }
        this.isSideNav = !this.isSideNav;
        this._errorService.isSideNav = !this._errorService.isSideNav;
    };
    DashboardComponent.prototype.getState = function (outlet) {
        return outlet.activatedRouteData.state;
    };
    DashboardComponent.prototype.onCompleteOrder = function () {
        this.change_password = true;
    };
    DashboardComponent.prototype.Onclosepassword = function () {
        this.change_password = false;
    };
    DashboardComponent.prototype.onSubmit_password = function (form) {
        var _this = this;
        var Password = form.value.Password;
        var ConfirmPassword = form.value.ConfirmPassword;
        if (Password == ConfirmPassword) {
            var body = new PayServiceModel(this.cookieService.get("ez_admin_cusID"), null, null, null, Password, form.value.OldPassword);
            var headers = new Headers({ "Content-Type": "application/json" });
            return this.http
                .post(this.url + "/Update_Super_Admin_Password", body, {
                headers: headers
            })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.change_password = false;
                    form.resetForm();
                    var message = data.json().extras.Status;
                    _this._errorService.handleError(message);
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this._errorService.handleError(message_1);
                }
            });
        }
        else {
            var message = "New Password and Confirm Password should match";
            this._errorService.handleError(message);
        }
    };
    DashboardComponent = __decorate([
        Component({
            selector: "app-das",
            templateUrl: "dashboard.component.html",
            styleUrls: ["dashboard.component.css"],
            animations: [
                trigger("slideInOut", [
                    state("in", style({
                        transform: "translate3d(0, 0, 0)"
                    })),
                    state("out", style({
                        transform: "translate3d(-100%, 0, 0)"
                    })),
                    transition("in => out", animate("400ms ease-in-out")),
                    transition("out => in", animate("400ms ease-in-out"))
                ]),
                trigger("slideInOutforrouter", [
                    state("in", style({
                        transform: "translate3d(0, 0, 0)"
                    })),
                    state("out", style({
                        transform: "translate3d(0, 0, 0)"
                    })),
                    transition("in => out", animate("400ms ease-in-out")),
                    transition("out => in", animate("400ms ease-in-out"))
                ]),
                trigger("routerAnimation", [
                    transition("* <=> *", [
                        // Initial state of new route
                        query(":enter", style({
                            position: "fixed",
                            width: "100%",
                            transform: "translateY(-100%)"
                        }), { optional: true }),
                        // move page off screen right on leave
                        query(":leave", animate("500ms ease", style({
                            position: "fixed",
                            width: "100%",
                            transform: "translateX(100%)"
                        })), { optional: true }),
                        // move page in screen from left to right
                        query(":enter", animate("500ms ease", style({
                            opacity: 1,
                            transform: "translateY(0%)"
                        })), { optional: true })
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [CookieService,
            Router,
            ErrorService,
            ApiMessageService,
            Http,
            NgProgress])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
