
import { ApiMessageService } from "./../../../../authentication/apimessages.service";
import { ErrorService } from "./../../../../errors/error.service";
import { premiumCustomerModal } from "./../../../../front_end_models/premiumCustomerModal";
import { Http, Headers } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { GetLatLngModel } from "../../../../front_end_models/getLatLngModel";
import { CookieService } from "angular2-cookie/services";
import { Router } from "@angular/router";
import { GenReportModal } from "../../../../front_end_models/genReportModel";
import { CodReportModel } from "../../../../front_end_models/CodReportModel";

@Component({
  selector: "app-clientcod",
  templateUrl: "./client_cod.component.html",
  styleUrls: ["./client_cod.component.css"]
})
export class ClientsCODComponent implements OnInit {
  isLoadinPremiumCust: boolean;
  createCOd_CustomerID: string;
  First_name: string;
  createForm: boolean;
  allPremiumCustomers: boolean;
  currentPage_premiumCust: number;
  premiumCust_Count: number;
  premuCust_data: any = [];
  CustomerID: string;
  isRequesting: boolean = false;
  sortOptions: any = {};
  currentPage_cod: number = 1;
  Total_Count_cod: number;
  CodReportsData: any = [];
  url: string = "";
  limit: number = 10;
  constructor(
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _cookieService: CookieService,
    private router: Router,
    private ErrorService: ErrorService
  ) { }

  ngOnInit() {
    this.getcodReport();
  }
  getcodReport() {
    const body1 = new GenReportModal(
      this._cookieService.get("ez_admin_cusID"),
      null,
      null,
      null,
      0,
      this.limit,
      {}
    );
    this.getData_backend(body1, "/Find_All_Customer_Cod_Reports", 1);
  }
  OnpageChanege_cod(pageNumber: number) {

    this.currentPage_cod = pageNumber;

    let skip = this.currentPage_cod-1
    skip = skip*this.limit
    const body1 = new GenReportModal(
      this._cookieService.get("ez_admin_cusID"),
      null,
      null,
      null,
      skip,
      this.limit,
      this.sortOptions
    );
    this.getData_backend(body1, "/Find_All_Customer_Cod_Reports", 2);
  }
  OnRefresh(codReportData, index) {
    this.CustomerID = codReportData.CustomerID;
    const body = new CodReportModel(
      codReportData.CustomerInvoiceID,
      codReportData.CustomerID
    );
    this.getData_backend(body, "/Get_Customer_COD_Report", 3);
  }
  onClickCOdReport() {
    this.premuCust_data=[]

    this.allPremiumCustomers = true
    this.getPremicustomersData()
    this.createForm = false
  }
  getPremicustomersData() {
    const body1 = new premiumCustomerModal(
      null,
      null,
      0,
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
      null,
      null,
      {}
    );
    this.isLoadinPremiumCust=true
    this.getData_backend(body1, "/Find_All_Active_Premium_Customers", 4);
  }
  OnpageChanege_premiumCust(pageNumber) {
    this.currentPage_premiumCust = pageNumber
    this.isLoadinPremiumCust=true
    let skip = this.currentPage_premiumCust-1
    skip=skip* this.limit
    const body1 = new premiumCustomerModal(
      null,
      null,
      skip,
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
      null,
      null,
      {}
    );
    this.getData_backend(body1, "/Find_All_Active_Premium_Customers", 5);

  }
  OnselectPreCustomers(item, pageNumber) {
    this.First_name = item.First_name
    this.createCOd_CustomerID = item.CustomerID
    this.createForm = true;
    this.allPremiumCustomers = false
  }
  exportPdf(fromdate, to_date) {

    if (fromdate == "" || to_date == "") {
      var message = 'Enter From Date and To Date';
      this.ErrorService.handleError(message)
    } else {
      var dat = fromdate.split('-')
      var FromDate = dat[2] + '/' + dat[1] + '/' + dat[0]
      var date1 = to_date.split('-')
      var Todate = date1[2] + '/' + date1[1] + '/' + date1[0]

      this.isRequesting = true;
      const result_table_data = new GenReportModal(null, this.createCOd_CustomerID, FromDate, Todate)
      this.getData_backend(result_table_data, '/Create_Client_COD_Report', 6)
    }
  }
  getData_backend(body, url, type) {
    this.isRequesting = true;
    const headers = new Headers({ "Content-Type": "application/json" });
    const req = this.http
      .post(this.url + url, body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          if (type == 1) {
            /* =>>>intial cod Reports*/
            this.currentPage_cod = 1;
            this.CodReportsData = data.json().extras.InvoiceData;
            this.Total_Count_cod = data.json().extras.Count;
          } else if (type == 2) {
            /* =>>> pagination cod Reports*/
            this.CodReportsData = data.json().extras.InvoiceData;
          } else if (type == 3) {
            /* =>>>> refresh cod Reports*/
            // this.getcodReport()
            var codReport_Refresh: any = [];
            codReport_Refresh = data.json().extras.InvoiceData;
            for (var i = 0; i < this.CodReportsData.length; i++) {
              if (this.CustomerID == this.CodReportsData[i].CustomerID) {
               this.CodReportsData[i].PDFLink=codReport_Refresh.PDFLink
                this.CodReportsData[i].ProcessStage= codReport_Refresh.ProcessStage
              }
            }
          } else if (type == 4) {
            /* =>>>intial premuCust_data*/
            this.currentPage_premiumCust = 1
            this.isLoadinPremiumCust=false
            this.premuCust_data = data.json().extras.CustomerData;

            this.premiumCust_Count = data.json().extras.Count;
          }
          else if (type == 5) {
            /* =>>> pagination premuCust_data*/
            this.isLoadinPremiumCust=false

            this.premuCust_data = data.json().extras.CustomerData;
          }
          else if (type == 6) {
            /* =>>> create  cod*/
            var Status = 'Your Orders Record is in Processing';
            this.ErrorService.handleError(Status)
            this.createForm = false;
            this.getcodReport()
          }
        } else {
          this.isRequesting = false;
          this.isLoadinPremiumCust=false

          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }

}
