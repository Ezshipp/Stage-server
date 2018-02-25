import { RouterModule } from '@angular/router';
import { ClientsCODComponent } from './client_cod.component';
var clientCod = [
    { path: '', component: ClientsCODComponent, }
];
export var clientCodRouting = RouterModule.forChild(clientCod);
