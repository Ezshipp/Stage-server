import { RouterModule } from '@angular/router';
import { GenerateOrderReportComponent } from './GenerateOrderReport.component';
var GenerateOrderReport = [
    { path: '', component: GenerateOrderReportComponent }
];
export var GenerateOrderReportRouting = RouterModule.forChild(GenerateOrderReport);
