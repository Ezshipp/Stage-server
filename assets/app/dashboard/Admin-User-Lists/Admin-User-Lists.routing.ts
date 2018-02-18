
import { Routes, RouterModule } from '@angular/router';
import { UserListsComponent } from './Admin-User-Lists.component';

const AdminUsersLists: Routes = [
   { path: '', component: UserListsComponent }
];

export const AdminUsersListsRouting = RouterModule.forChild(AdminUsersLists);