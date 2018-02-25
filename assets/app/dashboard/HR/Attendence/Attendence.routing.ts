import { Routes, RouterModule } from '@angular/router';
import { AttendenceComponent } from './Attendence.component';


const AttendenceR: Routes = [
    { path: '', component:  AttendenceComponent }
];
export const AttendenceRouting = RouterModule.forChild(AttendenceR);

