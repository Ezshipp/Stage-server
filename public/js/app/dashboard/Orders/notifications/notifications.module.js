var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { notificationsRouting } from './notifications.routing';
import { notificationsComponent } from './notifications.component';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalFirstLetter.pipe';
var notificationsModule = /** @class */ (function () {
    function notificationsModule() {
    }
    notificationsModule = __decorate([
        NgModule({
            declarations: [
                notificationsComponent,
                CapitalizeFirstPipe
            ],
            imports: [
                notificationsRouting,
                FormsModule,
                SharedModule, ReactiveFormsModule,
                HttpModule, BusyModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["drawing", "places"]
                })
            ],
        })
    ], notificationsModule);
    return notificationsModule;
}());
export { notificationsModule };
