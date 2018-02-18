// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreateAdminUsersRouting } from './CreateAdminUser.routing';
import { CreateAdminUserComponent } from './CreateAdminUser.component';

@NgModule({
   declarations: [
       CreateAdminUserComponent
   ],
   imports: [
       CreateAdminUsersRouting,
       FormsModule,
       SharedModule,
       HttpModule,
       CommonModule
   ],
})
export class CreateAdminUserModule {

}
