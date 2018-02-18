import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from "./Delivery/delivery.component";

 const APP_Setting: Routes = [
    { path: '', redirectTo:'delivery_settings', pathMatch: 'full' },
   { path: 'delivery_settings', loadChildren:'./Delivery/Delivery.module#DeliveryModule'}


];
export const APP_SettingRouting = RouterModule.forChild(APP_Setting);
