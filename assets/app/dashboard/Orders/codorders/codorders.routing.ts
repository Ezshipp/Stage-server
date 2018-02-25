import { CODOrdersComponent } from './codorders.component';
import { Routes, RouterModule } from '@angular/router';



const DASHBOARD: Routes = [
      {path:'',component:CODOrdersComponent}



];
    export const CODOrderRouting = RouterModule.forChild(DASHBOARD);


