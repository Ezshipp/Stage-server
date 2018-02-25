import { QueueordersComponent } from './queueorders.component';
import { RouterModule } from '@angular/router';
var QueueOrders = [
    { path: '', component: QueueordersComponent }
];
export var QueueOrdersRouting = RouterModule.forChild(QueueOrders);
