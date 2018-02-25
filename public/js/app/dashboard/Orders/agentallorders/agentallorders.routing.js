import { AgentAllOrdersComponent } from './agentallorders.component';
import { RouterModule } from '@angular/router';
var DASHBOARD = [
    { path: '', component: AgentAllOrdersComponent }
];
export var AgentAllordersRouting = RouterModule.forChild(DASHBOARD);
