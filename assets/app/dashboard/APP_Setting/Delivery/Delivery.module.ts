import { DeliveryRouting } from './Delivery.routing';
import { DeliveryComponent } from './delivery.component';
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
        DeliveryComponent
    ],
    imports: [
        DeliveryRouting,
        FormsModule,
        SharedModule,ReactiveFormsModule,
        HttpModule, BusyModule,
        CommonModule,
    ],
})
export class DeliveryModule {
}