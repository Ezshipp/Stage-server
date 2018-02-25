import { AllOrdersComponent } from './allorders.component';
import { Routes, RouterModule } from '@angular/router';



const Allorders: Routes = [
      {path:'',component:AllOrdersComponent}



];
    export const AllordersRouting = RouterModule.forChild(Allorders);


