import { MapsAPILoader } from 'angular2-google-maps/core';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { premiumCustomerModal } from './../../../../front_end_models/premiumCustomerModal';
import { Http, Headers } from '@angular/http';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { GetLatLngModel } from '../../../../front_end_models/getLatLngModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
declare var google: any;
@Component({
  selector: 'app-registerPremiumCustomer',
  templateUrl: './registerPremiumCustomer.component.html',
  styleUrls: ['./registerPremiumCustomer.component.css']
})
export class RegisterPremiumCustomerComponent implements OnInit {

  Phone: any;
  CustomerName: any;
  flatPrice: string = ''
  flatS: string = 'false';
  isFlat: boolean = false;
  isFlatPrice: boolean;
  lng;
  lat: any;
  lat_map = 17.2587
  lng_map = 78.52454
  pickAddress: any;
  zoom: number = 8;
  inputAddress;
  Premium_4hours_Pricing: string = '';
  Premium_Same_Day_Pricing: string = '';
  Premium_Instant_Pricing: string = '';
  Premium_4hours_Pricing_discount: string = '';
  Premium_Same_Day_Pricing_discount: string = '';
  Premium_Instant_Pricing_discount: string = '';
  Premium_min_ordercount:number = 100;
  Default_Pickup_Address
  Monthly_Invoice: boolean;
  ispickup: boolean;
  DefalutPick: any;
  pricingValue: any;
  MonthlyInvoice;
  isPriceSet_Boolean: boolean = false;
  premiumCustomer: boolean = false;
  ispremiumCustomer: boolean = true;
  Status: any;
  CustomerID: any;
  index;
  url: string = '';
  CustomerData: any = [];
  array: any = [];
  skip_value: number;
  mymodel: string;
  constructor(private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _loader: MapsAPILoader,
    private ngZone: NgZone,
    private _errorService: ErrorService, private mapsAPILoader: MapsAPILoader, ) { }
  ngOnInit() {
    // this.autocomplete()
  }
  valuechange(newValue: string) {
    this.mymodel = newValue;
    let length = newValue.length
    if (length >= 3) {
      this.CustomerData = []
      this.array = []
      this.skip_value = 0
      const body1 = new premiumCustomerModal(this.mymodel)
      setTimeout(() => {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Search_All_Active_Customers', body1, { headers: headers })
          .debounceTime(500)

          .subscribe(
          data => {

            if (data.json().success) {
              let resultdata = []
              this.array.length = 0
              setTimeout(() => {
                this.CustomerData = data.json().extras.CustomerData
                this.ispremiumCustomer = true
                this.array.length = 0
              }, 1000)

            }
          }
          )
      }, 1000)

    } else {
      this.CustomerData = []
      this.ngOnInit()
      this.array.length = 0
      this.index = 0
    }
  }
  checkPremium_Click(item) {
    this.CustomerID = item.CustomerID
    const body1 = new premiumCustomerModal(null, this.CustomerID)
    this.CustomerName = item.First_name
    this.Phone = item.Phone
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Check_Whether_Customer_Premium', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.Status = data.json().extras.Status
          this.ispremiumCustomer = false;
          this.premiumCustomer = true;
          this.OnPriceingSet('pricesetTrue')
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this._errorService.handleError(message)
        }
      }
      )
  }
  OnPriceingSet(value) {
    this.OnMonthlyInvoice('true')
    this.OnDefaultPickup('true')
    this.pricingValue = value
    if (value == 'pricesetTrue') {
      this.isPriceSet_Boolean = true
    } else {
      this.isPriceSet_Boolean = false
    }
  }
  OnMonthlyInvoice(value) {
    this.MonthlyInvoice = value
    if (value == 'true') {
      this.isFlatPrice = true
      this.isFlat = true
      this.flatS = 'true'
      this.Monthly_Invoice = true
    } else {
      this.isFlatPrice = false
      this.isFlat = false;
      this.flatPrice = ''
      this.flatS = 'false'
      this.Monthly_Invoice = false
    }
  }
  OnDefaultPickup(value) {
    this.DefalutPick = value
    if (value == 'true') {
      this.ispickup = true
    }
    else {
      this.ispickup = false
    }
  }
  onsubmit_premiumCust() {
    const body = new GetLatLngModel(this.Default_Pickup_Address)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          var address = data.json().extras.Data

          if (address.latlong == true) {
            console.log((address.latitude))
            this.onsubmit(address.latitude, address.longitude)
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

  onsubmit(lat, lng) {
    if (this.isPriceSet_Boolean) {
      if (this.Premium_4hours_Pricing.length > 0 && this.Premium_Instant_Pricing.length > 0 && this.Premium_Same_Day_Pricing.length > 0 && this.Premium_4hours_Pricing_discount.length > 0 && this.Premium_Instant_Pricing_discount.length > 0 && this.Premium_Same_Day_Pricing_discount.length > 0) {
        if (this.isFlat) {
          if (this.flatPrice.length > 0) {
            const body1 = new premiumCustomerModal(null,
              this.CustomerID, null,
               this.isPriceSet_Boolean,
                this.Monthly_Invoice,
                this.ispickup,
                 this.Premium_Instant_Pricing,
               this.Premium_Same_Day_Pricing,
                this.Premium_4hours_Pricing,
               this.Premium_Instant_Pricing_discount,
                this.Premium_Same_Day_Pricing_discount,
                this.Premium_4hours_Pricing_discount,
                 this.Premium_min_ordercount,
                  this.Default_Pickup_Address, lat, lng, this.isFlat, this.flatPrice)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
              .subscribe(
              data => {
                if (data.json().success) {
                  this.Status = data.json().extras.Status
                  let msg = "Register Sucessfully"
                  this._errorService.handleError(msg)
                  this.ispickup = false
                  this.pickAddress = ''
                  this.Premium_Instant_Pricing=''
               this.Premium_Same_Day_Pricing=''
                this.Premium_4hours_Pricing=''
               this.Premium_Instant_Pricing_discount=''
                this.Premium_Same_Day_Pricing_discount=''
                this.Premium_4hours_Pricing_discount=''
                 this.Premium_min_ordercount=100
                  this.premiumCustomer = false
                  this.flatPrice = ''
                  this.isFlat = false
                  this.mymodel = ''
                } else {
                  const msgNumber: number = parseInt(data.json().extras.msg);
                  let message = this._ApiMessageService.ApiMessages[msgNumber]
                  this._errorService.handleError(message)
                }
              }
              )
          }
          else {
            alert("Please set Flat Price")
          }
        } else {
          this.flatPrice = ''
          const body1 = new premiumCustomerModal(null,
             this.CustomerID, null,
             this.isPriceSet_Boolean,
              this.Monthly_Invoice,
               this.ispickup,
               this.Premium_Instant_Pricing,
               this.Premium_Same_Day_Pricing,
                this.Premium_4hours_Pricing,
               this.Premium_Instant_Pricing_discount,
                this.Premium_Same_Day_Pricing_discount,
                this.Premium_4hours_Pricing_discount,
                 this.Premium_min_ordercount,
                this.pickAddress, lat, lng, this.isFlat, this.flatPrice)
          const headers = new Headers({ 'Content-Type': 'application/json' });
          return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
            .subscribe(
            data => {
              if (data.json().success) {
                this.Status = data.json().extras.Status
                let msg = "Register Sucessfully"
                this._errorService.handleError(msg)
                this.ispickup = false
                this.pickAddress = ''
                 this.Premium_Instant_Pricing =''
               this.Premium_Same_Day_Pricing =''
                this.Premium_4hours_Pricing =''
               this.Premium_Instant_Pricing_discount=''
                this.Premium_Same_Day_Pricing_discount=''
                this.Premium_4hours_Pricing_discount= ''
                 this.Premium_min_ordercount= 100
              
                this.premiumCustomer = false
                this.flatPrice = ''
                this.isFlat = false
                this.mymodel = ''
              } else {
                const msgNumber: number = parseInt(data.json().extras.msg);
                let message = this._ApiMessageService.ApiMessages[msgNumber]
                this._errorService.handleError(message)
              }
            }
            )
        }
      } else {
        alert("Please set premium Price")
      }
    } else {
      if (this.isFlat) {
        if (this.flatPrice.length > 0) {
          const body1 = new premiumCustomerModal(null,
            this.CustomerID, null,
             this.isPriceSet_Boolean,
              this.Monthly_Invoice, this.ispickup,
                this.Premium_Instant_Pricing,
               this.Premium_Same_Day_Pricing,
                this.Premium_4hours_Pricing,
               this.Premium_Instant_Pricing_discount,
                this.Premium_Same_Day_Pricing_discount,
                this.Premium_4hours_Pricing_discount,
                 this.Premium_min_ordercount,
                  this.pickAddress,
                 lat,
                 lng,
                 this.isFlat, this.flatPrice)
          const headers = new Headers({ 'Content-Type': 'application/json' });
          return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
            .subscribe(
            data => {
              if (data.json().success) {
                this.Status = data.json().extras.Status
                let msg = "Register Sucessfully"
                this._errorService.handleError(msg)
                this.ispickup = false
                this.pickAddress = ''
                 this.Premium_Instant_Pricing= ''
               this.Premium_Same_Day_Pricing = ''
                this.Premium_4hours_Pricing = ''
               this.Premium_Instant_Pricing_discount =''
                this.Premium_Same_Day_Pricing_discount ='' 
                this.Premium_4hours_Pricing_discount = ''
                 this.Premium_min_ordercount = 100
              
                this.premiumCustomer = false
                this.flatPrice = ''
                this.isFlat = false
                this.mymodel = ''
              } else {
                const msgNumber: number = parseInt(data.json().extras.msg);
                let message = this._ApiMessageService.ApiMessages[msgNumber]
                this._errorService.handleError(message)
              }
            }
            )
        } else {
          alert("Please set Flat Price")
        }
      } else {
        this.flatPrice = ''
        const body1 = new premiumCustomerModal(null,
          this.CustomerID, null,
           this.isPriceSet_Boolean,
           this.Monthly_Invoice, this.ispickup,
           this.Premium_Instant_Pricing,
               this.Premium_Same_Day_Pricing,
                this.Premium_4hours_Pricing,
               this.Premium_Instant_Pricing_discount,
                this.Premium_Same_Day_Pricing_discount,
                this.Premium_4hours_Pricing_discount,
                 this.Premium_min_ordercount,
             this.pickAddress, lat, lng, this.isFlat, this.flatPrice)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Create_Premium_User', body1, { headers: headers })
          .subscribe(
          data => {
            if (data.json().success) {
              this.Status = data.json().extras.Status
              let msg = "Register Sucessfully"
              this._errorService.handleError(msg)
              this.ispickup = false
              this.pickAddress = ''
              this.Premium_Instant_Pricing=''
               this.Premium_Same_Day_Pricing=''
                this.Premium_4hours_Pricing=''
               this.Premium_Instant_Pricing_discount=''
                this.Premium_Same_Day_Pricing_discount=''
                this.Premium_4hours_Pricing_discount=''
                 this.Premium_min_ordercount=100
              
              this.premiumCustomer = false
              this.flatPrice = ''
              this.isFlat = false
              this.mymodel = ''
            } else {
              const msgNumber: number = parseInt(data.json().extras.msg);
              let message = this._ApiMessageService.ApiMessages[msgNumber]
              this._errorService.handleError(message)
            }
          }
          )
      }
    }
  }
  autocomplete() {
    var autocomplete: any;
    var options = { componentRestrictions: { country: "IN" } };
    this.inputAddress = document.getElementById('autocompleteInput');
    autocomplete = new google.maps.places.Autocomplete(this.inputAddress, options)
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.ngZone.run(() => {
        this.zoom = 17;
        var place = autocomplete.getPlace();
        this.pickAddress = place.name + ',' + place.formatted_address
        var plac = place.name + ','
        var address = place.formatted_address.indexOf(plac)
        if (address == 0) {
          this.pickAddress = place.formatted_address.replace(plac, plac)
        } else {
        }

        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();

      });
    });
  }
  pos_pick($event) {
    let pos = ($event);
    this.lat = pos.coords.lat;
    this.lng = pos.coords.lng;
    this.getGeoLocation(this.lat, this.lng)
  }
  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            let pickadd = results[0].formatted_address;
            this.pickAddress = pickadd;
          } else {
            alert("No address available!");
          }
        } else {
          alert("No address available!");
        }
      });
    }
  }
  OnFlatPrice(value) {
    if (value == 'true') {
      this.flatS = 'true'
      this.isFlat = true
    } else {
      this.isFlat = false
      this.flatS = 'false'
      this.flatPrice = ''
    }
  }

}
