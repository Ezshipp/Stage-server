import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../errors/error.service';
import { GenReportModal } from '../../../../front_end_models/genReportModel';
import { premiumCustomerModal } from '../../../../front_end_models/premiumCustomerModal';
@Component({
	selector: 'GenerateOrderReport',
	templateUrl: './GenerateOrderReport.component.html',
	styleUrls: ['./GenerateOrderReport.component.css']
})
export class GenerateOrderReportComponent implements OnInit {
	isDataOrders: boolean;
	isCreate: boolean = false;
	Total_CountO: any;
	RecordData = [];pO: number = 1;
	to_date: string;
	from_date: string;
	First_name: any;
	CustomerID: any; createForm: boolean;
	limit = 10;skip_value_O = 0;
	Total_Count: any; p: number = 1; index: any;
	 skip_value = 0; allPremiumCustomers: boolean = false;
	isData: boolean;
	CustomerData = [];
	isRequesting: boolean; sortOptions: any;
	url: string = '';
	constructor(private http: Http,
		private _ApiMessageService: ApiMessageService,

		private _cookieService: CookieService,
		private router: Router,
		private ErrorService: ErrorService) { }
	ngOnInit() {
		this.sortOptions = {};
		const body1 = new GenReportModal(this._cookieService.get('ez_admin_cusID'), null, null,null, this.skip_value_O, this.limit, this.sortOptions)
		this.isRequesting = true
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Find_All_Customer_Order_Records', body1, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false;
					this.RecordData = data.json().extras.RecordData
					this.Total_CountO = data.json().extras.Count
					this.createForm = false;
					if (this.RecordData.length>0) {
						this.isDataOrders = false;
					} else {
						this.isDataOrders = true;
					}
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					if (msgNumber == 21) {
						this._cookieService.remove('ez_cusID')
						this.router.navigate(['/signissssn']);
					}
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	pageChangedOrders(event: number) {
		this.pO = event
		this.nextpageOrders(this.pO - 1)
	}
	nextpageOrders(index) {
		this.isRequesting = true
		this.index = index;
		this.skip_value_O = this.index * 10
		let empid = this._cookieService.get('EmployeeID')
		const body1 = new GenReportModal(this._cookieService.get('ez_admin_cusID'), null, null,null, this.skip_value_O, this.limit, this.sortOptions)
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post(this.url + '/Find_All_Customer_Order_Records', body1, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					this.RecordData = data.json().extras.RecordData
					this.skip_value_O = this.index * 10
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	onCreateReport() {
		this.allPremiumCustomers = true;
		this.createForm = false;
		this.from_date = '';
		this.to_date = '';
		this.isRequesting = true
		let uid = this._cookieService.get('ez_cusID')
		const body1 = new premiumCustomerModal(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body1, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					this.CustomerData = data.json().extras.CustomerData
					if (this.CustomerData.length == 0) {
						this.isData = true
					}
					this.Total_Count = data.json().extras.Count
				} else {
					this.isRequesting = false
					const msgNumber: number = parseInt(data.json().extras.msg);
					if (msgNumber == 21) {
						this._cookieService.remove('ez_cusID')
						this.router.navigate(['/signissssn']);
					}
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	pageChanged(event: number) {
		console.log("event"+event)
		this.p = event
		this.nextpage(this.p - 1)
	}
	nextpage(index) {
		this.isRequesting = true
		this.index = index;
		console.log("1")
		let skip_value = this.index * 10
		let empid = this._cookieService.get('EmployeeID')
		const result_table_data = new premiumCustomerModal(null, null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.sortOptions)
		const body = JSON.stringify(result_table_data)
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					console.log("2")
					this.isRequesting = false
					this.CustomerData = data.json().extras.CustomerData
					this.skip_value = this.index * 10
				} else {
					console.log("3")

					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	onClosePreCustomers() {
		this.allPremiumCustomers = false;
		this.isCreate = false;
	}
	selectPreCustomers(item, index) {
		this.createForm = true;
		this.allPremiumCustomers = false;
		this.CustomerID = item.CustomerID
		this.First_name = item.First_name
		this.isCreate = true;
	}
	OnFromDate(date) {
		var dat = date.split('-')
		this.from_date = dat[2] + '/' + dat[1] + '/' + dat[0]
	}
	OnTodate(date) {
		var dat = date.split('-')
		this.to_date = dat[2] + '/' + dat[1] + '/' + dat[0]
	}
	exportPdf() {
		if (this.from_date == "" || this.to_date == "") {
			var message = 'Enter From Date and To Date';
			this.ErrorService.handleError(message)
		} else {
			this.isRequesting = true;
			const result_table_data = new GenReportModal(this._cookieService.get('ez_admin_cusID'), this.CustomerID, this.from_date, this.to_date)
			const headers = new Headers({ 'Content-Type': 'application/json' });
			return this.http.post(this.url + '/Premium_Customer_Records_in_Date_Range', result_table_data, { headers: headers })
				.subscribe(
				data => {
					if (data.json().success) {
						this.isRequesting = false;
						var Status = 'Your Orders Record is in Processing';
						this.ErrorService.handleError(Status)
						this.createForm = false;
						this.ngOnInit();
					} else {
						this.isRequesting = false;
						const msgNumber: number = parseInt(data.json().extras.msg);
						let message = this._ApiMessageService.ApiMessages[msgNumber]
						this.ErrorService.handleError(message)
					}
				}
				)
		}
	}
	OnRefresh() {
		this.ngOnInit();
	}
}