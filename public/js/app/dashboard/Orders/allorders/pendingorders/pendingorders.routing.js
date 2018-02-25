import { PendingOrdersComponent } from './pendingorders.component';
import { RouterModule } from '@angular/router';
var PendingOrders = [
    { path: '', component: PendingOrdersComponent }
];
export var PendingordersRouting = RouterModule.forChild(PendingOrders);
