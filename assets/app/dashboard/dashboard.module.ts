import { SmscampaignComponent } from './smscampaign/smscampaign.component';
import { ZoneComponent } from './zoneCreation/zone.component';
import { DeliveryComponent } from './APP_Setting/Delivery/delivery.component';
import { APP_SettingComponent } from './APP_Setting/app.setting.component';
import { ImageUploadModule } from 'ng2-imageupload';
import { HRComponent } from './HR/HR.component';
import { CustomerCancelReasonsComponent } from './customer/customerCancelReasons/customerCancelReasons.component';
import { SharedModule } from './../shared/shared.module';
import { DatePickerModule } from 'ng2-datepicker';
import { dashboardRouting } from './dashboard.routing';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PremiumCustomerComponent } from './customer/premiumCustomer/premiumCustomer.component';
import { DriversComponent } from './Drivers/drivers.component';
import { OffersComponent } from './Offers/offers.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NQueOrdersModule } from './Orders/n-que-orders/n-que-orders.module';
import { ZonesComponent } from './Zones/Zones.component';
import { AdminUsersComponent } from './AdminUsers/AdminUsers.component';
import { ReportComponent } from './Report/report.component';
import { CancelOrderComponent } from './Orders/cancelOrders/cancelOrders.component';
import { OngoingJobsComponent } from './Orders/OngoingJobs/Ongoingjosb.component';
import { NewOrdersComponent } from './Orders/NewOrders/NewOrders.component';
import { AllOrdersComponent } from './Orders/allorders/allorders.component';
import { QueueordersComponent } from './Orders/queueorders/queueorders.component';
import { TrashOrdersComponent } from './Orders/TrashOrders/TrashOrders.component';
import { ExpiredOrdersComponent } from './Orders/ExpiredOrders/expiredOrders.component';
import { NQueOrdersComponent } from './Orders/n-que-orders/n-que-orders.component';
import { CompletedOrdersComponent } from './Orders/completedOrders/completedOrders.component';
import { ActiveCustomerComponent } from './customer/activeCustomers/activeCustomers.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { ChartModule } from 'angular2-highcharts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AgmCoreModule } from '@agm/core';
export function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    var exp = require('highcharts/modules/exporting');
    dd(hc);
    exp(hc);
    return hc;
  }
@NgModule({
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
    providers:[
        {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
        }
    ]
})
export class DashboardModule {
}