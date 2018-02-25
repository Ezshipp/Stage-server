import { Routes, RouterModule } from '@angular/router';
import { ClientsCODComponent } from './client_cod.component';
const clientCod: Routes = [
    { path: '', component: ClientsCODComponent, }
];
export const clientCodRouting = RouterModule.forChild(clientCod);
