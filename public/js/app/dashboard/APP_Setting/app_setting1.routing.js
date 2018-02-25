import { APP_SettingComponent } from './app.setting.component';
import { RouterModule } from '@angular/router';
var APP_Setting = [
    {
        path: '',
        component: APP_SettingComponent,
        loadChildren: './app_setting.module#APP_SettingModule'
    }
];
export var APP_SettingOneRouting = RouterModule.forChild(APP_Setting);
