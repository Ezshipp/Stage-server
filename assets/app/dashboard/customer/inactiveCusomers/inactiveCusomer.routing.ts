import { InActiveCustomerComponent } from './InactiveCustomers.component';
import { Routes, RouterModule } from '@angular/router';
const InActiveCustomerRo: Routes = [
      {path:'',component:InActiveCustomerComponent}
];
    export const InActiveCustomerRouting = RouterModule.forChild(InActiveCustomerRo);
