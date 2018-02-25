import { CancelReasonsRouting } from './cancelReasons.routing';
import { CancelReasonsComponent } from './cancelReasons.component';
import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        CancelReasonsComponent
    ],
    imports: [
        CancelReasonsRouting,
        FormsModule,
        SharedModule,
        HttpModule,
        CommonModule,
    ],
})
export class CancelReasonsModule {
}