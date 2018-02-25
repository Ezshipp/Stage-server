import { InvoicesComponent } from './invoices/invoices.component';
import { viewPremiumCustomerComponent } from './viewallPremiumCustomer/viewallPremiumCustomer.component';
import { RegisterPremiumCustomerComponent } from './registerPremiumCustomer/registerPremiumCustomer.component';
import { Routes, RouterModule } from '@angular/router';
const Premiumroutes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full'
  },
  {
    path: 'register_premium',
    loadChildren: './registerPremiumCustomer/registerPremiumCustomer.module#RegisterPremiumCustomerModule'
  },
  {
    path: 'view',
    loadChildren: './viewallPremiumCustomer/viewallPremiumCustomer.module#view_all_PremiumCustomerModule'
  },
  {
    path: 'invoices',
    loadChildren: './invoices/invoices.module#Invoice_Premium_CustomerModule'
  },
  {
    path: 'genReport',
    loadChildren: './GenerateOrderReport/GenerateOrderReport.module#GenerateOrderReportModule'
  },
  {
    path:'COD_Report',
    loadChildren:'./clientCOD/client_cod.modeule#clientCoddModule'
  }
];
export const PremiumroutesRouting = RouterModule.forChild(Premiumroutes);
