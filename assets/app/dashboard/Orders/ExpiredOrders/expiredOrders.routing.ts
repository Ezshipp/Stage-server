import { ExpiredOrdersComponent } from './expiredOrders.component';
import { Routes, RouterModule } from '@angular/router';

const DASHExpiredOrdersBOARD: Routes = [
    {
        path: '',
        component: ExpiredOrdersComponent
    }

];
export const ExpiredOrdersRouting = RouterModule.forChild(DASHExpiredOrdersBOARD);

