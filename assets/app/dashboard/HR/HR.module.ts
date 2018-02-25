import { HRComponent } from './HR.component';
import { SalaryComponent } from './Salary/Salary.component';
import { HRRouting } from './HR.routing';
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        SalaryComponent

    ],
    imports: [
        FormsModule,
        SharedModule,
        HttpModule, ReactiveFormsModule,
        CommonModule,
        HRRouting





    ],
})
export class HRModule {

}