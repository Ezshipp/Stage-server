import { DashboardOneRouting } from './dashboard1.routing';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
    declarations: [
      DashboardComponent

    ],
    imports: [
        DashboardOneRouting,
        FormsModule,
        CommonModule,
        HttpModule,
        NgProgressModule
],
})
export class DashboardOneModule {

}