
// import { AllOrdersroutesRouting } from '../allorders.routing';
// import { AllOrdersComponent } from '../allorders.component';
import { PendingOrdersComponent } from './pendingorders.component';
import { PendingordersRouting } from './pendingorders.routing';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
// import { CapitalizeFirstPipe } from '../capitalFirstLetter.pipe';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    declarations: [
        PendingOrdersComponent,
        // CapitalizeFirstPipe

    ],
    imports: [
        PendingordersRouting,
        FormsModule,
        SharedModule,ReactiveFormsModule,
        HttpModule, BusyModule,




        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
            libraries: ["drawing","places"]
        })


    ],
})
export class PendingOrdersModule {

}