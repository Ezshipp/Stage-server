import { APP_SettingComponent } from './app.setting.component';
import { Routes, RouterModule } from '@angular/router';

const APP_Setting: Routes = [
    {
        path: '',
        component: APP_SettingComponent,
        loadChildren: './app_setting.module#APP_SettingModule'
    }
];
export const APP_SettingOneRouting = RouterModule.forChild(APP_Setting);
