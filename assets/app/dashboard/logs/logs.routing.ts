import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';



const LogsRou: Routes = [
      {path:'',component:LogsComponent}



];
    export const LogsRouting = RouterModule.forChild(LogsRou);


