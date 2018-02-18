import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CreateAdminModel } from '../../../front_end_models/create_adminUserModel';

@Component({
    selector: 'app-InActive',
    templateUrl: './In_Active_AdminUsers.component.html',
    styleUrls: ['./In_Active_AdminUsers.component.css']
})
export class In_Active_AdminUsersComponent implements OnInit {
    AdminID: any;
    AdminName: any;
    isresetpassword: boolean;
    Total_Count: any;
    isSearch: boolean;
    p: number = 1;
    isRequesting: boolean;
    url: string = '';
    skip = 0;
    limit = 10; AdminData: any = [];
    constructor(private _cookieService: CookieService,
        private http: Http, private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService) { }

    ngOnInit() {
        this.findUsers(1, '/Find_All_Inactive_Super_Admins')
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

                        this.Total_Count = data.json().extras.Count
                    } else if (type == 2) {
                        this.AdminData = data.json().extras.AdminData
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
        this.p = event
        var p = this.p - 1
        this.isRequesting = true
        let skip_value = p * this.limit
        this.skip = skip_value
        this.isRequesting = true
        this.findUsers(2, '/Find_All_Inactive_Super_Admins')
    }
    OnselectCount(event) {
        this.limit = event.target.value
        this.skip = 0
        this.ngOnInit()
        this.p = 1
    }

    onActiveConformation(item) {
        this.isresetpassword = true
        this.AdminName = item.AdminName
        this.AdminID = item.AdminID
    }
    onClose_Delete() {
        this.isresetpassword = false
    }
    OnReset_password() {
        const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), null,
            null, null, null, null, this.AdminID)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Activate_Super_Admin', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    let message = "Admin User Activated Successfully";
                    this.ErrorService.handleError(message)
                    this.onClose_Delete()
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