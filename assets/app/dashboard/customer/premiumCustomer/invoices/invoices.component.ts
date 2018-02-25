import { InvoiceModel } from './../../../../front_end_models/invoice.mode';
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { ErrorService } from './../../../../errors/error.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
    dueAmount=''
    p: number = 1;
    First_name: any;
    CustomerID: any;
    to_date: string;
    from_date: string;
    isEditDate: boolean;
    pdfLinkRefresh: any;
    isrefresh_link: boolean = false;
    pdfData_cus: any = [];
    skip_value: number = 0;
    isRequesting: boolean;
    index: number = 0;
    array: any = [];
    url: string = '';
    Total_Count: any;
    isData: boolean;
    pdfData: any[] = [];
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private ngZone: NgZone,
        private _cookieService: CookieService,
        private router: Router,
        private ErrorService: ErrorService, private _cdref: ChangeDetectorRef) { }
    ngOnInit() {
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new premiumCustomerModal(null, null, 0)
        this.isRequesting = true
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Invoices', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.pdfData = data.json().extras.InvoiceData
                    if (this.pdfData.length < 0) {
                        this.isData = true
                    } else {
                        this.getStyle(this.index)
                        this.Total_Count = data.json().extras.Count
                        let count: number = parseInt(data.json().extras.Count)
                        let count1: number = Math.floor(count / 10);
                        let count2 = count % 10
                        if (count2 == 0) {
                            this.array.length = count1
                        } else {
                            this.array.length = count1 + 1
                        }
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
            }
            )
    }
    getStyle(index) {
        if (index == this.index) {
            return "#795548";
        }
    }
    OneditDate(item) {
        this.isEditDate = true
        this.CustomerID = item.CustomerID
        this.First_name = item.CustomerName
    }
    onCloseEditDate() {
        this.isEditDate = false
    }
    OnRefresh(item) {
        const body = new InvoiceModel(item.CustomerID, item.CustomerInvoiceID)
        this.isRequesting = true
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Get_Customer_Monthly_Invoice', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    var pdfData_cus = data.json().extras.InvoiceData
                    if (pdfData_cus.PDFLink) {
                        this.isrefresh_link = true
                        this.pdfLinkRefresh = pdfData_cus.PDFLink
                    } else {
                        this.isrefresh_link = false
                    }
                }
            }
            )
    }
    pageChanged(event) {
        this.p = event
        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;
        let skip_value = this.index * 10
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new premiumCustomerModal(null, null, skip_value)
        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Invoices', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.pdfData = data.json().extras.InvoiceData
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
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
    getpdf(FromDate, Todate, CustomerID) {
        const body = new premiumCustomerModal(null, CustomerID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, FromDate, Todate,this.dueAmount)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Premium_Customer_Monthly_Invoice_Processing', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.isEditDate = false
                    this.ngOnInit()
                    let msg = 'Your Request has been processing'
                    this.ErrorService.handleError(msg)
                    this.dueAmount=''
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    exportPdf() {
        this.getpdf(this.from_date, this.to_date, this.CustomerID)
    }
}
