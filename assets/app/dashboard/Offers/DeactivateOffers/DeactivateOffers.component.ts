import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { SeasonalModel } from './../../../front_end_models/seasonalModel';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-DeactivateOffers',
  templateUrl: './DeactivateOffers.component.html',
  styleUrls: ['./DeactivateOffers.component.css']
})
export class DeactivateOffersComponent implements OnInit {
  OffersList: any = [];
  url = ''
  constructor(private router: Router, private http: Http, private _ApiMessageService: ApiMessageService, private _cookieService: CookieService, private ErrorService: ErrorService, private _cdref: ChangeDetectorRef) { }


  ngOnInit() {
    const body = new SeasonalModel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/View_Deactivate_Offers', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.OffersList = data.json().extras.OffersList
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
