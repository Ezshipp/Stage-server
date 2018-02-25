import { CreateOfferComponent } from './sessionalOffer.component';

import { CreateOfferRouting } from './createoffer.routing';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        CreateOfferComponent

    ],
    imports: [
        CreateOfferRouting,
        FormsModule,
        SharedModule,
        HttpModule, BusyModule,




        CommonModule
  


    ],
})
export class CreateOfferModule {

}