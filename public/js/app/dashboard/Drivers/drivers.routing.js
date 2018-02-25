import { RouterModule } from '@angular/router';
var Drivers = [
    { path: '', redirectTo: 'active_Drivers', pathMatch: 'full' },
    { path: 'active_Drivers', loadChildren: './activeDrivers/activeDrivers.module#ActiveDrviersModule' },
    { path: 'inActive_Drivers', loadChildren: './in-active-drivers/in-active-drivers.module#InActiveDriversModule' },
    { path: 'new_bikers', loadChildren: './newBikers/newBikers.module#NewBikersModule' },
    { path: 'cancel_R', loadChildren: './cancelReasons/cancelReasons.module#CancelReasonsModule' }
];
export var DriversRouting = RouterModule.forChild(Drivers);
