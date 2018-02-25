import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { RouterModule } from '@angular/router';
import { ViewallcampaignComponent } from './viewallcampaign/viewallcampaign.component';
var Smscampaign = [
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
export var SmscampaignRouting = RouterModule.forChild(Smscampaign);
