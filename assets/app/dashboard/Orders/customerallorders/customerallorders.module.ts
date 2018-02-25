import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { CustomerAllordersRouting } from './customerallorders.routing';
import { CustomerAllOrdersComponent } from './customerallorders.component';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CapitalizeFirstPipe } from './capitalFirstLetter.pipe';

@NgModule({
    declarations: [
        CustomerAllOrdersComponent,
        CapitalizeFirstPipe

    ],
    imports: [
        CustomerAllordersRouting,
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
export class CustomerAllordersModule {

}