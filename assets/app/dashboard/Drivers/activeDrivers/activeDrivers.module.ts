import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
import { ActiveDriversRouting } from './activeDrivers.routing';
import { ActiveDriversComponent } from './activeDrivers.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        ActiveDriversComponent
    ],
    imports: [
        ActiveDriversRouting,
        FormsModule,
        SharedModule,ReactiveFormsModule,
        HttpModule,DatePickerModule,
        CommonModule,
    ],
})
export class ActiveDrviersModule {
}