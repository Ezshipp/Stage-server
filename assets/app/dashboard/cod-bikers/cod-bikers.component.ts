import { driverModel } from "../../front_end_models/driverModel";
import { ErrorService } from "../../errors/error.service";
import { ApiMessageService } from "../../authentication/apimessages.service";
import { Http, Headers } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "cod-bikers",
  templateUrl: "./cod-bikers.component.html",
  styleUrls: ["./cod-bikers.component.css"]
})
export class CodBikersComponent implements OnInit {
  detailOrders_searchRul: string;
  detailsOrders_driverId: any;
  detailOrders_url: string;
  isSearchOrder: boolean;
  amountType: number;
  DriverName: any;
  op: number = 1;
  index: any;
  DriverID: any;
  OrderTotal_Count: any;
  OrderData: any = [];
  isData: boolean;
  isSearch: boolean;
  DriverData_json: any = [];
  valu: any;
  IsAsc: boolean;
  views: any;
  isRequesting: boolean;
  p: number = 1;
  activeId: any;
  Total_Count: any;
  DriverData: any = [];
  url: string = "";
  date_from;
  date_to;
  mymodel: string;
  mymodel_Order: string;
  skip_value = 0;
  orderSkip = 0;
  orderLimit = 4;
  limit = 10;
  toDate;
  fromDate;
  constructor(
    private _cookieService: CookieService,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService
  ) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var ds = d.getDate() + "/" + month + "/" + d.getFullYear();
    this.toDate = ds;
    var d3 = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000);
    var lastWeek = this.getLastWeek(new Date());
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();
    this.fromDate = lastWeekDay + "/" + lastWeekMonth + "/" + lastWeekYear;
  }
  getLastWeek(date) {
    date = date || new Date();
    var lastWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 7
    );
    return lastWeek;
  }
  ngOnInit() {
    this.skip_value = 0;
    this.findAllActiveDrivers(
      1,
      "/Find_All_Active_Drivers",
      this.fromDate,
      this.toDate,
      ""
    );
  }
  OnFromDate(fromdate) {}
  Ondateto(todate) {}
  onSubmit(fromdate, todate) {
    var fd = fromdate.split("-");
    this.fromDate = fd[2] + "/" + fd[1] + "/" + fd[0];
    var td = todate.split("-");
    this.toDate = td[2] + "/" + td[1] + "/" + td[0];
    this.ngOnInit();
  }
  findAllActiveDrivers(
    type: number,
    url: string,
    date_from,
    date_to,
    searchValue?
  ) {
    this.isRequesting = true;
    const body = new driverModel(
      this.skip_value,
      null,
      null,
      date_from,
      date_to
    );
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + url, body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          if (type == 1) {
            this.p = 1;
            this.DriverData = data.json().extras.DriverData;
            this.DriverData_json = data.json().extras.DriverData;
            this.Total_Count = data.json().extras.Count;
            if (this.DriverData.length) {
              this.isData = false;
              this.isSearch = false;
            } else {
              this.isData = true;
            }
          } else if (type == 2) {
            this.DriverData = data.json().extras.DriverData;
            this.Total_Count = data.json().extras.Count;
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
  pageChanged(event: number) {
    this.views = null;
    this.p = event;
    var p = this.p - 1;
    this.isRequesting = true;
    let skip_value = p * this.limit;
    this.skip_value = skip_value;
    this.findAllActiveDrivers(
      2,
      "/Find_All_Active_Drivers",
      this.fromDate,
      this.toDate,
      ""
    );
  }
  valuechange(value: string) {
    this.isRequesting = true;
    this.views = -1;
    let length = value.length;
    if (length >= 3) {
      this.DriverData = [];
      const body = new driverModel(
        null,
        value,
        null,
        this.fromDate,
        this.toDate
      );
      const headers = new Headers({ "Content-Type": "application/json" });
      return this.http
        .post(this.url + "/Search_All_Active_Drivers", body, {
          headers: headers
        })
        .subscribe(data => {
          if (data.json().success) {
            this.isRequesting = false;
            this.DriverData = data.json().extras.DriverData;
            this.DriverData_json = data.json().extras.DriverData;
            this.Total_Count = data.json().extras.Count;
            if (this.DriverData.length) {
              this.isData = false;
              this.isSearch = false;
              this.activeId = null;
            } else {
              this.isData = true;
            }
          } else {
            const msgNumber: number = parseInt(data.json().extras.msg);
            let message = this._ApiMessageService.ApiMessages[msgNumber];
            this.ErrorService.handleError(message);
          }
        });
    } else {
      this.DriverData = [];
      this.ngOnInit();
    }
  }
  sortColumn(key) {
    this.valu = key;
    this.IsAsc = !this.IsAsc;
    this.sortResults(this.valu, this.IsAsc);
  }
  sortColumnReverse(key) {
    this.valu = key;
    this.sortResults(key, false);
  }
  sortResults(prop, asc) {
    this.DriverData = this.DriverData_json.sort(function(a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
    return this.DriverData;
  }
  closeOrders() {
    this.views = -1;
  }
  OnselectCount(event) {
    this.limit = event.target.value;
    this.skip_value = 0;
    this.ngOnInit();
    this.p = 1;
  }
  getOrderDetails(driverData, DetailView_index, type, ordersCount) {
    this.OrderData = [];
    if (ordersCount == 0) {
      let message = " No Orders Found";
      this.ErrorService.handleError("No Orders Found");
    } else {
      this.DriverName = driverData.name;

      this.views = DetailView_index;
      this.detailsOrders_driverId = driverData.DriverID;
      this.op = 1;
      if (type == 1) {
        this.amountType = 1;
        this.detailOrders_url =
          "/Find_All_Driver_Completed_Orders_Subtotal_Total_Amount";
        this.detailOrders_searchRul =
          "/Search_All_Driver_Completed_Orders_Subtotal_Total_Amount";
      } else if (type == 2) {
        this.amountType = 2;
        this.detailOrders_url =
          "/Find_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount";
        this.detailOrders_searchRul =
          "/Search_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount";
      } else if (type == 3) {
        this.amountType = 3;
        this.detailOrders_url =
          "/Find_All_Driver_Completed_Orders_Exceeded_Amount";
        this.detailOrders_searchRul =
          "/Search_All_Driver_Completed_Orders_Exceeded_Amount";
      }
      const body = new driverModel(
        0,
        null,
        this.detailsOrders_driverId,
        this.fromDate,
        this.toDate,
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
        this.orderLimit
      );
      this.getOrdersDetail_view_backend(body, this.detailOrders_url, 1);
    }
  }
  getOrdersDetail_view_backend(body, url, type) {
    this.isRequesting = true;
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + url, body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;

          if (type == 1) {
            this.isSearchOrder = false;
            /* while first time and all types of orders like Subtotal_Total_Amount,Delivery_and_Total_Amount and Orders_Exceeded_Amount*/
            this.OrderData = data.json().extras.OrderData;
            this.OrderTotal_Count = data.json().extras.Count;
          } else if (type == 2) {
            this.isSearchOrder = false;
            this.OrderData = data.json().extras.OrderData;
          } else if (type == 3) {
            setTimeout(() => {
              this.OrderData = data.json().extras.OrderData;
              this.isSearchOrder = true;
            }, 2000);
          }
        } else {
          this.isRequesting = false;

          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
  pageChangedOrder(event: number) {
    this.op = event;
    let skip = this.op - 1;
    let skip_value = skip * this.orderLimit;
    const body = new driverModel(
      skip_value,
      null,
      this.detailsOrders_driverId,
      this.fromDate,
      this.toDate,
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
      this.orderLimit
    );
    this.getOrdersDetail_view_backend(body, this.detailOrders_url, 2);
  }
  valuechange_Order(value: string) {
    const body = new driverModel(
      null,
      value,
      this.detailsOrders_driverId,
      this.fromDate,
      this.toDate,
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
      this.orderLimit
    );
    if (value.length >= 3) {
      this.getOrdersDetail_view_backend(body, this.detailOrders_searchRul, 3);
    } else if (value.length == 0) {
      this.getOrdersDetail_view_backend(body, this.detailOrders_url, 1);
    }
  }

  search(value, url) {
    const body = new driverModel(
      null,
      value,
      this.DriverID,
      this.fromDate,
      this.toDate
    );
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + url, body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          setTimeout(() => {
            this.OrderData = data.json().extras.OrderData;
          }, 2000);
          if (this.OrderData.length) {
          } else {
            var message = "No Orders Found";
            this.ErrorService.handleError(message);
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
}
