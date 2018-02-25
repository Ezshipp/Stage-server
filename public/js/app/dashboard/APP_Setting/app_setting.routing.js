import { RouterModule } from '@angular/router';
var APP_Setting = [
    { path: '', redirectTo: 'delivery_settings', pathMatch: 'full' },
    { path: 'delivery_settings', loadChildren: './Delivery/Delivery.module#DeliveryModule' }
];
export var APP_SettingRouting = RouterModule.forChild(APP_Setting);
