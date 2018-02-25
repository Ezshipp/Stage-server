import { OngoingJobsRouting } from './ongoingjobs.routing';
import { OngoingJobsComponent } from './Ongoingjosb.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        OngoingJobsComponent

    ],
    imports: [
        OngoingJobsRouting,
        FormsModule,NgxPaginationModule,
SharedModule,
        HttpModule,BusyModule,




        CommonModule,
         AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
        })


    ],
})
export class OngoingJobsModule {

}