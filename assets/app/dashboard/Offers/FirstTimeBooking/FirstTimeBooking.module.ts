import { ViewallofferssRouting } from './FirstTimeBooking.routing';
import { ViewallOffersComponent } from './firstTimeBooking.component';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from './../../../shared/shared.module';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        ViewallOffersComponent

    ],
    imports: [
        ViewallofferssRouting,
        FormsModule,
        SharedModule,
        HttpModule, 
        BusyModule,




        CommonModule
        //  AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyCGqvB1CHq37znhRdqqPucceTGw74Yaruk'
        // })


    ],
})
export class ViewallOffersModule {

}