import { RouterModule } from '@angular/router';
import { BikerLeaveComponent } from './biker-leave.component';
var BikerLeaves = [
    { path: '', component: BikerLeaveComponent }
];
export var BikerLeavesRouting = RouterModule.forChild(BikerLeaves);
