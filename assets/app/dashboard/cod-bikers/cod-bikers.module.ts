// Angular Imports
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// This Module's Components
import { CodBikersComponent } from './cod-bikers.component';
import { CommonModule } from '@angular/common';
import { CODBikersRouting } from './cod-bikers.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        CODBikersRouting,FormsModule,SharedModule,HttpModule
    ],
    declarations: [
        CodBikersComponent,
    ],
    exports: [
        CodBikersComponent,
    ]
})
export class CodBikersModule {

}
