import { SigninComponent } from './signin.component';
import { Routes, RouterModule } from '@angular/router';



const Signin: Routes = [
     { path: '', redirectTo:'allorders', pathMatch: 'full' },
      {path:'',component:SigninComponent}



];
    export const SigninRouting = RouterModule.forChild(Signin);


