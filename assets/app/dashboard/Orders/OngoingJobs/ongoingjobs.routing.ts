import { OngoingJobsComponent } from './Ongoingjosb.component';
import { Routes, RouterModule } from '@angular/router';

const OngoingJobs: Routes = [
      {path:'',component:OngoingJobsComponent}

];
    export const OngoingJobsRouting = RouterModule.forChild(OngoingJobs);

