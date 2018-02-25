import { CancelOrderComponent } from './cancelOrders.component';
import { Routes, RouterModule } from '@angular/router';



const CancelOrderR: Routes = [
      {path:'',component:CancelOrderComponent}



];
    export const CancelOrderRouting = RouterModule.forChild(CancelOrderR);


