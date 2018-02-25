import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';
import { AuthenticationModel } from '../../front_end_models/authenticationModel';
import { PanControlOptions } from '@agm/core/services/google-maps-types';
declare var google: any;
declare var $: any;
@Component({
  selector: 'drivers-bird-view',
  templateUrl: 'drivers-bird-view.component.html',
  styleUrls: ['drivers-bird-view.component.css']
})
export class DriversBirdViewComponent {
  singleDriver_lng: any;
  singleDriver_lat: any;
  isSingleView: boolean = false;
  _lastOpenIndex_offline: any;
  picmarker_icon_box = "./images/imageedit_2_4150727599.png";
  dropMarker_icon_box = "./images/imageedit_2_6997711684.png";
  drop_Lng_order: any;
  drop_Lat_order: any;
  pic_Lng_order: any;
  pic_Lat_order: any;
  isDropMarker: boolean;
  isPicMarker: boolean;
  OrderData: any = []; realIndex: number;
  DriverID: any; viewsB: any; activeRotate: number;
  is_biker_view: boolean;
  display: any = "none";
  windowHeight: number;
  picmarker_icon = "./images/taxi_delivery_van_22.png";
  inactive_icon = "./images/taxi_delivery_van_22_GH.png";
  zoom = 10;
  _lastOpenIndex: number = -1;
  long_map: any = 78.4867;
  lat_map: any = 17.385;
  DriversData: any = [];
  url: string = "";
  index: any;
  classIndex: number;
  constructor(
    private pubnub: PubNubAngular,
    private _Cookieservice: CookieService,
    private router: Router,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _errorService: ErrorService
  ) {
    this.pubnub.init({
      publishKey: "pub-c-e3ea9e90-d5c3-471e-b3ad-a9da33dbf2b2",
      subscribeKey: "sub-c-7b39ec92-7293-11e7-9980-0619f8945a4f"
    });
    pubnub.publish(
      {
        message: { such: "Hello!" },
        channel: "ezshipp_serverChannel_Driver"
      },
      (status, response) => {
        if (status.error) {
        } else {
        }
      }
    );
  }
  ngOnInit() {
    this.windowHeight = $(window).height() - 75;
    const body = new AuthenticationModel(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this._Cookieservice.get("ez_admin_cusID")
    );
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + "/Drivers_God_View", body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.DriversData = data.json().extras.DriverData;
          var length: number = this.DriversData.length;
          if (length > 0) {
            this.Onpubnub();
          } else {
            this.zoom = 8;
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this._errorService.handleError(message);
        }
      });
  }
  Onpubnub() {
    this.pubnub.addListener({
      message: message => {
        var pubun_Driverid = message.message.driverid;
        for (var i = 0; i < this.DriversData.length; i++) {
          var driverid = this.DriversData[i].DriverID;
          if (driverid == message.message.driverid) {
            this.DriversData[i].lat = message.message.lt;
            this.DriversData[i].long = message.message.lg;
          }
        }
      },
      presence: m => {
        var channelName = m.channel;
        var channelGroup = m.subscription;
      },
      status: s => {
        var category = s.category;
        var operation = s.operation;
        var affectedChannels = s.affectedChannels;
        var subscribedChannels = s.subscribedChannels;
        var affectedChannelGroups = s.affectedChannelGroups;
        var lastTimetoken = s.lastTimetoken;
        var currentTimetoken = s.currentTimetoken;
      }
    });
    this.pubnub.subscribe({
      channels: ["ezshipp_serverChannel_Driver"],
      withPresence: true
    });
  }
  clickedMarker(index, data: any) {
    data["isOpen"] = true;
    if (this._lastOpenIndex > -1)
      this.DriversData[this._lastOpenIndex]["isOpen"] = false;
    this._lastOpenIndex = index;
    let messa = "dummy";
  }
  ngOnDestroy() {
    this.pubnub.unsubscribeAll();
  }
  onBikerClick(DriverID, DriverName, lat, long, index, data: any) {
    this.lat_map = lat;
    this.long_map = long;
    this.zoom = 15;
    this.isPicMarker = false
    this.isDropMarker = false
    this.clickedMarker(index, data);
    this.listOngoingOrders(DriverID, index)
  }
  listAllBikers(data: any) {
    this.isSingleView = false
    this.zoom = 10;
    this.lat_map = 17.385;
    this.long_map = 78.4867;
    this.classIndex = -1;
    data["isOpen"] = false;
    this._lastOpenIndex = -1;
  }
  bikersListView() {
    this.is_biker_view = !this.is_biker_view;
  }
  listOngoingOrders(id, index) {
    this.viewsB = index;
    this.DriverID = id;
    const body = new AuthenticationModel(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this._Cookieservice.get("ez_admin_cusID"), this.DriverID
    );
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + "/Find_ALL_Driver_Ongoing_Orders", body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.OrderData = data.json().extras.OrderData;
          var length: number = this.OrderData.length;
          if (length > 0) {
          } else {
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this._errorService.handleError(message);
        }
      });
  }
  OnongoingOrderClick(order) {
    this.isPicMarker = true
    this.isDropMarker = true
    this.pic_Lat_order = order.pickLatitude
    this.pic_Lng_order = order.pickLongitude
    this.drop_Lat_order = order.dropLatitude
    this.drop_Lng_order = order.dropLongitude
    this.zoom = 10
  }
  getIcon_Status(m) {
    if (m.status == 3) {
      return this.picmarker_icon
    } else if (m.status == 4) {
      return this.inactive_icon
    }
  }
}
