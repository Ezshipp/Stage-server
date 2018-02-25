import { InvoicesComponent } from './invoices.component';
import { Routes, RouterModule } from '@angular/router';



const InvoicesR: Routes = [
      {path:'',component:InvoicesComponent}



];
    export const InvoicesRouting = RouterModule.forChild(InvoicesR);


