import { AgmMap } from '@agm/core';
import { NgForm } from '@angular/forms';
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ErrorService } from './../../../../errors/error.service';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var google: any;
@Component({
    selector: 'app-view',
    templateUrl: "./viewallPremiumCustomer.component.html",
    styleUrls: ["./viewallPremiumCustomer.component.css"]
})
export class viewPremiumCustomerComponent implements OnInit {
    sortKey: string;
    activeId: number;
    sortOptions: any;
    p: number = 1;
    Gst: string = '';
    dueAmount = ''
    Miscellaneous_Dues = ''
    invoice: any;
    to_date: string;
    from_date: string;
    from_D
    month: any = 1;
    @ViewChild('test') el: ElementRef;
    pdfData: any = [];
    isdownload: boolean;
    form: NgForm;
    Flat_Monthly_Price: string = '';
    isFlat: boolean;
    lng: any;
    lat: any;
    lng_map: any = 17.2548;
    lat_map: any = 78.254;
    inputAddress;
    zoom = 10
    Premium_Pricing_Set: any;
    Premium_Instant_Pricing: string = '';
    Premium_Same_Day_Pricing: string = '';
    Premium_4hours_Pricing: string = '';
     Premium_4hours_Pricing_discount: string = '';
  Premium_Same_Day_Pricing_discount: string = '';
  Premium_Instant_Pricing_discount: string = '';
  Premium_min_ordercount:number = 100;

    Default_Pickup_Address: any;
    Default_Pickup_Latitude: any;
    Default_Pickup_Longitude: any;
    Default_Pickup_Location_Exist: any;
    Monthly_Invoice: any;
    isEdit: boolean;
    index_Delete: any;
    CustomerID: any;
    First_name: any;
    isdelete: boolean;
    index: any;
    isRequesting: boolean;
    isData: boolean;
    Total_Count: any;
    CustomerData: any = [];
    url: string = '';
    skip_value = 0
    Today_Date: Date
    columns = [
        { title: "Order Id", dataKey: "Job_No" },
        { title: "Pickup Address", dataKey: "pickAddress" },
        { title: "Drop Address", dataKey: "dropAddress" },
        { title: "Distance", dataKey: "Shipping_Distance" },
        { title: "Duration", dataKey: "Order_Journey_Time" },
    ];
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private ngZone: NgZone,
        private _cookieService: CookieService,
        private router: Router,
        private ErrorService: ErrorService, private _cdref: ChangeDetectorRef) { }
    ngOnInit() {
        this.isRequesting = true
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new premiumCustomerModal(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null, null,  this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.CustomerData = data.json().extras.CustomerData
                    if (this.CustomerData.length == 0) {
                        this.isData = true
                    }
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
            }
            )
    }
    pageChanged(event: number) {
        this.p = event
        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;
        let skip_value = this.index * 10
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new premiumCustomerModal(null, null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null, null,  this.sortOptions)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Premium_Customers', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.CustomerData = data.json().extras.CustomerData
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    Delete(item, i) {
        this.isdelete = true
        this.CustomerID = item.CustomerID
        this.First_name = item.First_name
        this.index_Delete = i
    }
    delete_Final() {
        const body = new premiumCustomerModal(null, this.CustomerID)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Make_Premium_Customer_Inactive', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.CustomerData.splice(this.index_Delete, 1)
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
            })
    }
    onClose_Delete() {
        this.isdelete = false
    }
    edit(item) {
        this.First_name = item.First_name
        this.CustomerID = item.CustomerID
        this.Premium_Pricing_Set = item.Premium_Pricing_Set
        this.OnPriceingSet(item.Premium_Pricing_Set)
        if (item.Premium_Pricing_Set) {
            this.Premium_Instant_Pricing = item.Premium_Instant_Pricing
            this.Premium_Same_Day_Pricing = item.Premium_Same_Day_Pricing
            this.Premium_4hours_Pricing = item.Premium_4hours_Pricing
            this.Premium_Instant_Pricing_discount=item.Premium_Instant_Pricing_discount
            this.Premium_4hours_Pricing_discount= item.Premium_4hours_Pricing_discount
            this.Premium_Same_Day_Pricing_discount= item.Premium_Same_Day_Pricing_discount
            this.Premium_min_ordercount= item.Premium_min_ordercount
        } else {
            this.Premium_Instant_Pricing = ''
            this.Premium_Same_Day_Pricing = ''
            this.Premium_4hours_Pricing = ''
             this.Premium_Instant_Pricing_discount=''
            this.Premium_4hours_Pricing_discount= ''
            this.Premium_Same_Day_Pricing_discount= ''
            this.Premium_min_ordercount= 100
        }
        if (item.Flat_Monthly_Price_Available) {
            this.isFlat = true;
            this.Flat_Monthly_Price = item.Flat_Monthly_Price
        } else {
            this.isFlat = false;
            this.Flat_Monthly_Price = ''
        }
        this.OnMonthlyInvoice(item.Monthly_Invoice)
        this.Monthly_Invoice = item.Monthly_Invoice
        this.Default_Pickup_Location_Exist = item.Default_Pickup_Location_Exist
        if (item.Default_Pickup_Location_Exist) {
            this.Default_Pickup_Address = item.Default_Pickup_Address
            this.lat = +item.Default_Pickup_Latitude
            this.lng = +item.Default_Pickup_Longitude
            this.lat_map = this.lat
            this.lng_map = this.lat
        } else {
            this.Default_Pickup_Address = ''
            this.lat = ''
            this.lng = ''
        }
    }
    Edit_offer(item) {
        this.isEdit = true
        this.edit(item)
    }
    OncloseEdit() {
        this.isEdit = false
    }
    OnPriceingSet(value) {
        if (value == true) {
            this.Premium_Pricing_Set = true
        } else {
            this.Premium_Pricing_Set = false
        }
    }
    OnMonthlyInvoice(value) {
        this.Monthly_Invoice = value
        if (value == true) {
            this.Monthly_Invoice = true
        } else {
            this.isFlat = false
            this.Flat_Monthly_Price = ''
            this.Monthly_Invoice = false
        }
    }
    OnDefaultPickup(value) {
        this.Default_Pickup_Location_Exist = value
        if (value == true) {
            this.Default_Pickup_Location_Exist = true
        }
        else {
            this.Default_Pickup_Location_Exist = false
        }
    }
    autocomplete() {
        var geocoder = new google.maps.Geocoder()
        var address = this.Default_Pickup_Address
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.lat = results[0].geometry.location.lat();
                this.lng = results[0].geometry.location.lng();
                this.lat_map = this.lat
                this.lng_map = this.lng
                this._cdref.detectChanges();
                this._cdref.markForCheck()
            } else {
                alert("No address Found")
            }
        })
    }
    pos_pick($event) {
        let pos = ($event);
        this.lat = pos.coords.lat;
        this.lng = pos.coords.lng;
        this.getGeoLocation(this.lat, this.lng)
    }
    FormsubmitFunction(form: NgForm) {
        this.form = form
        const body = new premiumCustomerModal(null
            , this.CustomerID
            , 0
            , this.Premium_Pricing_Set
            , this.Monthly_Invoice
            , this.Default_Pickup_Location_Exist
            , this.Premium_Instant_Pricing
            , this.Premium_Same_Day_Pricing
            , this.Premium_4hours_Pricing,
            this.Premium_Instant_Pricing_discount,
            this.Premium_Same_Day_Pricing_discount,
            this.Premium_4hours_Pricing_discount,
            this.Premium_min_ordercount
            , this.Default_Pickup_Address, this.lat, this.lng, this.isFlat, this.Flat_Monthly_Price
        )
        var Premium_Same_Day_Pricing: string = form.value.Premium_Same_Day_Pricing
        this.EditFinal(body)
    }
    EditFinal(body) {
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Update_Premium_User_Options', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    setTimeout(() => {
                        this.ngOnInit()
                        this.isEdit = false
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
            })
    }
    getGeoLocation(lat: number, lng: number) {
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
            let request = { latLng: latlng };
            geocoder.geocode(request, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    let rsltAdrComponent = result.address_components;
                    let resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        let pickadd = results[0].formatted_address;
                        this.Default_Pickup_Address = pickadd;
                    } else {
                        alert("No address available!");
                    }
                } else {
                    alert("No address available!");
                }
            });
        }
    }
    OnFlatPrice(value: boolean) {
        if (value) {
            this.isFlat = true
        }
        else {
            this.isFlat = false
            this.Flat_Monthly_Price = ''
        }
    }
    OnPdf(item) {
        this.isdownload = true
        this.edit(item)
    }
    onClose_Download() {
        this.isdownload = false
    }
    seclectMonth(Frm, to) {
    }
    getpdf(FromDate, Todate, CustomerID) {
        const body = new premiumCustomerModal(null, CustomerID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, FromDate, Todate, this.dueAmount, this.Miscellaneous_Dues, null, this.Gst)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Premium_Customer_Monthly_Invoice_Processing', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.pdfData = data.json().extras.InvoiceData
                    this.isdownload = false
                    this.invoice = this.pdfData.InvoiceNumber
                    let msg = 'Invlice No:' + this.invoice + '. Request is in Process Please check in Invoice Section'
                    this.ErrorService.handleError(msg)
                    this.dueAmount = ''
                    this.Miscellaneous_Dues = ''
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    seclectYear(value) {
        this.month = value
    }
    OnFromDate(Frm: string) {
        var value = Frm.split('-')
        var FromDate = value[2] + '/' + value[1] + '/' + value[0]
        this.from_date = FromDate
    }
    OnTodate(to) {
        var value = to.split('-')
        var FromDate = value[2] + '/' + value[1] + '/' + value[0]
        this.to_date = FromDate
    }
    exportPdf() {
        this.getpdf(this.from_date, this.to_date, this.CustomerID)
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