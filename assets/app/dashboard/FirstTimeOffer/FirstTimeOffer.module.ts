// Angular Imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { firstTimeOfferRouting } from './FirstTimeOffer.routing';
import { FirstTimeOfferComponent } from './FirstTimeOffer.component';
import { DatePickerModule } from 'ng2-datepicker';

// This Module's Components


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        firstTimeOfferRouting,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        DatePickerModule
    ],
    declarations: [
        FirstTimeOfferComponent,
    ],
    exports: [
        FirstTimeOfferComponent,
    ]
})
export class FirstTimeOfferModule {

}
