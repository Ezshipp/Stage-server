import { ViewallOffersComponent } from './FirstTimeBooking/firstTimeBooking.component';
import { CreateOfferComponent } from './sessionalOffer/sessionalOffer.component';





import { Routes, RouterModule } from '@angular/router';
import { DeactivateOffersComponent } from './DeactivateOffers/DeactivateOffers.component';


const Offers: Routes = [
     { path: '', redirectTo:'create_Offer', pathMatch: 'full' },
    { path: 'create_Offer', loadChildren:'./sessionalOffer/createoffer.module#CreateOfferModule'},
      { path: 'view_offer',loadChildren:'./FirstTimeBooking/FirstTimeBooking.module#ViewallOffersModule'},
     { path: 'de_Activate',loadChildren:'./DeactivateOffers/DeactivateOffers.module#DeactivateOffersModule'}



];
    export const OffersRouting = RouterModule.forChild(Offers);
