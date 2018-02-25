import { RouterModule } from '@angular/router';
import { AttendenceComponent } from './Attendence.component';
var AttendenceR = [
    { path: '', component: AttendenceComponent }
];
export var AttendenceRouting = RouterModule.forChild(AttendenceR);
