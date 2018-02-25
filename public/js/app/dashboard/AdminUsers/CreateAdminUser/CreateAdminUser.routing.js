import { RouterModule } from '@angular/router';
import { CreateAdminUserComponent } from './CreateAdminUser.component';
var CreateAdminUsers = [
    { path: '', component: CreateAdminUserComponent }
];
export var CreateAdminUsersRouting = RouterModule.forChild(CreateAdminUsers);
