import { RouterModule } from '@angular/router';
var AllOrdersroutes = [
    { path: '', redirectTo: 'allorder', pathMatch: 'full' },
    { path: 'allorder', loadChildren: './allorder/allorder.module#AllOrderModule' },
    { path: 'pendingorders', loadChildren: './pendingorders/pendingorders.module#PendingOrdersModule' }
];
export var AllOrdersroutesRouting = RouterModule.forChild(AllOrdersroutes);
