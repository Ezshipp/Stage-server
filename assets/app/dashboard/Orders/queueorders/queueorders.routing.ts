import { QueueordersComponent } from './queueorders.component';
import { Routes, RouterModule } from '@angular/router';

const QueueOrders: Routes = [
      {path:'',component: QueueordersComponent}

];
    export const QueueOrdersRouting = RouterModule.forChild(QueueOrders);

