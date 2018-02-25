import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
@Component({
    selector: 'app-cancel',
    templateUrl: "cancelOrders.component.html",
    styleUrls: ["cancelOrders.component.css"]
})
export class CancelOrderComponent implements OnInit {
    sortOptions:any
    limit: number = 10
    Driver_Email: any;
    OfferDescription: any;
    orderType: any;
    barcodeId: any;
    itemMsg: string;
    ZonesLogs: any = [];
    onselectitem: number = 0;
    offers = ["Zones Logs", "Notifications"]
    issearch: boolean;
    activeId: number
    p: number = 1;
    Fordelete: any;
    IsAsc: boolean;
    Cancellation_Reason: any; isedit_pick: boolean; isedit_drop: boolean;
    Cancelled_Time: any;
    Cancel_OrderData_json: any = [];
    valu: any;
    views: any;
    isimage: boolean;
    device_stirng: string;
    DeviceType: any;
    paymentType_string: string;
    OfferCode: any;
    OfferName: any;
    OfferApplied: string;
    Driver_PhoneNumber: any;
    OfferApplied_Boolean: any;
    paymentType: any;
    DiscountPercentage: any;
    Email: any;
    isdetails_View: boolean;
    index_delete: any;
    isdelete: boolean;
    jobType = 3
    Total_Count: any;
    mymodel: string;
    skip_value: number = 0;
    isRequesting: boolean;
    index: number = 0;
    array: string[] = [];
    isData: boolean;
    pickLongitude: any;
    pickLatitude: any;
    pickAddress: any;
    dropAddress: any;
    dropLatitude: any;
    dropLongitude: any;
    Phone: any;
    First_name: any;
    orderseqId: any;
    Driver_Name: any;
    receiverName: any;
    receiverPhone: any;
    itemName: any;
    itemDescription: any;
    itemImage: any;
    deliverycharge: any;
    item_actual_cost: any;
    bookingType: any;
    orderId: any;
    Cancel_OrderData: any = [];
    url: string = '';
    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }
    ngOnInit() {
        this.isRequesting = true
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit,this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false;
                    this.Cancel_OrderData = data.json().extras.OrderData
                    this.Cancel_OrderData_json = data.json().extras.OrderData

                    for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Cancel_OrderData[i].pickAddress
                        this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '')
                        this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India', '')
                    }
                    for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Cancel_OrderData[i].dropAddress
                        this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '')
                        this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India', '')
                    }

                    if (!this.Cancel_OrderData.length) {

                        this.isData = true;
                    } else {
                        this.issearch = false
                        this.isData = false;
                    }

                    /* pagination*/
                    this.Total_Count = data.json().extras.Count



                    /* pagination*/
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
    /* copy for more details*/
    OnmoreDetails(item, i) {
        this.pickLatitude = item.pickLatitude
        this.pickLongitude = item.pickLongitude
        this.pickAddress = item.pickAddress
        this.dropAddress = item.dropAddress
        this.dropLatitude = item.dropLatitude
        this.dropLongitude = item.dropLongitude
        this.orderId = item.orderId
        this.bookingType = item.bookingType
        this.receiverName = item.receiverName
        this.receiverPhone = item.receiverPhone
        this.itemName = item.itemName
        this.itemDescription = item.itemDescription
        this.itemImage = item.itemImage
        this.deliverycharge = item.deliverycharge
        this.item_actual_cost = item.item_actual_cost
        this.Driver_Name = item.Driver_Name
        this.orderseqId = item.orderseqId
        this.First_name = item.First_name
        this.Phone = item.Phone
        this.Email = item.Email
        this.Cancelled_Time = item.Cancelled_Time
        this.Cancellation_Reason = item.Cancellation_Reason
        this.orderType = item.orderType

        if (this.itemImage.length) {
            this.isimage = true
        } else {
            this.isimage = false
        }
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item)
        } else {
        }
        this.DiscountPercentage = item.DiscountPercentage
        this.paymentType = item.paymentType
        this.OfferApplied_Boolean = item.OfferApplied
        this.Driver_PhoneNumber = item.Driver_PhoneNumber

        if (this.OfferApplied_Boolean) {

            this.OfferApplied = 'Yes'
            this.OfferName = item.OfferName
            this.OfferCode = item.OfferCode
        } else {

            this.OfferApplied = 'No'
        }
        if (this.paymentType == 1) {
            this.paymentType_string = 'Cash On Delivery'
        } else {
            this.paymentType_string = 'Online'
        }
        this.DeviceType = item.DeviceType
        if (this.DeviceType == 1) {
            this.device_stirng = 'Ios'
        } else if (this.DeviceType == 2) {
            this.device_stirng = 'Android'
        } else if (this.DeviceType == 3) {
            this.device_stirng = 'Web'
        }
        this.OfferDescription = item.OfferDescription
        this.orderType = item.orderType
        if (item.Driver_Assigned == true) {
            this.Driver_Email = item.Driver_Email


        } else {


        }


    }

    pageChanged(event) {
        this.views=null
        this.p = event
        this.nextpage(this.p - 1)
    }

    nextpage(index) {
        this.isRequesting = true
        this.index = index;

        let skip_value = this.index * this.limit
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit,this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.issearch = false
                    this.Cancel_OrderData = data.json().extras.OrderData
                    this.Cancel_OrderData_json = data.json().extras.OrderData

                    for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Cancel_OrderData[i].pickAddress
                        this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '')
                        this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India', '')
                    }
                    for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Cancel_OrderData[i].dropAddress
                        this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '')
                        this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India', '')
                    }

                    this.skip_value = this.index * this.limit
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    valuechange(newValue: string) {
        this.views=null
        this.mymodel = newValue;
        let length = newValue.length
        if (length >= 3) {
            this.Cancel_OrderData = []
            this.array = []
            this.skip_value = 0
            const body1 = new adminOrder_SearchModal(this.jobType, newValue)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Orders_Ezshipp', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.issearch = true
                        this.array.length = 0
                        let resultdata = []
                        this.views = -1
                        this.Cancel_OrderData = data.json().extras.OrderData
                        this.Cancel_OrderData_json = data.json().extras.OrderData

                        for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Cancel_OrderData[i].pickAddress
                            this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana', '')
                            this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India', '')
                        }
                        for (var i = 0; i < this.Cancel_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Cancel_OrderData[i].dropAddress
                            this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana', '')
                            this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India', '')
                        }

                        this.array.length = 0.
                    }
                }
                )
        } else {
            this.Cancel_OrderData = []
            this.ngOnInit()
            this.array.length = 0
            this.index = 0
        }
    }
    onDelete(item, index) {
        this.orderId = item.orderId
        this.isdelete = true
        this.Fordelete = index
        this.index_delete = index
        this.First_name = item.First_name
        this.orderseqId = item.orderseqId

    }
    onClose_Delete() {
        this.index_delete = -1
    }
    remove_Order() {
        this.isRequesting = true
        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    setTimeout(() => {
                        this.isRequesting = false
                        this.index_delete = -1

                        this.cdref.detectChanges();
                        this.Cancel_OrderData.splice(this.Fordelete, 1)
                        this.isdelete = false
                    }, 2000)
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
    close() {
        this.views = null;
    }
    OnmoreInfo_order(item, i) {
        this.views = i;
        this.OnmoreDetails(item, i)
    }
    sortColumn(key) {
        var backendkey;
        if(key=='First_name'){
            backendkey='customerName'
        }else if(key=='Phone '){
            backendkey='customerPhone'
        }else{
            backendkey=key
        }

        if (this.valu != key) {
            this.valu = key
            this.IsAsc = true
        }else{
            this.IsAsc=!this.IsAsc
        }

        if (this.IsAsc == true) {
            var sort = 1
        } else if (this.IsAsc == false) {
            sort = -1
        }
       this.sortOptions={}
       this.sortOptions[backendkey] = sort

        this.ngOnInit()
        this.p=1


    }


    Onselect(m, itemss, item) {

        this.onselectitem = m
        if (itemss == "Zones Logs") {
            const body = new OrdersModel_admin(null, null, item.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Zone_Orders_Logs', body, { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        this.ZonesLogs = data.json().extras.ZoneOrderLogData
                        if (this.ZonesLogs.length) {
                            this.barcodeId = this.ZonesLogs[0].barcodeid
                        } else {
                            this.itemMsg = 'No zones logs Found'
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
                })
        } else {
            this.ZonesLogs = []
            this.itemMsg = 'No Notification Found'
        }

    }
    OnselectCount(event) {
        this.limit = event.target.value

        this.ngOnInit()
        this.p = 1
    }
}