import { O_DeliveryReportComponent } from './o.DeliveryReport.component';
import { Routes, RouterModule } from '@angular/router';

const O_Delivery_Report: Routes = [
    {
        path: '',
        component: O_DeliveryReportComponent
    }

];
export const O_Delivery_Report_Routing = RouterModule.forChild(O_Delivery_Report);

