import { Routes, RouterModule } from '@angular/router';
import { PackageWeightComponent } from './Package_Weight.component';

const PackageWeight: Routes = [
    {
        path: '',
        component: PackageWeightComponent
    }
];
export const PackageWeightRouting = RouterModule.forChild(PackageWeight);