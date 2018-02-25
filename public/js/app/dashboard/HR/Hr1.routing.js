import { HRComponent } from './HR.component';
import { RouterModule } from '@angular/router';
var DASHBOARD = [
    { path: '', component: HRComponent, loadChildren: './HR.module#HRModule' }
];
export var HrOneRouting = RouterModule.forChild(DASHBOARD);
