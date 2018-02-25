import { O_Delivery_Report_Routing } from './o.DeliveryReport.routing';
import { SharedModule } from '../../shared/shared.module';
import { O_DeliveryReportComponent } from './o.DeliveryReport.component';


import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
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
export class O_Delivery_ReportModule {
}