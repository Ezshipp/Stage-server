import { TrashOrdersRouting } from './Trashorders.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashOrdersComponent } from './TrashOrders.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    TrashOrdersRouting,
    FormsModule,
    SharedModule,
    HttpModule,
    BusyModule,NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
    })
  ],
  declarations: [TrashOrdersComponent]
})
export class TrashOrdersModule { }