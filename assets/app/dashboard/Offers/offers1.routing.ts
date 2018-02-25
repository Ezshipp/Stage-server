import { OffersComponent } from './offers.component';
import { Routes, RouterModule } from '@angular/router';



const OffersOne: Routes = [
      {path:'',component:OffersComponent,loadChildren:'./offers.module#OffersModule'}



];
    export const OffersOneRouting = RouterModule.forChild(OffersOne);


