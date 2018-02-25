import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { PayServiceModel } from '../../front_end_models/payServiceModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment';
const Moment: any = (<any>moment).default || moment;
@Component({
	selector: 'FirstTimeOffer',
	templateUrl: './FirstTimeOffer.component.html',
	styleUrls: ['./FirstTimeOffer.component.css']
})

export class FirstTimeOfferComponent implements OnInit {
	viewdate: any;
	DiscountPercentage: any;
	ExpiryDate: any;
	options: DatePickerOptions;
	viewOffer: boolean; editOffer: boolean;
	OfferData: any = [];
	url: string = '';
	constructor(private _cookieService: CookieService,
		private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService,
		private http: Http) {

	}

	ngOnInit() {
		const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'))
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Find_First_Time_Offer_Settings', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.OfferData = data.json().extras.OfferData
					this.DiscountPercentage = this.OfferData.DiscountPercentage
					this.viewdate = this.OfferData.ExpiryDate
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	onExpiryDate(date) {


	}
	updateOffer() {
		const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, null, this.DiscountPercentage)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Update_First_Time_Offer_Discount', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					var Status = data.json().extras.Status
					this.ErrorService.handleError(Status)
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	updateDate() {
		this.ExpiryDate = this.viewdate.split('-')
		this.viewdate = this.ExpiryDate[2] + '/' + this.ExpiryDate[1] + '/' + this.ExpiryDate[0]
		const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'), null, this.viewdate)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Update_First_Time_Offer_Expiry', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					var Status = data.json().extras.Status
					this.ErrorService.handleError(Status)
					this.ngOnInit()
				
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
}