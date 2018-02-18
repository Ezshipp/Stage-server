import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';



const DashboardOne: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivateChild:[AuthGuard],
        loadChildren: './dashboard.module#DashboardModule'
    }



];
export const DashboardOneRouting: ModuleWithProviders = RouterModule.forChild(DashboardOne);


