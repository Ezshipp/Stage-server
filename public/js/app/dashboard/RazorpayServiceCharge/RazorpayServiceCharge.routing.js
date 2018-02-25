import { RouterModule } from '@angular/router';
import { RazorpayServiceChargeComponent } from './RazorpayServiceCharge.component';
var razorpayService = [
    {
        path: '',
        component: RazorpayServiceChargeComponent
    }
];
export var razorpayServiceRouting = RouterModule.forChild(razorpayService);
