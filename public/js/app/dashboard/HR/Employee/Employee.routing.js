import { EmployeeComponent } from './Employee.component';
import { RouterModule } from '@angular/router';
var EmployeeRou = [
    { path: '', component: EmployeeComponent }
];
export var EmployeeRouting = RouterModule.forChild(EmployeeRou);
