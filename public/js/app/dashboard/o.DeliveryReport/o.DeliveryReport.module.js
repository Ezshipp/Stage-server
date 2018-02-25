var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { O_Delivery_Report_Routing } from './o.DeliveryReport.routing';
import { SharedModule } from '../../shared/shared.module';
import { O_DeliveryReportComponent } from './o.DeliveryReport.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var O_Delivery_ReportModule = /** @class */ (function () {
    function O_Delivery_ReportModule() {
    }
    O_Delivery_ReportModule = __decorate([
        NgModule({
            declarations: [
                O_DeliveryReportComponent
            ],
            imports: [
                O_Delivery_Report_Routing,
                FormsModule,
                SharedModule,
                HttpModule,
                CommonModule,
            ],
        })
    ], O_Delivery_ReportModule);
    return O_Delivery_ReportModule;
}());
export { O_Delivery_ReportModule };
