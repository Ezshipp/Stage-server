import { ManualOrderComponent } from './manual_order.component';

import { Routes, RouterModule } from '@angular/router';



const Manual_orderRou: Routes = [
      {path:'',component:ManualOrderComponent}



];
    export const Manual_orderRouting = RouterModule.forChild(Manual_orderRou);


