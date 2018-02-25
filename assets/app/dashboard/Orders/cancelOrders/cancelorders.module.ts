import { NgxPaginationModule } from 'ngx-pagination';
import { CancelOrderRouting } from './cancelorders.routing';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CancelOrderComponent } from './cancelOrders.component';


@NgModule({
    declarations: [
        CancelOrderComponent

    ],
    imports: [
        CancelOrderRouting,
        FormsModule,NgxPaginationModule,
SharedModule,
        HttpModule,BusyModule,




        CommonModule



    ],
})
export class CancelorderModule {

}