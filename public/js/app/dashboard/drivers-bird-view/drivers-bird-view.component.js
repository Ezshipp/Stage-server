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
import { PubNubAngular } from 'pubnub-angular2';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { AuthenticationModel } from '../../front_end_models/authenticationModel';
var DriversBirdViewComponent = /** @class */ (function () {
    function DriversBirdViewComponent(pubnub, _Cookieservice, router, http, _ApiMessageService, _errorService) {
        this.pubnub = pubnub;
        this._Cookieservice = _Cookieservice;
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._errorService = _errorService;
        this.isSingleView = false;
        this.picmarker_icon_box = "./images/imageedit_2_4150727599.png";
        this.dropMarker_icon_box = "./images/imageedit_2_6997711684.png";
        this.OrderData = [];
        this.display = "none";
        this.picmarker_icon = "./images/taxi_delivery_van_22.png";
        this.inactive_icon = "./images/taxi_delivery_van_22_GH.png";
        this.zoom = 10;
        this._lastOpenIndex = -1;
        this.long_map = 78.4867;
        this.lat_map = 17.385;
        this.DriversData = [];
        this.url = "";
        this.pubnub.init({
            publishKey: "pub-c-e3ea9e90-d5c3-471e-b3ad-a9da33dbf2b2",
            subscribeKey: "sub-c-7b39ec92-7293-11e7-9980-0619f8945a4f"
        });
        pubnub.publish({
            message: { such: "Hello!" },
            channel: "ezshipp_serverChannel_Driver"
        }, function (status, response) {
            if (status.error) {
            }
            else {
            }
        });
    }
    DriversBirdViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.windowHeight = $(window).height() - 75;
        var body = new AuthenticationModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._Cookieservice.get("ez_admin_cusID"));
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Drivers_God_View", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriversData = data.json().extras.DriverData;
                var length = _this.DriversData.length;
                if (length > 0) {
                    _this.Onpubnub();
                }
                else {
                    _this.zoom = 8;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    DriversBirdViewComponent.prototype.Onpubnub = function () {
        var _this = this;
        this.pubnub.addListener({
            message: function (message) {
                var pubun_Driverid = message.message.driverid;
                for (var i = 0; i < _this.DriversData.length; i++) {
                    var driverid = _this.DriversData[i].DriverID;
                    if (driverid == message.message.driverid) {
                        _this.DriversData[i].lat = message.message.lt;
                        _this.DriversData[i].long = message.message.lg;
                    }
                }
            },
            presence: function (m) {
                var channelName = m.channel;
                var channelGroup = m.subscription;
            },
            status: function (s) {
                var category = s.category;
                var operation = s.operation;
                var affectedChannels = s.affectedChannels;
                var subscribedChannels = s.subscribedChannels;
                var affectedChannelGroups = s.affectedChannelGroups;
                var lastTimetoken = s.lastTimetoken;
                var currentTimetoken = s.currentTimetoken;
            }
        });
        this.pubnub.subscribe({
            channels: ["ezshipp_serverChannel_Driver"],
            withPresence: true
        });
    };
    DriversBirdViewComponent.prototype.clickedMarker = function (index, data) {
        data["isOpen"] = true;
        if (this._lastOpenIndex > -1)
            this.DriversData[this._lastOpenIndex]["isOpen"] = false;
        this._lastOpenIndex = index;
        var messa = "dummy";
    };
    DriversBirdViewComponent.prototype.ngOnDestroy = function () {
        this.pubnub.unsubscribeAll();
    };
    DriversBirdViewComponent.prototype.onBikerClick = function (DriverID, DriverName, lat, long, index, data) {
        this.lat_map = lat;
        this.long_map = long;
        this.zoom = 15;
        this.isPicMarker = false;
        this.isDropMarker = false;
        this.clickedMarker(index, data);
        this.listOngoingOrders(DriverID, index);
    };
    DriversBirdViewComponent.prototype.listAllBikers = function (data) {
        this.isSingleView = false;
        this.zoom = 10;
        this.lat_map = 17.385;
        this.long_map = 78.4867;
        this.classIndex = -1;
        data["isOpen"] = false;
        this._lastOpenIndex = -1;
    };
    DriversBirdViewComponent.prototype.bikersListView = function () {
        this.is_biker_view = !this.is_biker_view;
    };
    DriversBirdViewComponent.prototype.listOngoingOrders = function (id, index) {
        var _this = this;
        this.viewsB = index;
        this.DriverID = id;
        var body = new AuthenticationModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._Cookieservice.get("ez_admin_cusID"), this.DriverID);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Find_ALL_Driver_Ongoing_Orders", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OrderData = data.json().extras.OrderData;
                var length = _this.OrderData.length;
                if (length > 0) {
                }
                else {
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    DriversBirdViewComponent.prototype.OnongoingOrderClick = function (order) {
        this.isPicMarker = true;
        this.isDropMarker = true;
        this.pic_Lat_order = order.pickLatitude;
        this.pic_Lng_order = order.pickLongitude;
        this.drop_Lat_order = order.dropLatitude;
        this.drop_Lng_order = order.dropLongitude;
        this.zoom = 10;
    };
    DriversBirdViewComponent.prototype.getIcon_Status = function (m) {
        if (m.status == 3) {
            return this.picmarker_icon;
        }
        else if (m.status == 4) {
            return this.inactive_icon;
        }
    };
    DriversBirdViewComponent = __decorate([
        Component({
            selector: 'drivers-bird-view',
            templateUrl: 'drivers-bird-view.component.html',
            styleUrls: ['drivers-bird-view.component.css']
        }),
        __metadata("design:paramtypes", [PubNubAngular,
            CookieService,
            Router,
            Http,
            ApiMessageService,
            ErrorService])
    ], DriversBirdViewComponent);
    return DriversBirdViewComponent;
}());
export { DriversBirdViewComponent };
