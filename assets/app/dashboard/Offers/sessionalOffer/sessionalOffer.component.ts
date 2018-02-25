import { FirstTime_offerModel } from './../../../front_end_models/FirstTime_OfferModel';
import { ManualOrderModel } from './../../../front_end_models/manualorderModel';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Component({
    selector: 'app-sessional',
    templateUrl: "sessionalOffer.component.html",
    styleUrls:["sessionalOffer.component.css"]
})
export class CreateOfferComponent implements OnInit {
    isdiscount: boolean=true;
    url_offer_router: string;
    offerType_Number: number = 1;
    offerType: string = 'First Time Offer';
    Offers_index=0;
    today;
      bookingType: any='1';
    Zoneid: any;
    zones: boolean=true;
    ZoneData: any = [];
    url: string = '';
    zones1:string='true'
    maxIncidentDescriptionLength=120
    offers=["First Time Offer","Seasonal Offer","Referral Offer","Lottery Offer"]
    constructor(private router: Router, private http: Http, private _ApiMessageService: ApiMessageService, private _cookieService: CookieService,
    private ErrorService: ErrorService,
    private _cdref:ChangeDetectorRef) { }
    ngOnInit() {
        this.Whether_All_zone()
        this.offer_select(0,'First Time Offer')
     }
 Whether_All_zone_no(){
        this.zones=false
     let uid = this._cookieService.get('ez_cusID')
         const body = new ManualOrderModel(this._cookieService.get('ez_cusID'))
          const headers = new Headers({ 'Content-Type': 'application/json' })
         return this.http.post(this.url+'/Find_All_Zones',body,{ headers: headers })
         .catch((err: Response|any)=>{
          return Observable.throw(err.json());
            })
         .subscribe(
             data=>{
                 if(data.json().success){
                    this.ZoneData=data.json().extras.ZoneData
                 }else{
                 }
             }, (err)=>{
            }
         )
    }
    Whether_All_zone(){
         this.zones=true
         this.Zoneid=''
    }
    valuechange(value){
        this.Zoneid=value
    }
    valuechange_bookingType(value){
        this.bookingType=value
    }
    onSubmit_First_Offer(form:NgForm){
        var offer_code:string=form.value.Offer_code
        offer_code=offer_code.toUpperCase()
        if(this.offerType_Number==1){
            const body = new FirstTime_offerModel(form.value.Offer_name,form.value.Offer_Desc,offer_code,this.zones,this.Zoneid,this.bookingType,form.value.Discount,2,Final_date_from,Final_date_To,null,this._cookieService.get('ez_admin_cusID'))
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + this.url_offer_router, body, { headers: headers })
            .subscribe(
                data => {
                        if (data.json().success) {
                             
                                this.offer_select(this.Offers_index,this.offerType)
                             
                                form.controls['Offer_name'].reset()
                                form.controls['Offer_Desc'].reset()
                                form.controls['Offer_date'].reset()
                                form.controls['Offer_date_exp'].reset()
                               
                                form.controls['Offer_code'].reset()
                                let message ="Register sucessfully"
                                this.bookingType='1'
                                this.ErrorService.handleError(message)
                                this._cdref.detectChanges()
                        } else{
                                const msgNumber: number = parseInt(data.json().extras.msg);
                                form.resetForm()
                                this._cdref.detectChanges()
                                this.bookingType='1'
                                if(msgNumber==21){
                                this._cookieService.remove('ez_cusID')
                                this.router.navigate(['/signissssn']);
                                }
                                let message = this._ApiMessageService.ApiMessages[msgNumber]
                                this.ErrorService.handleError(message)

                        }
            }
            )
        }else{
            this.today=new Date()
            var startdat=new Date(form.value.Offer_date)
            var endDate=new Date(form.value.Offer_date_exp)
                if(startdat<=endDate){
                    var d1:string = form.value.Offer_date
                    var date_From=d1.split('T')
                    var Final_date_from=date_From[0]+','+date_From[1]
                    var d2:string=form.value.Offer_date_exp
                    var date_to=d2.split('T')
                    var Final_date_To=date_to[0]+','+date_to[1]
                    const body1 = new FirstTime_offerModel(form.value.Offer_name,form.value.Offer_Desc,offer_code,this.zones,this.Zoneid,this.bookingType,form.value.Discount,2,Final_date_from,Final_date_To,null,this._cookieService.get('ez_admin_cusID'))
                    const headers = new Headers({ 'Content-Type': 'application/json' });
                    return this.http.post(this.url + this.url_offer_router, body1, { headers: headers })
                    .subscribe(
                        data => {
                                if (data.json().success) {
                                form.controls['Offer_name'].reset()
                                form.controls['Offer_Desc'].reset()
                                form.controls['Offer_date'].reset()
                                form.controls['Offer_date_exp'].reset()
                                form.controls['Discount'].reset()
                                form.controls['Offer_code'].reset()
                                this.offer_select(this.Offers_index,this.offerType)
                                 
                                    let message ="Register sucessfully"
                                    this.ErrorService.handleError(message)
                                    this._cdref.detectChanges()
                                } else{
                                        const msgNumber: number = parseInt(data.json().extras.msg);
                                        form.resetForm()
                                        this.bookingType='1'
                                        if(msgNumber==21){
                                            this._cookieService.remove('ez_cusID')
                                            this.router.navigate(['/signissssn']);
                                        }
                                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                                        this.ErrorService.handleError(message)

                                }
                        }
                    )
                }else{
                    let message = "From date must be greater than todate"
                    this.ErrorService.handleError(message)
                }

    }

    }
    offer_select(i,item){
        this.Offers_index=i
        this.offerType=item
        if(item=='First Time Offer'){
            this.zones1='true'
            this.offerType_Number=1
            this.url_offer_router='/createFisrtOrderOffer'
            this.isdiscount=true
        }else if(item=='Seasonal Offer'){
             this.zones1='true'
             this.offerType_Number=2
             this.url_offer_router='/createSessionalOffer'
             this.isdiscount=true
        }
        else if(item=='Referral Offer'){
             this.zones1='true'
             this.url_offer_router='/createReferralOffer'
             this.offerType_Number=3
             this.isdiscount=true
        }
        else if(item=='Lottery Offer'){
             this.zones1='true'
             this.offerType_Number=4
             this.url_offer_router='/createLotteryOffer'
             this.isdiscount=false
        }
    }
}