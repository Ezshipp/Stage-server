import { ZonesComponent } from './Zones.component';
import { Routes, RouterModule } from '@angular/router';



const ZonesRout: Routes = [
    {
        path: '',
        component: ZonesComponent
    }



];
export const ZonesRouting = RouterModule.forChild(ZonesRout);


