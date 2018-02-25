import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-TrashOrders',
    templateUrl: './TrashOrders.component.html',
    styleUrls: ['./TrashOrders.component.css']
})
export class TrashOrdersComponent implements OnInit {
    sortOptions: {};
    IsAsc: boolean;
    limit: number = 10
    itemMsg: string;
    ZonesLogs: any = [];
    onselectitem: number = 0;
    offers = ["Zones Logs", "Notifications"]
    p: number = 1;
    issearch: boolean;
    activeId: number
    Trashorders_json: any = [];
    dsc: boolean;
    asc: boolean;
    valu: string;
    increment: number;
    compareArrow: any;
    arrow_Index: any;
    isDriver_Assigned: boolean;
    Driver_Email: any;
    orderType: any;
    OfferDescription: any;
    device_stirng: string;
    DeviceType: any;
    paymentType_string: string;
    isimage: boolean;
    OfferCode: any;
    OfferName: any;
    OfferApplied: string;
    status: any;
    Driver_PhoneNumber: any;
    OfferApplied_Boolean: any;
    paymentType: any;
    DiscountPercentage: any;
    order_datetime: any;
    Email: any;
    Phone: any;
    First_name: any;
    orderseqId: any;
    Driver_Name: any;
    item_actual_cost: any;
    deliverycharge: any;
    itemImage: any;
    itemDescription: any;
    itemName: any;
    receiverPhone: any;
    receiverName: any;
    bookingType: any;
    orderId: any;
    dropLongitude: any;
    dropLatitude: any;
    dropAddress: any;
    pickAddress: any;
    pickLongitude: any;
    pickLatitude: any;
    views: any;
    mymodel: string;
    skip_value: number = 0;
    index: any = 0;
    array: any = [];
    isData: boolean;
    Total_Count: any;
    Trashorders: any = [];
    url: string = '';
    jobType: any = 7;
    isRequesting: boolean;
    headers = [
        "ID",
        "C.Name",
        "C.Phone",
        "Date",
        "O.Type",
        "P.Zone",
        "D.Zone"
    ]

    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }
    ngOnInit() {
        this.isRequesting = true
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.Trashorders = data.json().extras.OrderData
                    this.Trashorders_json = data.json().extras.OrderData
                    this.Total_Count = data.json().extras.Count

                    for (var i = 0; i < this.Trashorders.length; i++) {
                        var str: string = ''
                        var pick: string = this.Trashorders[i].pickAddress
                        this.Trashorders[i].pickAddress = pick.replace('Telangana', '')
                        this.Trashorders[i].pickAddress = this.Trashorders[i].pickAddress.replace(', India', '')
                    }
                    for (var i = 0; i < this.Trashorders.length; i++) {
                        var str: string = ''
                        var pick: string = this.Trashorders[i].dropAddress
                        this.Trashorders[i].dropAddress = pick.replace('Telangana', '')
                        this.Trashorders[i].dropAddress = this.Trashorders[i].dropAddress.replace(', India', '')
                    }

                    if (!this.Trashorders.length) {

                        this.isData = true;
                    } else {
                        this.issearch = false
                        this.isData = false;
                    }
                    let count: number = parseInt(data.json().extras.Count)
                    let count1: number = Math.floor(count / 10);

                    let count2 = count % 10
                    if (count2 == 0) {
                        this.array.length = count1
                    } else {
                        this.array.length = count1 + 1
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

    pageChanged(event) {
        this.views = null
        this.p = event
        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;

        let skip_value = this.index * this.limit
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.issearch = false
                    this.isRequesting = false
                    this.Trashorders = data.json().extras.OrderData

                    for (var i = 0; i < this.Trashorders.length; i++) {
                        var str: string = ''
                        var pick: string = this.Trashorders[i].pickAddress
                        this.Trashorders[i].pickAddress = pick.replace('Telangana', '')
                        this.Trashorders[i].pickAddress = this.Trashorders[i].pickAddress.replace(', India', '')

                    }
                    for (var i = 0; i < this.Trashorders.length; i++) {
                        var str: string = ''
                        var pick: string = this.Trashorders[i].dropAddress
                        this.Trashorders[i].dropAddress = pick.replace('Telangana', '')
                        this.Trashorders[i].dropAddress = this.Trashorders[i].dropAddress.replace(', India', '')
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
        this.views = null
        this.mymodel = newValue;

        let length = newValue.length
        if (length >= 3) {
            this.issearch = true
            this.Trashorders = []
            this.array = []
            this.skip_value = 0
            const body1 = new adminOrder_SearchModal(this.jobType, newValue)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Orders_Ezshipp', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.array.length = 0
                        let resultdata = []
                        this.Trashorders = data.json().extras.OrderData
                        this.views = -1
                        for (var i = 0; i < this.Trashorders.length; i++) {
                            var str: string = ''
                            var pick: string = this.Trashorders[i].pickAddress
                            this.Trashorders[i].pickAddress = pick.replace('Telangana', '')
                            this.Trashorders[i].pickAddress = this.Trashorders[i].pickAddress.replace(', India', '')
                        }
                        for (var i = 0; i < this.Trashorders.length; i++) {
                            var str: string = ''
                            var pick: string = this.Trashorders[i].dropAddress
                            this.Trashorders[i].dropAddress = pick.replace('Telangana', '')
                            this.Trashorders[i].dropAddress = this.Trashorders[i].dropAddress.replace(', India', '')
                        }

                        this.array.length = 0.
                    }
                }
                )
        } else {
            this.Trashorders = []
            this.ngOnInit()

            this.array.length = 0
            this.index = 0

        }
    }
    OnmoreInfo_order(item, i) {

        this.views = i;
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
        this.order_datetime = item.order_datetime
        this.DiscountPercentage = item.DiscountPercentage
        this.paymentType = item.paymentType
        this.OfferApplied_Boolean = item.OfferApplied
        this.Driver_PhoneNumber = item.Driver_PhoneNumber
        this.status = item.status
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item)
        } else {
        }
        if (this.OfferApplied_Boolean) {

            this.OfferApplied = 'Yes'
            this.OfferName = item.OfferName
            this.OfferCode = item.OfferCode
        } else {

            this.OfferApplied = 'No'
        }
        if (this.itemImage.length) {

            this.isimage = true
        } else {
            this.isimage = false

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
            this.isDriver_Assigned = true

        } else {
            this.isDriver_Assigned = false

        }
    }
    onClose_details_View() {
        this.views = null;
    }

    sortColumn(i) {

        this.activeId = i
        this.arrow_Index = i
        var key;
        if (i == 0) {
            key = 'orderseqId'
        }
        else if (i == 1) {
            key = 'customerName'
        }
        else if (i == 2) {
            key = 'Date'
        }
        else if (i == 3) {
            key = 'order_datetime'
        }
        else if (i == 4) {
            key = 'bookingType'
        }
        else if (i == 5) {
            key = 'pickupdeponame'
        }
        else if (i == 6) {
            key = 'deliverydeponame'
        }


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
        this.sortOptions[key] = sort

        this.ngOnInit()
        this.p = 1

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
