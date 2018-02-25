import { Routes, RouterModule } from '@angular/router';
import { DriversBirdViewComponent } from './drivers-bird-view.component';

const DriversBirdView: Routes = [
    { path: '', component: DriversBirdViewComponent }
];
export const DriversBirdViewRouting = RouterModule.forChild(DriversBirdView);
