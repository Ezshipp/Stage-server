import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-inactive',
    templateUrl: "./InactiveCustomers.component.html",
    styleUrls: ["./InactiveCustomers.component.css"]
})
export class InActiveCustomerComponent implements OnInit {
    p:number=1
    sortKey: string;
    activeId:number
    sortOptions: any;
    isdetails_View_AddressLog: boolean;
    isdetails_View_devices: boolean;
    index_delete: any;
    Phone: any;
    Email: any;
    First_name: any;
    isdelete: boolean;
    CustomerID: any;
    AddressLog: any = [];
    Devices: any = [];
    mymodel: string;
    skip_value: number = 0;
    index: any = 0;
    Total_Count: any;
    isData: boolean;
    url: string = '';
    active_CustomersData: any = [];
    isRequesting: boolean;
    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }
    ngOnInit() {
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(null, 0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_InActive_Customers', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.active_CustomersData = data.json().extras.CustomerData
                    if (this.active_CustomersData.length == 0) {
                        this.isData = true
                    }
                    /* pagination*/
                    this.Total_Count = data.json().extras.Count
                    if (this.active_CustomersData.length == 0) {
                        this.isData = true
                    }
                    /* completed*/
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
    pageChanged(ev:number){
        this.p=ev
        this.nextpage(this.p-1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;
        let skip_value = this.index * 10
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new OrdersModel_admin(null, skip_value,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_InActive_Customers', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.active_CustomersData = data.json().extras.CustomerData
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    valuechange(newValue: string) {
        this.mymodel = newValue;
        this.activeId=null
        let length = newValue.length
        if (length >= 3) {
            this.active_CustomersData = []
            this.skip_value = 0
            const body1 = new adminOrder_SearchModal(null, newValue)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_InActive_Customers', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        let resultdata = []
                        this.active_CustomersData = data.json().extras.CustomerData
                    }
                }
                )
        } else {
            this.active_CustomersData = []
            this.ngOnInit()
            this.index = 0
        }
    }
    edit(item) {
        this.Devices = item.Devices
        this.AddressLog = item.AddressLog
        this.CustomerID = item.CustomerID
        this.First_name = item.First_name
        this.Email = item.Email
        this.Phone = item.Phone
    }
    onDeviceInfo(item) {
        this.edit(item)
        this.isdetails_View_devices = true
    }
    onAddressInfo(item) {
        this.edit(item)
        this.isdetails_View_AddressLog = true
    }
    onInactive(item, index) {
        this.isdelete = true
        this.edit(item)
        this.CustomerID = item.CustomerID
        this.index_delete = index
    }
    OnDelete() {
        const body1 = new adminOrder_SearchModal(null, null, this.CustomerID)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Make_Customer_Active', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.active_CustomersData.splice(this.index_delete, 1)
                    this.isdelete = false
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
    onClose_Delete() {
        this.isdelete = false
    }
    onClose_details_View() {
        this.isdetails_View_devices = false
    }
    onClose_details_View_AddressLog() {
        this.isdetails_View_AddressLog = false
    }
    sortColumn(key) {
        if (this.sortKey != key) {
            this.sortKey = key
            var sort = 1
           
        } else {
            
            var sort = -1
        }
        this.sortOptions = {}
        this.sortOptions[key] = sort
            this.ngOnInit()
        this.p = 1
    }
}