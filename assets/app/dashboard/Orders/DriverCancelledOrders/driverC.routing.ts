import { DriverCancelledOrdersComponent } from './DriverCancelledOrders.component';
import { Routes, RouterModule } from '@angular/router';



const DriverCancelled: Routes = [
      {path:'',component:DriverCancelledOrdersComponent}



];
    export const DriverCancelledRouting = RouterModule.forChild(DriverCancelled);


