import { CustomerAllOrdersComponent } from './customerallorders.component';
import { RouterModule } from '@angular/router';
var DASHBOARD = [
    { path: '', component: CustomerAllOrdersComponent }
];
export var CustomerAllordersRouting = RouterModule.forChild(DASHBOARD);
