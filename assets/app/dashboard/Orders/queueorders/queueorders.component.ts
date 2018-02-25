import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { OrdersModel_admin } from '../../../front_end_models/OrdersModel';
import { QueueModel } from '../../../front_end_models/queueModel';

@Component({
    selector: 'app-queueorders',
    templateUrl: './queueorders.component.html',
    styleUrls: ['./queueorders.component.css']
})

export class QueueordersComponent implements OnInit {
    finalConfirmDriver: boolean;
    DirectionData: any[] = [];
    isRecordsView: boolean;
    activeDirectionAssin: number;
    issucessDriver_Assign: boolean;
    isAssignDriver: boolean;
    Driver_Name: any;
    DriverID: any;
    DriverData: any;
    RecordData: any = [];
    QueueID: any;
    Direction_Number: any;
    No_Of_Directions: any = []; activeDirection: number = 1;
    index: any;
    QueueData_json: any = [];
    issearch: boolean;
    isData: boolean;
    QueueData: any = [];
    Total_Count: any;
    url: string = '';
    isRequesting: boolean;
    limit: number = 10; p: number = 1; skip_value: number = 0;
    array: any = [];
    views: any;
    activeId: number; IsAsc: boolean; valu: any;
    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }

    ngOnInit() {

        this.isRequesting = true
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Queue_Orders_Listing', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.QueueData = data.json().extras.QueueData
                    this.QueueData_json = data.json().extras.QueueData
                    this.Total_Count = data.json().extras.Count

                    if (!this.QueueData.length) {

                        this.isData = true;
                    } else {
                        this.issearch = false
                        this.isData = false;
                    }
                    let count: number = parseInt(data.json().extras.Count)
                    let count1: number = Math.floor(count / 10);

                    let count2 = count % 10
                    if (count2 == 0) {
                        this.array.length = count1
                    } else {
                        this.array.length = count1 + 1
                    }


                } else {
                    this.isRequesting = false;
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
    sortColumn(key) {
        this.IsAsc = !this.IsAsc
        this.valu = key
        this.sortResults(this.valu, this.IsAsc);
    }
    sortColumn_date(key) {
        this.IsAsc = !this.IsAsc
        this.sortResults_date(key, this.IsAsc)
    }
    sortResults(prop, asc) {
        this.QueueData = this.QueueData_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        return this.QueueData
    }
    sortResults_date(prop, asc) {
        this.QueueData = this.QueueData_json.sort(function (a, b) {
            if (asc) {
                var from = new Date(a[prop]).getTime()
                var to = new Date(b[prop]).getTime()
                return from - to
            } else {
                return to - from
            }
        });
        if (asc) {
            return this.QueueData
        } else {
            return this.QueueData.reverse()
        }
    }
    pageChanged(event) {
        this.p = event
        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true
        this.index = index;

        let skip_value = this.index * this.limit
        let empid = this._cookieService.get('EmployeeID')
        const result_table_data = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit)

        const body = JSON.stringify(result_table_data)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Queue_Orders_Listing', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false
                    this.issearch = false
                    this.QueueData = data.json().extras.QueueData
                    this.QueueData_json = data.json().extras.QueueData
                    this.skip_value = this.index * this.limit
                } else {
                    this.isRequesting = false;
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    OnmoreInfo_order(item, i) {
        this.views = i;
        this.No_Of_Directions.length = item.No_Of_Directions
        this.getDirectionOrder(item, 0);

    }
   
    close() {
        this.views = -1;
    }
    getDirectionOrder(item, j) {
        this.QueueID = item.QueueID
        this.Direction_Number = j + 1
        this.getOrdres(this.QueueID, this.Direction_Number, 1, '/Find_Direction_Order');
        this.activeDirectionAssin = -1
        this.isRecordsView = true
    }
    getOrdres(QueueID, Direction_Number?, type?: number, url?, QueiD_Direction?) {
        this.RecordData = []
        const body = new QueueModel(QueueID, Direction_Number)

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    if (type == 1) {
                        this.RecordData = data.json().extras.DirectionData.RecordData

                    }
                    else if (type == 2) {
                        this.DirectionData = data.json().extras.DirectionData
                       
                    }

                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }

    FindAll_Drivers() {
        const body = new OrdersModel_admin()
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.DriverData = data.json().extras.DriverData
                    this.DriverID = this.DriverData[0].DriverID
                    this.Driver_Name = this.DriverData[0].name

                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')
                        this.router.navigate(['/signissssn']);
                    }
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    onAssign_Driver() {
        this.activeDirection = -1
        this.activeDirectionAssin = 1
        this.RecordData = []
        this.isRecordsView = false
        this.getOrdres(this.QueueID, null, 2, '/Get_All_Queue_Directions')
    }
    onCloseDriverAssign() {
        this.isAssignDriver = false
    }
    select_Driver(name, driverid) {
        this.DriverID = driverid
        this.Driver_Name = name
        this.finalConfirmDriver = true;
        this.isAssignDriver = false;
    }
    onCloseDriverConfirm() {
        this.finalConfirmDriver = false;
        this.isAssignDriver = true;
    }
    selectDriver(itemDirc) {
        this.Direction_Number = itemDirc.Direction_No
        this.isAssignDriver = true;
        this.FindAll_Drivers()
    }
    onSubmitDriver() {

        const body = new QueueModel(this.QueueID, this.Direction_Number, this.DriverID, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Queue_Direction_Order_Place', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.issucessDriver_Assign = true
                  
                    this.finalConfirmDriver = false;
                    let message = "Driver Assign sucessfully"
                    this.ErrorService.handleError(message)
                    this.isAssignDriver = false
                    this.views = -1

                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')
                        this.router.navigate(['/signissssn']);
                    }
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }


}