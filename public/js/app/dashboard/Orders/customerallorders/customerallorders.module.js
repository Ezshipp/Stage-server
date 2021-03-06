var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { CustomerAllordersRouting } from './customerallorders.routing';
import { CustomerAllOrdersComponent } from './customerallorders.component';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalFirstLetter.pipe';
var CustomerAllordersModule = /** @class */ (function () {
    function CustomerAllordersModule() {
    }
    CustomerAllordersModule = __decorate([
        NgModule({
            declarations: [
                CustomerAllOrdersComponent,
                CapitalizeFirstPipe
            ],
            imports: [
                CustomerAllordersRouting,
                FormsModule,
                SharedModule, ReactiveFormsModule,
                HttpModule, BusyModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["drawing", "places"]
                })
            ],
        })
    ], CustomerAllordersModule);
    return CustomerAllordersModule;
}());
export { CustomerAllordersModule };
