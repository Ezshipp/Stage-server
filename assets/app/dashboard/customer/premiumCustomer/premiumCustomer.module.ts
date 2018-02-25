import { InvoicesComponent } from './invoices/invoices.component';
import { viewPremiumCustomerComponent } from './viewallPremiumCustomer/viewallPremiumCustomer.component';
import { RegisterPremiumCustomerComponent } from './registerPremiumCustomer/registerPremiumCustomer.component';
import { SharedModule } from './../../../shared/shared.module';
import { PremiumroutesRouting } from './premiumCustomer.routing';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        PremiumroutesRouting
    ],
})
export class PremiumCustomerModule {
}