var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { smsCampaignModel } from '../../../front_end_models/smscampaignModel';
import { CreateAdminModel } from '../../../front_end_models/create_adminUserModel';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ErrorService } from '../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
var ViewallcampaignComponent = /** @class */ (function () {
    function ViewallcampaignComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ReceipientsData = [];
        this.ReceipientsPage = 1;
        this.skip_Receipients = 0;
        this.limit_Receipients = 10;
        this.sortOptions_Receipients = {};
        this.sortOptions = {};
        this.limit = 10;
        this.skip = 0;
        this.url = '';
        this.ALlCampaignsData = [];
        this.p = 1;
    }
    ViewallcampaignComponent.prototype.ngOnInit = function () {
        this.getALlCampaigns(1, '/List_All_SMS_Campaigns', this.skip, this.limit);
    };
    ViewallcampaignComponent.prototype.oncreatesmsCapaign = function () {
        this.onCreate_smsCampaign = true;
    };
    ViewallcampaignComponent.prototype.onCloseCreate_smsCampaign = function () {
        this.onCreate_smsCampaign = false;
    };
    ViewallcampaignComponent.prototype.getALlCampaigns = function (type, url, skip, limit, searchValue) {
        var _this = this;
        var body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), skip, limit, this.sortOptions, searchValue);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.ALlCampaignsData = data.json().extras.CampaignData;
                    if (_this.ALlCampaignsData.length > 0) {
                        _this.isData = false;
                        _this.isSearch = false;
                    }
                    else {
                        _this.isData = true;
                        _this.isSearch = true;
                    }
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.ALlCampaignsData = data.json().extras.CampaignData;
                    if (_this.ALlCampaignsData.length > 0) {
                        _this.isData = false;
                    }
                    else {
                        _this.isData = true;
                    }
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.ALlCampaignsData = data.json().extras.CampaignData;
                        if (_this.ALlCampaignsData.length == 0) {
                            _this.isSearch = false;
                        }
                    }, 1000);
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
    ViewallcampaignComponent.prototype.pageChanged = function (event) {
        this.detailviewIndex = null;
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.activeId = null;
        this.isRequesting = true;
        this.detailviewIndex = null;
        this.getALlCampaigns(2, '/List_All_SMS_Campaigns', this.skip, this.limit);
    };
    ViewallcampaignComponent.prototype.sortColumn = function (key) {
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
    ViewallcampaignComponent.prototype.valuechange = function (value) {
        var _this = this;
        this.detailviewIndex = null;
        this.searchValue = value;
        var length = value.length;
        this.activeId = null;
        setTimeout(function () {
            if (length >= 3) {
                _this.isSearch = true;
                _this.activeId = null;
                _this.ALlCampaignsData = [];
                _this.isRequesting = true;
                _this.getALlCampaigns(3, '/Search_All_SMS_Campaigns', _this.skip, _this.limit, _this.searchValue);
            }
            else {
                _this.activeId = null;
                _this.skip = 0;
                _this.ngOnInit();
            }
        }, 2000);
    };
    ViewallcampaignComponent.prototype.onRefresh_campaign = function (item, i) {
        this.refreshCampaign_index = i;
        var body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, item.CampaignID);
        this.onrefresh(body, 1, '/Refresh_SMS_Campaign');
    };
    ViewallcampaignComponent.prototype.onRefresh_campaignReceipients = function (ReceipientsData, j) {
        this.refresh_Receipients_index = j;
        var body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, null, null, null, ReceipientsData.ReferenceID);
        this.onrefresh(body, 2, '/Refresh_SMS_Campaign_Receipients');
    };
    ViewallcampaignComponent.prototype.onrefresh = function (body, type, url) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.detailviewIndex = null;
                    var campaignRefreshData = data.json().extras.CampaignData;
                    for (var i = 0; i < _this.ALlCampaignsData.length; i++) {
                        if (body.CampaignID == _this.ALlCampaignsData[i].CampaignID) {
                            _this.refreshCampaign_index = null;
                            _this.ALlCampaignsData[i].Total_SMS = campaignRefreshData.Total_SMS;
                            _this.ALlCampaignsData[i].Total_Delivered = campaignRefreshData.Total_Delivered;
                            _this.ALlCampaignsData[i].Total_Awaited_Delivery = campaignRefreshData.Total_Awaited_Delivery;
                            _this.ALlCampaignsData[i].Total_Failed = campaignRefreshData.Total_Failed;
                        }
                    }
                }
                else if (type == 2) {
                    var Refresh_RecipientsData = data.json().extras.ReceipientData;
                    for (var i = 0; i < _this.ReceipientsData.length; i++) {
                        if (body.ReferenceID == _this.ReceipientsData[i].ReferenceID) {
                            _this.refresh_Receipients_index = null;
                            _this.ReceipientsData[i].SMS_Status = Refresh_RecipientsData.SMS_Status;
                            _this.ReceipientsData[i].SMS_Message = Refresh_RecipientsData.SMS_Message;
                        }
                    }
                }
            }
        });
    };
    ViewallcampaignComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    ViewallcampaignComponent.prototype.OnClick_Row = function (item, i) {
        if (this.detailviewIndex == i) {
            this.detailviewIndex = -1;
        }
        else {
            this.All_Campaign_Receipients(1, '/List_All_Campaign_Receipients', item.CampaignID, this.skip_Receipients, this.limit_Receipients, this.sortOptions_Receipients);
            this.detailviewIndex = i;
        }
    };
    ViewallcampaignComponent.prototype.All_Campaign_Receipients = function (type, url, CampaignID, skip_Receipients, limit_Receipients, sortOptions, searchvalue) {
        var _this = this;
        this.CampaignID = CampaignID;
        var body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, CampaignID, skip_Receipients, limit_Receipients, sortOptions, searchvalue);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (type == 1) {
                    _this.ReceipientsPage = 1;
                    _this.ReceipientsData = data.json().extras.ReceipientData;
                    _this.Total_Count_Receipients = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.ReceipientsData = data.json().extras.ReceipientData;
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
    ViewallcampaignComponent.prototype.pageChanged_ReceipientsData = function (event) {
        this.ReceipientsPage = event;
        var p = this.ReceipientsPage - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit_Receipients;
        this.skip_Receipients = skip_value;
        this.isRequesting = true;
        this.All_Campaign_Receipients(2, '/List_All_Campaign_Receipients', this.CampaignID, this.skip_Receipients, this.limit_Receipients, this.sortOptions_Receipients);
    };
    ViewallcampaignComponent = __decorate([
        Component({
            selector: 'viewallcampaign',
            templateUrl: 'viewallcampaign.component.html',
            styleUrls: ["./viewallcampaign.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Http,
            ApiMessageService,
            ErrorService])
    ], ViewallcampaignComponent);
    return ViewallcampaignComponent;
}());
export { ViewallcampaignComponent };
