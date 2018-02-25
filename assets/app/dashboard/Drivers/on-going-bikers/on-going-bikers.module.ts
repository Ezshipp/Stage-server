import { onGoingBikersRouting } from './on-going-bikers.routing';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnGoingBikersComponent } from './on-going-bikers.component';

@NgModule({
   declarations: [
       OnGoingBikersComponent
   ],
   imports: [
       onGoingBikersRouting,
       FormsModule,
       SharedModule,
       HttpModule,
       BusyModule,
       CommonModule
   ],
})
export class OnGoingBikersModule {

}

