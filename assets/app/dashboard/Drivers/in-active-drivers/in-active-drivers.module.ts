import { InActiveDriversRouting } from './in-active-drivers.routing';
    import { InActiveDriversComponent } from './in-active-drivers.component';
    import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
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
            InActiveDriversComponent
        ],
        imports: [
            InActiveDriversRouting,
            FormsModule,
            SharedModule,
            HttpModule,
            CommonModule,
        ],
    })
    export class InActiveDriversModule {
    }
