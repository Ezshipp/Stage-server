import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { SmscampaignComponent } from './smscampaign.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewallcampaignComponent } from './viewallcampaign/viewallcampaign.component';


const Smscampaign: Routes = [
    {
        path: '',
        redirectTo: 'viewallcampaign'
    },
    {
        path: 'createcampaign',
        component: CreatecampaignComponent
    },
    {
        path: 'viewallcampaign',
        component: ViewallcampaignComponent
    }
];
export const SmscampaignRouting = RouterModule.forChild(Smscampaign);

