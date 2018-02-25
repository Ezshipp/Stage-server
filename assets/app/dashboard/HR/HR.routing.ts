import { AttendenceComponent } from './Attendence/Attendence.component';
import { SalaryComponent } from './Salary/Salary.component';
import { EmployeeComponent } from './Employee/Employee.component';

import { LoadChildren, RouterModule, Routes } from '@angular/router';


const HR_Employee: Routes = [
    { path: '', redirectTo:'employee', pathMatch: 'full' },
    { path: 'employee', loadChildren: './Employee/Employee.module#EmployeeModule' },
    { path: 'salary', component: SalaryComponent, loadChildren: './Salary/Salary.module#SalaryModule' },
    { path: 'Attendence', loadChildren: './Attendence/Attendence.module#AttendenceModule' }
    
];
export const HRRouting = RouterModule.forChild(HR_Employee);

