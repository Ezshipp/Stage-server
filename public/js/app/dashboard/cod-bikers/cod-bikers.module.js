var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// This Module's Components
import { CodBikersComponent } from './cod-bikers.component';
import { CommonModule } from '@angular/common';
import { CODBikersRouting } from './cod-bikers.routing';
import { SharedModule } from '../../shared/shared.module';
var CodBikersModule = /** @class */ (function () {
    function CodBikersModule() {
    }
    CodBikersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CODBikersRouting, FormsModule, SharedModule, HttpModule
            ],
            declarations: [
                CodBikersComponent,
            ],
            exports: [
                CodBikersComponent,
            ]
        })
    ], CodBikersModule);
    return CodBikersModule;
}());
export { CodBikersModule };
