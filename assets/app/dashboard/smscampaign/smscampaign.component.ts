import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { Http,Headers } from '@angular/http';
import { ErrorService } from '../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'smscampaign',
	templateUrl: 'smscampaign.component.html',
	styleUrls:['./smscampaign.component.css']
})

export class SmscampaignComponent implements OnInit {


    public ngOnInit(): void {

    }
}