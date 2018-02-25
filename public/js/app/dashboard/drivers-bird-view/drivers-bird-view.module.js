var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
// This Module's Components
import { DriversBirdViewComponent } from './drivers-bird-view.component';
import { DriversBirdViewRouting } from './drivers-bird-view.routing';
import { CommonModule } from '@angular/common';
var DriversBirdViewModule = /** @class */ (function () {
    function DriversBirdViewModule() {
    }
    DriversBirdViewModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                DriversBirdViewRouting,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["drawing", "places"]
                })
            ],
            declarations: [
                DriversBirdViewComponent
            ],
            exports: [
                DriversBirdViewComponent,
            ]
        })
    ], DriversBirdViewModule);
    return DriversBirdViewModule;
}());
export { DriversBirdViewModule };
