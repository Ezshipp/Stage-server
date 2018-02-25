import { NewOrdersRouting } from './newOrders.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NewOrdersComponent } from './NewOrders.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';  
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        NewOrdersComponent 
    ],
    imports: [
        NewOrdersRouting,
        FormsModule,
SharedModule,NgxPaginationModule,
        HttpModule,BusyModule, 
  
        CommonModule,
         AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
        })  
    ],
})
export class NewOrdersModule { 
}