var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule, GoogleMapsAPIWrapper, PolylineManager } from '@agm/core';
// This Module's Components
import { NQueOrdersComponent } from './n-que-orders.component';
import { SharedModule } from '../../../shared/shared.module';
import { NQueOrdersRouting } from './n-que-orders.routing';
var NQueOrdersModule = /** @class */ (function () {
    function NQueOrdersModule() {
    }
    NQueOrdersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                NQueOrdersRouting,
                FormsModule, ReactiveFormsModule,
                SharedModule,
                HttpModule,
                BusyModule, NgxPaginationModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
                })
            ],
            providers: [
                PolylineManager,
                GoogleMapsAPIWrapper
            ],
            declarations: [
                NQueOrdersComponent,
            ],
            exports: [
                NQueOrdersComponent,
            ]
        })
    ], NQueOrdersModule);
    return NQueOrdersModule;
}());
export { NQueOrdersModule };
