
import { Routes, RouterModule } from '@angular/router';
import { VendorsApiRequestsComponent } from './vendorsApiRequests.component';


const VendorsApi: Routes = [

    {
        path: '',
        component: VendorsApiRequestsComponent
    },

];
export const VendorsApiRouting = RouterModule.forChild(VendorsApi);

