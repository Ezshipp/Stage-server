import { CreateZoneComponent } from './CreateZone/createZone.component';
import { ViewZonesComponent } from './viewZones/viewZones.component';
import { RouterModule } from '@angular/router';
var CreateZone = [
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
export var CreateZoneRouting = RouterModule.forChild(CreateZone);
