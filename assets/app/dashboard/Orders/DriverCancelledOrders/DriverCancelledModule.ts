import { DriverCancelledRouting } from './driverC.routing';
import { DriverCancelledOrdersComponent } from './DriverCancelledOrders.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        DriverCancelledOrdersComponent

    ],
    imports: [
        DriverCancelledRouting, NgxPaginationModule,
        FormsModule,
        SharedModule,ReactiveFormsModule,
        HttpModule, BusyModule,




        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
        })


    ],
})
export class DriverCancelledModule {

}