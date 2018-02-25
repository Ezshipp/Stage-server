import { RouterModule } from '@angular/router';
import { PackageWeightComponent } from './Package_Weight.component';
var PackageWeight = [
    {
        path: '',
        component: PackageWeightComponent
    }
];
export var PackageWeightRouting = RouterModule.forChild(PackageWeight);
