import { DetailSalaryComponentComponent } from './detailSalaryComponent/detailSalaryComponent.component';
import { SalaryComponent } from './Salary.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePaySlipComponent } from './employeePaySlip/employeePaySlip.component';
import { EmployeeExpensesComponent } from './employeeExpenses/employeeExpenses.component';


const SalaryRou: Routes = [
    {
        path: '',
        redirectTo: 'Expenses_D',
        pathMatch: 'full'
    },
    {
        path: 'Salary_D',
        component: DetailSalaryComponentComponent
    },

    {
        path: 'Expenses_D',
        component: EmployeeExpensesComponent
    }
];
export const SalaryRouting = RouterModule.forChild(SalaryRou);