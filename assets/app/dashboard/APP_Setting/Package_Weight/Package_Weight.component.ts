import { Component, OnInit } from '@angular/core';
import { PayServiceModel } from '../../../front_end_models/payServiceModel';
import { Http, Headers } from '@angular/http';
import { ErrorService } from '../../../errors/error.service';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
@Component({
    selector: 'app-package-weight',
    templateUrl: './Package_Weight.component.html',
    styleUrls: ['./Package_Weight.component.css']
})
export class PackageWeightComponent implements OnInit {
    url: string = '';isRequesting: boolean;
    Enable_Exceeding_Weight: boolean;isConfirmation: boolean;
    Price;
    constructor(private _cookieService: CookieService,
        private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService,
        private http: Http) { }
    ngOnInit() {
        const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_Execeded_Price', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.Enable_Exceeding_Weight = data.json().extras.Enable_Exceeding_Weight
                    this.Price = data.json().extras.Price
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    enableCheck(event) {
        if (event.target.id == 'enableCheck') {
            this.Enable_Exceeding_Weight = !this.Enable_Exceeding_Weight;
        }
    }
    updatePrice() {
        const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'),null,null,null,null,null,null,this.Price)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Exceeded_Weight_Price', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    var message = 'Package Exceeded Weight Price updated Successfully';
                    this.ErrorService.handleError(message)
                    this.isRequesting = false;
                    this.ngOnInit()
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    updateEnable() {
        const body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'),null,null,null,null,null,this.Enable_Exceeding_Weight,null)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Enable_or_Disable_Exceeded_Weight', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.OncloseConfirmation();
                    this.updatePrice()
                    this.isRequesting = true;
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    OncloseConfirmation() {
        this.isConfirmation = false;
    }
    confirmation() {
        this.isConfirmation = true;
    }
}