import { CompletedOrdersComponent } from './completedOrders.component';
import { RouterModule } from '@angular/router';
var CompletedOrders = [
    { path: '', component: CompletedOrdersComponent }
];
export var CompletedOrdersRouting = RouterModule.forChild(CompletedOrders);
