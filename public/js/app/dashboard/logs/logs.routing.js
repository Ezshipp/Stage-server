import { RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';
var LogsRou = [
    { path: '', component: LogsComponent }
];
export var LogsRouting = RouterModule.forChild(LogsRou);
