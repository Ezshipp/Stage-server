import { AgentAllOrdersComponent } from './agentallorders.component';
import { Routes, RouterModule } from '@angular/router';



const DASHBOARD: Routes = [
      {path:'',component:AgentAllOrdersComponent}



];
    export const AgentAllordersRouting = RouterModule.forChild(DASHBOARD);


