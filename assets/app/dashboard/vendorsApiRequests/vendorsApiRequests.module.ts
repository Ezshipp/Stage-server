
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from "@angular/core";
import { VendorsApiRequestsComponent } from './vendorsApiRequests.component';
import { VendorsApiRouting } from './vendorsApiRequests.routing';
import { SharedModule } from '../../shared/shared.module';





@NgModule({
    declarations: [
        VendorsApiRequestsComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        VendorsApiRouting,
        HttpModule,
        CommonModule,






    ],
})

export class VendorsApiRequestModule {

}