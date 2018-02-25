import { TrashOrdersComponent } from './TrashOrders.component';
import { RouterModule } from '@angular/router';
var TrashOrders = [
    {
        path: '',
        component: TrashOrdersComponent
    }
];
export var TrashOrdersRouting = RouterModule.forChild(TrashOrders);
