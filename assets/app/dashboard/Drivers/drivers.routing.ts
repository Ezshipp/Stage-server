import { CancelReasonsComponent } from './cancelReasons/cancelReasons.component';
import { NewBikersComponent } from './newBikers/newBikers.component';
import { ActiveDriversComponent } from './activeDrivers/activeDrivers.component';
import { RouterModule, Routes } from '@angular/router';
import { InActiveDriversComponent } from './in-active-drivers/in-active-drivers.component';

 const Drivers: Routes = [
     { path: '', redirectTo:'active_Drivers', pathMatch: 'full' },
    { path: 'active_Drivers', loadChildren:'./activeDrivers/activeDrivers.module#ActiveDrviersModule'},
    { path: 'inActive_Drivers',loadChildren:'./in-active-drivers/in-active-drivers.module#InActiveDriversModule'},
     { path: 'new_bikers', loadChildren:'./newBikers/newBikers.module#NewBikersModule' },
     { path: 'cancel_R', loadChildren:'./cancelReasons/cancelReasons.module#CancelReasonsModule' }
];
export const DriversRouting = RouterModule.forChild(Drivers);

