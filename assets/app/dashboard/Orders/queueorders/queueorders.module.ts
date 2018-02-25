import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';


import { QueueordersComponent } from './queueorders.component';
import { SharedModule } from './../../../shared/shared.module';
import { QueueOrdersRouting } from './queueorders.routing';


@NgModule({
  imports: [
    CommonModule,
    QueueOrdersRouting,
    FormsModule,
    SharedModule,
    HttpModule,
    BusyModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
    })
  ],
  declarations: [QueueordersComponent]
})
export class QueueOrdersModule { }