// Angular Imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// This Module's Components
import { LogsComponent } from './logs.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LogsRouting } from './logs.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LogsRouting,
        FormsModule,ReactiveFormsModule
    ],
    declarations: [
        LogsComponent,
    ],
    exports: [
        LogsComponent,
    ]
})
export class LogsModule {

}
