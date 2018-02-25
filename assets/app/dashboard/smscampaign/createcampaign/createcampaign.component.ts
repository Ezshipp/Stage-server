import { smsCampaignModel } from '../../../front_end_models/smscampaignModel';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'createcampaign',
	templateUrl: 'createcampaign.component.html',
	styleUrls: ["./createcampaign.component.css"]
})

export class CreatecampaignComponent implements OnInit {
	Campaign_TypeData: any=[];
	url: string = '';
	isRequesting:boolean=false;
	Status_OK:boolean=false
	constructor(private _cookieService: CookieService,
		private http: Http,
		private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService) { }
	ngOnInit() {
		this.getCampaignType()

	}
	getCampaignType(){
		const body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'))
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/List_Available_Campaign_Type_with_Count', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.Campaign_TypeData=data.json().extras.CampaignInformation
				}
			}
		)
	}
	onSubmit(form: NgForm) {
		if(form.value.CampaignName.length>0 && form.value.CampaignMessage.length>0){
			this.isRequesting=true
			const body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), form.value.CampaignName, form.value.CampaignType, form.value.CampaignMessage)
			const headers = new Headers({ 'Content-Type': 'application/json' })
			return this.http.post(this.url + '/Create_Campaign_and_Send_SMS', body, { headers: headers })
				.subscribe(
				data => {
					if (data.json().success) {
						this.isRequesting=false
						this.Status_OK=true
						
						form.reset()
					}
					else {
						const msgNumber: number = parseInt(data.json().extras.msg);
						this.isRequesting=false
						if (msgNumber == 21) {
							this._cookieService.remove('ez_cusID')

						}
						let message = this._ApiMessageService.ApiMessages[msgNumber]
						this.ErrorService.handleError(message)
					}

				}

				)
		}
		else if(form.value.CampaignName.length<=0){
			let message = "Please enter Campaign Name"
			this.ErrorService.handleError(message)
		}
		else if(form.value.CampaignMessage.length<=0){
			let message = "Please enter Campaign Message"
			this.ErrorService.handleError(message)
		}

		else {
			let message = "Please enter AllFields"
			this.ErrorService.handleError(message)
		}

	}
	onSelectCampaignType(ev) {
	}
}