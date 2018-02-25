import { ActiveCustomerComponent } from './activeCustomers.component';
import { Routes, RouterModule } from '@angular/router';



const ActiveCustomer: Routes = [
    { path: '', component: ActiveCustomerComponent }



];
export const ActiveCustomerRouting = RouterModule.forChild(ActiveCustomer);


