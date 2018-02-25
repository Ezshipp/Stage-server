import { RouterModule } from '@angular/router';
import { F_AnalyticsComponent } from './F_Analytics.component';
var FinanceAnalytics = [
    { path: '', component: F_AnalyticsComponent }
];
export var F_Routing = RouterModule.forChild(FinanceAnalytics);
