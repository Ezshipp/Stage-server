import { OnGoingBikersModal } from '../../../front_end_models/ongoingBikersModel';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
import { ErrorService } from "../../../errors/error.service";
import { ApiMessageService } from "../../../authentication/apimessages.service";
@Component({
  selector: "on-going-bikers",
  templateUrl: "./on-going-bikers.component.html",
  styleUrls: ["./on-going-bikers.component.css"],
})
export class OnGoingBikersComponent implements OnInit {
  realIndex: number;
  activeRotate: number;
  p: number = 1;
  skip_value: number = 0;
  index: any = 0;
  OrderData: any = [];
  views: any;
  isData: boolean;
  valu: any;
  IsAsc: boolean;
  issearch: boolean;
  isRequesting: boolean;
  array: any = [];
  Total_Count: any;
  activeId: number;
  limit: number = 10;
  Bikers: any = [];
  Bikers_json: any = [];
  url: string = "";
  constructor(
    private router: Router,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _cookieService: CookieService,
    private ErrorService: ErrorService
  ) { }
  ngOnInit() {
    this.inItMethod();
  }
  inItMethod() {
    this.isRequesting = true;
    const body1 = new OnGoingBikersModal(0, this.limit);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + "/Find_All_Drivers_With_Ongoing_Orders", body1, {
        headers: headers
      })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.Bikers = data.json().extras.DriverData;
          this.Bikers_json = data.json().extras.DriverData;
          if (!this.Bikers.length) {
            this.isData = true;
            this.issearch = false;
          } else {
            this.issearch = true;
            this.isData = false;
          }
          /* pagination*/
          this.Total_Count = data.json().extras.Count;
          let count: number = parseInt(data.json().extras.Count);
          let count1: number = Math.floor(count / 10);
          let count2 = count % 10;
          if (count2 == 0) {
            this.array.length = count1;
          } else {
            this.array.length = count1 + 1;
          }
          /* completed*/
        } else {
          this.isRequesting = false;
          const msgNumber: number = parseInt(data.json().extras.msg);
          if (msgNumber == 21) {
            this._cookieService.remove("ez_cusID");
            this.router.navigate(["/signissssn"]);
          }
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
  sortColumn(key) {
    this.IsAsc = !this.IsAsc;
    this.valu = key;
    this.views = -1;
    this.realIndex = -1;
    this.sortResults(this.valu, this.IsAsc);
  }
  sortResults(prop, asc) {
    this.Bikers = this.Bikers_json.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
    return this.Bikers;
  }
  OnmoreInfo_order(item, i) {
    this.OrderData = item.OrderData;
    if (this.realIndex == i) {
      this.views = -1;
      this.realIndex = -1;
    } else {
      this.views = i;
      this.realIndex = i;
    }
  }
  pageChanged(event) {
    this.p = event;
    this.nextpage(this.p - 1);
  }
  nextpage(index) {
    this.isRequesting = true;
    this.index = index;
    let skip_value = this.index * this.limit;
    const body = new OnGoingBikersModal(skip_value, this.limit);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + "/Find_All_Drivers_With_Ongoing_Orders", body, {
        headers: headers
      })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.issearch = true;
          this.Bikers = data.json().extras.DriverData;
          this.Bikers_json = data.json().extras.DriverData;
          this.skip_value = this.index * this.limit;
        } else {
          this.isRequesting = false;
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
}
