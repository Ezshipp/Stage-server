import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';
var DashboardOne = [
    {
        path: '',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        loadChildren: './dashboard.module#DashboardModule'
    }
];
export var DashboardOneRouting = RouterModule.forChild(DashboardOne);
