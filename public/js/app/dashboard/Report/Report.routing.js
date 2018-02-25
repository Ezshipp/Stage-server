import { ReportComponent } from './report.component';
import { RouterModule } from '@angular/router';
var ReportRou = [
    {
        path: '',
        component: ReportComponent
    }
];
export var ReportRouting = RouterModule.forChild(ReportRou);
