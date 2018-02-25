import { SharedModule } from '../../../../shared/shared.module';
import { viewPremiumCustomerRouting } from './viewallPremiumCustomer.routing';
import { viewPremiumCustomerComponent } from './viewallPremiumCustomer.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
        viewPremiumCustomerComponent
    ],
    imports: [
        viewPremiumCustomerRouting,
        FormsModule,SharedModule,
        CommonModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCGqvB1CHq37znhRdqqPucceTGw74Yaruk',
            libraries: ["drawing","places"]
        })
    ],
})
export class  view_all_PremiumCustomerModule {
}