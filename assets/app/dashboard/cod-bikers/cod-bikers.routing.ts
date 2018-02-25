import { Routes, RouterModule } from '@angular/router';
import { CodBikersComponent } from './cod-bikers.component';


const CODBikers: Routes = [
    { path: '', component: CodBikersComponent }
];
export const CODBikersRouting = RouterModule.forChild(CODBikers);

