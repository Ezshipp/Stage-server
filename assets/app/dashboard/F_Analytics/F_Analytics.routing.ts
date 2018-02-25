import { Routes, RouterModule } from '@angular/router';
import { F_AnalyticsComponent } from './F_Analytics.component';


const FinanceAnalytics: Routes = [
    { path: '', component:  F_AnalyticsComponent }
];
export const  F_Routing = RouterModule.forChild(FinanceAnalytics);

