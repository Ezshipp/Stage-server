import { viewPremiumCustomerComponent } from './viewallPremiumCustomer.component';
import { Routes, RouterModule } from '@angular/router';

const viewPremiumCustomer: Routes = [
    {
        path: '',
        component: viewPremiumCustomerComponent
    }
];
export const viewPremiumCustomerRouting = RouterModule.forChild(viewPremiumCustomer);
