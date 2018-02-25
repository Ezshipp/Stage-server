import { OffersOneRouting } from './offers1.routing';
import { OffersComponent } from './offers.component';


import { BusyModule } from 'angular2-busy';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
      OffersComponent

    ],
    imports: [
        OffersOneRouting,
        FormsModule,
        CommonModule,
        HttpModule,







    ],
})
export class OffersOneModule {

}