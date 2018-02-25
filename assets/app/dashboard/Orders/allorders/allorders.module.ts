import { AllOrderComponent } from './allorder/allorder.component';
import { AllOrdersComponent } from './allorders.component';
import { PendingOrdersComponent } from './pendingorders/pendingorders.component';
import { SharedModule } from './../../../shared/shared.module';
 import { AllOrdersroutesRouting } from './AllOrders.routing';

import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
// import { CapitalizeFirstPipe } from './capitalFirstLetter.pipe';



@NgModule({
    declarations: [
        // CapitalizeFirstPipe
    ],
    imports: [
        FormsModule,  
        HttpModule,
        CommonModule,     
        AllOrdersroutesRouting      

    ],
})
export class AllOrdersModule {

}