import { DriverCancelledOrdersComponent } from './DriverCancelledOrders.component';
import { RouterModule } from '@angular/router';
var DriverCancelled = [
    { path: '', component: DriverCancelledOrdersComponent }
];
export var DriverCancelledRouting = RouterModule.forChild(DriverCancelled);
