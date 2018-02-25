import { NewOrdersComponent } from './NewOrders.component';
import { Routes, RouterModule } from '@angular/router';

const NewOrders: Routes = [
      {path:'',component:NewOrdersComponent}

];
    export const NewOrdersRouting = RouterModule.forChild(NewOrders);

