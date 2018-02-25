import { ZoneModal } from './../../front_end_models/ZoneEdit.model';
import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { GetLatLngModel } from '../../front_end_models/getLatLngModel';
declare var google: any;

@Component({
    selector: 'app-zones',
    templateUrl: "Zones.component.html",
    styleUrls: ["Zones.component.css"],

})

export class ZonesComponent implements OnInit {
    lng: any;
    lat: any;
    isdelete_zonehub: boolean;
    ZoneHubID: any;
    hubRowData: any;
    isdeleteArea: boolean;
    OnAddressHub: any;
    newHubName = ''
    HubName = ''
    OnaddHub: any;
    lat_map=17.457
    lng_map=78.154;
    address_add;
    isaddHub: boolean;
    address_new;
    zoom = 16
    Zone_Address: any;
    HubsData_Longitude: any;
    ZoneHubName: any;
    HubsData_Latitude: any;
    view_hub: number;
    isArea: boolean = true;
    AreaDataIndex: any;
    isAreaAddRow: boolean;
    NewAreaName = ''
    isareaAdd: boolean;
    HubsData: any;
    AreaData: any;
    view_active: any;
    zonesSUb = ["Areas", "Hubs", " Set Zonal Pricing"]
    ToZoneId: any;
    view: number = -1;
    activeId: number;
    ZoneName: any;
    SelecIndex = 0;
    iseditZonalPrice: boolean;
    editZonalPrice: any = [];
    cityname: any;
    Find_All_Zones_PricingData: any = [];
    Selectedcity_index: any;
    CityID: any;
    Find_city: any = [];
    CountryID: any;
    public isRequesting: boolean;
    busy1: Subscription;
    instantdelivery: any;
    hrdelivery: any;
    samedaydelivery: any;
    zoneseq: any;
    ZoneID: any;
    city: any;
    isedit_zoneRates: boolean;
    Find_All_Countries: any = [];
    url: string = '';
    constructor(private router: Router, private ngZone: NgZone,
        private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService, private ErrorService: ErrorService) { }

    ngOnInit() {
        this.All_City()
    }


    All_City() {

        let uid = this._cookieService.get('ez_cusID')
        const body1 = new ManualOrderModel(this.CountryID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Cities', body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {

                    this.Find_city = data.json().extras.CityData

                    this.CityID = data.json().extras.CityData[0].CityID
                    this.cityname = data.json().extras.CityData[0].name
                    this.Selectedcity_index = 0
                    this.Find_All_ZonesofCity()

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
    select_city(index, item) {

        this.Selectedcity_index = index
        this.CityID = item.CityID
        this.Find_All_ZonesofCity()
    }
    Find_All_ZonesofCity() {

        this.iseditZonalPrice = false
        const body1 = new ZoneModal(null, null, null, null, this.CityID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Zones_of_City', body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {

                    this.Find_All_Zones_PricingData = data.json().extras.ZoneData

                    this.isRequesting = false

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
    ZonalPrice(index, item) {

        this.isRequesting = true
        this.SelecIndex = index
        this.ZoneID = item.ZoneID
        this.ZoneName = item.ZoneName
        this.get_PriceData(item.ZoneID, this.CityID)
        this.iseditZonalPrice = true

    }
    back() {
        this.iseditZonalPrice = false
        this.isRequesting = false
        this.zonesArray(0, "Areas ")
    }
    edit_ZonePrice(instantdelivery, hrdelivery, samedaydelivery, PriceSet, item) {
        const body1 = new ZoneModal(this.ZoneID, instantdelivery, hrdelivery, samedaydelivery, null, PriceSet, item.zoneid)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/ADD_UPDATE_ZONAL_PRICING', body1, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {

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
    get_PriceData(ZoneID, CityID) {
        const body = new ZoneModal(ZoneID, null, null, null, CityID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_Individual_Zones_Pricing', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.editZonalPrice = data.json().extras.PriceData

                    this.isRequesting = false
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
    closeDetailsView() {
        this.view = -1
        this.AreaDataIndex = -1
    }
    viewAreas_Hubs(i, item) {
        this.ZoneID = item.ZoneID
        this.ZoneName = item.ZoneName
        this.view = i;
        this.zonesArray(0, "Areas ")
    }
    zonesArray(j, zonesSUb, item?, i?) {
        this.AreaDataIndex = -1
        this.view_active = j
        if (j == 0) {
            this.FindAll_areasAnd_hubs(1, '/Find_All_Zone_Area')
            this.isareaAdd = true
        } else if (j == 1) {
            this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs')
        } else if (j == 2) {
            this.ZonalPrice(i, item)
        }
    }
    FindAll_areasAnd_hubs(type: number, url) {
        const body = new ZoneModal(this.ZoneID, null, null, null)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    if (type == 1) {
                        this.isArea = true
                        this.AreaData = data.json().extras.AreaData
                    } else if (type == 2) {
                        this.isArea = false;
                        this.HubsData = data.json().extras.HubData
                        if (this.HubsData.length) {
                            this.OnselectHub(this.HubsData[0], 0)
                        }

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
    OnAddArea() {
        this.isareaAdd = false
        this.isAreaAddRow = true
    }
    OndeleteArea(item, m) {
        this.AreaDataIndex = m

        this.hubRowData = item
    }
    remove_AreaConform() {
        this.onUdateArea_Remove(this.hubRowData, '/Remove_Zone_Area', 2)
    }
    onCloseAreaDelete() {
        this.AreaDataIndex = -1
    }
    onUdateArea(item) {
        this.onUdateArea_Remove(item, '/Update_Zone_Area', 1)
    }
    onUdateArea_Remove(item, url, type) {
        const body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, item.AreaName, item.AreaID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    if (type == 1) {
                        this.isareaAdd = true
                        this.isAreaAddRow = false;
                        this.NewAreaName = ''
                        this.Find_All_ZonesofCity()
                    }
                    else if (type == 2) {
                        this.AreaData.splice(this.AreaDataIndex, 1)
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
    onsubmitArea() {

        const body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, this.NewAreaName)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Add_Zone_Area', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.AreaData.push({
                        'AreaName': this.NewAreaName
                    })
                    this.isareaAdd = true
                    this.isAreaAddRow = false;
                    this.NewAreaName = ''
                    setTimeout(() => {
                        this.FindAll_areasAnd_hubs(1, '/Find_All_Zone_Area')
                    }, 2000)
                    this.AreaDataIndex = -1

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
    OndeleteAreaRow() {
        this.isareaAdd = true
        this.isAreaAddRow = false;
        this.NewAreaName = ''
    }
    OnselectHub(HubsData, h: number) {
        this.view_hub = h
        this.ZoneHubName = HubsData.ZoneHubName
        this.ZoneHubID = HubsData.ZoneHubID
        this.HubsData_Latitude = HubsData.Latitude
        this.HubsData_Longitude = HubsData.Longitude
        this.Zone_Address = HubsData.Address

    }
    StoreAddress() {
        var autocomplete: any;
        var options = { componentRestrictions: { country: "IN" } };
        this.address_new = document.getElementById('address');
        autocomplete = new google.maps.places.Autocomplete(this.address_new, options)
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            this.ngZone.run(() => {
                this.zoom = 17;
                var place = autocomplete.getPlace();
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }
                this.Zone_Address = place.formatted_address
                this.HubsData_Latitude = place.geometry.location.lat();
                this.HubsData_Longitude = place.geometry.location.lng();
            });
        });
    }
    StoreAddress_add() {
        var autocomplete: any;
        var options = { componentRestrictions: { country: "IN" } };
        this.address_add = document.getElementById('onadd');
        autocomplete = new google.maps.places.Autocomplete(this.address_add, options)
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            this.ngZone.run(() => {
                this.zoom = 17;
                var place = autocomplete.getPlace();
                if (place.geometry === undefined || place.geometry === null) {
                    alert("place not found")
                    return;
                }
                this.OnAddressHub = place.formatted_address
                this.lat = place.geometry.location.lat();
                this.lng = place.geometry.location.lng();
            });
        });
    }

    OnaddHUb() {
        this.isaddHub = true
    }
    OncloseAddHub() {
        this.isaddHub = false
    }
    onsubmit_premiumCust(HubName) {
        const body = new GetLatLngModel(HubName)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    var address = data.json().extras.Data
                    if (address.latlong == true) {
                        this.lat=address.latitude
                        this.lng=address.longitude
                        this.OnAddressHub=HubName
                        this.Onsubmit()
                    }
                    else {
                        alert("No address Found")
                    }
                }
                else {
                    alert("No address Found")
                }
            }
            )
    }
    Onsubmit() {
        
        if (this.lat == null) {
            this.onsubmit_premiumCust(this.HubName)
        } else {
            const body = new ZoneModal(this.ZoneID, null, null, null, null, null, null, null, null, this.newHubName, this.OnAddressHub, this.lat, this.lng)
            const headers = new Headers({ 'Content-Type': 'application/json' })
            return this.http.post(this.url + '/Create_Zone_Hub', body, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.newHubName = ''
                        this.OnAddressHub = ''
                        this.lat_map = 17.1877
                        this.lng_map = 78.2554
                        this.lat=null
                        this.lng=null
                        this.OncloseAddHub()
                        this.Find_All_ZonesofCity()
                        this.view = -1
                    }
                    else {
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

    }

    onUpdate_Hub() {

        const body = new ZoneModal(null, null, null, null, null, null, null, null, null, this.ZoneHubName, this.Zone_Address, this.HubsData_Latitude, this.HubsData_Longitude, this.ZoneHubID)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Update_Zone_Hub', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {

                    setTimeout(() => {
                        this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs')
                    }, 2000)

                }
                else {
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
    onDeleteConformation() {

        this.isdelete_zonehub = true
    }
    onClose_Delete() {
        this.isdelete_zonehub = false
    }
    OnDeleteHub() {
        let uid = this._cookieService.get('ez_cusID')
        const body = new ZoneModal(null, null, null, null, null, null, null, null, null, null, null, null, null, this.ZoneHubID)

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Inactive_Remove_Zone_Hub', body, { headers: headers })

            .subscribe(
            data => {
                if (data.json().success) {

                    this.HubsData.splice(this.view_hub, 1)
                    this.isdelete_zonehub = false
                    this.FindAll_areasAnd_hubs(2, '/Find_All_Zone_Hubs')

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
}