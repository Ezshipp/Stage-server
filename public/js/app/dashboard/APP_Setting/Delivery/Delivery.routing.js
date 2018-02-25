import { DeliveryComponent } from './delivery.component';
import { RouterModule } from '@angular/router';
var Delivery = [
    {
        path: '',
        component: DeliveryComponent
    }
];
export var DeliveryRouting = RouterModule.forChild(Delivery);
