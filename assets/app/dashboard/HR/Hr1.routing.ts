import { HRComponent } from './HR.component';
import { Routes, RouterModule } from '@angular/router';



const DASHBOARD: Routes = [
      {path:'',component:HRComponent,loadChildren:'./HR.module#HRModule'}



];
    export const HrOneRouting = RouterModule.forChild(DASHBOARD);


