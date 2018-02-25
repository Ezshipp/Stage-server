import { Routes, RouterModule } from '@angular/router';
import { RazorpayServiceChargeComponent } from './RazorpayServiceCharge.component';


const razorpayService: Routes = [
    {
        path: '',
        component: RazorpayServiceChargeComponent
    }
];
export const razorpayServiceRouting = RouterModule.forChild(razorpayService);