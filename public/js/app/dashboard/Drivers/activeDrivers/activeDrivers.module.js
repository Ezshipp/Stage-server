var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
import { ActiveDriversRouting } from './activeDrivers.routing';
import { ActiveDriversComponent } from './activeDrivers.component';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var ActiveDrviersModule = /** @class */ (function () {
    function ActiveDrviersModule() {
    }
    ActiveDrviersModule = __decorate([
        NgModule({
            declarations: [
                ActiveDriversComponent
            ],
            imports: [
                ActiveDriversRouting,
                FormsModule,
                SharedModule, ReactiveFormsModule,
                HttpModule, DatePickerModule,
                CommonModule,
            ],
        })
    ], ActiveDrviersModule);
    return ActiveDrviersModule;
}());
export { ActiveDrviersModule };
