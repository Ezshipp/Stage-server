import { driverModel } from './../../../front_end_models/driverModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { FirstTime_offerModel } from './../../../front_end_models/FirstTime_OfferModel';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'in-active-drivers',
  templateUrl: './in-active-drivers.component.html',
  styleUrls: ['./in-active-drivers.component.css']
})
export class InActiveDriversComponent implements OnInit {
  driver_json: any;
  isSearch: boolean;
  Total_Count: number;
  p: number = 1
  activeId: number
  array_O: any[];
  isRequesting: boolean;
  array: any;
  mymodel;
  LastOnline: any;
  created_dt: any;
  driverseqId: any;
  Salary_Assigned: any;
  views_active: number;
  acc_status: any;
  Salary: any;
  phone: any;
  email: any;
  name: any;
  isData: boolean;
  ZoneData: any = [];
  OperatorData: any;
  valu: any;
  IsAsc: any;
  Status: any;
  ZoneID: any;
  OperatorID: any = [];
  DriverID: any;
  DriverData: any = [];
  views: any;
  all_offersData: any = [];
  url: string = '';
  offerType = 2;
  skip_value: number = 0;
  limit = 10
  constructor(private http: Http, private _ApiMessageService: ApiMessageService, private ErrorService: ErrorService) { }
  ngOnInit() {
    this.getRejectedDrivers(1)
  }
  getRejectedDrivers(type: number) {
    this.isRequesting = true;
    const body = new driverModel(this.skip_value)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Rejected_Drivers', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isSearch=false
          this.isRequesting = false;
          if (type == 1) {
            this.DriverData = data.json().extras.DriverData
             this.driver_json = data.json().extras.DriverData
            this.Total_Count = data.json().extras.Count
            if (!this.DriverData.length) {
              this.isData = true;
            } else {
              this.isData = false;
            }
          } else if (type == 2) {
            this.driver_json = data.json().extras.DriverData
            this.isSearch=false
            this.DriverData = data.json().extras.DriverData
          }
          this.Operators()
          this.zones()
        } else {
          this.isSearch=false
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  pageChanged(ev: number) {
    this.p = ev
    var p = this.p - 1
this.activeId=null
    let skip_value = p * this.limit
    this.skip_value = skip_value
    this.getRejectedDrivers(2)
  }
  Approve_Driver() {
    const body = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, this.OperatorID, this.ZoneID)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Approve_Driver', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.Status = data.json().extras.Status
          let message="Biker activated sucessfully"
          this.ErrorService.handleError(message)
          this.views=null
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  Operators(){
    const body = new driverModel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Operators', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.OperatorData = data.json().extras.OperatorData
          this.OperatorID = this.OperatorData[0].OperatorID
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
   }
  zones(){
    const body = new driverModel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.ZoneData = data.json().extras.ZoneData
         this.ZoneID = this.ZoneData[0].ZoneID
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
   }
  close() {
    this.views = -1;
    this.views_active = -1;
  }
  OnmoreInfo_order(item, i) {
    this.DriverID = item;
    this.views = i;
    this.views_active = -1;
  }
  click_button_employee(item, i) {
    this.DriverID = item;
    this.views_active = i;
    this.views = -1;
    this.name = item.name
    this.phone = item.phone
    this.email = item.email
    this.Salary = item.Salary
    this.acc_status = item.acc_status
    this.acc_status = item.acc_status
    this.Salary_Assigned = item.Salary_Assigned
    this.driverseqId = item.driverseqId
    this.created_dt = item.created_dt
    this.LastOnline = item.LastOnline
  }
  select(value, event) {
    this.OperatorID = value;
  }
  select_zone(value, event) {
    this.ZoneID = value;
  }
  valuechange(newValue: string) {
    this.mymodel = newValue;
    let length = newValue.length
    this.isRequesting = true;
    if (length >= 3) {
      this.isSearch=true
      this.DriverData = []
      this.array_O = []
      this.skip_value = 0
      const body1 = new driverModel(null, newValue)
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(this.url + '/Search_All_Rejected_Drivers', body1, { headers: headers })
        .subscribe(
        data => {
          if (data.json().success) {
            this.DriverData = data.json().extras.DriverData
            this.isRequesting = false;
          }
          else {
            const msgNumber: number = parseInt(data.json().extras.msg);
            let message = this._ApiMessageService.ApiMessages[msgNumber]
            this.ErrorService.handleError(message)
          }
        }
        )
    } else {
      this.ngOnInit()
    }
  }
  sortColumn(key) {
    this.IsAsc = !this.IsAsc
    this.valu = key
     this.sortResults(this.valu, this.IsAsc);
  }
  sortColumnReverse(key) {
    this.valu = key
     this.sortResults(key, false);
  }
  sortResults(prop, asc) {
    this.DriverData = this.driver_json.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
    return this.DriverData
  }
}
