var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F_AnalyticsComponent } from './F_Analytics.component';
import { F_Routing } from './F_Analytics.routing';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DatePickerModule } from 'ng2-datepicker';
import { SharedModule } from '../../shared/shared.module';
export function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
}
var F_AnalyticsModule = /** @class */ (function () {
    function F_AnalyticsModule() {
    }
    F_AnalyticsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                F_Routing,
                ChartModule,
                DatePickerModule, SharedModule
            ],
            declarations: [F_AnalyticsComponent],
            providers: [
                {
                    provide: HighchartsStatic,
                    useFactory: highchartsFactory
                }
            ],
        })
    ], F_AnalyticsModule);
    return F_AnalyticsModule;
}());
export { F_AnalyticsModule };
