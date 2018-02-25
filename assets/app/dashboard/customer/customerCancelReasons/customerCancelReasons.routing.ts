
import { Routes, RouterModule } from '@angular/router';
import { CustomerCancelReasonsComponent } from './customerCancelReasons.component';

const CustomerReasons: Routes = [
    {
        path: '',
        component: CustomerCancelReasonsComponent
    }
];
export const CustomerReasonsRouting = RouterModule.forChild(CustomerReasons);
