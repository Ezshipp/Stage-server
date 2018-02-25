import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { CookieService } from 'angular2-cookie/core';


@Component({
    selector: 'app-manual_order',
    templateUrl: './manual_order.component.html',
    styleUrls: ['./manual_order.component.css']
})
export class ManualOrderComponent implements OnInit {
    public driverName;
    isdriver_name: boolean;
    mymodel: string;
    mymodel_search_driver: string;
    url = ''
    ZoneData = []
    OrderData = []
    DriverData = []
    zoneseq;
    orderId;
    DriverID;
    val; index; ZoneID;
    index_for_order;
    index_for_driver;
    this_index_for_order;
    this_index_for_driver;

    orderidss; orderindex;
    driveridss; driverindexxx;

    dirveridsel; driverindexsel;
    orderidsel; orderindexsel;

    success; issucess: boolean = false;
    constructor(private _cookieService: CookieService,
        private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _errorService: ErrorService, ) { }
    ngOnInit() {
        let uid = this._cookieService.get('ez_cusID')
        const body = new ManualOrderModel(this._cookieService.get('ez_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.ZoneData = data.json().extras.ZoneData


                    this.zoneseq = data.json().extras.ZoneData[0].zoneseq
                    this.ZoneID = data.json().extras.ZoneData[0].ZoneID
                    this.orders();
                } else {
                }
            }
            )
    }
    select(value, event) {
        this.orderidss = -1;
        this.orderindex = -1;
        this.driveridss = -1;
        this.driverindexxx = -1;
        this.orderId = null
        this.DriverID = null

        this.val = value;

        let slipfunc = this.val.split('/');

        this.zoneseq = slipfunc[0]
        this.ZoneID = slipfunc[1]


        this.orders();



    }
    zoness(i) {
        this.index = i;
    }
    orders() {
        this.val = this.zoneseq;
        let uid = this._cookieService.get('ez_cusID')
        const body = new ManualOrderModel(this.val)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Orders_Zone', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.OrderData = data.json().extras.OrderData

                    for (var i = 0; i < this.OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.OrderData[i].pickAddress
                        this.OrderData[i].pickAddress = pick.replace('Telangana', '')
                        this.OrderData[i].pickAddress = this.OrderData[i].pickAddress.replace(', India', '')

                    }
                    for (var i = 0; i < this.OrderData.length; i++) {
                        var str: string = ''
                        var pick: string = this.OrderData[i].dropAddress
                        this.OrderData[i].dropAddress = pick.replace('Telangana', '')
                        this.OrderData[i].dropAddress = this.OrderData[i].dropAddress.replace(', India', '')

                    }

                    this.drivers();
                } else {
                }
            }
            )
    }
    refresh_drivers() {
        this.drivers();
    }
    refresh_orders() {
        this.orders();
    }
    drivers() {
        let uid = this._cookieService.get('ez_cusID')
        const body = new ManualOrderModel(null, this.ZoneID)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.DriverData = data.json().extras.DriverData
                } else {
                }
            }
            )

    }
    onclickforOrderDatas(val, i) {
        this.orderidss = val;
        this.orderindex = i;

    }
    onclickforDriversDatass(valu, name, i) {
        this.driveridss = valu;
        this.driverindexxx = i;
        this.driverName = name;

    }
    ondriver_selects(i) {
        this.driverindexsel = i;
        if (this.driverindexsel == this.driverindexxx) {
            return "#12a6f1"
        }
    }
    onorder_selects(i) {
        this.orderindexsel = i;
        if (this.orderindexsel == this.orderindex) {
            return "#12a6f1"
        }
    }
    orderconfirm() {
        if (this.orderidss != null && this.driveridss != null) {
            const body = new ManualOrderModel(null, this.ZoneID, this.orderidss, this.driveridss, null, this._cookieService.get('ez_admin_cusID'))
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Manual_Ordering', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.OrderData.splice(this.orderindex, 1);
                        this.DriverData.splice(this.driverindexxx, 1);
                        this.isdriver_name = true;
                        setTimeout(() => {
                            this.isdriver_name = false;
                        }, 2000);
                    } else {
                    }
                }
                )

        } else {

        }
    }
    onErrorHandled() {
        this.issucess = false;
    }

    valuechange(newValue: string) {

        this.mymodel = newValue;

        let length = newValue.length
        if (length >= 2) {
            this.OrderData = []
            let uid = this._cookieService.get('ez_cusID')
            const body = new ManualOrderModel(this.zoneseq, null, null, null, this.mymodel)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Searching_All_Orders_Zone', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.OrderData = data.json().extras.OrderData
                    }
                }
                )
        } else {

            this.OrderData = []
            if (length == 0) {
                this.orders()
            }
        }
    }
    valuechange_search_driver(newValue: string) {
        this.mymodel_search_driver = newValue;

        let length = newValue.length
        if (length >= 2) {
            this.DriverData = []

            let uid = this._cookieService.get('ez_cusID')
            const body = new ManualOrderModel(null, this.ZoneID, null, null, this.mymodel_search_driver)
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Search_All_Drivers_of_Zones', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.DriverData = data.json().extras.DriverData
                    } else {

                    }
                }
                )
        } else {

            this.OrderData = []
            if (length == 0) {
                this.drivers()
            }
        }
    }


}