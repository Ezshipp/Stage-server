import { smsCampaignModel } from '../../../front_end_models/smscampaignModel';
import { CreateAdminModel } from '../../../front_end_models/create_adminUserModel';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ErrorService } from '../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'viewallcampaign',
	templateUrl: 'viewallcampaign.component.html',
	styleUrls: ["./viewallcampaign.component.css"]
})

export class ViewallcampaignComponent implements OnInit {
	refresh_Receipients_index: number;
	refreshCampaign_index: number;
	isData: boolean;
	CampaignID: any;
	Total_Count_Receipients: any;
	ReceipientsData: any[] = [];
	ReceipientsPage: number = 1;
	searchValue: string;
	skip_Receipients: number = 0
	limit_Receipients: number = 10
	sortOptions_Receipients = {}
	sortOptions = {};
	IsAsc: boolean;
	valu: any;
	activeId: number;
	detailviewIndex: number;
	limit: number = 10;
	skip: number = 0;
	url: string = '';
	Total_Count: any;
	ALlCampaignsData: any[] = [];
	isSearch: boolean;
	p: number = 1;
	isRequesting: boolean;
	onCreate_smsCampaign: boolean;

	constructor(private _cookieService: CookieService,
		private http: Http,
		private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService) { }
	ngOnInit() {
		this.getALlCampaigns(1, '/List_All_SMS_Campaigns', this.skip, this.limit)

	}


	oncreatesmsCapaign() {
		this.onCreate_smsCampaign = true

	}
	onCloseCreate_smsCampaign() {
		this.onCreate_smsCampaign = false
	}
	getALlCampaigns(type: number, url: string, skip, limit, searchValue?) {

		const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), skip, limit, this.sortOptions, searchValue)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					if (type == 1) {
						this.p = 1

						this.ALlCampaignsData = data.json().extras.CampaignData
						if (this.ALlCampaignsData.length > 0) {
							this.isData = false;
							this.isSearch = false
						} else {
							this.isData = true;
							this.isSearch = true;
						}
						this.Total_Count = data.json().extras.Count
					} else if (type == 2) {
						this.ALlCampaignsData = data.json().extras.CampaignData
						if (this.ALlCampaignsData.length > 0) {
							this.isData = false;
						} else {
							this.isData = true;
						}
					}
					else if (type == 3) {
						setTimeout(() => {
							this.ALlCampaignsData = data.json().extras.CampaignData
							if (this.ALlCampaignsData.length == 0) {
								this.isSearch = false
							}
						}, 1000)
					}
				}
				else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					this.isRequesting = false
					if (msgNumber == 21) {
						this._cookieService.remove('ez_cusID')

					}
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)
	}
	pageChanged(event: number) {
		this.detailviewIndex = null
		this.p = event
		var p = this.p - 1
		this.isRequesting = true
		let skip_value = p * this.limit
		this.skip = skip_value
		this.activeId = null

		this.isRequesting = true
		this.detailviewIndex = null
		this.getALlCampaigns(2, '/List_All_SMS_Campaigns', this.skip, this.limit)
	}
	sortColumn(key) {
		var backendkey;

		this.detailviewIndex = -1;
		if (this.valu != key) {
			this.valu = key
			this.IsAsc = true
		} else {
			this.IsAsc = !this.IsAsc
		}

		if (this.IsAsc == true) {
			var sort = 1
		} else if (this.IsAsc == false) {
			sort = -1
		}
		this.sortOptions = {}
		this.sortOptions[this.valu] = sort

		this.ngOnInit()


		this.p = 1

	}
	valuechange(value: string) {
		this.detailviewIndex = null
		this.searchValue = value;
		let length = value.length
		this.activeId = null
		setTimeout(() => {

			if (length >= 3) {
				this.isSearch = true
				this.activeId = null
				this.ALlCampaignsData = []
				this.isRequesting = true
				this.getALlCampaigns(3, '/Search_All_SMS_Campaigns', this.skip, this.limit, this.searchValue)
			}
			else {
				this.activeId = null
				this.skip = 0
				this.ngOnInit()
			}
		}, 2000)

	}
	onRefresh_campaign(item, i) {
this.refreshCampaign_index=i
		const body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, item.CampaignID)
		this.onrefresh(body, 1, '/Refresh_SMS_Campaign')
	}
	onRefresh_campaignReceipients(ReceipientsData, j) {
		this.refresh_Receipients_index=j
		const body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, null, null, null, ReceipientsData.ReferenceID)
		this.onrefresh(body, 2, '/Refresh_SMS_Campaign_Receipients')
	}
	onrefresh(body, type, url) {

		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					if (type == 1) {

						this.detailviewIndex = null

						var campaignRefreshData = data.json().extras.CampaignData

						for (var i = 0; i < this.ALlCampaignsData.length; i++) {
							if (body.CampaignID == this.ALlCampaignsData[i].CampaignID) {

								this.refreshCampaign_index=null
								this.ALlCampaignsData[i].Total_SMS = campaignRefreshData.Total_SMS
								this.ALlCampaignsData[i].Total_Delivered = campaignRefreshData.Total_Delivered
								this.ALlCampaignsData[i].Total_Awaited_Delivery = campaignRefreshData.Total_Awaited_Delivery
								this.ALlCampaignsData[i].Total_Failed = campaignRefreshData.Total_Failed
							}
						}
					} else if (type == 2) {


						var Refresh_RecipientsData = data.json().extras.ReceipientData
						for (var i = 0; i < this.ReceipientsData.length; i++) {
							if (body.ReferenceID == this.ReceipientsData[i].ReferenceID) {

								this.refresh_Receipients_index=null
								
								this.ReceipientsData[i].SMS_Status = Refresh_RecipientsData.SMS_Status
								this.ReceipientsData[i].SMS_Message = Refresh_RecipientsData.SMS_Message
							}
						}
					}
				}
			})
	}

	OnselectCount(event) {
		this.limit = event.target.value
		this.skip = 0
		this.ngOnInit()
		this.p = 1
	}
	OnClick_Row(item, i: number) {

		if (this.detailviewIndex == i) {
			this.detailviewIndex = -1;

		} else {
			this.All_Campaign_Receipients(1, '/List_All_Campaign_Receipients', item.CampaignID, this.skip_Receipients, this.limit_Receipients, this.sortOptions_Receipients)
			this.detailviewIndex = i



		}
	}
	All_Campaign_Receipients(type, url, CampaignID, skip_Receipients, limit_Receipients, sortOptions, searchvalue?) {
		this.CampaignID = CampaignID
		const body = new smsCampaignModel(this._cookieService.get('ez_admin_cusID'), null, null, null, CampaignID, skip_Receipients, limit_Receipients, sortOptions, searchvalue)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					if (type == 1) {
						this.ReceipientsPage = 1
					
						this.ReceipientsData = data.json().extras.ReceipientData

						this.Total_Count_Receipients = data.json().extras.Count
					} else if (type == 2) {
						this.ReceipientsData = data.json().extras.ReceipientData
					}
					
				}
				else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					this.isRequesting = false
					if (msgNumber == 21) {
						this._cookieService.remove('ez_cusID')

					}
					let message = this._ApiMessageService.ApiMessages[msgNumber]
					this.ErrorService.handleError(message)
				}
			}
			)

	}
	pageChanged_ReceipientsData(event: number) {
		
		this.ReceipientsPage = event
		var p = this.ReceipientsPage - 1
		this.isRequesting = true
		let skip_value = p * this.limit_Receipients
		this.skip_Receipients = skip_value

		this.isRequesting = true
	
		this.All_Campaign_Receipients(2, '/List_All_Campaign_Receipients', this.CampaignID, this.skip_Receipients, this.limit_Receipients, this.sortOptions_Receipients)

	}
}