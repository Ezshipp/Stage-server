import { InActiveCustomerComponent } from './InactiveCustomers.component';
import { RouterModule } from '@angular/router';
var InActiveCustomerRo = [
    { path: '', component: InActiveCustomerComponent }
];
export var InActiveCustomerRouting = RouterModule.forChild(InActiveCustomerRo);
