import { AdminUsersRouting } from './AdminUsers.routing';
import { SharedModule } from './../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [

    ],
    imports: [
        AdminUsersRouting,
        FormsModule,
        SharedModule,
        HttpModule,
        CommonModule
    ],
})
export class AdminUserModule {

}