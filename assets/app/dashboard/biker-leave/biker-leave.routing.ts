

import { Routes, RouterModule } from '@angular/router';
import { BikerLeaveComponent } from './biker-leave.component';



const BikerLeaves: Routes = [
    { path: '', component: BikerLeaveComponent }
];
export const BikerLeavesRouting = RouterModule.forChild(BikerLeaves);