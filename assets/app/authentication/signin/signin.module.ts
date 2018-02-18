import { SigninComponent } from './signin.component';
import { SigninRouting } from './signin.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        SigninRouting,
        FormsModule,
        HttpModule,
        CommonModule,


    ],
})
export class SignInModule {

}