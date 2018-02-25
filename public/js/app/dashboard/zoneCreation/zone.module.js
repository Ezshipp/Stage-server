var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CreateZoneComponent } from './CreateZone/createZone.component';
import { ViewZonesComponent } from './viewZones/viewZones.component';
import { CreateZoneRouting } from './zone.routing';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from "@angular/core";
var ZonesModule = /** @class */ (function () {
    function ZonesModule() {
    }
    ZonesModule = __decorate([
        NgModule({
            declarations: [
                ViewZonesComponent, CreateZoneComponent
            ],
            imports: [
                FormsModule,
                HttpModule,
                CommonModule,
                CreateZoneRouting,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
                    libraries: ["places", "drawing"],
                }),
            ],
        })
    ], ZonesModule);
    return ZonesModule;
}());
export { ZonesModule };
