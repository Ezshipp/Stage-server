import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { ApiMessageService } from "../../../authentication/apimessages.service";
import { OrdersModel_admin } from "../../../front_end_models/OrdersModel";
import { CookieService } from "angular2-cookie/services";
import { ErrorService } from "../../../errors/error.service";
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
import { FilterModel } from '../../../front_end_models/filterModel';
@Component({
    selector: 'app-complete',
    templateUrl: "completedOrders.component.html",
    styleUrls: ["./../allorders/allorders.component.css"]
})
/* css file is all order css file */
export class CompletedOrdersComponent implements OnInit {
    isOnlineClicked: boolean = false;
    filter_search_biker: boolean = false;
    isAssignDriver: boolean = false;
    DriverData = [];
    filterPhoneNumber: string = '';
    filterName: string = '';
    Whether_Date_Filter: boolean = false;
    filter_search_date: boolean = false;
    filter_search_name: boolean = false;
    filter_search_phone: boolean = false;
    CLEAR_ALL: boolean = true;
    Whether_PhoneNumber_Filter: boolean = false;
    Whether_Name_Filter: boolean = false;
    from_date_back: string;
    to_date_back: string;
    from_date: any;
    to_date: any;
    filterBiker: string = '';
    Whether_Driver_Filter: boolean = false;
    DriverID: string;
    Payment_Not_Captured: boolean = false;
    Payment_Captured: boolean = false;
    Whether_Online_Filter: boolean = false;
    Whether_Cash_Filter: boolean = false;
    filter_search_payment_type: boolean = false; PaymentType_Filter: any;
    fiterElementsActive: boolean = false; Name_Query_Type;
    Whether_Pick_Zone_Filter: boolean = false;
    Whether_Drop_Zone_Filter: boolean = false;
    filter_zones_drop: boolean = false;
    ZoneData: any = [];
    filter_zones: boolean = false; PickZoneArray = []; DropZoneArray = [];
    Whether_SameDay_BookingType: boolean = false;
    Whether_Instant_BookingType: boolean = false;
    Whether_FoursHrs_BookingType: boolean = false;
    isbookingTypeFilterOptions: boolean;
    click_all_filter: boolean = false;
    sortOptions = {};filter = "./img/filter_click.png";
    limit: number = 10
    OfferDescription: any;
    barcodeId: any;
    itemMsg: string;
    ZonesLogs: any = [];
    onselectitem: number = 0;
    offers = ["Zones Logs", "Notifications"]
    issearch: boolean;
    p: number;
    activeId: number
    Order_Journey_Time: any;
    Shipping_Distance: any;
    Order_Completed_Time: any;
    Order_Accepted_Time: any;
    isDelete: any;
    IsAsc: boolean;
    alordersData_json: any = [];
    orderType: any;
    ResultData_search: any[] = []; filteredData = null;
    valu: any;
    Driver_Email: any;
    status: any;
    views: any;
    isimage: boolean;
    index_delete;
    isdelete: boolean;
    Driver_PhoneNumber: any;
    jobType = 1
    isData: boolean = false;
    OfferCode: any;
    OfferName: any;
    OfferApplied_Boolean: any;
    OfferApplied: string;
    paymentType_string: string;
    device_stirng: string;
    DeviceType: any;
    Email: any;
    order_datetime: any;
    DiscountPercentage: any;
    paymentType: any;
    isdetails_View: boolean;
    orderId: any;
    bookingType: any;
    receiverName: any;
    receiverPhone: any;
    itemName: any;
    itemDescription: any;
    itemImage: any;
    deliverycharge: any;
    item_actual_cost: any;
    Driver_Name: any;
    orderseqId: any;
    First_name: any;
    Phone: any;
    dropLongitude: any;
    dropAddress: any;
    dropLatitude: any;
    pickAddress: any;
    pickLongitude: any;
    pickLatitude: any;
    isRequesting: boolean;
    skip_value: number = 0;
    index: any = 0;
    mymodel = ''
    array: any = [];
    Total_Count: any;
    allordersdata: any = [];
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
                    this.isRequesting = false
                    this.issearch = false
                    this.allordersdata = data.json().extras.OrderData
                    this.alordersData_json = data.json().extras.OrderData

                    this.Total_Count = data.json().extras.Count
                    for (var i = 0; i < this.allordersdata.length; i++) {
                        var str: string = ''
                        var pick: string = this.allordersdata[i].pickAddress
                        this.allordersdata[i].pickAddress = pick.replace('Telangana', '')
                        this.allordersdata[i].pickAddress = this.allordersdata[i].pickAddress.replace(', India', '')
                    }
                    for (var i = 0; i < this.allordersdata.length; i++) {
                        var str: string = ''
                        var pick: string = this.allordersdata[i].dropAddress
                        this.allordersdata[i].dropAddress = pick.replace('Telangana', '')
                        this.allordersdata[i].dropAddress = this.allordersdata[i].dropAddress.replace(', India', '')
                    }
                    if (!this.allordersdata.length) {
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
    getStyle(index) {
        if (index == this.index) {
            return "#795548";
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
        if (this.CLEAR_ALL == false) {
            const body = new FilterModel(skip_value, this.limit, this._cookieService.get('ez_admin_cusID'),
                this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName,
                this.Whether_PhoneNumber_Filter, this.filterPhoneNumber,
                null, null,
                null, null,
                this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter,
                this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray)
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Find_All_Completed_Orders_Filtering', body, { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        this.allordersdata = data.json().extras.OrderData
                        this.click_all_filter = false;
                        this.isRequesting = false
                        this.issearch = false
                        this.alordersData_json = data.json().extras.OrderData
                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].pickAddress
                            this.allordersdata[i].pickAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].pickAddress = this.allordersdata[i].pickAddress.replace(', India', '')
                        }
                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].dropAddress
                            this.allordersdata[i].dropAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].dropAddress = this.allordersdata[i].dropAddress.replace(', India', '')
                        }
                        if (!this.allordersdata.length) {
                            this.isData = true;
                        } else {
                            this.issearch = false
                            this.isData = false;
                        }
                        /* pagination*/
                        this.Total_Count = data.json().extras.Count

                       
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
            let empid = this._cookieService.get('EmployeeID')
            const result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit,this.sortOptions)
            const body = JSON.stringify(result_table_data)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.close();
                        this.isRequesting = false
                        this.issearch = false
                        this.allordersdata = data.json().extras.OrderData
                        this.orderseqId = this.allordersdata.orderseqId;

                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].pickAddress
                            this.allordersdata[i].pickAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].pickAddress = this.allordersdata[i].pickAddress.replace(', India', '')

                        }
                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].dropAddress
                            this.allordersdata[i].dropAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].dropAddress = this.allordersdata[i].dropAddress.replace(', India', '')

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

    }
    valuechange(newValue: string) {
        this.views=null
        this.mymodel = newValue;
        let length = newValue.length
        if (length >= 3) {
            this.allordersdata = []
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
                        this.issearch = true
                        this.views=-1
                        this.allordersdata = data.json().extras.OrderData
                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].pickAddress
                            this.allordersdata[i].pickAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].pickAddress = this.allordersdata[i].pickAddress.replace(', India', '')

                        }
                        for (var i = 0; i < this.allordersdata.length; i++) {
                            var str: string = ''
                            var pick: string = this.allordersdata[i].dropAddress
                            this.allordersdata[i].dropAddress = pick.replace('Telangana', '')
                            this.allordersdata[i].dropAddress = this.allordersdata[i].dropAddress.replace(', India', '')

                        }
                        this.array.length = 0.
                    }
                }
                )
        } else {
            this.allordersdata = []
            this.ngOnInit()
            this.array.length = 0
            this.index = 0
        }
    }
    edit(item, i) {
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
        this.orderType = item.orderType
        this.views = i;
        if (item.Whether_Zone_Drop) {
            this.Onselect(this.onselectitem, 'Zones Logs', item)
        } else {

        }
        if (this.itemImage.length) {
            this.isimage = true
        } else {
            this.isimage = false
        }
        this.order_datetime = item.order_datetime
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
        this.Order_Accepted_Time = item.Order_Accepted_Time;
        this.Order_Completed_Time = item.Order_Completed_Time;
        this.Shipping_Distance = item.Shipping_Distance;
        this.Order_Journey_Time = item.Order_Journey_Time;
        this.OfferDescription = item.OfferDescription
        this.orderType = item.orderType
        if (item.Driver_Assigned == true) {
            this.Driver_Email = item.Driver_Email


        } else {


        }
    }
    OnmoreInfo_order(item, i) {
        this.edit(item, i)
        this.isdetails_View = true
    }
    onClose_details_View() {
        this.isdetails_View = false
    }
    onDelete(item, index) {
        this.isDelete = index
        this.orderId = item.orderId

        this.index_delete = index
        this.First_name = item.First_name
        this.orderseqId = item.orderseqId
        this.Driver_Name = item.Driver_Name
        this.receiverName = item.receiverName
        this.receiverPhone = item.receiverPhone
        this.Phone = item.Phone
        if (this.views != null) {
            this.close();
        }
    }
    onClose_Delete() {
        this.index_delete = -1
    }
    remove_Order() {
        this.isRequesting = true;
        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    setTimeout(() => {
                        this.index_delete = -1
                        this.isRequesting = false;
                        this.cdref.detectChanges();
                        this.allordersdata.splice(this.isDelete, 1)
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
    row_View(row_View, i) {

        this.Driver_Name = row_View.Driver_Name
        this.Driver_PhoneNumber = row_View.Driver_PhoneNumber
        this.Driver_Email = row_View.Driver_Email
        this.status = row_View.status
        this.DeviceType = row_View.DeviceType
        this.views = i;
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
       this.sortOptions = {};
       this.sortOptions[backendkey] = sort

        this.ngOnInit()
        this.p=1
    }

    close() {
        this.views = null;

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
        if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
            && this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
            && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false &&
            this.Whether_Pick_Zone_Filter == false && this.Whether_Drop_Zone_Filter == false) {
            this.ngOnInit()
            this.p = 1
        } else {
            this.skip_value = 0
            this.filterApply()
        }
    }
    click_filter_view() {
        this.click_all_filter = true
    }

    click_name_filter() {
        this.filter_search_name = !this.filter_search_name
    }
    click_phone_filter() {
        this.filter_search_phone = !this.filter_search_phone
    }
    click_biker_filter() {
        this.filter_search_biker = !this.filter_search_biker
        this.isAssignDriver = true;
        const body = new OrdersModel_admin()
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.DriverData = data.json().extras.DriverData
                    this.DriverID = this.DriverData[0].DriverID
                    this.Driver_Name = this.DriverData[0].name
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
    }

    onSelectFilter(event: number) {
        this.Name_Query_Type = event;
      
    }
    click_payment_type() {
        this.filter_search_payment_type = !this.filter_search_payment_type
    }

    click_date_filter() {
        this.filter_search_date = !this.filter_search_date
    }
    payTypeCheck(event) {
        if (event.target.id == "cashCheck") {
            this.Whether_Cash_Filter = !this.Whether_Cash_Filter;
        } else {
            this.Whether_Online_Filter = !this.Whether_Online_Filter;
            this.isOnlineClicked = !this.isOnlineClicked;
        }
    }
    bookingType_Filter() {
        this.isbookingTypeFilterOptions = !this.isbookingTypeFilterOptions
    }
    bookingTypeCheck(event) {
       
        if (event.target.id == 'Instant') {
       
            this.Whether_Instant_BookingType = !this.Whether_Instant_BookingType
        } else if (event.target.id == 'Fourhours') {
          
            this.Whether_FoursHrs_BookingType = !this.Whether_FoursHrs_BookingType

        } else if (event.target.id == 'sameDay') {
           
            this.Whether_SameDay_BookingType = !this.Whether_SameDay_BookingType

        }

    }

    capturedCheck(event) {
        if (event.target.id == "capturedCheck") {
            this.Payment_Captured = !this.Payment_Captured;
        } else if (event.target.id == "capturedNotCheck") {
            this.Payment_Not_Captured = !this.Payment_Not_Captured;
        }
    }
    zone_filter() {
        this.filter_zones = !this.filter_zones;
        if (this.filter_zones == true) {
            const body = new FilterModel()
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.ZoneData = data.json().extras.ZoneData
                      
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);
                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)
                    }
                }
                )
        }
    }
    drop_zone_filter() {
        this.filter_zones_drop = !this.filter_zones_drop;
        if (this.filter_zones_drop == true) {
            const body = new FilterModel()
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.ZoneData = data.json().extras.ZoneData
                       
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);
                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)
                    }
                }
                )
        }
    }
    zoneDCheck(event, seq, index, title) {
        if (event.target.checked == true) {
            var val = event.target.value
            this.DropZoneArray.push(val)
        } else if (!event.target.checked == true) {
            let val = event.target.value
            let inde = this.DropZoneArray.indexOf(val)
            if (inde == -1) {
            } else {
                this.DropZoneArray.splice(inde, 1)
            }
        }
    }
    zonePCheck(event, seq, index, title) {
        if (event.target.checked == true) {
            var val = event.target.value
            this.PickZoneArray.push(val)
        } else if (!event.target.checked == true) {
            let val = event.target.value
            let inde = this.PickZoneArray.indexOf(val)
            if (inde == -1) {
            } else {
                this.PickZoneArray.splice(inde, 1)
            }
        }

    }

    filterApply() {
        this.views = null
        this.CLEAR_ALL = false;
        this.isRequesting = true;
        this.p = 1
        if (this.PickZoneArray.length) {
            this.Whether_Pick_Zone_Filter = true;
        } else {
            this.Whether_Pick_Zone_Filter = false;
        }

        if (this.DropZoneArray.length) {
            this.Whether_Drop_Zone_Filter = true;
        } else {
            this.Whether_Drop_Zone_Filter = false;
        }

        if (this.filterName.length > 1) {
            this.CLEAR_ALL = false;
            this.Whether_Name_Filter = true;
           
        } else {
            this.Whether_Name_Filter = false;
        }
        if (this.filterPhoneNumber.length > 1) {
            this.CLEAR_ALL = false;
            this.Whether_PhoneNumber_Filter = true;

        } else {
            this.Whether_PhoneNumber_Filter = false;
        }

        if (this.from_date == undefined || this.to_date == undefined || this.from_date == null, this.to_date == null) {

            this.Whether_Date_Filter = false;
        } else {

            this.CLEAR_ALL = false;
            this.Whether_Date_Filter = true;
            var fdate = this.from_date.split('-')
            this.from_date_back = fdate[2] + '/' + fdate[1] + '/' + fdate[0]
            var tdate = this.to_date.split('-')
            this.to_date_back = tdate[2] + '/' + tdate[1] + '/' + tdate[0]
        }
        if (this.CLEAR_ALL == false) {
            if (this.Whether_Name_Filter == false && this.Whether_PhoneNumber_Filter == false
                && this.Whether_Date_Filter == false && this.Whether_Driver_Filter == false && this.Whether_Online_Filter == false && this.Whether_Cash_Filter == false
                && this.Payment_Captured == false && this.Payment_Not_Captured == false && this.Whether_Instant_BookingType == false && this.Whether_FoursHrs_BookingType == false && this.Whether_SameDay_BookingType == false &&
                this.Whether_Pick_Zone_Filter == false && this.Whether_Drop_Zone_Filter == false) {
                this.click_to_clear()
            } else {
                this.fiterElementsActive = true;
                const body = new FilterModel(this.skip_value, this.limit, this._cookieService.get('ez_admin_cusID'),
                    this.CLEAR_ALL, this.Whether_Name_Filter, this.filterName,
                    this.Whether_PhoneNumber_Filter, this.filterPhoneNumber,
                    null, null, null, null,
                    this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type,
                    this.Whether_Cash_Filter, this.Whether_Online_Filter,
                    this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter,
                    this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray)
                const headers = new Headers({ 'Content-Type': 'application/json' })
                return this.http.post(this.url + '/Find_All_Completed_Orders_Filtering', body, { headers: headers })
                    .subscribe(data => {
                        if (data.json().success) {
                            this.allordersdata = data.json().extras.OrderData
                            this.click_all_filter = false;
                      
                            this.isRequesting = false
                        
                            this.alordersData_json = data.json().extras.OrderData
                            for (var i = 0; i < this.allordersdata.length; i++) {
                                var str: string = ''
                                var pick: string = this.allordersdata[i].pickAddress
                                this.allordersdata[i].pickAddress = pick.replace('Telangana', '')
                                this.allordersdata[i].pickAddress = this.allordersdata[i].pickAddress.replace(', India', '')
                            }
                            for (var i = 0; i < this.allordersdata.length; i++) {
                                var str: string = ''
                                var pick: string = this.allordersdata[i].dropAddress
                                this.allordersdata[i].dropAddress = pick.replace('Telangana', '')
                                this.allordersdata[i].dropAddress = this.allordersdata[i].dropAddress.replace(', India', '')
                            }
                            if (!this.allordersdata.length) {
                                this.isData = true;
                            } else {
                                this.issearch = false
                                this.isData = false;
                            }
                            /* pagination*/
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
                    })
            }
        }
    }

    click_to_clear() {
        this.fiterElementsActive = false;
        this.clear_filter(1);
        this.ngOnInit();
    }
    onCloseDriverAssign() {
        this.isAssignDriver = false;
    }
    select_Biker(name, id) {
        this.filterBiker = name
        this.DriverID = id;
        this.isAssignDriver = false;
        this.Whether_Driver_Filter = true;
    }
    clearFilterSpecific(value: number) {
        if (value == 1) {
            this.Whether_Name_Filter = false;
            this.filterName = "";
            this.Name_Query_Type = null;
            this.filterApply()
        } else if (value == 2) {
            this.Whether_PhoneNumber_Filter = false;
            this.filterPhoneNumber = "";
            this.filterApply()
        } else if (value == 3) {
            this.filterBiker = "";
            this.Whether_Driver_Filter = false;
            this.DriverID = "";
            this.filterApply()
        } else if (value == 4) {
            this.Whether_Date_Filter = false;
            this.from_date_back = "";
            this.to_date_back = "";
            this.from_date = undefined;
            this.to_date = undefined;
            this.filterApply()
        } else if (value == 9) {
            this.Whether_Cash_Filter = false;
            this.filterApply()
        } else if (value == 10) {
            this.Whether_Online_Filter = false;
            this.filterApply()
        } else if (value == 11) {
            this.Payment_Captured = false;
            this.filterApply();
        } else if (value == 12) {
            this.Payment_Not_Captured = false;
            this.filterApply();
        }
        else if (value == 13) {
            this.Whether_Instant_BookingType = false;
            this.filterApply();
        } else if (value == 14) {
            this.Whether_FoursHrs_BookingType = false;
            this.filterApply();
        } else if (value == 15) {
            this.Whether_SameDay_BookingType = false;
            this.filterApply();
        } else if (value == 16) {
            this.Whether_Pick_Zone_Filter = false;
            this.PickZoneArray = [];
            this.filterApply();
        } else if (value == 17) {
            this.Whether_Drop_Zone_Filter = false;
            this.DropZoneArray = [];
            this.filterApply();
        }
    }

    clear_filter(type?: Number) {
        this.click_all_filter = false;
        this.filter_search_phone = false
        this.filter_search_name = false
        this.filter_search_date = false
        if (type == 1) {
            this.CLEAR_ALL = true;
        } else {
        }
        this.Whether_Name_Filter = false;
        this.Whether_PhoneNumber_Filter = false;
        this.Whether_Date_Filter = false;
        this.filterName = "";
        this.filterPhoneNumber = "";
        this.from_date_back = "";
        this.to_date_back = "";
        this.from_date = undefined;
        this.to_date = undefined;
        this.filterBiker = "";
        this.Whether_Driver_Filter = false;
        this.DriverID = "";
        this.Whether_Online_Filter = false;
        this.Whether_Cash_Filter = false;
        this.Payment_Captured = false;
        this.Payment_Not_Captured = false;
        this.Whether_Instant_BookingType = false
        this.Whether_FoursHrs_BookingType = false
        this.Whether_SameDay_BookingType = false
        this.Whether_Drop_Zone_Filter = false;
        this.Whether_Pick_Zone_Filter = false;
        this.PickZoneArray = [];
        this.DropZoneArray = [];
    }

}