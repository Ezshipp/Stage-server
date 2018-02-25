import { PromotionalContactsComponent } from './PromotationContacts.component';
import { RouterModule } from '@angular/router';
var Promotional = [
    {
        path: '',
        component: PromotionalContactsComponent
    }
];
export var PromotionalComponentRouting = RouterModule.forChild(Promotional);
