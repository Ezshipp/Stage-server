// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { InActiveAdminUsersRouting } from './In_Active_AdminUsers.routing';
import { In_Active_AdminUsersComponent } from './In_Active_AdminUsers.component';

@NgModule({
   declarations: [
    In_Active_AdminUsersComponent
   ],
   imports: [
    InActiveAdminUsersRouting,
       FormsModule,
       SharedModule,
       HttpModule,
       CommonModule
   ],
})
export class InActiveAdminUsersModule {

}
