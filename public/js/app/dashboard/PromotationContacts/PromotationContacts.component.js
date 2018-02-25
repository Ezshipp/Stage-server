var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ExpiredJobsModel } from '../../front_end_models/expiredModel';
import { ErrorService } from '../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component } from '@angular/core';
var PromotionalContactsComponent = /** @class */ (function () {
    function PromotionalContactsComponent(http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.export_Loadin = 'Export Data';
        this.excellData = [];
        this.PromotionalContactsData = [];
        this.sortOptions = {
            "Name": 1
        };
        this.limit = 10;
        this.skip = 0;
        this.url = '';
    }
    PromotionalContactsComponent.prototype.ngOnInit = function () {
        this.getPromotionalContacts(1, '/Find_All_Contacts_Promotional');
    };
    PromotionalContactsComponent.prototype.getPromotionalContacts = function (type, url, searchValue) {
        var _this = this;
        this.isRequesting = true;
        var body = new ExpiredJobsModel(null, this.skip, this.limit, searchValue, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.isRequesting = false;
                if (type == 1) {
                    _this.p = 1;
                    _this.isSearch = false;
                    _this.PromotionalContactsData = data.json().extras.ContactData;
                    _this.Total_Count = data.json().extras.Count;
                }
                else if (type == 2) {
                    _this.PromotionalContactsData = data.json().extras.ContactData;
                }
                else if (type == 3) {
                    setTimeout(function () {
                        _this.PromotionalContactsData = data.json().extras.ContactData;
                        if (_this.PromotionalContactsData.length == 0) {
                            _this.isSearch = false;
                        }
                    }, 2000);
                }
            }
            else {
                _this.isRequesting = false;
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
    PromotionalContactsComponent.prototype.pageChanged = function (event) {
        this.p = event;
        var p = this.p - 1;
        this.isRequesting = true;
        var skip_value = p * this.limit;
        this.skip = skip_value;
        this.isRequesting = true;
        this.getPromotionalContacts(2, '/Find_All_Contacts_Promotional');
    };
    PromotionalContactsComponent.prototype.edit = function (item, i) {
        this.views = i;
    };
    PromotionalContactsComponent.prototype.close = function () {
        this.views = -1;
    };
    PromotionalContactsComponent.prototype.valuechange = function (value) {
        var _this = this;
        this.mymodel = value;
        var length = value.length;
        setTimeout(function () {
            if (length >= 3) {
                _this.isSearch = true;
                _this.activeId = null;
                _this.PromotionalContactsData = [];
                _this.isRequesting = true;
                _this.getPromotionalContacts(3, '/Find_All_Contacts_Promotional', _this.mymodel);
            }
            else {
                _this.activeId = null;
                _this.skip = 0;
                _this.ngOnInit();
            }
        }, 2000);
    };
    PromotionalContactsComponent.prototype.OnClumnSort = function (key, ev) {
        this.activeId = ev.target.id;
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
        this.sortOptions[key] = sort;
        this.ngOnInit();
        this.p = 1;
    };
    PromotionalContactsComponent.prototype.OnselectCount = function (event) {
        this.limit = event.target.value;
        this.skip = 0;
        this.ngOnInit();
        this.p = 1;
    };
    PromotionalContactsComponent.prototype.OnExcel_Download = function () {
        this.export_Loadin = 'Downlaoding ...';
        this.getPromotional_Excel(0);
    };
    PromotionalContactsComponent.prototype.getPromotional_Excel = function (skip) {
        var _this = this;
        var sortoptions = {};
        var body = new ExpiredJobsModel(null, skip, 50, null, sortoptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Contacts_Promotional', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var resultdata = [];
                resultdata = data.json().extras.ContactData;
                if (resultdata.length == 0) {
                    _this.export_Loadin = 'Export Data';
                    var csvData = _this.ErrorService.ConvertToCSV(_this.excellData);
                    var a = document.createElement("a");
                    a.setAttribute('style', 'display:none;');
                    document.body.appendChild(a);
                    var blob = new Blob([csvData], { type: 'text/csv' });
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'PromotionalContacts.csv';
                    a.click();
                    return 'success';
                }
                else {
                    skip = skip + resultdata.length;
                    Array.prototype.push.apply(_this.excellData, resultdata);
                    _this.getPromotional_Excel(skip);
                }
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    PromotionalContactsComponent = __decorate([
        Component({
            selector: 'app-promoto',
            templateUrl: './PromotationContacts.component.html',
            styleUrls: ['./PromotationContacts.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], PromotionalContactsComponent);
    return PromotionalContactsComponent;
}());
export { PromotionalContactsComponent };
