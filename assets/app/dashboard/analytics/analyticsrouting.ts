import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';


const Analytics: Routes = [
    { path: '', component:  AnalyticsComponent }
];
export const  AnalyticsRouting = RouterModule.forChild(Analytics);

