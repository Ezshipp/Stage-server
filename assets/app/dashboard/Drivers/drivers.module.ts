import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
import { CancelReasonsComponent } from './cancelReasons/cancelReasons.component';
import { NewBikersComponent } from './newBikers/newBikers.component';
import { InActiveDriversComponent } from './in-active-drivers/in-active-drivers.component';
import { ActiveDriversComponent } from './activeDrivers/activeDrivers.component';
import { DriversRouting } from './drivers.routing';

import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
                ],
    imports: [
        FormsModule,
        SharedModule,
        HttpModule,
        CommonModule,DriversRouting
 ],
})
export class DriversModule {

}