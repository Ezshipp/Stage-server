var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { OngoingJobsRouting } from './ongoingjobs.routing';
import { OngoingJobsComponent } from './Ongoingjosb.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
var OngoingJobsModule = /** @class */ (function () {
    function OngoingJobsModule() {
    }
    OngoingJobsModule = __decorate([
        NgModule({
            declarations: [
                OngoingJobsComponent
            ],
            imports: [
                OngoingJobsRouting,
                FormsModule, NgxPaginationModule,
                SharedModule,
                HttpModule, BusyModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs'
                })
            ],
        })
    ], OngoingJobsModule);
    return OngoingJobsModule;
}());
export { OngoingJobsModule };
