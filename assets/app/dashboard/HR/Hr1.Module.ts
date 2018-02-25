import { HrOneRouting } from './Hr1.routing';
import { HRComponent } from './HR.component';

import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
      HRComponent

    ],
    imports: [
        HrOneRouting,
        FormsModule,
        CommonModule,
        HttpModule,







    ],
})
export class HrOneModule {

}