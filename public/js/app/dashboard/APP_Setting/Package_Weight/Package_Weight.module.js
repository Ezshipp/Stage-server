var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackageWeightComponent } from './Package_Weight.component';
import { PackageWeightRouting } from './Package_Weight.routing';
import { SharedModule } from '../../../shared/shared.module';
var PackageWeightModule = /** @class */ (function () {
    function PackageWeightModule() {
    }
    PackageWeightModule = __decorate([
        NgModule({
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
    ], PackageWeightModule);
    return PackageWeightModule;
}());
export { PackageWeightModule };
