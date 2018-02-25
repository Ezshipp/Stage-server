import { OngoingJobsComponent } from './Ongoingjosb.component';
import { RouterModule } from '@angular/router';
var OngoingJobs = [
    { path: '', component: OngoingJobsComponent }
];
export var OngoingJobsRouting = RouterModule.forChild(OngoingJobs);
