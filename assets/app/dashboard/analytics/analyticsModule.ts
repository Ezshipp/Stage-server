import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AgmCoreModule } from '@agm/core';
import { ChartModule } from 'angular2-highcharts';
import { DatePickerModule } from 'ng2-datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnalyticsRouting } from './analyticsrouting';
export function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
  }
@NgModule({
  imports: [
    CommonModule,
    AnalyticsRouting,
    FormsModule,
    SharedModule,
    HttpModule,


    ChartModule,
    AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
            libraries: ["drawing","places"]
        }),
  ],
  providers:[
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
] ,
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }