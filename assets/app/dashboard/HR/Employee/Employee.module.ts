import { EmployeeComponent } from './Employee.component';
import { EmployeeRouting } from './Employee.routing';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from './../../../shared/shared.module';
import { ImageUploadModule } from 'ng2-imageupload';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports: [
        EmployeeRouting,
        FormsModule,
        SharedModule,
        HttpModule,
        BusyModule,
        CommonModule,
        ImageUploadModule,
        NgxPaginationModule
    ],
})
export class EmployeeModule {

}