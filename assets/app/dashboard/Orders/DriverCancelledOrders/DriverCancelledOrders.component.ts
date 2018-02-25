import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-DriverCancelledOrders',
  templateUrl: './DriverCancelledOrders.component.html',
  styleUrls: ["./../cancelOrders/cancelOrders.component.css"]
})
export class DriverCancelledOrdersComponent implements OnInit {
    sortOptions: {};
    limit: number = 10
    Driver_Email: any;
    orderType: any;
    OfferDescription: any;
    barcodeId: any;
    itemMsg: string;
    ZonesLogs: any=[];
    onselectitem: number = 0;
    offers = ["Zones Logs", "Notifications"]
    issearch: boolean;
    p: number=1;
    activeId: number
    IsAsc: any;
    Cancelled_Time: any; isedit_pick: boolean; isedit_drop: boolean;
    Cancellation_Reason: any;
    Cancel_OrderData_json: any = [];
    valu: any;
    views: any;
    isimage: boolean;
  isdetails_View: boolean;
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
  mymodel: string;
  skip_value: number = 0;
  isRequesting: boolean;
  index: any = 0;
  array: any=[];
  Total_Count: any;
  isData: boolean;
  Cancel_OrderData: any=[];
  url: string = '';
  jobType: any = 4;

  constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }
    ngOnInit() {
        this.isRequesting=true
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(this.jobType, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit,this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Orders_Ezshipp', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting=false
                    this.Cancel_OrderData = data.json().extras.OrderData
                    this.Cancel_OrderData_json = data.json().extras.OrderData

                    for(var i=0;i<this.Cancel_OrderData.length;i++){
                        var str:string=''
                          var pick:string = this.Cancel_OrderData[i].pickAddress
                    this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana','')
                   this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India','')

                }
                 for(var i=0;i<this.Cancel_OrderData.length;i++){
                        var str:string=''
                          var pick:string = this.Cancel_OrderData[i].dropAddress
                    this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana','')
                   this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India','')

                    }


                    if(!this.Cancel_OrderData.length) {

                    this.isData = true;
                  } else {

                    this.issearch=false

                    this.isData = false;
                  }
                    /* pagination*/
                    this.Total_Count = data.json().extras.Count


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
                    this.isRequesting=false
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

    pageChanged(event){
this.views=null
       this.p=event
       this.nextpage(this.p-1)

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
                    this.issearch=false
                    this.Cancel_OrderData = data.json().extras.OrderData
                    this.Cancel_OrderData_json = data.json().extras.OrderData


                    for(var i=0;i<this.Cancel_OrderData.length;i++){
                        var str:string=''
                          var pick:string = this.Cancel_OrderData[i].pickAddress
                    this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana','')
                   this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India','')

                }
                 for(var i=0;i<this.Cancel_OrderData.length;i++){
                        var str:string=''
                          var pick:string = this.Cancel_OrderData[i].dropAddress
                    this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana','')
                   this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India','')

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
                        this.array.length = 0
                        let resultdata = []
                        this.issearch=true
                        this.views=-1
                        this.Cancel_OrderData = data.json().extras.OrderData
                        this.Cancel_OrderData_json = data.json().extras.OrderData

                        for(var i=0;i<this.Cancel_OrderData.length;i++){
                            var str:string=''
                              var pick:string = this.Cancel_OrderData[i].pickAddress
                        this.Cancel_OrderData[i].pickAddress = pick.replace('Telangana','')
                       this.Cancel_OrderData[i].pickAddress = this.Cancel_OrderData[i].pickAddress.replace(', India','')

                    }
                     for(var i=0;i<this.Cancel_OrderData.length;i++){
                            var str:string=''
                              var pick:string = this.Cancel_OrderData[i].dropAddress
                        this.Cancel_OrderData[i].dropAddress = pick.replace('Telangana','')
                       this.Cancel_OrderData[i].dropAddress = this.Cancel_OrderData[i].dropAddress.replace(', India','')

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
      OnmoreDetails(item,i) {

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
        this.Cancellation_Reason = item.Cancellation_Reason
        this.Cancelled_Time = item.Cancelled_Time
        if(this.itemImage.length){
          this.isimage=true
        }else{
          this.isimage=false
        }
        if(item.Whether_Zone_Drop){
            this.Onselect(this.onselectitem,'Zones Logs',item)
        }else{
        }
        this.deliverycharge = item.deliverycharge
        this.item_actual_cost = item.item_actual_cost
        this.Driver_Name = item.Driver_Name
        this.orderseqId = item.orderseqId
        this.First_name = item.First_name
        this.Phone = item.Phone
        this.Email = item.Email
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
      OnmoreInfo_order(item,i) {
          this.views = i;
        this.OnmoreDetails(item,i)
    }
      onClose_details_View() {
        this.views = null;
    }
    sortColumn(key) {
        this.IsAsc=this.IsAsc
        this.valu = key
        var backendkey;
        if (key == 'First_name') {
            backendkey = 'customerName'
        } else if (key == 'Phone ') {
            backendkey = 'customerPhone'
        } else {
            backendkey = key
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
        this.sortOptions[backendkey] = sort

            this.ngOnInit()


        this.p = 1


    }

    Onselect(m,itemss,item){


        this.onselectitem=m
        if(itemss=="Zones Logs"){
            const body = new OrdersModel_admin(null, null, item.orderId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null,null,null,this._cookieService.get('ez_admin_cusID'))
            const headers = new Headers({ 'Content-Type': 'application/json' })

            return this.http.post(this.url + '/Zone_Orders_Logs', body, { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        this.ZonesLogs = data.json().extras.ZoneOrderLogData
                        if(this.ZonesLogs.length){
                            this.barcodeId=this.ZonesLogs[0].barcodeid
                        }else{
                            this.itemMsg='No zones logs Found'
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
        }else{
            this.ZonesLogs=[]

            this.itemMsg='No Notification Found'
        }

    }
    OnselectCount(event) {


                this.limit = event.target.value

                this.ngOnInit()
                this.p = 1
            }
}
