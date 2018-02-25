var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { SeasonalModel } from './../../../front_end_models/seasonalModel';
import { Component, ChangeDetectorRef } from '@angular/core';
var DeactivateOffersComponent = /** @class */ (function () {
    function DeactivateOffersComponent(router, http, _ApiMessageService, _cookieService, ErrorService, _cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this.OffersList = [];
        this.url = '';
    }
    DeactivateOffersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = new SeasonalModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/View_Deactivate_Offers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OffersList = data.json().extras.OffersList;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    DeactivateOffersComponent = __decorate([
        Component({
            selector: 'app-DeactivateOffers',
            templateUrl: './DeactivateOffers.component.html',
            styleUrls: ['./DeactivateOffers.component.css']
        }),
        __metadata("design:paramtypes", [Router, Http, ApiMessageService, CookieService, ErrorService, ChangeDetectorRef])
    ], DeactivateOffersComponent);
    return DeactivateOffersComponent;
}());
export { DeactivateOffersComponent };
