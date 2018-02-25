import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { PayServiceModel } from '../../front_end_models/payServiceModel';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { setTimeout } from 'core-js/library/web/timers';

@Component({
	selector: 'RazorpayServiceCharge',
	templateUrl: './RazorpayServiceCharge.component.html',
	styleUrls: ['./RazorpayServiceCharge.component.css']
})

export class RazorpayServiceChargeComponent implements OnInit {
	Service_Charge: any;
	ServiceChargeData: any = [];
	url: string = '';
	constructor(private _cookieService: CookieService,
		private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService,
		private http: Http) { }

	ngOnInit() {
		const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'))
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Razorpay_Service_Charge', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.ServiceChargeData = data.json().extras.ServiceChargeData
					this.Service_Charge = this.ServiceChargeData.Service_Charge
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}

	updateServiceCharge() {
		const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'),this.Service_Charge)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Edit_Service_Charge', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					var Status = data.json().extras.Status
					this.ErrorService.handleError(Status)
					setTimeout(function () {
                        this.ngOnInit();
                    }.bind(this), 1000);
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
}