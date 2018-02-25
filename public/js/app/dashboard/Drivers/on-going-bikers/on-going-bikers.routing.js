import { RouterModule } from "@angular/router";
import { OnGoingBikersComponent } from "./on-going-bikers.component";
var onGoingBikers = [{ path: "",
        component: OnGoingBikersComponent
    }];
export var onGoingBikersRouting = RouterModule.forChild(onGoingBikers);
