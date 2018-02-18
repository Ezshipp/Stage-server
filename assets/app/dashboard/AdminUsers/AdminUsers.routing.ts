import { Routes, RouterModule } from '@angular/router';

const AdminUsers: Routes = [
   { path: '', redirectTo: 'userList' },
   { path: 'userList', loadChildren: '../Admin-User-Lists/Admin-User-Lists.module#UserListsModule' },
   { path: 'createAdmin', loadChildren: './CreateAdminUser/CreateAdminUser.module#CreateAdminUserModule' },
   { path: 'inActiveUsers', loadChildren: './In_Active_AdminUsers/In_Active_AdminUsers.module#InActiveAdminUsersModule' }
];

export const AdminUsersRouting = RouterModule.forChild(AdminUsers);
