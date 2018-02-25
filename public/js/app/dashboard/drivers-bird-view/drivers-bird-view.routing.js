import { RouterModule } from '@angular/router';
import { DriversBirdViewComponent } from './drivers-bird-view.component';
var DriversBirdView = [
    { path: '', component: DriversBirdViewComponent }
];
export var DriversBirdViewRouting = RouterModule.forChild(DriversBirdView);
