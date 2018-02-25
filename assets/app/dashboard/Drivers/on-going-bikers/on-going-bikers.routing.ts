import { Routes, RouterModule } from "@angular/router";
import { OnGoingBikersComponent } from "./on-going-bikers.component";

const onGoingBikers: Routes =
 [{ path: "",
 component: OnGoingBikersComponent
 }];
export const onGoingBikersRouting = RouterModule.forChild(onGoingBikers);


