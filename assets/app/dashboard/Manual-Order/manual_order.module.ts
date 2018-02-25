import { Manual_orderRouting } from './manual_order.routing';
import { ManualOrderComponent } from './manual_order.component';
import { SharedModule } from './../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
       ManualOrderComponent

    ],
    imports: [
     Manual_orderRouting,
        FormsModule,
SharedModule,
        HttpModule,




        CommonModule,


    ],
})
export class  ManualOrderModule {

}