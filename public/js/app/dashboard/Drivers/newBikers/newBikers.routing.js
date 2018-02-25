import { NewBikersComponent } from './newBikers.component';
import { RouterModule } from '@angular/router';
var NewBikers = [
    { path: '', component: NewBikersComponent }
];
export var NewBikersRouting = RouterModule.forChild(NewBikers);
