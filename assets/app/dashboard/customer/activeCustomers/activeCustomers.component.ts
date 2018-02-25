import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PayServiceModel } from '../../../front_end_models/payServiceModel';
@Component({
    selector: 'app-active',
    templateUrl: "./activeCustomers.component.html",
    styleUrls: ["./activeCustomers.component.css"]
})
export class ActiveCustomerComponent implements OnInit {
    IsAsc_orders: boolean; limit: number = 10;
    Sort_value_orders: any;
    indRow_cus: any;
    sortoptions_Cust_Orders = {}
    Non_Ordered_Customers: any;
    Ordered_Customers: any;
    Total_Customers: any;
    sortOptions = {}; Cu_Or_Index: any = 0;
    isSearching: boolean;
    custId_orders: any;
    skip_value_orders: number;
    index_orders: number;
    ordersCount: number = 1;
    isviewOrders: any;
    p: number = 1;
    array_orderscount: any[] = [];
    Total_orders_count: any;
    CustomersOrders: any = [];
    isOrdersDetails: any;
    active_json: any[] = [];
    Sort_value: any;
    IsAsc: boolean;
    activeId: number; activeIdCustomer: number;
    isAddressLog: boolean;
    isviewDevicess: boolean;
    referral_code: any;
    isMoreinfo: boolean;
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
        this.isRequesting = true
        this.isviewOrders = -1
        let uid = this._cookieService.get('ez_admin_cusID')
        const body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, uid, this.limit, this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Active_Customers_Without_Filter', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.active_CustomersData = data.json().extras.CustomerData
                    this.active_json = data.json().extras.CustomerData
                    this.isSearching = false
                    if (this.active_CustomersData.length == 0) {
                        this.isData = true
                    }
                    /* pagination*/
                    this.Total_Count = data.json().extras.Count
                    if (this.active_CustomersData.length == 0) {
                        this.isData = true
                    }
                    /* completed*/
                    this.customerAnalytics()
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
    customerAnalytics() {
        const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Active_Customer_Analytics', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.Total_Customers = data.json().extras.Total_Customers
                    this.Ordered_Customers = data.json().extras.Ordered_Customers
                    this.Non_Ordered_Customers = data.json().extras.Non_Ordered_Customers
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    getStyle(index) {
        if (index == this.index) {
            return "#795548";
        }
    }
    pageChanged(event) {
        this.p = event
        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;
        this.isviewOrders = -1
        let skip_value = this.index * 10
        let uid = this._cookieService.get('ez_admin_cusID')
        const result_table_data = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, uid, this.limit, this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Customers_Without_Filter', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.active_CustomersData = data.json().extras.CustomerData
                    this.active_json = data.json().extras.CustomerData
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
        this.activeId = null
        this.mymodel = newValue;
        let length = newValue.length
        if (length >= 3) {
            this.active_CustomersData = []
            this.p = 1
            this.isviewOrders = -1
            this.skip_value = 0
            const body1 = new adminOrder_SearchModal(null, newValue, null, this.sortOptions, this._cookieService.get('ez_admin_cusID'))
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_Active_Customers', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        let resultdata = []
                        this.isSearching = true
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
        this.First_name = item.customerName
        this.Email = item.customerEmail
        this.Phone = item.customerPhone
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
    sortColumn(key) {

        var pattern
        if (this.Sort_value != key) {

            this.Sort_value = key
            this.IsAsc = true
        } else {

            this.IsAsc = !this.IsAsc
        }
        if (this.IsAsc == true) {
            pattern = 1
        }
        if (this.IsAsc == false) {
            pattern = -1
        }
        this.sortOptions = {}
        this.sortOptions[key] = pattern
        this.ngOnInit()
        this.p = 1
    }
    sortColumnCustomer(key) {
        var pattern;
        if (this.Sort_value_orders != key) {
            this.Sort_value_orders = key
            this.IsAsc_orders = true
        } else {
            this.IsAsc_orders = !this.IsAsc_orders
        }
        if (this.IsAsc_orders == true) {
            pattern = 1
        }
        if (this.IsAsc_orders == false) {
            pattern = -1
        }
        this.sortoptions_Cust_Orders = {}
        this.sortoptions_Cust_Orders[key] = pattern
        this.getOrders(this.indRow_cus, this.isviewOrders)
    }
    OnDelete() {
        const body1 = new adminOrder_SearchModal(null, null, this.CustomerID)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Make_Customer_Inactive', body1, { headers: headers })
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
    moreData(item) {
        this.First_name = item.customerName
        this.Email = item.customerEmail
        this.Phone = item.customerPhone
        this.referral_code = item.referral_code
        if (item.Devices.length) {
            this.Devices = item.Devices
        } else {
            this.Devices = ''
        }
        if (item.AddressLog.length) {
            this.AddressLog = item.AddressLog
        } else {
            this.AddressLog = ''
        }
        if (item.CustomerImage.length) {
        } else {
        }
    }
    onMoreInfo(item) {
        this.isMoreinfo = true
        this.moreData(item)
    }
    onClose_moreInfo() {
        this.isMoreinfo = false
    }
    OnviewDevices() {
        this.isviewDevicess = true
        this.isAddressLog = false
    }
    onViewAddress() {
        this.isviewDevicess = false
        this.isAddressLog = true
    }
    getOrders(item, i) {
        this.indRow_cus = item

        if (item.OrdersCount > 0) {
            this._cookieService.put('ez_CusID_Order', item.CustomerID)
            this.ordersCount = 1
            this.isOrdersDetails = i
            this.isviewOrders = i
            this.isRequesting = true
            let uid = this._cookieService.get('ez_cusID')
            const body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, item.CustomerID, null, 10, this.sortoptions_Cust_Orders)
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/VIEW_ALL_CUSTOMER_ORDERS', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.isRequesting = false
                        this.CustomersOrders = data.json().extras.OrderData
                        /* pagination*/
                        this.Total_orders_count = data.json().extras.Count
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
    }
    pageChanged_orders(event) {
        this.ordersCount = event
        this.nextpage_orders(this.ordersCount - 1)
    }
    closeOrders() {
        this.isviewOrders = -1
    }
    nextpage_orders(index) {
        this.isRequesting = true
        let skip_value = index * 10
        let empid = this._cookieService.get('EmployeeID')
        const body1 = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_CusID_Order'), null, 10, this.sortoptions_Cust_Orders)
        const body = JSON.stringify(body1)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/VIEW_ALL_CUSTOMER_ORDERS', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.CustomersOrders = data.json().extras.OrderData
                } else {
                    this.isRequesting = false
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
}
