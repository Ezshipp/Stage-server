// Angular Imports
import { RazorpayServiceChargeComponent } from './RazorpayServiceCharge.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { razorpayServiceRouting } from './RazorpayServiceCharge.routing';

// This Module's Components


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        razorpayServiceRouting,

        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RazorpayServiceChargeComponent,
    ],

})
export class RazorPayServiceModule {

}
