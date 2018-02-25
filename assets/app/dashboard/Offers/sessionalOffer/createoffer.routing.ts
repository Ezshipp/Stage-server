import { CreateOfferComponent } from './sessionalOffer.component';
import { Routes, RouterModule } from '@angular/router';



const CreateOffer: Routes = [
      {path:'',component:CreateOfferComponent}



];
    export const CreateOfferRouting = RouterModule.forChild(CreateOffer);


