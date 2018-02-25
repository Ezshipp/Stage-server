var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SalaryRouting } from './Salary.routing';
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
var SalaryModule = /** @class */ (function () {
    function SalaryModule() {
    }
    SalaryModule = __decorate([
        NgModule({
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
    ], SalaryModule);
    return SalaryModule;
}());
export { SalaryModule };
