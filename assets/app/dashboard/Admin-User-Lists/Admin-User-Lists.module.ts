
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AdminUsersListsRouting } from './Admin-User-Lists.routing';
import { UserListsComponent } from './Admin-User-Lists.component';

@NgModule({
   declarations: [
       UserListsComponent
   ],
   imports: [
       AdminUsersListsRouting,
       FormsModule,
       SharedModule,
       HttpModule,
       CommonModule
   ],
})
export class UserListsModule {

}
