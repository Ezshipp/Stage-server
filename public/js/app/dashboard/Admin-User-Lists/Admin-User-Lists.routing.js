import { RouterModule } from '@angular/router';
import { UserListsComponent } from './Admin-User-Lists.component';
var AdminUsersLists = [
    { path: '', component: UserListsComponent }
];
export var AdminUsersListsRouting = RouterModule.forChild(AdminUsersLists);
