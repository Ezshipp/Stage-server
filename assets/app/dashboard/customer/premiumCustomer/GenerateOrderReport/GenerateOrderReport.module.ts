import { SharedModule } from '../../../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { GenerateOrderReportComponent } from './GenerateOrderReport.component';
import { GenerateOrderReportRouting } from './GenerateOrderReport.routing';
@NgModule({
    declarations: [
        GenerateOrderReportComponent
    ],
    imports: [
        GenerateOrderReportRouting,
        NgxPaginationModule,
        FormsModule,
        CommonModule,
        HttpModule,
        SharedModule
    ],
})
export class GenerateOrderReportModule {
}