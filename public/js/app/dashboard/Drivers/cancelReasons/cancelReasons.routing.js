import { CancelReasonsComponent } from './cancelReasons.component';
import { RouterModule } from '@angular/router';
var CancelReasons = [
    {
        path: '',
        component: CancelReasonsComponent
    }
];
export var CancelReasonsRouting = RouterModule.forChild(CancelReasons);
