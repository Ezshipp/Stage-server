import { AppsettingModel } from './../../../front_end_models/settingModel';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ApiMessageService } from "../../../authentication/apimessages.service";
import { ErrorService } from "../../../errors/error.service";
import { driverModel } from "../../../front_end_models/driverModel";
@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
    Same_Day_Message: any;
    Four_Hours_Message: any;
    Instant_Message: any;
    isEditsecoundRow: boolean;
    isEditFirstRow: boolean;
    finalDOJ: string;
    momentValueDOJ: any;
    finalDOB: string;
    momentValueDOB: any;
    Instant_Time: any;
    Four_Hours_Time: any;
    Same_Day_Time: any;
    Message: any;
    SettingID: any;
    SettingData: any;
    url: string = '';
    employee_data: boolean = false;
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService) { }
    ngOnInit() {
        const body = new driverModel()
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Get_Delivery_Settings', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.SettingData = data.json().extras.SettingData
                    this.SettingID = this.SettingData.SettingID
                    this.Same_Day_Time = this.SettingData.Same_Day_Time,
                        this.Four_Hours_Time = this.SettingData.Four_Hours_Time
                    this.Instant_Time = this.SettingData.Instant_Time
                    this.Instant_Message = this.SettingData.Instant_Message
                    this.Four_Hours_Message = this.SettingData.Four_Hours_Message
                    this.Same_Day_Message = this.SettingData.Same_Day_Message
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    button_click() {
        this.employee_data = true;
    }
    back_button() {
        this.employee_data = false;
    }
    public setMoment(moment: any): any {
        this.momentValueDOB = moment;
        var strDOB = this.momentValueDOB.split(' ')
        var datesDOB: string = strDOB[0];
        var final_dateDOB = datesDOB.split('-')
        this.finalDOB = final_dateDOB[2] + '/' + final_dateDOB[1] + '/' + final_dateDOB[0];
        var timeDOB = strDOB[1];
    }
    public setDateofjoining(moment: any): any {
        this.momentValueDOJ = moment;
        var strDOJ = this.momentValueDOJ.split(' ')
        var datesDOJ: string = strDOJ[0];
        var final_dateDOJ = datesDOJ.split('-')
        this.finalDOJ = final_dateDOJ[2] + '/' + final_dateDOJ[1] + '/' + final_dateDOJ[0];
        var timeDOJ = strDOJ[1];
    }
    OnEdite(Same_Day_Time) {
        this.isEditFirstRow = true
    }
    Onclose() {
        this.isEditFirstRow = false
    }
    Onsubmit_First(Same_Day_Time, Instant_Time, Four_Hours_Time) {
    }
    Onclose_secound() {
        this.isEditsecoundRow = false
    }
    OnEdit_secound() {
        this.isEditsecoundRow = true
    }
    OnEdit_messages(Same_Day_Time, Same_Day_Message, Four_Hours_Time, Four_Hours_Message, Instant_Time, Instant_Message) {
const body = new AppsettingModel(this.SettingID, this.Same_Day_Time, this.Four_Hours_Time,
            this.Instant_Time, this.Instant_Message, this.Four_Hours_Message, this.Same_Day_Message)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Delivery_Settings', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
}
