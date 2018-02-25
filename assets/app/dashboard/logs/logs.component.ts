import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from '../../errors/error.service';
import { OrdersModel_admin } from '../../front_end_models/OrdersModel';

@Component({

    selector: 'logs',
    templateUrl: 'logs.component.html',
    styleUrls: ['logs.component.css']
})
export class LogsComponent implements OnInit {
    currentPage: number = 1;
    skip_value: number;
    isRequesting: boolean;
    index: number = 0;
    TotalLogsCount: any;
    LogData: any = [];
    url: string = '';
    constructor(private router: Router,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef,
        private _fb: FormBuilder) { }
    public ngOnInit(): void {
        this.getLogs()
    }

    getLogs() {

        let uid = this._cookieService.get('ez_cusID')
        const body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/All_Super_Admin_Logs', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {

                    this.LogData = data.json().extras.LogData

                    /* pagination*/
                    this.TotalLogsCount = data.json().extras.Count
                    let count: number = parseInt(data.json().extras.Count)
                    let count1: number = Math.floor(count / 10);
                    let count2 = count % 10


                    /* completed*/
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
    pageChanged_Logs(event: number) {
        this.currentPage = event
        this.nextpage_orders(this.currentPage - 1)
    }
    nextpage_orders(index) {
        this.isRequesting = true
        this.index = index;
        let skip_value = this.index * 10
        let empid = this._cookieService.get('EmployeeID')
        const body1 = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
        const body = JSON.stringify(body1)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/All_Super_Admin_Logs', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {

                    this.isRequesting = false
                    this.LogData = data.json().extras.LogData
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }



}
