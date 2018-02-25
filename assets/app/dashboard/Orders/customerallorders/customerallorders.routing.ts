import { CustomerAllOrdersComponent } from './customerallorders.component';
import { Routes, RouterModule } from '@angular/router';



const DASHBOARD: Routes = [
      {path:'',component:CustomerAllOrdersComponent}



];
    export const CustomerAllordersRouting = RouterModule.forChild(DASHBOARD);


