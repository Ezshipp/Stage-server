import { RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './smsSettings.component';
var SmsSettings = [
    { path: '', component: SmsSettingsComponent }
];
export var SmsSettingsRouting = RouterModule.forChild(SmsSettings);
