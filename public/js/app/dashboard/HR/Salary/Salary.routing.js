import { DetailSalaryComponentComponent } from './detailSalaryComponent/detailSalaryComponent.component';
import { RouterModule } from '@angular/router';
import { EmployeeExpensesComponent } from './employeeExpenses/employeeExpenses.component';
var SalaryRou = [
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
export var SalaryRouting = RouterModule.forChild(SalaryRou);
