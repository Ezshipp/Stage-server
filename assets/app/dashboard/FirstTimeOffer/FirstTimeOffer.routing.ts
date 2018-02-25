import { Routes, RouterModule } from '@angular/router';
import { FirstTimeOfferComponent } from './FirstTimeOffer.component';

const firstTimeOffer: Routes = [
    { path: '', component: FirstTimeOfferComponent }
];
export const firstTimeOfferRouting = RouterModule.forChild(firstTimeOffer);