import { ExpiredJobsModel } from '../../front_end_models/expiredModel';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../errors/error.service';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-delivey',
    templateUrl: './o.DeliveryReport.component.html',
    styleUrls: ['./o.DeliveryReport.component.css']
})
export class O_DeliveryReportComponent implements OnInit {
    btn_Text:string='Export Data'
    excellData: any=[];
    IsAsc: boolean;
    valu: any;
    activeId: number
    sortOptions: any=null;
    limit: number = 10;
    skip: number = 0;
    Total_Count: any;
    url: string = '';
    isRequesting: boolean;
    p: number = 1;
    completedOrders_Data: any = [];
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }

    ngOnInit() {
        this.getCompeted_Orders(1, '/Completed_Order_Delivery_Reports')
    }
    getCompeted_Orders(type: number, url: string, searchValue?) {
        this.isRequesting = true
        const body = new ExpiredJobsModel(null, this.skip, this.limit, searchValue, this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    if (type == 1) {
                        this.p = 1
                        // this.isSearch=false
                        this.completedOrders_Data = data.json().extras.OrderData



                        this.Total_Count = data.json().extras.Count

                    } else if (type == 2) {
                        this.isRequesting = false
                        this.completedOrders_Data = data.json().extras.OrderData

                    }
                   


                }
                else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    this.isRequesting = false
                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')

                    }
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    pageChanged(event: number) {

        this.p = event
        var p = this.p - 1
        this.isRequesting = true
        let skip_value = p * this.limit
        this.skip = skip_value
        this.isRequesting = true
        this.getCompeted_Orders(2, '/Completed_Order_Delivery_Reports')
    }
    OnselectCount(event) {
        this.limit = event.target.value

        this.skip = 0
        this.ngOnInit()
        this.p = 1
    }
    sortColumn(key) {


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
        this.sortOptions[key] = sort

        this.ngOnInit()


        this.p = 1


    }
    OnExcel_Download(){
        this.btn_Text='downloading ..'
   
        this.getPromotional_Excel(0)

    }
    getPromotional_Excel(skip){
        var sortoptions={
            orderseqId:-1
        }
        // this.isRequesting = true
        const body = new ExpiredJobsModel(null, skip, 50, null, sortoptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
       
        return this.http.post(this.url +'/Completed_Order_Delivery_Reports', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    let resultdata: any = []
                    resultdata = data.json().extras.OrderData
                   
                    if (resultdata.length == 0) {
                       
                     
                        this.btn_Text='Export data'
                        var csvData = this.ErrorService.ConvertToCSV(this.excellData)
                        var a = document.createElement("a");
                        a.setAttribute('style', 'display:none;');
                        document.body.appendChild(a);
                        var blob = new Blob([csvData], { type: 'text/csv' });
                        var url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = 'DeliveryReport.csv';
                        a.click();

                        return 'success';
                    }
                    else {
                    
                        skip = skip + resultdata.length
                      
                        Array.prototype.push.apply(this.excellData, resultdata);
                        this.getPromotional_Excel(skip)

                    }
                }
                else {
                    this.isRequesting = false
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    this.isRequesting = false
                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')

                    }
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }



}