import { NewOrdersComponent } from './NewOrders.component';
import { RouterModule } from '@angular/router';
var NewOrders = [
    { path: '', component: NewOrdersComponent }
];
export var NewOrdersRouting = RouterModule.forChild(NewOrders);
