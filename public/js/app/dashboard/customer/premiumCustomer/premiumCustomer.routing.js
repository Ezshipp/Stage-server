import { RouterModule } from '@angular/router';
var Premiumroutes = [
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
        path: 'COD_Report',
        loadChildren: './clientCOD/client_cod.modeule#clientCoddModule'
    }
];
export var PremiumroutesRouting = RouterModule.forChild(Premiumroutes);
