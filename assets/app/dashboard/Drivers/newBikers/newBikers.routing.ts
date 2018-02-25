import { NewBikersComponent } from './newBikers.component';
import { Routes, RouterModule } from '@angular/router';
const NewBikers: Routes = [
      {path:'',component:NewBikersComponent}
];
    export const NewBikersRouting = RouterModule.forChild(NewBikers);
