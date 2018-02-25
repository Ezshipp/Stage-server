import { OffersComponent } from './offers.component';
import { OffersRouting } from './offers.routing';
import { SharedModule } from './../../shared/shared.module';

import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [


    ],
    imports: [
        OffersRouting,
        FormsModule,
        SharedModule,
        HttpModule, BusyModule,




        CommonModule
    


    ],
})
export class OffersModule {

}