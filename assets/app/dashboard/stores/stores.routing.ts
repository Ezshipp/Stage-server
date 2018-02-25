import { StoresComponent } from './stores.component';
import { Routes, RouterModule } from '@angular/router';


const StoreRou: Routes = [
    {
        path: '',
        component: StoresComponent
    }
];
export const StoreRouting = RouterModule.forChild(StoreRou);

