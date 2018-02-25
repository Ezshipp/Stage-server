import { notificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
var DASHBOARD = [
    { path: '', component: notificationsComponent }
];
export var notificationsRouting = RouterModule.forChild(DASHBOARD);
