import { CreateOfferComponent } from './sessionalOffer.component';
import { RouterModule } from '@angular/router';
var CreateOffer = [
    { path: '', component: CreateOfferComponent }
];
export var CreateOfferRouting = RouterModule.forChild(CreateOffer);
