var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { OffersRouting } from './offers.routing';
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var OffersModule = /** @class */ (function () {
    function OffersModule() {
    }
    OffersModule = __decorate([
        NgModule({
            declarations: [],
            imports: [
                OffersRouting,
                FormsModule,
                SharedModule,
                HttpModule, BusyModule,
                CommonModule
            ],
        })
    ], OffersModule);
    return OffersModule;
}());
export { OffersModule };
