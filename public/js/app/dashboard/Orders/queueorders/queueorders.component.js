var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { OrdersModel_admin } from '../../../front_end_models/OrdersModel';
import { QueueModel } from '../../../front_end_models/queueModel';
var QueueordersComponent = /** @class */ (function () {
    function QueueordersComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.DirectionData = [];
        this.RecordData = [];
        this.No_Of_Directions = [];
        this.activeDirection = 1;
        this.QueueData_json = [];
        this.QueueData = [];
        this.url = '';
        this.limit = 10;
        this.p = 1;
        this.skip_value = 0;
        this.array = [];
    }
    QueueordersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Queue_Orders_Listing', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.QueueData = data.json().extras.QueueData;
                _this.QueueData_json = data.json().extras.QueueData;
                _this.Total_Count = data.json().extras.Count;
                if (!_this.QueueData.length) {
                    _this.isData = true;
                }
                else {
                    _this.issearch = false;
                    _this.isData = false;
                }
                var count = parseInt(data.json().extras.Count);
                var count1 = Math.floor(count / 10);
                var count2 = count % 10;
                if (count2 == 0) {
                    _this.array.length = count1;
                }
                else {
                    _this.array.length = count1 + 1;
                }
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    QueueordersComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.sortResults(this.valu, this.IsAsc);
    };
    QueueordersComponent.prototype.sortColumn_date = function (key) {
        this.IsAsc = !this.IsAsc;
        this.sortResults_date(key, this.IsAsc);
    };
    QueueordersComponent.prototype.sortResults = function (prop, asc) {
        this.QueueData = this.QueueData_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.QueueData;
    };
    QueueordersComponent.prototype.sortResults_date = function (prop, asc) {
        this.QueueData = this.QueueData_json.sort(function (a, b) {
            if (asc) {
                var from = new Date(a[prop]).getTime();
                var to = new Date(b[prop]).getTime();
                return from - to;
            }
            else {
                return to - from;
            }
        });
        if (asc) {
            return this.QueueData;
        }
        else {
            return this.QueueData.reverse();
        }
    };
    QueueordersComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    QueueordersComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * this.limit;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.limit);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Queue_Orders_Listing', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.QueueData = data.json().extras.QueueData;
                _this.QueueData_json = data.json().extras.QueueData;
                _this.skip_value = _this.index * _this.limit;
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    QueueordersComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.views = i;
        this.No_Of_Directions.length = item.No_Of_Directions;
        this.getDirectionOrder(item, 0);
    };
    QueueordersComponent.prototype.close = function () {
        this.views = -1;
    };
    QueueordersComponent.prototype.getDirectionOrder = function (item, j) {
        this.QueueID = item.QueueID;
        this.Direction_Number = j + 1;
        this.getOrdres(this.QueueID, this.Direction_Number, 1, '/Find_Direction_Order');
        this.activeDirectionAssin = -1;
        this.isRecordsView = true;
    };
    QueueordersComponent.prototype.getOrdres = function (QueueID, Direction_Number, type, url, QueiD_Direction) {
        var _this = this;
        this.RecordData = [];
        var body = new QueueModel(QueueID, Direction_Number);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.RecordData = data.json().extras.DirectionData.RecordData;
                }
                else if (type == 2) {
                    _this.DirectionData = data.json().extras.DirectionData;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    QueueordersComponent.prototype.FindAll_Drivers = function () {
        var _this = this;
        var body = new OrdersModel_admin();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriverData = data.json().extras.DriverData;
                _this.DriverID = _this.DriverData[0].DriverID;
                _this.Driver_Name = _this.DriverData[0].name;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    QueueordersComponent.prototype.onAssign_Driver = function () {
        this.activeDirection = -1;
        this.activeDirectionAssin = 1;
        this.RecordData = [];
        this.isRecordsView = false;
        this.getOrdres(this.QueueID, null, 2, '/Get_All_Queue_Directions');
    };
    QueueordersComponent.prototype.onCloseDriverAssign = function () {
        this.isAssignDriver = false;
    };
    QueueordersComponent.prototype.select_Driver = function (name, driverid) {
        this.DriverID = driverid;
        this.Driver_Name = name;
        this.finalConfirmDriver = true;
        this.isAssignDriver = false;
    };
    QueueordersComponent.prototype.onCloseDriverConfirm = function () {
        this.finalConfirmDriver = false;
        this.isAssignDriver = true;
    };
    QueueordersComponent.prototype.selectDriver = function (itemDirc) {
        this.Direction_Number = itemDirc.Direction_No;
        this.isAssignDriver = true;
        this.FindAll_Drivers();
    };
    QueueordersComponent.prototype.onSubmitDriver = function () {
        var _this = this;
        var body = new QueueModel(this.QueueID, this.Direction_Number, this.DriverID, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Queue_Direction_Order_Place', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.issucessDriver_Assign = true;
                _this.finalConfirmDriver = false;
                var message = "Driver Assign sucessfully";
                _this.ErrorService.handleError(message);
                _this.isAssignDriver = false;
                _this.views = -1;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    QueueordersComponent = __decorate([
        Component({
            selector: 'app-queueorders',
            templateUrl: './queueorders.component.html',
            styleUrls: ['./queueorders.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], QueueordersComponent);
    return QueueordersComponent;
}());
export { QueueordersComponent };
