import { error } from 'util';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { driverModel } from './../../../front_end_models/driverModel';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-newBikers',
  templateUrl: './newBikers.component.html',
  styleUrls: ['./newBikers.component.css']
})
export class NewBikersComponent implements OnInit {
  driver_json: any = [];
  isSearch: boolean;
  p: number = 1;
  limit = 10
  Total_Count: any;
  activeId: number
  DriverData_json: any;
  array_O: any[];
  isRequesting: boolean;
  ZoneID: any;
  valu: any;
  IsAsc: any;
  index: any = 0;
  jobType = 0
  allActivedata: any[];
  mymodel: string;
  OperatorID: any;
  Status: any;
  ZoneData: any = [];
  OperatorData: any = [];
  created_date: any;
  Salary: any;
  status: any;
  phone: any;
  email: any;
  name: any;
  array: any = [];
  DriverData: any = [];
  url: string = '';
  skip_value: number = 0;
  views: any;
  DriverID: any;
  isData: boolean = false;
  constructor(private _cookieService: CookieService,
    private http: Http, private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService) { }
  ngOnInit() {
    this.getNewBikers(1)
  }
  getNewBikers(type: number) {
    this.isRequesting = true;
    const body = new driverModel(this.skip_value)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_New_or_Inactive_Drivers', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isSearch = false
          this.isRequesting = false;
          if (type == 1) {
            this.DriverData = data.json().extras.DriverData
            this.driver_json = data.json().extras.DriverData
            this.Total_Count = data.json().extras.Count;
            if (!this.DriverData.length) {
              this.isData = true;
            } else {
              this.isData = false;
            }
          }
          if (type == 2) {
            this.driver_json = data.json().extras.DriverData
            this.DriverData = data.json().extras.DriverData
          }
          this.Operators()
          this.zones()
        } else {
          this.isRequesting = false;
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  pageChanged(ev: number) {
    this.p = ev
    var p = this.p - 1
    this.activeId = null
    let skip_value = p * this.limit
    this.skip_value = skip_value
    this.getNewBikers(2)
  }
  Operators() {
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
  zones() {
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
  Approve_Driver() {
    const body = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, this.OperatorID, this.ZoneID)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Approve_Driver', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.Status = data.json().extras.Status
          this.Status = data.json().extras.Status
          let message = "Biker activated sucessfully"
          this.ErrorService.handleError(message)
          this.views = null
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  valuechange(newValue: string) {
    this.isSearch = true
    this.mymodel = newValue;
    let length = newValue.length
    this.isRequesting = true;
    if (length >= 3) {
      this.DriverData = []
      this.array_O = []
      this.skip_value = 0
      const body1 = new driverModel(null, newValue)
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(this.url + '/Search_All_New_or_Inactive_Drivers', body1, { headers: headers })
        .subscribe(
        data => {
          if (data.json().success) {
            this.array.length = 0
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
  select(value, event) {
    this.OperatorID = value;
  }
  select_zone(value, event) {
    this.ZoneID = value;
  }
  close() {
    this.views = -1;
  }
  OnmoreInfo_order(id, i) {
    this.DriverID = id;
    this.views = i;
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
