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
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      var exp = require('highcharts/modules/exporting');
      
      dd(hc); 
      exp(hc);
      return hc;
    } 
@NgModule({
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
   providers:[
        {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
        },
   ] 
})
export class ReportModule { 
}