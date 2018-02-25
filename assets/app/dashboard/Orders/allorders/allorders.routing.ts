import { AllOrderComponent } from './allorder/allorder.component';
import { PendingOrdersComponent } from './pendingorders/pendingorders.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


 const AllOrdersroutes: Routes = [
   { path: '', redirectTo:'allorder', pathMatch: 'full' },
    { path: 'allorder',loadChildren:'./allorder/allorder.module#AllOrderModule' },
    {path:'pendingorders',loadChildren:'./pendingorders/pendingorders.module#PendingOrdersModule' }    

];
export const AllOrdersroutesRouting = RouterModule.forChild(AllOrdersroutes);

