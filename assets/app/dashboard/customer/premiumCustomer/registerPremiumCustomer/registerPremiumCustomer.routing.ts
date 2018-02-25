import { RegisterPremiumCustomerComponent } from './registerPremiumCustomer.component';
import { Routes, RouterModule } from '@angular/router';
const RegisterPremium_Customer: Routes = [
    { path: '', component: RegisterPremiumCustomerComponent, }
];
export const RegisterPremium_CustomerRouting = RouterModule.forChild(RegisterPremium_Customer);
