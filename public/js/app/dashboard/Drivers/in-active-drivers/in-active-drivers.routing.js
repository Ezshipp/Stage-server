import { InActiveDriversComponent } from './in-active-drivers.component';
import { RouterModule } from '@angular/router';
var InActiveDrivers = [
    {
        path: '',
        component: InActiveDriversComponent
    }
];
export var InActiveDriversRouting = RouterModule.forChild(InActiveDrivers);
