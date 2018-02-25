import { OffersComponent } from './offers.component';
import { RouterModule } from '@angular/router';
var OffersOne = [
    { path: '', component: OffersComponent, loadChildren: './offers.module#OffersModule' }
];
export var OffersOneRouting = RouterModule.forChild(OffersOne);
