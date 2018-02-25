import { NgxPaginationModule } from 'ngx-pagination';
import { CompletedOrdersComponent } from './completedOrders.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompletedOrdersRouting } from './completedorders.routing';

@NgModule({
    declarations: [
        CompletedOrdersComponent
    ],
    imports: [
        CompletedOrdersRouting,
        FormsModule,
SharedModule,NgxPaginationModule,
        HttpModule,BusyModule,


        CommonModule


    ],
})
export class CompletedOrdersModule {
}