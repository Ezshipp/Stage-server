import { RouterModule } from '@angular/router';
import { CustomerCancelReasonsComponent } from './customerCancelReasons.component';
var CustomerReasons = [
    {
        path: '',
        component: CustomerCancelReasonsComponent
    }
];
export var CustomerReasonsRouting = RouterModule.forChild(CustomerReasons);
