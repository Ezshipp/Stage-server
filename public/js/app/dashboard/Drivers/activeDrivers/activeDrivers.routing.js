import { ActiveDriversComponent } from './activeDrivers.component';
import { RouterModule } from '@angular/router';
var ActiveDrivers = [
    { path: '', component: ActiveDriversComponent }
];
export var ActiveDriversRouting = RouterModule.forChild(ActiveDrivers);
