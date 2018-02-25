import { RouterModule } from '@angular/router';
import { CodBikersComponent } from './cod-bikers.component';
var CODBikers = [
    { path: '', component: CodBikersComponent }
];
export var CODBikersRouting = RouterModule.forChild(CODBikers);
