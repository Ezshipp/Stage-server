import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';



const ReportRou: Routes = [
    {
        path: '',
        component: ReportComponent
    }



];
export const ReportRouting = RouterModule.forChild(ReportRou);


