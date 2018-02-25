import { ManualOrderComponent } from './manual_order.component';
import { RouterModule } from '@angular/router';
var Manual_orderRou = [
    { path: '', component: ManualOrderComponent }
];
export var Manual_orderRouting = RouterModule.forChild(Manual_orderRou);
