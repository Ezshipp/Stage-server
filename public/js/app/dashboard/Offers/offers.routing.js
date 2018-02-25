import { RouterModule } from '@angular/router';
var Offers = [
    { path: '', redirectTo: 'create_Offer', pathMatch: 'full' },
    { path: 'create_Offer', loadChildren: './sessionalOffer/createoffer.module#CreateOfferModule' },
    { path: 'view_offer', loadChildren: './FirstTimeBooking/FirstTimeBooking.module#ViewallOffersModule' },
    { path: 'de_Activate', loadChildren: './DeactivateOffers/DeactivateOffers.module#DeactivateOffersModule' }
];
export var OffersRouting = RouterModule.forChild(Offers);
