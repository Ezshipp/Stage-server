var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DeliveryModule } from './Delivery/Delivery.module';
import { APP_SettingRouting } from './app_setting.routing';
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var APP_SettingModule = /** @class */ (function () {
    function APP_SettingModule() {
    }
    APP_SettingModule = __decorate([
        NgModule({
            declarations: [],
            imports: [
                FormsModule,
                SharedModule,
                HttpModule, BusyModule,
                CommonModule,
                APP_SettingRouting,
                DeliveryModule
            ],
        })
    ], APP_SettingModule);
    return APP_SettingModule;
}());
export { APP_SettingModule };
