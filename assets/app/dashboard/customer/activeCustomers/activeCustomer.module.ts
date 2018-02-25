import { ActiveCustomerComponent } from './activeCustomers.component';
import { ActiveCustomerRouting } from './activeCustomer.routing';
import { SharedModule } from './../../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
     ActiveCustomerComponent
],
    imports: [
        ActiveCustomerRouting,
        FormsModule,
SharedModule,
        HttpModule,




        CommonModule,


    ],
})
export class ActiveCustomerodule {

}