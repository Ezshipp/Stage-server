import { RouterModule } from '@angular/router';
import { In_Active_AdminUsersComponent } from './In_Active_AdminUsers.component';
var InActiveAdminUsers = [
    { path: '', component: In_Active_AdminUsersComponent }
];
export var InActiveAdminUsersRouting = RouterModule.forChild(InActiveAdminUsers);
