import { OrdersModel_admin } from './../../front_end_models/OrdersModel';
import { AnalyticsModel } from './../../front_end_models/analyticsModel';
import { ErrorService } from './../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { AddStoreModel } from './../../front_end_models/store/Addstoremodel';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var google: any;
declare var jQuery: any;
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  map: any;
  drawingManager: any;
  newpolygone:any
  totalCount_Orders: any;
  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('myModalOrders') myModalOrders: ElementRef

  _lastOpenIndex_OrdersBirdview_drop: number = -1;
  _lastOpenIndex_OrdersBirdview: number = -1;
  long_ordersBirds: number = 78.4867;
  lat_ordersBirds: number = 17.3850
  skip_ordersBirdsView: number = 0;
  OrdersData_birds: any = [];
  DriverAddress: any;
  RefreshId: any;
  picmarker_icon = "./images/imageedit_2_4150727599.png";
  dropMarker_icon = "./images/imageedit_2_6997711684.png";
  isRefresh: boolean = false;
  zoneid: any;
  ZoneData: any;
  skip_map: number = 0;
  _lastOpenIndex: number = -1;
  lat: number = 17.4778
  lng: number = 78.254788
  zoom = 10
  absolute: string;
  right: number;
  left: number;
  top: number;
  height: number;
  DriverData: any = [];
  skip_value_orders: number;
  index_orders: any;
  p_orders: number = 1;
  order_type: string;
  totalCount_orders: any;
  Same_Day_Orders: any;
  four_hours_Orders: any;
  Instant_Orders: any;
  Completed_Orders: any;
  Ongoing_Orders: any;
  new_orders: any;
  deliverycharge: any;
  itemName: any;
  receiverPhone: any;
  receiverName: any;
  isimage: boolean;
  itemImage: any;
  index_moreinfor: any;
  OfferApplied: boolean;
  First_name: any;
  Phone: any;
  Email: any;
  Driver_Name: any;
  Driver_PhoneNumber: any;
  Driver_Email: any;
  order_datetime: any;
  OfferName: any;
  OfferDescription: any;
  OfferCode: any;
  Details_orders: any = [];
  skip_value_signup: number;
  index_signup: any;
  devecieCount: any;
  ios_Count: number;
  android_Count: number;
  web_Count: number;
  p: number = 1;
  todateFinal: any;
  fromDateFinal: any;
  deviceType: number;
  isSignupdata: boolean;
  isorders_pie: boolean;
  isRequesting: boolean;
  fromDate_ui; toDate_ui: Date;
  options_pie3: Object;
  CustomerData: any = [];
  type: number;
  @ViewChild('closebtn') closeBtn: ElementRef
  event: any;
  name_slicedPie
  total_count_pie: number;
  isLoading_pie: boolean = false;
  SignupData: any = [];
  url: string = '';
  activeid: number
  options_pie: Object;
  options_pie2: Object;
  typeWise: string = 'Day wise signup Users'
  toDate; fromDate;
  constructor(private http: Http,
    private _ApiMessageService: ApiMessageService,
    private ngZone: NgZone,
    private _cookieService: CookieService,
    private router: Router,
    private ErrorService: ErrorService, private _cdref: ChangeDetectorRef) {
    this.options_pie = {
      chart: { type: 'pie' }
    };
    this.options_pie2 = {
      chart: { type: 'pie' }
    }
    var date = new Date()
    var d1 = date.getMonth() + 1
    this.toDate = date.getDate() + '/' + d1 + '/' + date.getFullYear()
    this.fromDate = this.toDate
  }
  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat:17.4471, lng: 78.454 },
      zoom: 10
  });
    this.onDay()
    this.getDriverData(this.skip_map, false)
    this.findAll_Zones()
  }
  onDay() {
    clearInterval(this.RefreshId)
    this.isRefresh = false
    this.fromDate = this.toDate
    this.activeid = 1
    this.typeWise = 'Day wise signup Users'
    this.SignupUsers(this.fromDate, this.toDate)
    this.getOrdersData(this.fromDate, this.toDate)
    this.OrdersBirdView(0, this.fromDate, this.toDate)
    this.OrdersData_birds = []
    var dat = new Date()
  }
  Onweek() {
    var date = new Date()
    date.setDate(date.getDate() - 7)
    var mon = date.getMonth() + 1
    var d2 = date.getDate() + '/' + mon + '/' + date.getFullYear()
    var present = new Date()
    var p1 = present.getMonth() + 1
    var sdf = present.getDate() + '/' + p1 + '/' + present.getFullYear()
    this.isRefresh = false
    clearInterval(this.RefreshId)
    this.OrdersBirdView(0, d2, sdf)
    this.SignupUsers(d2, sdf)
    this.getOrdersData(d2, sdf)
    this.isRequesting = true
    this.activeid = 2
    this.OrdersData_birds = []
  }
  OnMonth() {
    this.isRefresh = false
    clearInterval(this.RefreshId)
    var date = new Date()
    date.setDate(date.getDate() - 30)
    var mon = date.getMonth() + 1
    var d2 = date.getDate() + '/' + mon + '/' + date.getFullYear()
    var present = new Date()
    var p1 = present.getMonth() + 1
    var sdf = present.getDate() + '/' + p1 + '/' + present.getFullYear()
    this.isRequesting = true
    this.SignupUsers(d2, sdf)
    this.getOrdersData(d2, sdf)
    this.activeid = 3
    this.OrdersBirdView(0, d2, sdf)
    this.OrdersData_birds = []
  }
  OnYearly() {
    this.typeWise = 'Year wise signup Users'
    this.activeid = 4
  }
  OnTotal() {
    this.typeWise = ''
    this.typeWise = 'Total signup Users'
    this.activeid = 5
  }
  clickHandler(event: any) {
    if (event.point) {
      jQuery(this.myModal.nativeElement).modal('show');
      this.CustomerData = []
      var name = event.point.name;
      this.name_slicedPie = name


      if (this.name_slicedPie == 'Ios') {
        this.deviceType = 1
        this.devecieCount = this.ios_Count

      } else if (this.name_slicedPie == 'Android') {
        this.deviceType = 2
        this.devecieCount = this.android_Count

      } else if (this.name_slicedPie == 'Web') {
        this.deviceType = 3

        this.devecieCount = this.web_Count

      }
      this.getCustMerData(0, 0, this.deviceType, this.fromDateFinal, this.todateFinal)
    }
  }
  clickHandler_orders(event: any) {
    if (event.point) {
      jQuery(this.myModalOrders.nativeElement).modal('show');
      this.index_moreinfor = -1
      this.Details_orders = []
      var name: string = event.point.name;
      name = name.trim()
      if (name == 'Completed') {
        this.type = 3
        this.totalCount_orders = this.Completed_Orders
        this.order_type = 'Completed Orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      } else if (name == 'Ongoing') {
        this.type = 2
        this.totalCount_orders = this.Ongoing_Orders
        this.order_type = 'Ongoing Orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      } else if (name == 'New') {
        this.type = 1
        this.totalCount_orders = this.new_orders
        this.order_type = 'new orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      } else if (name == 'Same Day') {
        this.type = 6
        this.totalCount_orders = this.Same_Day_Orders
        this.order_type = 'Same Day Orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      } else if (name == '4 Hours') {
        this.type = 5
        this.totalCount_orders = this.four_hours_Orders
        this.order_type = 'four hours Orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      } else if (name == 'Instant') {
        this.type = 4
        this.totalCount_orders = this.Instant_Orders
        this.order_type = 'Instant Orders'
        this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type)
      }
    }
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  onsave() {
    this.closeModal()
  }
  Ondateto(todate) {
}
  OnFromDate(fromdate) {
}
  getanlaytics(fromdateui, toDate_ui) {
    var fromDate = fromdateui.split('-')
    fromDate = fromDate[2] + '/' + fromDate[1] + '/' + fromDate[0]
    var toDate = toDate_ui.split('-')
    toDate = toDate[2] + '/' + toDate[1] + '/' + toDate[0]
    this.SignupUsers(fromDate, toDate)
    this.getOrdersData(fromDate, toDate)
    this.OrdersBirdView(0, fromDate, toDate)
    this.OrdersData_birds = []
  }
  OnRefresh() {
    this.isRefresh = !this.isRefresh
    if (this.isRefresh) {


      this.Onselect_RefreshTime(60000)
    } else {
      clearInterval(this.RefreshId)
    }


  }
  Onselect_RefreshTime(value: number) {
    if (this.isRefresh) {
      if (value > 0) {
        this.RefreshId = setInterval(() => {
          this.SignupUsers(this.fromDateFinal, this.todateFinal)
          this.getOrdersData(this.fromDateFinal, this.todateFinal)
        }, value)
      }
    }


  }
  SignupUsers(fromDate, Todate) {


    this.fromDateFinal = fromDate;
    this.todateFinal = Todate
    const body = new AnalyticsModel(null, null, null, fromDate, Todate)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Signups_Devices_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.SignupData = (data.json().extras.SignupData);



          this.web_Count = +this.SignupData.web

          if (this.web_Count <= 0) {
            this.web_Count = null

          } else {

          }
          this.android_Count = +this.SignupData.android
          if (this.android_Count <= 0) {
            this.android_Count = null

          } else {

          }
          this.ios_Count = +this.SignupData.ios
          if (this.ios_Count <= 0) {
            this.ios_Count = null

          } else {

          }
          this.total_count_pie = this.SignupData.total
          this.isLoading_pie = true
          if (this.total_count_pie == 0) {
            this.isSignupdata = false

          } else {
            this.isSignupdata = true

          }
          this.options_pie = {
            chart: { type: 'pie' },
            credits: {
              enabled: false
            },
            tooltip: {
              formatter: function () {
               
                return this.key + ':' + this.point.y + '</b>';
              }
            },
            title: { text: 'Customers' + '(' + this.total_count_pie + ')' },
            plotOptions: {
              pie: {
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.y}</b>',
                  distance: -50,
                  color: 'black'
                }
              },
              series: {
                animation: {
                  duration: 2000
                }
              }
            },
            series: [
              {
                data:
                [
                  {
                    y: this.web_Count,
                    name: 'Web',
                    color: '#4885ed'
                  }, {
                    y: this.android_Count,
                    name: 'Android',
                    color: '#3cba54'
                  }, {
                    y: this.ios_Count,
                    name: 'Ios',
                    color: '#f4c20d'
                  }
                ],
                allowPointSelect: true,
                showInLegend: true,
              },
            ]
          };
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          alert(this._ApiMessageService.ApiMessages[msgNumber])
        }
      }
      )
  }
  getOrdersData(fromdate, todate) {
    const body = new AnalyticsModel(null, null, null, fromdate, todate)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Order_Complete_Analytics', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false

          let Total_Orders: number = +data.json().extras.Total_Orders
          if (Total_Orders == 0) {
            this.isorders_pie = false

          } else {
            this.isorders_pie = true

          }
          this.new_orders = +data.json().extras.New_Orders
          this.Ongoing_Orders = +data.json().extras.Ongoing_Orders

          this.Completed_Orders = +data.json().extras.Completed_Orders

          this.Instant_Orders = +data.json().extras.Instant_Orders

          this.four_hours_Orders = +data.json().extras.four_hours_Orders
          this.Same_Day_Orders = +data.json().extras.Same_Day_Orders
          if (this.new_orders <= 0) {
            this.new_orders = null

          } else {

          }
          if (this.Ongoing_Orders <= 0) {
            this.Ongoing_Orders = null

          } else {

          }
          if (this.Completed_Orders <= 0) {
            this.Completed_Orders = null

          } else {

          }
          if (this.Instant_Orders <= 0) {
            this.Instant_Orders = null

          } else {

          }
          if (this.four_hours_Orders <= 0) {
            this.four_hours_Orders = null

          } else {

          }
          if (this.Same_Day_Orders <= 0) {
            this.Same_Day_Orders = null

          } else {

          }

          var order_count: number = this.new_orders + this.Completed_Orders + this.Ongoing_Orders
          var order_bookingtyp: number = this.Same_Day_Orders + this.Instant_Orders + this.four_hours_Orders

          this.options_pie2 = {
            chart: { type: 'pie' },
            credits: {
              enabled: false
            },
            title: { text: 'Orders Status' + '(' + order_count + ')' },
            tooltip: {
              formatter: function () {
    
                return this.key + ':' + this.point.y + '</b>';
              }
            },
            plotOptions: {
              pie: {
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                  enabled: true,
                  format: ' <h1>{point.y}</h1>',
                  distance: -40,
                  color: 'white'
                }
              },
              series: {
                animation: {
                  duration: 2000
                }
              }
            },
            series: [
              {
                data:
                [
                  {
                    y: this.new_orders,
                    name: 'New',
                    color: '#4885ed'
                  }, {
                    y: this.Ongoing_Orders,
                    name: 'Ongoing',
                    color: '#3cba54'
                  }, {
                    y: this.Completed_Orders,
                    name: 'Completed',
                    color: '#f4c20d',
                    dataLabels: {
                      distance: -40,
                      color: 'white'
                    }
                  }
                ],
                allowPointSelect: true,
                showInLegend: true,
              },
            ]
          };
          this.options_pie3 = {
            chart: { type: 'pie' },
            credits: {
              enabled: false
            },
            title: { text: 'Orders  Booking Type' + '(' + order_bookingtyp + ')' },
            tooltip: {
              formatter: function () {
                
                return this.key + ':' + this.point.y + '</b>';
              }
            },
            plotOptions: {
              pie: {
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                  enabled: true,
                  format: '<strong>{point.y}</strong>',
                  style: {
                    fontSize: '14px',
                    border: 'black',
                    fontWeight: '800'
                  },
                  distance: -30,
                  color: 'black',
                }
              },
              series: {
                animation: {
                  duration: 2000
                }
              }
            },
            exporting: {
              enabled: true,
            },
            series: [
              {
                data:
                [
                  {
                    y: this.Instant_Orders,
                    name: 'Instant',
                    color: '#00BFFF'
                  }, {
                    y: this.four_hours_Orders,
                    name: '4 Hours ',
                    color: '#fb641b'
                  }, {
                    y: this.Same_Day_Orders,
                    name: 'Same Day ',
                    color: '#ee9b0a'
                  }
                ],
                allowPointSelect: true,
                showInLegend: true,
              },
            ]
          };
        }
      }
      )
  }
  getCustMerData(skip?, type?, deviceType?, fromdate?, todate?) {
    const body = new AnalyticsModel(skip, type, deviceType, fromdate, todate)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + 'Detailed_Customer_Registered_View_All_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.CustomerData = data.json().extras.CustomerData

        }
      }
      )
  }
  pageChanged(event) {
    this.p = event
    this.nextpage(this.p - 1)
  }
  nextpage(index) {
    this.index_signup = index;
    let skip_value = this.index_signup * 10
    let empid = this._cookieService.get('EmployeeID')
    const result_table_data = new AnalyticsModel(skip_value, null, this.deviceType, this.fromDateFinal, this.todateFinal)
    const body = JSON.stringify(result_table_data)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Detailed_Customer_Registered_View_All_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.CustomerData = data.json().extras.CustomerData
          this.skip_value_signup = this.index_signup * 10
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  getOrders_details_data(fromdate, todate, type) {
    const body = new AnalyticsModel(0, type, null, fromdate, todate)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Orders_Analytics_Details_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.Details_orders = data.json().extras.OrderData

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  moreinfo(item, i) {
    this.index_moreinfor = i
    this.receiverName = item.receiverName
    this.receiverPhone = item.receiverPhone
    this.itemName = item.itemName
    this.deliverycharge = item.deliverycharge
    this.First_name = item.First_name
    this.Phone = item.Phone
    this.Email = item.Email
    this.Driver_Name = item.Driver_Name
    this.Driver_PhoneNumber = item.Driver_PhoneNumber
    this.Driver_Email = item.Driver_Email
    this.order_datetime = item.order_datetime
    if (item.OfferApplied) {
      this.OfferApplied = true

      this.OfferName = item.OfferName
      this.OfferDescription = item.OfferDescription
      this.OfferCode = item.OfferCode
    } else {
      this.OfferApplied = false



    }
    this.itemImage = item.itemImage
    if (this.itemImage.length) {
      this.isimage = true
    } else {
      this.isimage = false

    }
  }
  pageChanged_orders(event) {
    this.p_orders = event
    this.nextpage_orders(this.p_orders - 1)
  }
  nextpage_orders(index) {
    this.index_orders = index;
    let skip_value = this.index_orders * 10
    let empid = this._cookieService.get('EmployeeID')
    const result_table_data = new AnalyticsModel(skip_value, this.type, null, this.fromDateFinal, this.todateFinal)
    const body = JSON.stringify(result_table_data)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Orders_Analytics_Details_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.Details_orders = data.json().extras.OrderData

          this.skip_value_orders = this.index_orders * 10
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  getDriverData(skip, iszoneid: boolean, ZoneID?) {
    const body = new AnalyticsModel(skip, null, null, null, null, ZoneID)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Driver_Bird_View_Total', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          var driverdata = []
          driverdata = data.json().extras.DriverData

          if (iszoneid) {


            this.DriverData = []
            this.DriverData = data.json().extras.DriverData

          } else {
            if (driverdata.length == 0) {
              return;
            }
            else {
              Array.prototype.push.apply(this.DriverData, driverdata);
              this.lat = this.DriverData[0].lat
              this.lng = this.DriverData[0].long

              this.skip_map = this.skip_map + driverdata.length

              this.getDriverData(this.skip_map, false)
            }
          }



        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  OrdersBirdView(skip, fromDate, todate) {
    const body = new AnalyticsModel(skip, null, null, fromDate, todate)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/All_Orders_Bird_View_Date_Range', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          var PickData = []
          PickData = data.json().extras.OrderData


          if (PickData.length == 0) {
            return;
          }
          else {
            Array.prototype.push.apply(this.OrdersData_birds, PickData);



            skip = skip + PickData.length

            this.OrdersBirdView(skip, fromDate, todate)
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  clickedMarker(index, data: any) {
    data['isOpen'] = true;
    if (this._lastOpenIndex > -1) this.DriverData[this._lastOpenIndex]['isOpen'] = false;
    this._lastOpenIndex = index;
    this.getGeoLocation(data.lat, data.long)
  }
  clickedMarker_ordersBIrd(index, data: any) {
    data['isOpen'] = true;
    if (this._lastOpenIndex_OrdersBirdview > -1) this.OrdersData_birds[this._lastOpenIndex_OrdersBirdview]['isOpen'] = false;
    this._lastOpenIndex_OrdersBirdview = index;
  }
  clickedMarker_ordersBIrd_drop(index, data) {
    data['isOpenDrop'] = true;
    if (this._lastOpenIndex_OrdersBirdview_drop > -1) this.OrdersData_birds[this._lastOpenIndex_OrdersBirdview_drop]['isOpenDrop'] = false;
    this._lastOpenIndex_OrdersBirdview_drop = index;
  }
  getGeoLocation(lat: number, lng: number) {
    this.DriverAddress = ''
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
            this.DriverAddress = pickadd;


          } else {
            this.DriverAddress = 'No address avilable'
          }
        } else {
          this.DriverAddress = 'No address avilable'
        }
      });
    }
  }
  findAll_Zones() {
    const body = new AnalyticsModel()
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.ZoneData = data.json().extras.ZoneData
          this.zoneid = this.ZoneData[0].ZoneID

        }
      }
      )
  }
  onselectZone(event) {
    this.zoneid = event.target.value
    this.getDriverData(0, true, this.zoneid)
  }
  markerDragEnd(event) {}
}
