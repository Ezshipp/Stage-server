import { CompletedOrdersComponent } from './completedOrders.component';
import { Routes, RouterModule } from '@angular/router';



const CompletedOrders: Routes = [
      {path:'',component:CompletedOrdersComponent}



];
    export const CompletedOrdersRouting = RouterModule.forChild(CompletedOrders);


