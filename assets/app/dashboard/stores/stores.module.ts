
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


@NgModule({
    declarations: [
        StoresComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        HttpModule, BusyModule,ReactiveFormsModule,
        CommonModule,
        StoreRouting,
        ImageUploadModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
            libraries: ["places","drawing"]
        }),





    ],
})
export class StoreModule {

}