import { ZonesComponent } from './Zones.component';
import { RouterModule } from '@angular/router';
var ZonesRout = [
    {
        path: '',
        component: ZonesComponent
    }
];
export var ZonesRouting = RouterModule.forChild(ZonesRout);
