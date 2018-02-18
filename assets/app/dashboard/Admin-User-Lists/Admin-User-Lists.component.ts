import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';

@Component({
	selector: 'User-Lists',
	templateUrl: './Admin-User-Lists.component.html',
	styleUrls: ['./Admin-User-Lists.component.css']
})
export class UserListsComponent implements OnInit {
	AdminID: any;
	isresetpassword_InActive: boolean;
	AdminEmail: any;
	AdminName: any;
	isresetpassword: boolean;
	Logs_admin: number = 1
	Total_Count_logs: any;
	skip_Logs: number = 0;
	limit_logs: number = 10
	LogsData_Admin: any = [];
	adminId: any;
	detailviewIndex: number;
	views: any;
	Total_Count: any;
	AdminData_json: any = [];
	AdminData: any = [];
	isSearch: boolean; skip: any = 0; limit: any = 10;
	p: number = 1;
	isRequesting: boolean;
	url: string = '';
	constructor(private _cookieService: CookieService,
		private http: Http, private _ApiMessageService: ApiMessageService,
		private ErrorService: ErrorService) { }
	ngOnInit() {
		this.findUsers(1, '/Find_All_Super_Admins')
	}
	findUsers(type: number, url: string, searchValue?) {

		const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), this.skip, this.limit)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					if (type == 1) {
						this.p = 1
						this.isSearch = false
						this.AdminData = data.json().extras.AdminData
						this.AdminData_json = data.json().extras.AdminData

						this.Total_Count = data.json().extras.Count
					} else if (type == 2) {
						this.AdminData = data.json().extras.AdminData
						this.AdminData_json = data.json().extras.AdminData
					} else if (type == 3) {
						setTimeout(() => {
							this.AdminData = data.json().extras.AdminData
							if (this.AdminData.length == 0) {
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
	pageChanged(event: number) {
		this.views = null
		this.p = event
		var p = this.p - 1
		this.isRequesting = true
		let skip_value = p * this.limit
		this.skip = skip_value
		this.isRequesting = true
		this.detailviewIndex = null
		this.findUsers(2, '/Find_All_Super_Admins')
	}
	OnselectCount(event) {
		this.limit = event.target.value
		this.skip = 0
		this.ngOnInit()
		this.p = 1
	}
	OnLogs_user(item, i: number) {
		if (this.detailviewIndex == i) {
			this.detailviewIndex = -1;
			this.Total_Count_logs = 0
		} else {
			this.detailviewIndex = i

			this.adminId = item.AdminID
			this.LogsData_Admin = []

		}
		this.getAdmin_logs(this.adminId, this.skip_Logs, this.limit_logs, 1, '/Super_Admin_Logs_By_Admin')


	}
	getAdmin_logs(adminid, skip_adminlogs, limit_adminLogs, type: number, url: string, searchValue?) {
		const body = new CreateAdminModel(null, null, null, null, null, adminid, skip_adminlogs, limit_adminLogs)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					if (type == 1) {
						this.Logs_admin = 1
						this.LogsData_Admin = data.json().extras.LogData
						this.Total_Count_logs = data.json().extras.Count
					} else if (type == 2) {
						this.LogsData_Admin = data.json().extras.LogData

					} else if (type == 3) {

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
	pageChanged_logs(ev: number) {
		this.Logs_admin = ev
		var p = this.Logs_admin - 1
		this.isRequesting = true
		let skip_value = p * this.limit_logs
		this.isRequesting = true
		this.getAdmin_logs(this.adminId, skip_value, this.limit_logs, 2, '/Super_Admin_Logs_By_Admin')
	}
	onReseteConformation(item){
		this.isresetpassword=true
		this.AdminName=item.AdminName
		this.AdminEmail=item.AdminEmail
	}
	onClose_Delete(){
		this.isresetpassword=false
	}
	OnReset_password(){
		const body = new CreateAdminModel(null,this.AdminEmail)
		const headers = new Headers({ 'Content-Type': 'application/json' })
		return this.http.post(this.url+'Admin_Forgot_Password', body, { headers: headers })
			.subscribe(
			data => {
				if (data.json().success) {
					this.isRequesting = false
					let message = "Password Reset Sucessfully"
					this.ErrorService.handleError(message)
					this.onClose_Delete()
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

	onInActive(item) {
        this.isresetpassword_InActive = true
        this.AdminName = item.AdminName
        this.AdminID = item.AdminID
    }
    onClose_In_Active() {
        this.isresetpassword_InActive = false
    }
    onIn_Active() {
        const body = new CreateAdminModel(null, null, null, null, null,
		this._cookieService.get('ez_admin_cusID'), null, null, null, null, null, this.AdminID)
		console.log("Body "+JSON.stringify(body));
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Inactivate_Super_Admin', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    let message = "Admin User In-Activated Successfully";
                    this.ErrorService.handleError(message)
                    this.onClose_In_Active();
                    this.ngOnInit()
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

}
