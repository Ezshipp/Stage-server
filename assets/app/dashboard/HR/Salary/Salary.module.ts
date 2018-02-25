import { SalaryRouting } from './Salary.routing';
import { SalaryComponent } from './Salary.component';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from './../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailSalaryComponentComponent } from './detailSalaryComponent/detailSalaryComponent.component';
import { EmployeeExpensesComponent } from './employeeExpenses/employeeExpenses.component';
import { EmployeePaySlipComponent } from './employeePaySlip/employeePaySlip.component';
import { ImageUploadModule } from 'ng2-imageupload';

@NgModule({
    declarations: [

    DetailSalaryComponentComponent,
    EmployeeExpensesComponent,
    EmployeePaySlipComponent
],
    imports: [
        SalaryRouting,
        FormsModule,
        SharedModule,
        HttpModule,
        BusyModule,
        CommonModule,
        NgxPaginationModule,
        ImageUploadModule



    ],
})
export class SalaryModule {

}