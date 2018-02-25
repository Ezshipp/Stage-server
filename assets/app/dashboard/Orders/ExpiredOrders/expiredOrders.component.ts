import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ExpiredJobsModel } from '../../../front_end_models/expiredModel';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-expired',
    templateUrl: './expiredOrders.component.html',
    styleUrls: ['./expiredOrders.component.css']
})
export class ExpiredOrdersComponent implements OnInit {
    sortOptions: {};
    isSearch: boolean;
    isRequesting: boolean;
    p: number = 1;
    views: number;
    valu: any;
    IsAsc: boolean;
    activeId: number
    mymodel
    Total_Count: number;
    ExpiredJobsData_json: any = [];
    ExpiredJobsData: any = [];
    url: string = '';
    JobType = 2
    skip = 0;
    limit = 10;
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }

    ngOnInit() {
        this.getExpiredJobs(1, '/Find_All_Orders_Ezshipp')
    }
    getExpiredJobs(type: number, url: string, searchValue?) {

        const body = new ExpiredJobsModel(this.JobType, this.skip, this.limit, searchValue,this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    if (type == 1) {
                        this.p=1
                        this.isSearch=false
                        this.ExpiredJobsData = data.json().extras.OrderData
                        this.ExpiredJobsData_json = data.json().extras.OrderData

                        for (var i = 0; i < this.ExpiredJobsData.length; i++) {
                            var str: string = ''
                            var pick: string = this.ExpiredJobsData[i].pickAddress
                            this.ExpiredJobsData[i].pickAddress = pick.replace('Telangana', '')
                            this.ExpiredJobsData[i].pickAddress = this.ExpiredJobsData[i].pickAddress.replace(', India', '')
                        }
                        for (var i = 0; i < this.ExpiredJobsData.length; i++) {
                            var str: string = ''
                            var pick: string = this.ExpiredJobsData[i].dropAddress
                            this.ExpiredJobsData[i].dropAddress = pick.replace('Telangana', '')
                            this.ExpiredJobsData[i].dropAddress = this.ExpiredJobsData[i].dropAddress.replace(', India', '')
                        }
                        this.Total_Count = data.json().extras.Count

                    } else if (type == 2) {
                        this.ExpiredJobsData = data.json().extras.OrderData
                        this.ExpiredJobsData_json = data.json().extras.OrderData
                    } else if (type == 3) {
                        setTimeout(()=>{
                            this.ExpiredJobsData = data.json().extras.OrderData
                            if(this.ExpiredJobsData.length==0){
                                this.isSearch=false
                            }
                        },2000)
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
        this.views=null
        this.p = event
        var p = this.p - 1
        this.isRequesting = true
        let skip_value = p * this.limit
        this.skip = skip_value
        this.isRequesting = true
        this.getExpiredJobs(2, '/Find_All_Orders_Ezshipp')
    }
    edit(item, i: number) {
        this.views = i
    }
    close() {
        this.views = -1
    }
    sortColumn(key) {
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


    OnselectCount(event) {
        this.limit = event.target.value

        this.skip = 0
        this.ngOnInit()
        this.p = 1
    }
    valuechange(value: string) {
        this.views=null
        this.mymodel = value;
        let length = value.length
       setTimeout(()=>{

        if (length >= 3) {
            this.isSearch=true
            this.activeId=null
            this.ExpiredJobsData = []
            this.isRequesting = true
            this.getExpiredJobs(3, '/Search_All_Orders_Ezshipp',this.mymodel)
        }
        else{
            this.activeId=null
            this.skip=0
            this.ngOnInit()
        }
       },2000)

    }

}