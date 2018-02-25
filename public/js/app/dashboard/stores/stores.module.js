var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreRouting } from './stores.routing';
import { StoresComponent } from './stores.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ImageUploadModule } from 'ng2-imageupload';
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule = __decorate([
        NgModule({
            declarations: [
                StoresComponent
            ],
            imports: [
                FormsModule,
                SharedModule,
                HttpModule, BusyModule, ReactiveFormsModule,
                CommonModule,
                StoreRouting,
                ImageUploadModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["places", "drawing"]
                }),
            ],
        })
    ], StoreModule);
    return StoreModule;
}());
export { StoreModule };
