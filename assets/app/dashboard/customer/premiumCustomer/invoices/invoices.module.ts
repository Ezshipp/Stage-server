import { SharedModule } from '../../../../shared/shared.module';
import { InvoicesRouting } from './invoices.routing';
import { InvoicesComponent } from './invoices.component';

import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
      InvoicesComponent

    ],
    imports: [
        InvoicesRouting,NgxPaginationModule,
        FormsModule,
        CommonModule,
        HttpModule,
        SharedModule






    ],
})
export class Invoice_Premium_CustomerModule {

}