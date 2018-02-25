var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from './../../shared/shared.module';
import { OnlyNumber } from './onlyNumber.directive';
import { ZonesComponent } from './Zones.component';
import { ZonesRouting } from './zones.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
var ZonesModule = /** @class */ (function () {
    function ZonesModule() {
    }
    ZonesModule = __decorate([
        NgModule({
            declarations: [
                ZonesComponent, OnlyNumber
            ],
            imports: [
                ZonesRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                CommonModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["places"]
                }),
            ],
        })
    ], ZonesModule);
    return ZonesModule;
}());
export { ZonesModule };
