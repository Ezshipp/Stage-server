import { Routes, RouterModule } from '@angular/router';
import { In_Active_AdminUsersComponent } from './In_Active_AdminUsers.component';

const InActiveAdminUsers: Routes = [
  { path: '', component: In_Active_AdminUsersComponent }
];

export const InActiveAdminUsersRouting = RouterModule.forChild(InActiveAdminUsers);