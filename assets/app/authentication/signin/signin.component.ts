import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../apimessages.service';
import { AuthenticationModel } from './../../front_end_models/authenticationModel';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'app-signin',
    templateUrl: "./signin.component.html",
    styleUrls:["./signin.component.css"]
})

export class SigninComponent implements OnInit {
  data:boolean=false
    Admin_Name;
    AdminID;
    AdminData: any = [];
    url: string = '';
    loading: boolean;
    notsignup: boolean;

    imageURL = "./images/logo-blue-1.png";
    constructor(private _cookieService: CookieService,
        private router: Router,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _errorService: ErrorService) { }


    ngOnInit() {
        this.notsignup = true;
        if(this._cookieService.get('ez_admin_cusID')==null) {
            this.router.navigateByUrl('/signin')
        } else {
            this.router.navigateByUrl('/dashboard')
        }
this.loading = true;
   setTimeout(function () {
    this.loading = false;
 this.data=true
}.bind(this), 5000);
    }
onSubmit(form: NgForm) {
    let email = form.value.EmailID;
       let pwd = form.value.Password;
       const body = new AuthenticationModel(null,email,null,null,null,null,null,pwd)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Admin_Login', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.AdminData = data.json().extras.AdminData
                        this.AdminID = this.AdminData.AdminID
                        this.Admin_Name = this.AdminData.Admin_Name


                        this._cookieService.put('ez_admin_cusID',this.AdminID)
                        this._cookieService.put('ez_admin_Name',this.Admin_Name)
                        this._cookieService.put('HR_SALARY_PERMISSIONS',this.AdminData.HR_SALARY_PERMISSIONS)
                        this._cookieService.put('ADMIN_USER_PERMISSIONS',this.AdminData.ADMIN_USER_PERMISSIONS)
                        this.router.navigateByUrl('/dashboard')
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);

                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this._errorService.handleError(message)
                    }
                }
                )
}


}