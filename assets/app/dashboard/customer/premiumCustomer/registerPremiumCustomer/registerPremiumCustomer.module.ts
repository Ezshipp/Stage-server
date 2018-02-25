import { RegisterPremium_CustomerRouting } from './registerPremiumCustomer.routing';
import { RegisterPremiumCustomerComponent } from './registerPremiumCustomer.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        RegisterPremiumCustomerComponent
    ],
    imports: [
        RegisterPremium_CustomerRouting,
        FormsModule,
        CommonModule,
        HttpModule,ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCGqvB1CHq37znhRdqqPucceTGw74Yaruk',
            libraries: ["drawing","places"]
        })
    ],
})
export class  RegisterPremiumCustomerModule {
}