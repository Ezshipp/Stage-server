import { EmployeeComponent } from './Employee.component';
import { Routes, RouterModule } from '@angular/router';


const EmployeeRou: Routes = [
    { path: '', component:  EmployeeComponent }
];
export const EmployeeRouting = RouterModule.forChild(EmployeeRou);

