import { PromotionalContactsComponent } from './PromotationContacts.component';
import { Routes, RouterModule } from '@angular/router';


const Promotional: Routes = [
    {
        path: '',
        component: PromotionalContactsComponent
    }
];
export const PromotionalComponentRouting = RouterModule.forChild(Promotional);

