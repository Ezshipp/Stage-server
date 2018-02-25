// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule, GoogleMapsAPIWrapper, PolylineManager } from '@agm/core';
import { PlusSpinnerModule } from "plus-spinner";
// This Module's Components
import { NQueOrdersComponent } from './n-que-orders.component';
import { SharedModule } from '../../../shared/shared.module';
import { NQueOrdersRouting } from './n-que-orders.routing';
@NgModule({
    imports: [
        CommonModule,
        NQueOrdersRouting,
        FormsModule, ReactiveFormsModule,
        SharedModule,
        HttpModule,

        BusyModule, NgxPaginationModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
        })

    ],
    providers:[
        PolylineManager,
        GoogleMapsAPIWrapper
    ],
    declarations: [
        NQueOrdersComponent,
    ],
    exports: [
        NQueOrdersComponent,
    ]
})
export class NQueOrdersModule {

}
