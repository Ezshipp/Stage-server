import { DeactivateOffersComponent } from './DeactivateOffers.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeactivateOffersRouting } from './DeactivateOffers.routing';


@NgModule({
    declarations: [
        DeactivateOffersComponent

    ],
    imports: [
        DeactivateOffersRouting,
        FormsModule,
        SharedModule,
        HttpModule, BusyModule,




        CommonModule
        //  AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyCGqvB1CHq37znhRdqqPucceTGw74Yaruk'
        // })


    ],
})
export class DeactivateOffersModule {

}