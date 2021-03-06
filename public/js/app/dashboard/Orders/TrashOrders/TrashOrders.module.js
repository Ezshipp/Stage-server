var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TrashOrdersRouting } from './Trashorders.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashOrdersComponent } from './TrashOrders.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
var TrashOrdersModule = /** @class */ (function () {
    function TrashOrdersModule() {
    }
    TrashOrdersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TrashOrdersRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                BusyModule, NgxPaginationModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
                })
            ],
            declarations: [TrashOrdersComponent]
        })
    ], TrashOrdersModule);
    return TrashOrdersModule;
}());
export { TrashOrdersModule };
