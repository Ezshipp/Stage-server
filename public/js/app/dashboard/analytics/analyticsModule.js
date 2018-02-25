var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from './../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AgmCoreModule } from '@agm/core';
import { ChartModule } from 'angular2-highcharts';
import { AnalyticsRouting } from './analyticsrouting';
export function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
}
var AnalyticsModule = /** @class */ (function () {
    function AnalyticsModule() {
    }
    AnalyticsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                AnalyticsRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                ChartModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["drawing", "places"]
                }),
            ],
            providers: [
                {
                    provide: HighchartsStatic,
                    useFactory: highchartsFactory
                }
            ],
            declarations: [AnalyticsComponent]
        })
    ], AnalyticsModule);
    return AnalyticsModule;
}());
export { AnalyticsModule };
