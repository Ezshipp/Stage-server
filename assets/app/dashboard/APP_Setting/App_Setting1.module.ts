import { APP_SettingOneRouting } from './app_setting1.routing';
import { APP_SettingComponent } from './app.setting.component';
import { BusyModule } from 'angular2-busy';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
      APP_SettingComponent
    ],
    imports: [
        APP_SettingOneRouting,
        FormsModule,
        CommonModule,
        HttpModule
    ],
})
export class App_settingOneModule {
}