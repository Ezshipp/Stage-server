// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackageWeightComponent } from './Package_Weight.component';
import { PackageWeightRouting } from './Package_Weight.routing';
import { SharedModule } from '../../../shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        PackageWeightRouting,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        PackageWeightComponent,
    ],
    exports: [
        PackageWeightComponent,
    ]
})
export class PackageWeightModule {
}
