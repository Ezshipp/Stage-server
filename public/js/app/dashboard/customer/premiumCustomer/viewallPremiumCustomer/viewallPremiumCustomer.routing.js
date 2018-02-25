import { viewPremiumCustomerComponent } from './viewallPremiumCustomer.component';
import { RouterModule } from '@angular/router';
var viewPremiumCustomer = [
    {
        path: '',
        component: viewPremiumCustomerComponent
    }
];
export var viewPremiumCustomerRouting = RouterModule.forChild(viewPremiumCustomer);
