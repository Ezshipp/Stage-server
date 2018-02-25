import { RouterModule, Routes } from '@angular/router';
import { SmsSettingsComponent } from './smsSettings.component';

 const SmsSettings: Routes = [
   { path: '', component:SmsSettingsComponent}


];
export const SmsSettingsRouting = RouterModule.forChild(SmsSettings);
