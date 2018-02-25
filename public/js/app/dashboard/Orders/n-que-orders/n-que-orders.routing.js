import { RouterModule } from '@angular/router';
import { NQueOrdersComponent } from './n-que-orders.component';
var NQueOrders = [
    {
        path: '',
        component: NQueOrdersComponent
    }
];
export var NQueOrdersRouting = RouterModule.forChild(NQueOrders);
