import { InActiveDriversComponent } from './in-active-drivers.component';
import { Routes, RouterModule } from '@angular/router';

const InActiveDrivers: Routes = [
    {
        path: '',
        component: InActiveDriversComponent
    }
];
export const InActiveDriversRouting = RouterModule.forChild(InActiveDrivers);