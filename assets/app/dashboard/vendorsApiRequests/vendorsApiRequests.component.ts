import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../errors/error.service';
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { ApiMessageService } from '../../authentication/apimessages.service';

@Component({
	selector: 'app-vendorsApiRequests',
	templateUrl: "./vendorsApiRequests.component.html",
	styleUrls: ["./vendorsApiRequests.component.css"]
})

export class VendorsApiRequestsComponent implements OnInit {
	searchValue: string;
	isSearch: boolean;
	IsAsc: boolean;
	valu: any;
	detailviewIndex: number;
	activeId: number;
	sortOptions = {}
	limit: number = 10;
	skip: number = 0;
	Total_Count: any;
	apiRequestData: any[] = [];
	p: number;
	isRequesting: boolean;
	url: string = '';
	constructor(private _cookieService: CookieService,
		private http: Http, private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService) { }
	ngOnInit() {
		this.findApiRequest(1, '/Find_All_Business_Apis_Customer_Request', this.skip, this.limit)
	}
	findApiRequest(type: number, url: string, skip, limit, searchValue?) {

		const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), skip, limit, this.sortOptions,searchValue)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					if (type == 1) {
						this.p = 1
						this.isSearch = false
						this.apiRequestData = data.json().extras.API_Request_Data

						this.Total_Count = data.json().extras.Count
					} else if (type == 2) {
						this.apiRequestData = data.json().extras.API_Request_Data
					}
					else if (type == 3) {
						setTimeout(() => {
							this.apiRequestData = data.json().extras.API_Request_Data
							if (this.apiRequestData.length == 0) {
								this.isSearch = false
							}
						}, 2000)
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
			this.detailviewIndex = i



		}
	}
	valuechange(value: string) {
        this.detailviewIndex=null
        this.searchValue = value;
		let length = value.length
		this.activeId=null
       setTimeout(()=>{

        if (length >= 3) {
            this.isSearch=true
            this.activeId=null
            this.apiRequestData = []
            this.isRequesting = true
			this.findApiRequest(3, '/Find_All_Business_Apis_Customer_Request', this.skip, this.limit, this.searchValue)
        }
        else{
            this.activeId=null
            this.skip=0
            this.ngOnInit()
        }
       },2000)

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
	pageChanged(event: number) {
		this.detailviewIndex = null
		this.p = event
		var p = this.p - 1
		this.isRequesting = true
		let skip_value = p * this.limit
		this.skip = skip_value
		this.activeId=null

		this.isRequesting = true
		this.detailviewIndex = null
		this.findApiRequest(2, '/Find_All_Business_Apis_Customer_Request', this.skip, this.limit)
	}
}