import { ExpiredOrdersComponent } from './expiredOrders.component';
import { RouterModule } from '@angular/router';
var DASHExpiredOrdersBOARD = [
    {
        path: '',
        component: ExpiredOrdersComponent
    }
];
export var ExpiredOrdersRouting = RouterModule.forChild(DASHExpiredOrdersBOARD);
