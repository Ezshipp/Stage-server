import { RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
var Analytics = [
    { path: '', component: AnalyticsComponent }
];
export var AnalyticsRouting = RouterModule.forChild(Analytics);
