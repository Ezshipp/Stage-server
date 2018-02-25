// Angular Imports
import { ViewallcampaignComponent } from './viewallcampaign/viewallcampaign.component';
import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { SmscampaignRouting } from './smscampaign.routing';
import { SmscampaignComponent } from './smscampaign.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

// This Module's Components


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SmscampaignRouting,
        SharedModule, FormsModule
    ],
    declarations: [

        CreatecampaignComponent,ViewallcampaignComponent

    ],

})
export class SmscampaignModule {

}
