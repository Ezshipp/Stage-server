import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { AppCustomPreloader } from './app-routing-loader';
import { AuthGuard } from './authentication/auth.guard';

export const APP_ROUTES: Routes = [

    {
        path: 'signin',
        loadChildren: './authentication/signin/signin.module#SignInModule',
        data: { animation: 'signin' }
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard1.module#DashboardOneModule',
        canActivate:[AuthGuard],
        data: { animation: 'dashboard', preload: true }
    },

    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/signin',
    }
];
// export const routing = RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: AppCustomPreloader });