import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SmsSettingsRouting } from './smsSettings.routing';
import { NgModule } from '@angular/core';
import { SmsSettingsComponent } from './smsSettings.component';
@NgModule({
    declarations:[
        SmsSettingsComponent
    ],
    imports:[FormsModule,
        SmsSettingsRouting,CommonModule,SharedModule
    ]
})
export class SMSModule{
}