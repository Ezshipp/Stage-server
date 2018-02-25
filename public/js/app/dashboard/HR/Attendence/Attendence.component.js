var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { AttendenceModel } from './AttendecneModel';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePickerOptions } from 'ng2-datepicker';
import { Headers, Http } from '@angular/http';
var AttendenceComponent = /** @class */ (function () {
    function AttendenceComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.index_E = 0;
        this.skip_value_E = 0;
        this.pE = 1;
        this.allEmpAttendence_Data = [];
        this.p = 1;
        this.EmployeeAttendanceData = [];
        this.url = '';
        this.skip_value = 0;
        this.PresentDate = new DatePickerOptions();
        this.PresentDate.initialDate = new Date();
        var to_month = this.PresentDate.initialDate.getMonth() + 1;
        var datto = this.PresentDate.initialDate.getDate() + '/' + to_month + '/' + this.PresentDate.initialDate.getFullYear();
        this.Today_date = datto;
        this.FromDate_DateRange = new DatePickerOptions();
        this.FromDate_DateRange.initialDate = new Date();
        var to_month1 = this.FromDate_DateRange.initialDate.getMonth() + 1;
        var datto2 = this.FromDate_DateRange.initialDate.getDate() + '/' + to_month1 + '/' + this.FromDate_DateRange.initialDate.getFullYear();
        this.Fromdate_DateFilter = datto2;
        this.Todate_DateRange = new DatePickerOptions();
        this.Todate_DateRange.initialDate = new Date();
        var to_month2 = this.Todate_DateRange.initialDate.getMonth() + 1;
        var datto1 = this.Todate_DateRange.initialDate.getDate() + '/' + to_month2 + '/' + this.Todate_DateRange.initialDate.getFullYear();
        this.Todate_DateFilter = datto1;
    }
    AttendenceComponent.prototype.ngOnInit = function () {
        var fromdate = this.Fromdate_DateFilter.split('/');
        fromdate = fromdate[0] + '-' + fromdate[1] + '-' + fromdate[2];
        var todae = this.Todate_DateFilter.split('/');
        todae = todae[0] + '-' + todae[1] + '-' + todae[2];
        this.from_date_new = fromdate;
        this.to_date_new = todae;
        this.onsubmi_final(fromdate, todae);
    };
    AttendenceComponent.prototype.getEmp = function () {
        jQuery(this.myModal.nativeElement).modal('show');
        this.EmployeeAttendanceData = [];
        this.Onsubmit_getempData(this.Today_date);
    };
    AttendenceComponent.prototype.onsubmit = function () {
        var presentDate = this.Fromdate_DateFilter.day + '-' + this.Fromdate_DateFilter.month + '-' + this.Fromdate_DateFilter.year;
        var TodateDate = this.Todate_DateFilter.day + '-' + this.Todate_DateFilter.month + '-' + this.Todate_DateFilter.year;
        this.onsubmi_final(presentDate, TodateDate);
    };
    AttendenceComponent.prototype.onsubmi_final = function (fromdate, todate) {
        var _this = this;
        this.isRequesting = true;
        var body1 = new AttendenceModel(0, null, null, fromdate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employee_Attendance_Count', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.allEmpAttendence_Data = data.json().extras.EmployeeAttendanceData;
                _this.TotalEmp = data.json().extras.Count;
                _this.TotalDays = data.json().extras.Day_Between_Dates;
                if (_this.TotalEmp == 0) {
                    _this.isData = true;
                    _this.isPagination = false;
                }
                else {
                    _this.isData = false;
                    _this.isPagination = true;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AttendenceComponent.prototype.Onsubmit_getempData = function (presentDateff) {
        var _this = this;
        var presentDate = presentDateff.day + '-' + presentDateff.month + '-' + presentDateff.year;
        this.backendDate = presentDate;
        var body1 = new AttendenceModel(this.skip_value, presentDate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employee_Attendance_Day', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.EmployeeAttendanceData = data.json().extras.EmployeeAttendanceData;
                _this.TotalEmp_count = data.json().extras.Count;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AttendenceComponent.prototype.pageChangedEmployee = function (event) {
        this.pE = event;
        this.nextpageEmployees(this.pE - 1);
    };
    AttendenceComponent.prototype.nextpageEmployees = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index_E = index;
        var skip_value = this.index_E * 10;
        var body1 = new AttendenceModel(skip_value, null, null, this.from_date_new, this.to_date_new);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employee_Attendance_Count', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.allEmpAttendence_Data = data.json().extras.EmployeeAttendanceData;
                _this.TotalEmp = data.json().extras.Count;
                _this.TotalDays = data.json().extras.Day_Between_Dates;
                _this.skip_value_E = _this.index_E * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AttendenceComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    AttendenceComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.skip_value = index;
        var skip_value = this.skip_value * 10;
        var empid = this._cookieService.get('EmployeeID');
        var body1 = new AttendenceModel(skip_value, this.backendDate);
        var body = JSON.stringify(body1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employee_Attendance_Day', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.EmployeeAttendanceData = data.json().extras.EmployeeAttendanceData;
                _this.skip_value = _this.skip_value * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AttendenceComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    AttendenceComponent.prototype.onPresent = function (item) {
        this.EmployeeID = item.EmployeeID;
        if (item.Whether_Present) {
            var url = '/Remove_Employee_Attendance';
            this.OnAttendence(url, this.EmployeeID);
        }
        else {
            var url = '/Add_Employee_Attendance';
            this.OnAttendence(url, this.EmployeeID);
        }
    };
    AttendenceComponent.prototype.OnAttendence = function (url, empId) {
        var _this = this;
        var body1 = new AttendenceModel(null, this.backendDate, empId);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    __decorate([
        ViewChild('closebtn'),
        __metadata("design:type", ElementRef)
    ], AttendenceComponent.prototype, "closeBtn", void 0);
    __decorate([
        ViewChild('myModal'),
        __metadata("design:type", ElementRef)
    ], AttendenceComponent.prototype, "myModal", void 0);
    AttendenceComponent = __decorate([
        Component({
            selector: 'app-Attendence',
            templateUrl: './Attendence.component.html',
            styleUrls: ['./Attendence.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], AttendenceComponent);
    return AttendenceComponent;
}());
export { AttendenceComponent };
