import { Component } from '@angular/core';
import { CreateAdminModel } from '../../front_end_models/create_adminUserModel';
import { CookieService } from 'angular2-cookie/services';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { ErrorService } from '../../errors/error.service';

@Component({

  selector: 'biker-leave',
  templateUrl: 'biker-leave.component.html',
  styleUrls: ['biker-leave.component.css']
})
export class BikerLeaveComponent {
  requestId: any;
  leave: string;
  ind_empl: any = [];
  onLeaveConformation: boolean;
  islength_leavesData: boolean;
  isRequesting = false;
  activeId: number;
  IsAsc: boolean;
  valu: any;
  p: number = 1;
  leavesRequestsData: any = [];
  Total_Count: any;
  sortoptions: any = {};
  url: string = "";
  skip: number = 0;
  limit: number = 10;
  constructor(
    private _cookieService: CookieService,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService
  ) { }
  ngOnInit() {
    const body = new CreateAdminModel(
      null,
      null,
      null,
      null,
      null,
      this._cookieService.get("ez_admin_cusID"),
      0,
      this.limit,
      this.sortoptions
    );
    this.getLeaveRequesDrivers("/List_All_Employee_Leave_Request", body, 1);
  }

  getLeaveRequesDrivers(url, body, type) {
    this.isRequesting = true;
    // const body = new CreateAdminModel(null, null, null, null, null, this._cookieService.get('ez_admin_cusID'), this.skip, this.limit,this.sortoptions)
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(this.url + url, body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          if (type == 1) {
            /* get all orders*/
            this.leavesRequestsData = data.json().extras.RequestData;

            //   console.log("body "+JSON.stringify(data.json().extras.RequestData))
            this.Total_Count = data.json().extras.Count;
            if (this.Total_Count == 0) {
              this.islength_leavesData = true
            }
          } else if (type == 2) {
            /*pagination */
            this.leavesRequestsData = data.json().extras.RequestData;
          } else if (type == 3) {
            //   this.activeId=null
            this.onLeaveConformation = false
            this.pageChanged(this.p);
          } else if (type == 4) {
            // this.activeId=null
            this.onLeaveConformation = false

            this.pageChanged(this.p);
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          this.isRequesting = false;

          let message = this._ApiMessageService.ApiMessages[msgNumber];
          this.ErrorService.handleError(message);
        }
      });
  }
  sortColumn(key) {
    var backendkey;

    if (this.valu != key) {
      this.valu = key;
      this.IsAsc = true;
    } else {
      this.IsAsc = !this.IsAsc;
    }

    if (this.IsAsc == true) {
      var sort = 1;
    } else if (this.IsAsc == false) {
      sort = -1;
    }
    this.sortoptions = {};
    this.sortoptions[this.valu] = sort;

    this.ngOnInit();

    this.p = 1;
  }
  pageChanged(event: number) {
    this.p = event;
    var skip = this.p - 1;
    skip = skip * this.limit;
    const body = new CreateAdminModel(
      null,
      null,
      null,
      null,
      null,
      this._cookieService.get("ez_admin_cusID"),
      skip,
      this.limit,
      this.sortoptions
    );
    this.getLeaveRequesDrivers("/List_All_Employee_Leave_Request", body, 2);
  }
  onLeaveStatus(event, item) {
    this.onLeaveConformation = true
    this.requestId=item.RequestID
    this.ind_empl = item
    if (event.target.id == 1) {
      this.leave = 'Approve'
    }
    else if (event.target.id == 2) {
      this.leave = 'Rejecte'
    }

  }
  getLeaveStatus(){
if(this.leave=='Approve'){
  this.getLeaveStatus_Final(1)
}
else if(this.leave=='Rejecte'){
  this.getLeaveStatus_Final(2)
}
  }
  getLeaveStatus_Final(number) {
    var url = "";
    console.log(number);
    // console.log(item.RequestID);
    const body = new CreateAdminModel(
      null,
      null,
      null,
      null,
      null,
      this._cookieService.get("ez_admin_cusID"),
      null,
      this.limit,
      this.sortoptions,
      null,
      this.requestId
    );
    if (number == 1) {
      this.getLeaveRequesDrivers("/Approve_Employee_Leave", body, 3);
    } else if (number == 2) {
      this.getLeaveRequesDrivers("/Reject_Employee_Leave", body, 4);
    }
  }
  onClose_leaveConformation() {
    this.onLeaveConformation = false
  }

}
