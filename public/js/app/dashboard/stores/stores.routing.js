import { StoresComponent } from './stores.component';
import { RouterModule } from '@angular/router';
var StoreRou = [
    {
        path: '',
        component: StoresComponent
    }
];
export var StoreRouting = RouterModule.forChild(StoreRou);
