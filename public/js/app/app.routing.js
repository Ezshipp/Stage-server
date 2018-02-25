import { AuthGuard } from './authentication/auth.guard';
export var APP_ROUTES = [
    {
        path: 'signin',
        loadChildren: './authentication/signin/signin.module#SignInModule',
        data: { animation: 'signin' }
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard1.module#DashboardOneModule',
        canActivate: [AuthGuard],
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
