import { CustomerReasonsRouting } from './customerCancelReasons.routing';
import { CustomerCancelReasonsComponent } from './customerCancelReasons.component';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
     CustomerCancelReasonsComponent
],
    imports: [
        CustomerReasonsRouting,
        FormsModule,
SharedModule,
        HttpModule,
        CommonModule,
    ],
})
export class CustomerCancelModule {
}