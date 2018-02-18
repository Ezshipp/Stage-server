

import { Routes, RouterModule } from '@angular/router';
import { CreateAdminUserComponent } from './CreateAdminUser.component';

const CreateAdminUsers: Routes = [
   { path: '', component: CreateAdminUserComponent }
];

export const CreateAdminUsersRouting = RouterModule.forChild(CreateAdminUsers);