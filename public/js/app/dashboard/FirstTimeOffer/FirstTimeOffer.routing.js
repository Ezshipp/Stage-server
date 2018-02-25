import { RouterModule } from '@angular/router';
import { FirstTimeOfferComponent } from './FirstTimeOffer.component';
var firstTimeOffer = [
    { path: '', component: FirstTimeOfferComponent }
];
export var firstTimeOfferRouting = RouterModule.forChild(firstTimeOffer);
