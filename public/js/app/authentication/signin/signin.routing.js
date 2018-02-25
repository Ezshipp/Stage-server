import { SigninComponent } from './signin.component';
import { RouterModule } from '@angular/router';
var Signin = [
    { path: '', redirectTo: 'allorders', pathMatch: 'full' },
    { path: '', component: SigninComponent }
];
export var SigninRouting = RouterModule.forChild(Signin);
