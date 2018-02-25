import { DeliveryComponent } from './delivery.component';
import { Routes, RouterModule } from '@angular/router';

const Delivery: Routes = [
    {
        path: '',
        component: DeliveryComponent
    }
];
export const DeliveryRouting = RouterModule.forChild(Delivery);
