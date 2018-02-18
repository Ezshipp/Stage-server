import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CreateAdminModel } from '../../../front_end_models/create_adminUserModel';

@Component({
	selector: 'CreateAdminUser',
	templateUrl: 'CreateAdminUser.component.html',
	styleUrls: ['./CreateAdminUser.component.css']
})

export class CreateAdminUserComponent implements OnInit {
	url: string = '';
	userForm: NgForm;
	isSalary: boolean = false
	isUsersSection: boolean = false
	constructor(private _cookieService: CookieService,
		private http: Http, private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService) {

	}
	ngOnInit() { }
	onSubmit_User(form: NgForm) {
		this.userForm = form

		if (form.value.password == form.value.Confirm_password) {
			const body1 = new CreateAdminModel(form.value.Name, form.value.Email, form.value.password, form.value.isSalary, form.value.isUsersSection)

			const headers = new Headers({ 'Content-Type': 'application/json' })
			return this.http.post(this.url + '/Create_Super_Admin_with_Permissions', body1, { headers: headers })
				.subscribe(
				data => {
					if (data.json().success) {
						let message = "Admin created sucessfully"
						this.ErrorService.handleError(message)
						form.reset()
					} else {
						const msgNumber: number = parseInt(data.json().extras.msg);
						let message = this._ApiMessageService.ApiMessages[msgNumber]
						this.ErrorService.handleError(message)
					}
				}
				)
		} else {
			let message = "Password is Not Matched"
			this.ErrorService.handleError(message)
		}
	}
}