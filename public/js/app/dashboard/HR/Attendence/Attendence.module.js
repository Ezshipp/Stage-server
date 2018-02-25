var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BusyModule } from 'angular2-busy';
import { HttpModule } from '@angular/http';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AttendenceRouting } from './Attendence.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceComponent } from './Attendence.component';
import { DatePickerModule } from 'ng2-datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
var AttendenceModule = /** @class */ (function () {
    function AttendenceModule() {
    }
    AttendenceModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                AttendenceRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                BusyModule,
                DatePickerModule,
                NgxPaginationModule,
            ],
            declarations: [AttendenceComponent]
        })
    ], AttendenceModule);
    return AttendenceModule;
}());
export { AttendenceModule };
