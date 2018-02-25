import { BusyModule } from 'angular2-busy';
import { HttpModule } from '@angular/http';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AttendenceRouting } from './Attendence.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceComponent } from './Attendence.component';
import { DatePickerModule } from 'ng2-datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    AttendenceRouting,
    FormsModule,
    SharedModule,
    HttpModule,
    BusyModule,
    DatePickerModule,
    NgxPaginationModule,

  ],
  declarations: [AttendenceComponent]
})
export class AttendenceModule { }