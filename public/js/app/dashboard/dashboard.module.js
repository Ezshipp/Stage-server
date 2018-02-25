var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SmscampaignComponent } from './smscampaign/smscampaign.component';
import { ZoneComponent } from './zoneCreation/zone.component';
import { SharedModule } from './../shared/shared.module';
import { dashboardRouting } from './dashboard.routing';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PremiumCustomerComponent } from './customer/premiumCustomer/premiumCustomer.component';
import { DriversComponent } from './Drivers/drivers.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { AdminUsersComponent } from './AdminUsers/AdminUsers.component';
import { AllOrdersComponent } from './Orders/allorders/allorders.component';
import { ChartModule } from 'angular2-highcharts';
export function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
}
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        NgModule({
            declarations: [
                AllOrdersComponent,
                PremiumCustomerComponent,
                DriversComponent,
                ZoneComponent,
                AdminUsersComponent,
                SmscampaignComponent
            ],
            imports: [
                FormsModule,
                HttpModule,
                dashboardRouting,
                CommonModule,
                SharedModule,
                ChartModule,
            ],
            providers: [
                {
                    provide: HighchartsStatic,
                    useFactory: highchartsFactory
                }
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
export { DashboardModule };
