import { TrashOrdersComponent } from './TrashOrders.component';
import { Routes, RouterModule } from '@angular/router';

const TrashOrders: Routes = [
    {
        path: '',
        component: TrashOrdersComponent
    }

];
export const TrashOrdersRouting = RouterModule.forChild(TrashOrders);

