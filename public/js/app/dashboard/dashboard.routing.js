import { SmscampaignComponent } from './smscampaign/smscampaign.component';
import { ZoneComponent } from './zoneCreation/zone.component';
import { DriversComponent } from "./Drivers/drivers.component";
import { PremiumCustomerComponent } from "./customer/premiumCustomer/premiumCustomer.component";
import { RouterModule } from "@angular/router";
import { AdminUsersComponent } from "./AdminUsers/AdminUsers.component";
import { AllOrdersComponent } from "./Orders/allorders/allorders.component";
var DASHBOARD1 = [
    {
        path: "packageWeight",
        loadChildren: "./APP_Setting/Package_Weight/Package_Weight.module#PackageWeightModule",
        data: { state: "packageWeight" }
    },
    {
        path: "apiDocument",
        loadChildren: "./APP_Setting/API_Document/API_Document.module#ApiDocumentModule",
        data: { state: "apiDocument" }
    },
    {
        path: "firstTimeOffer",
        loadChildren: "./FirstTimeOffer/FirstTimeOffer.module#FirstTimeOfferModule",
        data: { state: "firstTimeOffer" }
    },
    {
        path: "razorPayService",
        loadChildren: "./RazorpayServiceCharge/RazorpayServiceCharge.module#RazorPayServiceModule",
        data: { state: "razorPayService" }
    },
    {
        path: "codBikers",
        loadChildren: "./cod-bikers/cod-bikers.module#CodBikersModule",
        data: { state: "codBikers" }
    },
    {
        path: "Zone",
        component: ZoneComponent, loadChildren: './zoneCreation/zone.module#ZonesModule',
        data: { state: "Zone" }
    },
    {
        path: "zones",
        loadChildren: "./Zones/zones.module#ZonesModule",
        data: { state: "zones" }
    },
    {
        path: "adminUsers",
        component: AdminUsersComponent, loadChildren: "./AdminUsers/AdminUsers.module#AdminUserModule",
        data: { state: "adminUsers" }
    },
    {
        path: "customerallorders",
        loadChildren: "./Orders/customerallorders/customerallorders.module#CustomerAllordersModule",
        data: { state: "customerallorders" }
    },
    {
        path: "agentallorders",
        loadChildren: "./Orders/agentallorders/agentallorders.module#AgentAllordersModule",
        data: { state: "agentallorders" }
    },
    {
        path: "notifications",
        loadChildren: "./Orders/notifications/notifications.module#notificationsModule",
        data: { state: "notifications" }
    },
    {
        path: "codreport",
        loadChildren: "./Orders/codorders/codorders.module#CODOrdersModule",
        data: { state: "codreport" }
    },
    {
        path: "report",
        loadChildren: "./Report/Report.module#ReportModule",
        data: { state: "report" }
    },
    {
        path: "cancel",
        loadChildren: "./Orders/cancelOrders/cancelorders.module#CancelorderModule",
        data: { state: "cancel" }
    },
    {
        path: "ongoing",
        loadChildren: "./Orders/OngoingJobs/ongoingjobs.module#OngoingJobsModule",
        data: { state: "ongoing" }
    },
    {
        path: "newOrders",
        loadChildren: "./Orders/NewOrders/newOrders.module#NewOrdersModule",
        data: { state: "newOrders" }
    },
    {
        path: "allorders",
        component: AllOrdersComponent,
        loadChildren: "./Orders/allorders/allorders.module#AllOrdersModule",
        data: { state: "allorders" }
    },
    {
        path: "queueorders",
        loadChildren: "./Orders/queueorders/queueorders.module#QueueOrdersModule",
        data: { state: "queueorders" }
    },
    {
        path: "trash",
        loadChildren: "./Orders/TrashOrders/TrashOrders.module#TrashOrdersModule",
        data: { state: "trash" }
    },
    {
        path: "expired",
        loadChildren: "./Orders/ExpiredOrders/expiredOrders.module#ExpiredOrdersModule"
    },
    {
        path: "NewQueOrders",
        loadChildren: "./Orders/n-que-orders/n-que-orders.module#NQueOrdersModule",
        data: { state: "NewQueOrders" }
    },
    {
        path: "completed",
        loadChildren: "./Orders/completedOrders/completedorders.module#CompletedOrdersModule",
        data: { state: "active_Customer" }
    },
    {
        path: "active_Customer",
        loadChildren: "./customer/activeCustomers/activeCustomer.module#ActiveCustomerodule#InactiveCustomerModule",
        data: { state: "in_active_Customer" }
    },
    {
        path: "in_active_Customer",
        loadChildren: "./customer/InactiveCustomers/inactiveCustomer.module#InactiveCustomerModule",
        data: { state: "customer_Reason" }
    },
    {
        path: "customer_Reason",
        loadChildren: "./customer/customerCancelReasons/customerCancelReasons.module#CustomerCancelModule",
        data: { state: "report" }
    },
    {
        path: "analytics",
        loadChildren: "./analytics/analyticsModule#AnalyticsModule",
        data: { state: "analytics" }
    },
    {
        path: "store",
        loadChildren: "./stores/stores.module#StoreModule",
        data: { state: "store" }
    },
    {
        path: "promotion",
        loadChildren: "./promotion/promotion.module#PromotionModule",
        data: { state: "promotion" }
    },
    {
        path: "O_D_report",
        loadChildren: "./o.DeliveryReport/o.DeliveryReport.module#O_Delivery_ReportModule",
        data: { state: "O_D_report" }
    },
    {
        path: "logs",
        loadChildren: "./logs/logs.module#LogsModule",
        data: { state: "logs" }
    },
    {
        path: "FAndF",
        loadChildren: "./F_Analytics/F_Analytics.module#F_AnalyticsModule",
        data: { state: "FAndF" }
    },
    {
        path: "BirdsView",
        loadChildren: "./drivers-bird-view/drivers-bird-view.module#DriversBirdViewModule",
        data: { state: "BirdsView" }
    },
    {
        path: "drviver_c",
        loadChildren: "./Orders/DriverCancelledOrders/DriverCancelledModule#DriverCancelledModule",
        data: { state: "drviver_c" }
    },
    {
        path: "zones",
        loadChildren: "./Zones/zones.module#ZonesModule",
        data: { state: "zones" }
    },
    {
        path: "Promotaional_C",
        loadChildren: "./PromotationContacts/PromotationContacts.module#PromotionalContactsModule",
        data: { state: "Promotaional_C" }
    },
    {
        path: "onGoingBikers",
        loadChildren: "./Drivers/on-going-bikers/on-going-bikers.module#OnGoingBikersModule",
        data: { state: "onGoingBikers" }
    },
    {
        path: "hr",
        loadChildren: "./HR/Hr1.Module#HrOneModule",
        data: { state: "hr" }
    },
    {
        path: "v_api",
        loadChildren: "./vendorsApiRequests/vendorsApiRequests.module#VendorsApiRequestModule",
        data: { state: "v_api" }
    },
    {
        path: "offers",
        loadChildren: "./Offers/offers1.module#OffersOneModule",
        data: { state: "offers" }
    },
    {
        path: "premium_Customer",
        component: PremiumCustomerComponent,
        loadChildren: "./customer/premiumCustomer/premiumCustomer.module#PremiumCustomerModule",
        data: { state: "premium_Customer" }
    },
    {
        path: "app_setting",
        loadChildren: "./APP_Setting/App_Setting1.module#App_settingOneModule",
        data: { state: "app_setting" }
    },
    {
        path: "leaves",
        loadChildren: "./biker-leave/biker-leave.module#Bikers_leaveModule",
        data: { state: "leaves" }
    },
    {
        path: "smsSetting",
        loadChildren: "./APP_Setting/SmsSettings/smsSettings.module#SMSModule",
        data: { state: "smsSetting" }
    },
    {
        path: "smsCampaign", component: SmscampaignComponent,
        loadChildren: "./smscampaign/smscampaign.module#SmscampaignModule",
        data: { state: "smsCampaign" }
    },
    {
        path: "drivers",
        component: DriversComponent,
        loadChildren: "./Drivers/drivers.module#DriversModule",
        data: { state: "drivers" }
    },
    // {
    //   path: "vendor_D",
    //   component: Vendors_DashboardComponent,
    //   loadChildren:
    //     "./customer/vendorsDashboard/vendorsDashboard.module#VenersDashboardModule",
    //   data: { state: "vendor_D" }
    // },
    { path: "", redirectTo: "analytics", pathMatch: "prefix" }
];
export var dashboardRouting = RouterModule.forChild(DASHBOARD1);
