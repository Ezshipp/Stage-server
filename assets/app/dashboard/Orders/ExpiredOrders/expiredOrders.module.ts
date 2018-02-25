import { ExpiredOrdersRouting } from './expiredOrders.routing';
import { SharedModule } from '../../../shared/shared.module';
import { ExpiredOrdersComponent } from './expiredOrders.component';

import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        ExpiredOrdersComponent
    ],
    imports: [
        ExpiredOrdersRouting,
        FormsModule,
SharedModule,
        HttpModule,

        CommonModule,

    ],
})
export class ExpiredOrdersModule {
}