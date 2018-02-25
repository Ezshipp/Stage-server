import { RouterModule } from '@angular/router';
import { VendorsApiRequestsComponent } from './vendorsApiRequests.component';
var VendorsApi = [
    {
        path: '',
        component: VendorsApiRequestsComponent
    },
];
export var VendorsApiRouting = RouterModule.forChild(VendorsApi);
