import { ActiveDriversComponent } from './activeDrivers.component';
import { Routes, RouterModule } from '@angular/router';
const ActiveDrivers: Routes = [
      {path:'',component:ActiveDriversComponent}
];
    export const ActiveDriversRouting = RouterModule.forChild(ActiveDrivers);
