
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientsCODComponent } from './client_cod.component';
import { clientCodRouting } from './client_cod.routing';
import { SharedModule } from '../../../../shared/shared.module';
@NgModule({
    declarations: [
        ClientsCODComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpModule,
        clientCodRouting,
        SharedModule,

    ],
})
export class  clientCoddModule {
}