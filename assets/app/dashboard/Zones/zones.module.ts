import { SharedModule } from './../../shared/shared.module';
import { SpinnerComponent } from './../../spinner/spinner.component';
import { OnlyNumber } from './onlyNumber.directive';
import { ZonesComponent } from './Zones.component';
import { ZonesRouting } from './zones.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';





@NgModule({
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
export class ZonesModule {

}