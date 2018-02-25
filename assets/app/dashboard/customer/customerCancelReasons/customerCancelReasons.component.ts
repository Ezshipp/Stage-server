import { NgForm } from '@angular/forms';
import { ErrorService } from './../../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CancelReasonsModel } from './../../../front_end_models/ReasonsModel';
import { Component, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-customerCancelReasons',
  templateUrl: './customerCancelReasons.component.html',
  styleUrls: ['./customerCancelReasons.component.css'],
})
export class CustomerCancelReasonsComponent implements OnInit {
  onCreate_Reason: boolean;
  isRequesting: boolean;
  Status_OK: boolean;
  Status: any;
  isIndex: boolean;
  ReasonID: any;
  index: any;
  ReasonData: any = [];
  url: string = '';
  constructor(private router: Router, private http: Http, private _ApiMessageService: ApiMessageService, private _cookieService: CookieService,
    private ErrorService: ErrorService,
    private _eref: ElementRef) { }
  ngOnInit() {
    const body = new CancelReasonsModel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Customer_Cancellation_Reason', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.ReasonData = data.json().extras.ReasonData
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
  onEdit(item, i) {
    this.ReasonID = item.ReasonID
    this.index = i
    this.isIndex = true;
  }
  Ondelete(item, i) {
  }
  onsubmitEdit(item) {
    const body = new CancelReasonsModel(this.ReasonID, item.Reason)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Edit_Customer_Cancellation_Reason', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.index = -1
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
  Onclose() {
    this.index = -1
  }
  onCreateReason() {
    this.onCreate_Reason = true;
  }
  onCloseCreate_Reason() {
    this.onCreate_Reason = false;
  }
  onSubmit(form: NgForm) {
    var Reason = form.value.Reason
    this.isRequesting = true;
    const body = new CancelReasonsModel(null, Reason)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Create_Cusomer_Cancellation_Reason', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.Status_OK = true;
          setTimeout(() => {
            this.Status_OK = false;
          }, 2000)
          this.Status = data.json().extras.Status
          this.onCloseCreate_Reason();
          this.ngOnInit()
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
