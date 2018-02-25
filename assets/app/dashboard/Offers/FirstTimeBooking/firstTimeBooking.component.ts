import { SeasonalModel } from './../../../front_end_models/seasonalModel';
import { ManualOrderModel } from './../../../front_end_models/manualorderModel';
import { FirstTime_offerModel } from './../../../front_end_models/FirstTime_OfferModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';


import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone, ChangeDetectorRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    keyframes
} from '@angular/animations';
@Component({
    selector: 'app-first_off',
    templateUrl: "firstTimeBooking.component.html",
    animations: [
        trigger('itemAnim', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate(350)
            ]),
            transition(':leave', [
                group([
                    animate('0.2s ease', style({
                        transform: 'translate(150px,25px)'
                    })),
                    animate('0.5s 0.2s ease', style({
                        opacity: 0
                    }))
                ])
            ])
        ]), trigger('itemAnim1', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate(350)
            ]),
            transition(':leave', [
                group([
                    animate('0.2s ease', style({
                        transform: 'translate(150px,25px)'
                    })),
                    animate('0.5s 0.2s ease', style({
                        opacity: 0
                    }))
                ])
            ])

        ]), trigger('focusPanel', [
            state('inactive', style({
                transform: 'scale(1)',

            })),
            state('active', style({
                transform: 'scale(1.1)',

            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ]),

        trigger('movePanel', [

            transition('void => *', [
                animate(600, keyframes([
                    style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                ]))
            ])

        ]), trigger('visibilityChanged', [
            state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
            state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
            transition('1 => 0', animate('300ms')),
            transition('0 => 1', animate('900ms'))
        ])
    ],
    styleUrls: ["firstTimeBooking.component.css"]
})

export class ViewallOffersComponent implements OnInit {
    isData: boolean;
    index_Delete: any;
    isdelete: boolean;
    isdiscount: boolean = true;

    state: string = 'inactive';
    itemAnim1
    visibility = 'shown';
    moreDetails_Offer: any = [];
    ismoredetails: boolean;
    busy_updateDetails: Subscription;
    OfferValidTo: any;
    OfferValidFrom: any;
    loading: boolean;
    busy1: Subscription;
    url_discount: string;
    url1: string = '';
    DiscountPercentage: any;
    update_offerDiscount: boolean;
    OfferID: any;
    all_zone: boolean;
    bookingType: any;
    ZoneID: string;
    update_Offer_details
    OfferType: any;
    OfferCode: any;
    ZoneData: any = [];
    zones: boolean;
    Whether_All_Zones = 'false';
    BookingType: any;
    OfferDescription: any;
    OfferName: any;
    @Input() update_Offer_Full_Details: boolean = false;

    all_offersData: any = [];
    offerType_Number: number;
    offerType: any;
    Offers_index: any;

    url: string = '';
    offers = ["First Time Offer", "Seasonal Offer", "Referral Offer", "Lottery Offer", "View All Offers"]

    constructor(private router: Router, private http: Http, private _ApiMessageService: ApiMessageService, private _cookieService: CookieService, private ErrorService: ErrorService, private _cdref: ChangeDetectorRef) { }


    ngOnInit() {
        this.offer_select(0, 'First Time Offer')

    }
    offer_select(i, item) {
        this.Offers_index = i
        this.offerType = item

        if (item == 'First Time Offer') {
            this.url1 = '/updateFirstOrderOffer'
            this.url_discount = '/Update_DiscountPercentage'
            this.offerType_Number = 1
            this.viewall_offers(this.offerType_Number)
            this.isdiscount = true
        } else if (item == 'Seasonal Offer') {
            this.offerType_Number = 2
            this.url1 = '/updateSessionalOffer'
            this.url_discount = '/Update_DiscountPercentage'
            this.viewall_offers(this.offerType_Number)
            this.isdiscount = true
        }
        else if (item == 'Referral Offer') {
            this.offerType_Number = 3
            this.url1 = '/updateReferralOffer'
            this.viewall_offers(this.offerType_Number)
            this.isdiscount = true
        }
        else if (item == 'Lottery Offer') {
            this.url1 = '/updateLotteryOffer'
            this.offerType_Number = 4
            this.viewall_offers(this.offerType_Number)
            this.isdiscount = false
        } else {
            this.offerType_Number = 0
            this.viewall_offers(this.offerType_Number)
        }


    }
    viewall_offers(offerType) {
        const body = new FirstTime_offerModel(null, null, null, null, null, null, null, offerType)
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.url + '/ViewOffersList', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.all_offersData = data.json().extras.OffersList
                    if (this.all_offersData.length > 0) {
                        this.isData = false;
                    } else {
                        this.isData = true;
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
    Edit_offer(item) {
        if (item.OfferType == 1) {
            this.url1 = '/updateFirstOrderOffer'
            this.url_discount = '/Update_DiscountPercentage'
            this.offerType_Number = 1
            this.isdiscount = true

        } else if (item.OfferType == 2) {
            this.offerType_Number = 2
            this.url1 = '/updateSessionalOffer'
            this.url_discount = '/Update_DiscountPercentage'
            this.isdiscount = true

        }
        else if (item.OfferType == 3) {
            this.url_discount = '/Update_DiscountPercentage'
            this.url1 = '/updateReferralOffer'
            this.offerType_Number = 3
            this.isdiscount = true
        }
        else if (item.OfferType == 4) {
            this.offerType_Number = 4
            this.url1 = '/updateLotteryOffer'
            this.url_discount = '/Update_DiscountPercentage'
            this.isdiscount = false
        }
        this.ismoredetails = false
        if (item.OfferType == 1) {
        } else {
        }
        if (item.OfferType == 1) {
            var OfferValidFrom: string = item.OfferValidFrom
            this.OfferValidTo = item.OfferValidTo
        } else {

            var d112: Date = new Date(item.OfferValidFrom)
            var d25: Date = new Date(item.OfferValidTo)
            this.OfferValidFrom = this.toDateString(d112)
            this.OfferValidTo = this.toDateString(d25)




        }
        this.update_Offer_Full_Details = true
        this.OfferName = item.OfferName
        this.OfferDescription = item.OfferDescription
        this.BookingType = item.BookingType
        this.OfferID = item.OfferID
        this.OfferCode = item.OfferCode
        this.OfferType = item.OfferType
        this.DiscountPercentage = item.DiscountPercentage
        var Whether_All_Zones = item.Whether_All_Zones
        if (Whether_All_Zones) {
            this.Whether_All_Zones = 'true'
            this.all_zone = true
            this.ZoneID = ''
        } else {
            this.Whether_All_Zones = 'false'
            this.Whether_All_zone_no()
            this.all_zone = false
            this.ZoneID = item.ZoneID
        }

    }
    Whether_All_zone_no() {
        this.all_zone = false
        let uid = this._cookieService.get('ez_cusID')
        const body = new ManualOrderModel(this._cookieService.get('ez_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .catch((err: Response | any) => {
                return Observable.throw(err.json());
            })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.ZoneData = data.json().extras.ZoneData

                } else {

                }
            }, (err) => {

            }
            )
    }
    updat_Offer_details() {
        this.update_Offer_details = true
        this.update_offerDiscount = false
    }
   
    onClose_updateOffer() {

        this.update_Offer_Full_Details = false
    }
    Whether_All_zone() {
        this.all_zone = true
        this.ZoneID = ''
    }
    valuechange_bookingType(value) {
        this.BookingType = value


    }
    valuechange(value) {
        this.ZoneID = value

    }
    updat_OfferDiscount() {
        this.update_Offer_details = false
        this.update_offerDiscount = true
    }
    onSubmit_OfferDiscount_Details(form: NgForm) {
        const body = new FirstTime_offerModel(null, null, null, null, null, null, form.value.Discount, null, null, null, this.OfferID, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        this.busy1 = this.http.post(this.url + this.url_discount, body, { headers: headers })
            .subscribe((data => {

                if (data.json().success) {

                    this.loading = true

                    setTimeout(() => {
                        this.update_Offer_Full_Details = false
                        this.viewall_offers(this.offerType_Number)

                    }, 4000)


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

            ))
    }
    onSubmit_Add_Details(form: NgForm) {
        var offer_code: string = form.value.OfferCode
        offer_code = offer_code.toUpperCase()
        if (this.offerType_Number !== 1) {
            var d1: string = form.value.OfferValidFrom
            var date_From = d1.split('T')
            var Final_date_from = date_From[0] + ',' + date_From[1]
            var d2: string = form.value.OfferValidTo
            var date_to = d2.split('T')
            var Final_date_To = date_to[0] + ',' + date_to[1]
        }


        const body = new SeasonalModel(this.OfferID, this.offerType_Number, form.value.Offer_name, form.value.OfferDescription, offer_code, this.all_zone, this.ZoneID, this.BookingType, Final_date_from, Final_date_To, this._cookieService.get('ez_admin_cusID'))

        const headers = new Headers({ 'Content-Type': 'application/json' })
        this.busy_updateDetails = this.http.post(this.url + this.url1, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    setTimeout(() => {
                        this.update_Offer_Full_Details = false
                        this.viewall_offers(this.offerType_Number)
                    }, 4000)
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
    More_offer(item) {
        this.OfferName = item.OfferName
        this.OfferID = item.OfferID
        this.ismoredetails = true
        this.update_Offer_Full_Details = false
        const body = new SeasonalModel(this.OfferID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/viewOfferByOfferID', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.moreDetails_Offer = data.json().extras.OfferData
                    this.OfferName = this.moreDetails_Offer.OfferName
                    this.OfferDescription = this.moreDetails_Offer.OfferDescription
                    this.OfferCode = this.moreDetails_Offer.OfferCode
                    this.DiscountPercentage = this.moreDetails_Offer.DiscountPercentage

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
    CloseMoreDetails() {
        this.ismoredetails = false
    }
    toggleMove() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }
    private toDateString(date: Date): string {

        return (date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2))
            + 'T' + date.toTimeString().slice(0, 5);
    }
    Delete(item, i) {
        this.isdelete = true

        this.OfferName = item.OfferName
        this.OfferID = item.OfferID
        this.index_Delete = i
    }
    delete_Final() {
        const body = new SeasonalModel(this.OfferID, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_admin_cusID'))
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Inactivate_Offer', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.all_offersData.splice(this.index_Delete, 1)
                    this.isdelete = false
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
    onClose_Delete() {
        this.isdelete = false


    }
}