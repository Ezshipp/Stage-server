import { notificationsComponent } from './notifications.component';
import { Routes, RouterModule } from '@angular/router';



const DASHBOARD: Routes = [
      {path:'',component:notificationsComponent}



];
    export const notificationsRouting = RouterModule.forChild(DASHBOARD);


