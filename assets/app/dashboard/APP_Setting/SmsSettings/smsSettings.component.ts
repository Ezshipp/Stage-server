import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { driverModel } from '../../../front_end_models/driverModel';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settingssms',
    templateUrl: './smsSettings.component.html',
    styleUrls: ['./smsSettings.component.css']
})
export class SmsSettingsComponent implements OnInit {
    isconfirmation: boolean;
    ProviderID: any;
    ProvidersData: any = [];
    url: string = '';
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService) { }

    ngOnInit() {
        const body = new driverModel()

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Listing_All_SMS_Providers', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {

                    this.ProvidersData = data.json().extras.ProviderData



                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    Onselect_MsgProvider(item){
     this.ProviderID=item.ProviderID
    }
    onSub(){
        this.isconfirmation=true
    }
    onCloseConfirmation(){
        this.isconfirmation=false
    }
    onSubmit(){

        const body = new driverModel(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.ProviderID)

                const headers = new Headers({ 'Content-Type': 'application/json' });
                return this.http.post(this.url + '/Change_Service_Provider', body, { headers: headers })
                    .subscribe(data => {
                        if (data.json().success) {

                            this.ngOnInit()
                            let message="service provided sucessfully"
                            this.ErrorService.handleError(message)
                            this.isconfirmation=false

                        } else {
                            const msgNumber: number = parseInt(data.json().extras.msg);
                            let message = this._ApiMessageService.ApiMessages[msgNumber]
                            this.ErrorService.handleError(message)
                        }
                    })

    }
}