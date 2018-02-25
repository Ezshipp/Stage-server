import { PendingOrdersComponent } from './pendingorders.component';
import { Routes, RouterModule } from '@angular/router';



const PendingOrders: Routes = [
      {path:'',component:PendingOrdersComponent}



];
    export const PendingordersRouting = RouterModule.forChild(PendingOrders);
