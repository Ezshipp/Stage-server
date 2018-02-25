var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NewOrdersRouting } from './newOrders.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NewOrdersComponent } from './NewOrders.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
var NewOrdersModule = /** @class */ (function () {
    function NewOrdersModule() {
    }
    NewOrdersModule = __decorate([
        NgModule({
            declarations: [
                NewOrdersComponent
            ],
            imports: [
                NewOrdersRouting,
                FormsModule,
                SharedModule, NgxPaginationModule,
                HttpModule, BusyModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
                })
            ],
        })
    ], NewOrdersModule);
    return NewOrdersModule;
}());
export { NewOrdersModule };
