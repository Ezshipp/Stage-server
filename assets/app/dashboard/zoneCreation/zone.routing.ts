import { CreateZoneComponent } from './CreateZone/createZone.component';
import { ViewZonesComponent } from './viewZones/viewZones.component';
import { ZoneComponent } from './zone.component';
import { Routes, RouterModule } from '@angular/router';


const CreateZone: Routes = [
    {
        path: '',
        redirectTo: 'createZone'
    },
    {
        path: 'createZone',
        component: CreateZoneComponent
    },
    {
        path: 'ViewZOnes',
        component: ViewZonesComponent
    }
];
export const CreateZoneRouting = RouterModule.forChild(CreateZone);

