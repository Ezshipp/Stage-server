import { DeliveryModule } from './Delivery/Delivery.module';
import { APP_SettingRouting } from './app_setting.routing';
import { DeliveryComponent } from './Delivery/delivery.component';
import { SharedModule } from './../../shared/shared.module';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        SharedModule,
        HttpModule, BusyModule,
        CommonModule,
        APP_SettingRouting,
        DeliveryModule
    ],
})
export class APP_SettingModule {
}