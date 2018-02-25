// Angular Imports
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
// This Module's Components
import { DriversBirdViewComponent } from './drivers-bird-view.component';
import { DriversBirdViewRouting } from './drivers-bird-view.routing';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        DriversBirdViewRouting,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCOSzrV21ii_0a6d8XC08vARjJH2TYbLJs',
            libraries: ["drawing","places"]
          })
    ],
    declarations: [
        DriversBirdViewComponent
    ],
    exports: [
        DriversBirdViewComponent,
    ]
})
export class DriversBirdViewModule {

}
