import { LatLng } from 'angular2-google-maps/core';
import { QueueModel } from '../../../front_end_models/queueModel';
import { OrdersModel_admin } from '../../../front_end_models/OrdersModel';
import { NewQueueModel } from '../../../front_end_models/New_queOrder.Mode';
import { ElementRef, NgZone, OnInit, ViewChild, Component, ChangeDetectorRef } from '@angular/core'; import { NgForm } from '@angular/forms';
import { MapsAPILoader, PolylineManager } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { Router } from '@angular/router';
declare var google: any;
declare var $: any
@Component({

    selector: 'n-que-orders',
    templateUrl: 'n-que-orders.component.html',
    styleUrls: ['n-que-orders.component.css']
})
export class NQueOrdersComponent implements OnInit {
    poly: any;
    _lastOpenIndex: number;
    piklng: any;
    pikLat: any;
    isRequesting: boolean = false
    latBiker: any;
    lngBiker: any;
    height_mapWindow: any;
    directionNumber_Backend: any;
    isOngoingOrder: boolean = false
    isNewOrder: boolean = true
    issucessDriver_Assign: boolean;
    finalConfirmDriver: boolean;
    Driver_Name: any;
    DriverID: any;
    DriverData: any;
    isAssignDriver: boolean;
    directionNumber: number;
    isOnmap: any;
    AllDirectionData: any = [];
    activeDirectionAssin: number;
    isRecordsView: boolean;
    DirectionData: any = [];
    reverserDirection: any = [];
    activeDirection: number;
    directionArray = []
    detailviewIndex: number;
    index: any;
    p: number;
    limit: number = 10;
    admmap;
    No_Of_Directions: any;
    Sequence_Code: any;
    SequenceID: any;
    public latitude: number = 17.78455;
    public longitude: number = 78.2544;
    public searchControl: FormControl;
    public zoom: number = 10;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    url: string = '';
    Total_Count: any;
    NewQueOrdersData: any[] = [];

    pickAddress: string;

    inputAddress;

    onCreate_order: boolean;
    lat: number = 17.678418;
    lng: number = 78.809007;
    constructor(
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef,
        private _polylineManager: PolylineManager

    ) { }
    public ngOnInit(): void {

        this.searchControl = new FormControl();
        this.getNewQueOrders()
        var width = $(window).height()
        this.height_mapWindow = $(window).height() - 46


    }
    OnaddOrder() {
        this.onCreate_order = true
    }
    onCloseCreate_Order() {
        this.onCreate_order = false
    }
    onSubmit(form: NgForm) {
        if (this.isNewOrder || this.isOngoingOrder) {
            const body1 = new NewQueueModel(this._cookieService.get('ez_admin_cusID'), form.value.MobileNumber, this.pickAddress, 0, 0, null, null, null, this.isNewOrder, this.isOngoingOrder)
            const headers = new Headers({ 'Content-Type': 'application/json' })

            return this.http.post(this.url + '/GENERATE_CUSTOMERS_NEW_ORDERS_DIRECTION', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {

                      
                        let message = "order created sucessfully"
                        this.ErrorService.handleError(message)
                        setTimeout(() => {
                            this.ngOnInit()
                        }, 3000);
                        this.onCreate_order = false
                        /* pagination*/


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
        else {
            let message = "Please Select Atleas one Ordertype"
            this.ErrorService.handleError(message)
        }

    }
    getNewQueOrders() {
        this.isRequesting = true
        const body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, 0, this.limit)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/New_Orders_Directions_Sequence_Listing', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.NewQueOrdersData = data.json().extras.SequenceData
                  
                    /* pagination*/
                    this.Total_Count = data.json().extras.Count

                    /* completed*/
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

        this.index = index;
        let skip_value = this.index * this.limit
        let empid = this._cookieService.get('EmployeeID')
        const body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, skip_value, this.limit)

        const body = JSON.stringify(body1)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/New_Orders_Directions_Sequence_Listing', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.NewQueOrdersData = data.json().extras.SequenceData

                } else {

                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    OnmoreInfo_order(item, i: number) {
        this.SequenceID = item.SequenceID
        this.Sequence_Code = item.Sequence_Code
        this.No_Of_Directions = item.No_Of_Directions
        this.directionArray.length = this.No_Of_Directions
        this.detailviewIndex = i
        this.getDirectionOrder(0)

    }
    OncloseDetailsView() {
        this.detailviewIndex = -1
    }
    getDirectionOrder(j: number) {
        this.activeDirection = j
        this.activeDirectionAssin = -1
        this.isRecordsView = true
        this.activeDirection = j + 1
        this.getDirectionOrdersApi(this.SequenceID, this.activeDirection, '/Find_New_Ongoing_Order_Direction_Number_Data', 1)

    }

    getDirectionOrdersApi(SequenceID, Direction_Number?, url?, type?: number) {


        const body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, null, this.limit, SequenceID, Direction_Number)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    if (type == 1) {

                        this.DirectionData = data.json().extras.DirectionData.OrderData
                        this.reverserDirection = this.DirectionData
                        this.latBiker = this.DirectionData[0].dropLatitude
                        this.lngBiker = this.DirectionData[0].dropLongitude
                        this.pikLat = this.reverserDirection[0].pickLatitude
                        this.piklng = this.reverserDirection[0].pickLongitude
                        var disArr = []
                        var mainDat = []
                        var pikLat1 = this.reverserDirection[0].pickLatitude
                        var piklng1 = this.reverserDirection[0].pickLongitude



                    } else if (type == 2) {
                     
                        this.AllDirectionData = data.json().extras.DirectionData
                     

                    }




                } else {

                    const msgNumber: number = parseInt(data.json().extras.msg);
               
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    onAssign_Driver() {
        this.isRecordsView = false
        this.activeDirectionAssin = 1
        this.activeDirection = -1
        this.DirectionData = []
        this.getDirectionOrdersApi(this.SequenceID, null, '/Get_All_Order_Sequence_Directions', 2)
    }


    onViewMap(itemDirc, m: number) {
        this.directionNumber_Backend = itemDirc.Direction_No
        this.isOnmap = true
        this.directionNumber = itemDirc.Direction_No

        this.getDirectionOrdersApi(this.SequenceID, this.directionNumber_Backend, '/Find_New_Ongoing_Order_Direction_Number_Data', 1)

    }
    onCloseMapview() {
        this.isOnmap = false
        this.DirectionData = []
    }
    selectDriver(itemDirc, m) {
        this.directionNumber_Backend = itemDirc.Direction_No
        this.isAssignDriver = true
        this.directionNumber = m + 1

        this.FindAll_Drivers()
    }
    onCloseDriverAssign() {
        this.isAssignDriver = false
    }
    FindAll_Drivers() {
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

    select_Driver(name, driverid) {
        this.DriverID = driverid
        this.Driver_Name = name
        this.finalConfirmDriver = true;
    }
    onCloseDriverConfirm() {
        this.finalConfirmDriver = false;
    }
    onSubmitDriver() {

        const body1 = new NewQueueModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, this.SequenceID, this.directionNumber_Backend, this.DriverID)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Manual_Route_Customer_New_Ongoing_Orders_Sequence_Direction', body1, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.issucessDriver_Assign = true
                    // alert("sucess")
                    let message = "Driver Assign sucessfully"
                    this.ErrorService.handleError(message)
                    this.isAssignDriver = false
                    this.detailviewIndex = -1

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

    // checkBoxOption
    OnselectOrder_new(value) {
        this.isNewOrder = !this.isNewOrder
     
    }
    OnselectOrder_Ongoing(value) {
      
        this.isOngoingOrder = !this.isOngoingOrder
       
    }

    pickadd() {

        var autocomplete: any;
        var options = { componentRestrictions: { country: "IN" } };
        this.inputAddress = document.getElementById('address');
     
        autocomplete = new google.maps.places.Autocomplete(this.inputAddress, options)
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
       
            this.ngZone.run(() => {
           
                this.zoom = 17;
                var place = autocomplete.getPlace();
                this.pickAddress = place.name + ',' + place.formatted_address
                var plac = place.name + ','
                var address = place.formatted_address.indexOf(plac)
                if (address == 0) {

                    this.pickAddress = place.formatted_address.replace(plac, plac)
                } else {
                }


                this.lat = place.geometry.location.lat();
                this.lng = place.geometry.location.lng();
                
            });
        });

    }

    clickedMarker(index, data: any) {
        data['isOpen'] = true;
        if (this._lastOpenIndex > -1) this.DirectionData[this._lastOpenIndex]['isOpen'] = false;
        this._lastOpenIndex = index;
        let messa = "dummy"


    }
    getDistence(lat1, lon1, lat2, lon2) {
      
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    transform(array: Array<string>, args: string): Array<string> {
        array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                return -1;
            } else if (a[args] > b[args]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
