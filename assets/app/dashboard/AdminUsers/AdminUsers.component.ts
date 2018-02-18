import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { ErrorService } from '../../errors/error.service';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'AdminUsers',
	templateUrl: './AdminUsers.component.html',
	styleUrls: ['./AdminUsers.component.css']
})

export class AdminUsersComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}