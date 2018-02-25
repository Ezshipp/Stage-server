import { AllOrdersComponent } from './allorders.component';
import { RouterModule } from '@angular/router';
var Allorders = [
    { path: '', component: AllOrdersComponent }
];
export var AllordersRouting = RouterModule.forChild(Allorders);
