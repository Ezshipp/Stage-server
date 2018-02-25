import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
//import { AllOrderroutesRouting } from './allorder.routing';
import { AllOrderComponent } from './allorder.component';
import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
// import { CapitalizeFirstPipe } from '../capitalFirstLetter.pipe';
import { AllOrderroutesRouting } from '../allorder/allorder.routing';

@NgModule({
    declarations: [
        AllOrderComponent,
        // CapitalizeFirstPipe
    ],
    imports: [
        AllOrderroutesRouting,
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
export class AllOrderModule {

}