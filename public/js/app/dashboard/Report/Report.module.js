var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { ReportRouting } from './Report.routing';
import { ReportComponent } from './report.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
export function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
}
var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        NgModule({
            declarations: [
                ReportComponent
            ],
            imports: [
                ReportRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                Ng2FilterPipeModule,
                ChartModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["drawing"]
                })
            ],
            providers: [
                {
                    provide: HighchartsStatic,
                    useFactory: highchartsFactory
                },
            ]
        })
    ], ReportModule);
    return ReportModule;
}());
export { ReportModule };
