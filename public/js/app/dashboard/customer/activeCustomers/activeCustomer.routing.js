import { ActiveCustomerComponent } from './activeCustomers.component';
import { RouterModule } from '@angular/router';
var ActiveCustomer = [
    { path: '', component: ActiveCustomerComponent }
];
export var ActiveCustomerRouting = RouterModule.forChild(ActiveCustomer);
