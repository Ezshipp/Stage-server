import { Routes, RouterModule } from '@angular/router';
import { GenerateOrderReportComponent } from './GenerateOrderReport.component';
const GenerateOrderReport: Routes = [
    { path: '', component: GenerateOrderReportComponent }
];
export const GenerateOrderReportRouting = RouterModule.forChild(GenerateOrderReport);
