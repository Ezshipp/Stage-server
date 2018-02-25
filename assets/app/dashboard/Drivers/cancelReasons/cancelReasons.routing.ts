import { CancelReasonsComponent } from './cancelReasons.component';
import { Routes, RouterModule } from '@angular/router';
const CancelReasons: Routes = [
    {
        path: '',
        component: CancelReasonsComponent
    }
];
export const CancelReasonsRouting = RouterModule.forChild(CancelReasons);
