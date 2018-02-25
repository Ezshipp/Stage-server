var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// This Module's Components
import { LogsComponent } from './logs.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LogsRouting } from './logs.routing';
var LogsModule = /** @class */ (function () {
    function LogsModule() {
    }
    LogsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                SharedModule,
                LogsRouting,
                FormsModule, ReactiveFormsModule
            ],
            declarations: [
                LogsComponent,
            ],
            exports: [
                LogsComponent,
            ]
        })
    ], LogsModule);
    return LogsModule;
}());
export { LogsModule };
