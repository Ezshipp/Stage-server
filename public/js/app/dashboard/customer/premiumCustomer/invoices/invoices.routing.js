import { InvoicesComponent } from './invoices.component';
import { RouterModule } from '@angular/router';
var InvoicesR = [
    { path: '', component: InvoicesComponent }
];
export var InvoicesRouting = RouterModule.forChild(InvoicesR);
