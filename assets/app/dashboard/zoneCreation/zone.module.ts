import { CreateZoneComponent } from './CreateZone/createZone.component';
import { ViewZonesComponent } from './viewZones/viewZones.component';
import { CreateZoneRouting } from './zone.routing';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ZoneComponent } from './zone.component';
import { NgModule } from "@angular/core";





@NgModule({
    declarations: [
        ViewZonesComponent,CreateZoneComponent
    ],
    imports: [
        FormsModule,

        HttpModule,
        CommonModule,
        CreateZoneRouting,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
            libraries: ["places","drawing"],

        }),





    ],
})
export class ZonesModule {

}