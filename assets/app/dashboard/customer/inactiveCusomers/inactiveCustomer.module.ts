import { InActiveCustomerRouting } from './inactiveCusomer.routing';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InActiveCustomerComponent } from './InactiveCustomers.component';
@NgModule({
    declarations: [

    InActiveCustomerComponent
    ],
    imports: [
        InActiveCustomerRouting,
        FormsModule,
        SharedModule,
        HttpModule,
        CommonModule,
    ],
})
export class InactiveCustomerModule {
}