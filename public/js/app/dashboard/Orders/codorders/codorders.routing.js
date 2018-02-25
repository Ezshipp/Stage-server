import { CODOrdersComponent } from './codorders.component';
import { RouterModule } from '@angular/router';
var DASHBOARD = [
    { path: '', component: CODOrdersComponent }
];
export var CODOrderRouting = RouterModule.forChild(DASHBOARD);
