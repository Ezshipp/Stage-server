import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Observable';
import { adminOrder_SearchModal } from "../../../front_end_models/adminOrderSearchModal";
import { FilterModel } from '../../../front_end_models/filterModel';
declare var google: any
@Component({
    selector: 'app-ongoing',
    templateUrl: "Ongoingjosb.component.html",
    styleUrls: ["Ongoingjosb.component.css"]
})
export class OngoingJobsComponent implements OnInit {
    filter_search_biker: boolean = false;
    filter_search_payment_type: boolean = false;
    isOnlineClicked: boolean;
    click_all_ordertype: boolean = false;
    filter_search_date: boolean = false;
    filter_search_name: boolean = false;
    filter_search_phone: boolean = false;
    filter_zones: boolean;isbookingTypeFilterOptions: boolean = false;
    filter_zones_drop: boolean = false;
    ZoneData = [];
    fiterElementsActive: boolean = false;
    isAssignDriver: boolean = false;
    PickZoneArray = [];
    DropZoneArray = [];
    Whether_Drop_Zone_Filter: boolean = false;
    Whether_Pick_Zone_Filter: boolean = false;
    Whether_SameDay_BookingType: boolean = false;
    Whether_FoursHrs_BookingType: boolean = false;
    Whether_Instant_BookingType: boolean = false;
    Payment_Not_Captured: boolean = false;
    Payment_Captured: boolean = false;
    Whether_Online_Filter: boolean = false;
    Whether_Cash_Filter: boolean = false;
    to_date: any;
    from_date: any;
    to_date_back: string;
    from_date_back: string;
    Whether_Date_Filter: boolean;
    filterBiker: string = '';
    Whether_Driver_Filter: boolean = false;
    filterPhoneNumber: string = '';
    Whether_PhoneNumber_Filter: boolean;
    Name_Query_Type: any;
    filterName: string = '';
    Whether_Name_Filter: boolean;
    click_all_filter: boolean;
    CLEAR_ALL: boolean = true;
    IsAsc: boolean;filter = "./img/filter_click.png";
    sortOptions = {};
    limit: number = 10
    barcodeId: any;
    itemMsg: string;
    ZonesLogs: any = [];
    onselectitem: number = 0;
    offers = ["Zones Logs", "Notifications"]
    od = '59bb576d626f062303dc7e2b'
    p: number = 1;
    issearch: boolean;
    activeId: number
    isSuccess_Manual: boolean;
    DriverData: any = [];
    isManualRoute: boolean;
    status: any;
    order_Index;
    ReasonData: any = [];
    ReasonID: any;
    Reason: any;
    isCancelOrder: boolean;
    isCompleteOrder: boolean;
    delete: any;
    DriverID: any;
    compareArrow: any;
    arrow_Index: any;
    headers = [
        "ID",
        "C.Name",
        "C.Phone",
        "Date",
        "O.Type",
        "P.Zone",
        "D.Zone",
        "kms"
    ]
    dsc: boolean = false;
    asc: boolean = false;
    increment: number = 0;
    isimage: boolean;
    isDriver_Assigned: boolean;
    Driver_Email: any;
    orderType: any;
    OfferDescription: any;
    valu: any;
    Ongoing_OrderData_json: any = [];
    views: any;
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
    order_datetime: any;
    Email: any;
    isdetails_View: boolean;
    jobType = 5
    Total_Count: number;
    isRequesting: boolean;
    mymodel: string;
    skip_value: number = 0;
    array: string[] = [];
    isData: boolean = false;
    index: any = 0;
    isdelete: boolean;
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
    isedit_pick: boolean;
    show_map_pick: boolean;
    isedit_pic: boolean;
    isedit_drop: boolean;
    display = 'none'
    show_map_drop: boolean = false;
    dropLongitude
    dropLatitude
    pickLongitude: any;
    dropAddress: any;
    pickAddress: any;
    pickLatitude: any;
    lng_drop: any;
    lat_drop: any;
    inputAddress: any;
    Ongoing_OrderData: any[] = [];
    zoom = 15;
    url: string = '';
    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private cdref: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions)
        this.isRequesting = true
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.Ongoing_OrderData = data.json().extras.OrderData
                    this.Ongoing_OrderData_json = data.json().extras.OrderData
                    this.isRequesting = false

                    for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Ongoing_OrderData[i].pickAddress
                        this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '')
                        this.Ongoing_OrderData[i].pickAddress = this.Ongoing_OrderData[i].pickAddress.replace(', India', '')

                    }
                    for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Ongoing_OrderData[i].dropAddress
                        this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '')
                        this.Ongoing_OrderData[i].dropAddress = this.Ongoing_OrderData[i].dropAddress.replace(', India', '')

                    }

                    if (!this.Ongoing_OrderData.length) {

                        this.isData = true;
                    } else {
                        this.issearch = false
                        this.isData = false;
                    }
                    /* pagination*/
                    this.Total_Count = parseInt(data.json().extras.Count)
                    if (this.Total_Count < 10) {
                        this.issearch = true
                    }

                    let count: number = parseInt(data.json().extras.Count)
                    let count1: number = Math.floor(count / 10);

                    let count2 = count % 10
                    if (count2 == 0) {
                        this.array.length = count1
                    } else {
                        this.array.length = count1 + 1
                    }


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
        this.Phone = item.Phone
        this.Email = item.Email
        this.order_datetime = item.order_datetime
        this.DiscountPercentage = item.DiscountPercentage
        this.paymentType = item.paymentType
        this.OfferApplied_Boolean = item.OfferApplied
        this.Driver_PhoneNumber = item.Driver_PhoneNumber
        this.status = item.status
        this.DriverID = item.DriverID
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
    change_location_pik(item, i) {

        this.edit(item, i)
        this.isedit_pick = true
    }
    change_location_drop(item, i) {

        this.edit(item, i)
        this.isedit_drop = true
        this.show_map_drop = false

    }
    onsubmit_Edit_pick() {


        const body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {

                    setTimeout(() => {
                        this.isedit_pick = false
                        this.ngOnInit()
                        this.cdref.detectChanges();
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
    onsubmit_Edit_drop() {


        const body = new OrdersModel_admin(null, null, this.orderId, this.bookingType, this.pickAddress, this.receiverName, this.receiverPhone, this.pickLongitude, this.pickLatitude, this.dropAddress, this.dropLatitude, this.dropLongitude, this.itemName, this.itemDescription, this.itemImage, this.item_actual_cost, this.deliverycharge)


        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Edit_Job', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    setTimeout(() => {
                        this.isedit_drop = false
                        this.ngOnInit()
                        this.cdref.detectChanges();
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
    onsubmit_droplocation() {

        this.show_map_drop = false
        this.get_Address(this.dropAddress, 2)
    }
    onsubmit_pickUplocation() {

        this.show_map_pick = false
        this.get_Address(this.pickAddress, 1)
    }
    get_Address(address, type) {
        var geocoder = new google.maps.Geocoder()
        var address = address
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                this.display = 'block'


                if (type == 1) {
                    this.pickLatitude = lat;
                    this.pickLongitude = lng
                    this.show_map_pick = true


                } else {
                    this.dropLatitude = lat
                    this.dropLongitude = lng
                    this.show_map_drop = true


                }
                this.cdref.detectChanges();
            }
        })
    }
    onclose_editDrop() {
        this.isedit_drop = false
    }
    pos_pick($event) {
        let pos = ($event);
        this.pickLatitude = pos.coords.lat;
        this.pickLongitude = pos.coords.lng;

    }
    pos_drop($event) {
        let pos = ($event);
        this.dropLatitude = pos.coords.lat;
        this.dropLongitude = pos.coords.lng;

    }
    onSubmit_picApi() {
    }
    onclose_editpick() {
        this.isedit_pick = false
    }
    onDelete(item, index) {
        this.delete = index
        this.orderId = item.orderId
        this.isdelete = true
        this.index = index
        this.First_name = item.First_name
        this.orderseqId = item.orderseqId
        this.edit(item, index)
    }
    onClose_Delete() {
        this.delete = -1
    }
    remove_Order() {
        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))


        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Delete_Order', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {

                    setTimeout(() => {

                        this.ngOnInit()
                        this.cdref.detectChanges();
                        this.Ongoing_OrderData.splice(this.delete, 1)
                        this.onClose_Delete()
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
    getGeocoding(address: string) {
        return Observable.create(observer => {
            try {


                this.mapsAPILoader.load().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            const place = results[0].geometry.location;
                            observer.next(place);
                            observer.complete();
                        } else {

                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            } else {
                                observer.error(status);
                            }
                            observer.complete();
                        }
                    });
                });
            } catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }
        });
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
                false, true,
                false, false,
                this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type, this.Whether_Cash_Filter, this.Whether_Online_Filter,
                this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter, this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray)
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        this.Ongoing_OrderData = data.json().extras.OrderData
                        this.click_all_filter = false;
                        this.isRequesting = false
                        this.issearch = false
                        this.Ongoing_OrderData_json = data.json().extras.OrderData
                        for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Ongoing_OrderData[i].pickAddress
                            this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '')
                            this.Ongoing_OrderData[i].pickAddress = this.Ongoing_OrderData[i].pickAddress.replace(', India', '')
                        }
                        for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Ongoing_OrderData[i].dropAddress
                            this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '')
                            this.Ongoing_OrderData[i].dropAddress = this.Ongoing_OrderData[i].dropAddress.replace(', India', '')
                        }
                        if (!this.Ongoing_OrderData.length) {
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
        const result_table_data = new OrdersModel_admin(this.jobType, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit, this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.issearch = false
                    this.Ongoing_OrderData = data.json().extras.OrderData
                    this.Ongoing_OrderData_json = data.json().extras.OrderData

                    for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Ongoing_OrderData[i].pickAddress
                        this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '')
                        this.Ongoing_OrderData[i].pickAddress = this.Ongoing_OrderData[i].pickAddress.replace(', India', '')

                    }
                    for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.Ongoing_OrderData[i].dropAddress
                        this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '')
                        this.Ongoing_OrderData[i].dropAddress = this.Ongoing_OrderData[i].dropAddress.replace(', India', '')

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
            this.Ongoing_OrderData = []
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
                        this.views = -1
                        this.Ongoing_OrderData = data.json().extras.OrderData
                        this.Ongoing_OrderData_json = data.json().extras.OrderData

                        for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Ongoing_OrderData[i].pickAddress
                            this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '')
                            this.Ongoing_OrderData[i].pickAddress = this.Ongoing_OrderData[i].pickAddress.replace(', India', '')

                        }
                        for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                            var str: string = ''
                            var pick: string = this.Ongoing_OrderData[i].dropAddress
                            this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '')
                            this.Ongoing_OrderData[i].dropAddress = this.Ongoing_OrderData[i].dropAddress.replace(', India', '')

                        }

                        this.array.length = 0.
                    }
                }
                )
        } else {
            this.Ongoing_OrderData = []
            this.ngOnInit()
            this.array.length = 0
            this.index = 0
        }
    }
    OnmoreInfo_order(item, i) {
        this.views = i;
        this.edit(item, i)
        this.order_Index = i;
    }
    onClose_details_View() {
        this.views = null;
    }
    sortColumn(i, item) {
        this.activeId=i
        this.arrow_Index=i
        var key;

        if (i == 0) {
            key = 'orderseqId'
        }
        else if (i == 1) {
            key = 'customerName'
        }
        else if (i == 2) {
            key = 'customerPhone'
        }
        else if (i == 3) {
            key = 'Date'
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
        else if (i == 7) {
            key = 'Shipping_Distance'
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

    OnchangeStatus() {
        this.isRequesting = true;


        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.DriverID, null, null, null, this._cookieService.get('ez_admin_cusID'))

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Job_Completed_If_Mobile_Fails', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.isRequesting = false;
                    this.onCloseCompleteOrder();
                    this.views = -1;
                    this.Ongoing_OrderData.splice(this.order_Index, 1)

                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    this.isRequesting = false;
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    OnchangeStatus_Cancel() {
        this.isRequesting = true;


        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.DriverID, null, this.Reason, null, this._cookieService.get('ez_admin_cusID'))

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Driver_Cancelled_Order', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.isRequesting = false;
                    this.onCloseCancelOrder();
                    this.views = -1;
                    this.Ongoing_OrderData.splice(this.order_Index, 1)

                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    this.isRequesting = false;
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    onCompleteOrder() {
        this.isCompleteOrder = true;
    }
    onCancelOrder() {
        this.isCancelOrder = true;
        const body = new OrdersModel_admin()
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Driver_Cancellation_Reason', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.ReasonData = data.json().extras.ReasonData
                    this.ReasonID = this.ReasonData[0].ReasonID
                    this.Reason = this.ReasonData[0].Reason

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
    select(val, event) {
        var values = val;
        var splitvalue = values.split('/')
        this.ReasonID = splitvalue[0]
        this.Reason = splitvalue[1]

    }
    onCloseCancelOrder() {
        this.isCancelOrder = false;
    }
    onCloseCompleteOrder() {
        this.isCompleteOrder = false;
    }

    onClickManual() {
        this.isManualRoute = true;
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
    onCloseManualRoute() {
        this.isManualRoute = false;
    }
    select_Driver(value, event) {
        var bikerD = value;
        var id_name = bikerD.split('/')
        this.DriverID = id_name[0];
        this.Driver_Name = id_name[1]
    }
    onSubmitManualRoute() {
        const body = new OrdersModel_admin(null, null, this.orderId, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, this.DriverID, null, null, null, this._cookieService.get('ez_admin_cusID'))

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Manual_Ordering', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.isSuccess_Manual = true;
                    setTimeout(() => {
                        this.isSuccess_Manual = false;
                        this.onCloseManualRoute();
                    }, 3000);


                    this.views = -1;
                    this.Ongoing_OrderData.splice(this.order_Index, 1)
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
    click_filter_view() {
        this.click_all_filter = true
        this.click_all_ordertype = false
    }
    click_ordertype_view() {
        this.click_all_ordertype = true
        this.click_all_filter = false

    }
    clear_filter(type?: Number) {
        this.click_all_filter = false;
        this.filter_search_phone = false
        this.filter_search_name = false
        this.filter_search_date = false
        // sanjay -- >  here we need to set clear all filter is true becoz we are clearing filter here..
        if (type == 1) {
            this.CLEAR_ALL = true;
        } else {
            // this.CLEAR_ALL = false;
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
        this.isRequesting = true
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
                    false, true,
                    false, false,
                    this.Whether_Date_Filter, this.from_date_back, this.to_date_back, this.DriverID, this.Whether_Driver_Filter, this.Name_Query_Type,
                    this.Whether_Cash_Filter, this.Whether_Online_Filter,
                    this.Payment_Captured, this.Payment_Not_Captured, this.sortOptions, this.Whether_Instant_BookingType, this.Whether_FoursHrs_BookingType, this.Whether_SameDay_BookingType, this.Whether_Pick_Zone_Filter,
                    this.PickZoneArray, this.Whether_Drop_Zone_Filter, this.DropZoneArray)
                const headers = new Headers({ 'Content-Type': 'application/json' })
                return this.http.post(this.url + '/Find_All_Orders_Ezshipp_by_Filter', body, { headers: headers })
                    .subscribe(data => {
                        if (data.json().success) {
                            this.Ongoing_OrderData = data.json().extras.OrderData
                            this.click_all_filter = false;
                            this.isRequesting = false
                            this.Ongoing_OrderData_json = data.json().extras.OrderData
                            for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                                var str: string = ''
                                var pick: string = this.Ongoing_OrderData[i].pickAddress
                                this.Ongoing_OrderData[i].pickAddress = pick.replace('Telangana', '')
                                this.Ongoing_OrderData[i].pickAddress = this.Ongoing_OrderData[i].pickAddress.replace(', India', '')
                            }
                            for (var i = 0; i < this.Ongoing_OrderData.length; i++) {
                                var str: string = ''
                                var pick: string = this.Ongoing_OrderData[i].dropAddress
                                this.Ongoing_OrderData[i].dropAddress = pick.replace('Telangana', '')
                                this.Ongoing_OrderData[i].dropAddress = this.Ongoing_OrderData[i].dropAddress.replace(', India', '')
                            }
                            if (!this.Ongoing_OrderData.length) {
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
        // this.sortOptions = {}
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
}
