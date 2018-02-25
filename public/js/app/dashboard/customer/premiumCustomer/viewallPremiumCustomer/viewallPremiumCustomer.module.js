var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from '../../../../shared/shared.module';
import { viewPremiumCustomerRouting } from './viewallPremiumCustomer.routing';
import { viewPremiumCustomerComponent } from './viewallPremiumCustomer.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var view_all_PremiumCustomerModule = /** @class */ (function () {
    function view_all_PremiumCustomerModule() {
    }
    view_all_PremiumCustomerModule = __decorate([
        NgModule({
            declarations: [
                viewPremiumCustomerComponent
            ],
            imports: [
                viewPremiumCustomerRouting,
                FormsModule, SharedModule,
                CommonModule,
                HttpModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCGqvB1CHq37znhRdqqPucceTGw74Yaruk',
                    libraries: ["drawing", "places"]
                })
            ],
        })
    ], view_all_PremiumCustomerModule);
    return view_all_PremiumCustomerModule;
}());
export { view_all_PremiumCustomerModule };
