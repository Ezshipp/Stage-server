// Angular Imports
import { SharedModule } from '../../shared/shared.module';
import { PromotionalContactsComponent } from './PromotationContacts.component';
import { PromotionalComponentRouting } from './PromotationContacts.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// This Module's Components


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PromotionalComponentRouting,
        SharedModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [
        PromotionalContactsComponent,
    ],

})
export class PromotionalContactsModule {

}
