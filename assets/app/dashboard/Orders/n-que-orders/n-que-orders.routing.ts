import { Routes, RouterModule } from '@angular/router';
import { NQueOrdersComponent } from './n-que-orders.component';

const NQueOrders: Routes = [
    {
        path: '',
        component: NQueOrdersComponent
    }

];
export const NQueOrdersRouting = RouterModule.forChild(NQueOrders);

