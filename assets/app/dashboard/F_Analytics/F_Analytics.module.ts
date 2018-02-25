import { SpinnerComponent } from '../../spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F_AnalyticsComponent } from './F_Analytics.component';
import { F_Routing } from './F_Analytics.routing';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DatePickerModule } from 'ng2-datepicker';
import { SharedModule } from '../../shared/shared.module';

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
    F_Routing,
    ChartModule,
    DatePickerModule,SharedModule
  ],
  declarations: [F_AnalyticsComponent],
  providers:[
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
] ,
})
export class F_AnalyticsModule { }