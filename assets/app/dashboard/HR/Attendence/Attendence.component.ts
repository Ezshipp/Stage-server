import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { AttendenceModel } from './AttendecneModel';
import { driverModel } from './../../../front_end_models/driverModel';
import { Component, OnInit, Type, ViewChild, ElementRef } from '@angular/core';
import { DatePickerOptions } from 'ng2-datepicker';
import { Headers, Http } from '@angular/http';
declare var jQuery: any;
@Component({
  selector: 'app-Attendence',
  templateUrl: './Attendence.component.html',
  styleUrls: ['./Attendence.component.css']
})
export class AttendenceComponent implements OnInit {
  isPagination: boolean;
  to_date_new: string; index_E: any = 0; skip_value_E: number = 0;
  from_date_new: string;
  pE: number = 1;
  isData: boolean;
  @ViewChild('closebtn') closeBtn: ElementRef

  TotalDays: any;
  TotalEmp: any;
  allEmpAttendence_Data: any[] = [];
  @ViewChild('myModal') myModal: ElementRef;
  Todate_DateFilter: any;
  Todate_DateRange: DatePickerOptions;
  Fromdate_DateFilter: any;
  FromDate_DateRange: DatePickerOptions;
  EmployeeID: any;
  isRequesting: boolean;
  p: number = 1;
  TotalEmp_count: any;
  backendDate: any;
  EmployeeAttendanceData: any[] = [];
  url: string = '';
  skip_value: any = 0;
  Today_date: any;
  PresentDate: DatePickerOptions;

  options: DatePickerOptions;
  constructor(private _cookieService: CookieService,
    private http: Http, private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService) {
    this.PresentDate = new DatePickerOptions()
    this.PresentDate.initialDate = new Date()
    var to_month = this.PresentDate.initialDate.getMonth() + 1
    var datto: any = this.PresentDate.initialDate.getDate() + '/' + to_month + '/' + this.PresentDate.initialDate.getFullYear()
    this.Today_date = datto

    this.FromDate_DateRange = new DatePickerOptions()
    this.FromDate_DateRange.initialDate = new Date()

    var to_month1 = this.FromDate_DateRange.initialDate.getMonth() + 1
    var datto2: any = this.FromDate_DateRange.initialDate.getDate() + '/' + to_month1 + '/' + this.FromDate_DateRange.initialDate.getFullYear()
    this.Fromdate_DateFilter = datto2

    this.Todate_DateRange = new DatePickerOptions()
    this.Todate_DateRange.initialDate = new Date()

    var to_month2 = this.Todate_DateRange.initialDate.getMonth() + 1
    var datto1: any = this.Todate_DateRange.initialDate.getDate() + '/' + to_month2 + '/' + this.Todate_DateRange.initialDate.getFullYear()
    this.Todate_DateFilter = datto1

  }

  ngOnInit() {
    var fromdate = this.Fromdate_DateFilter.split('/')
    fromdate = fromdate[0] + '-' + fromdate[1] + '-' + fromdate[2]
    var todae = this.Todate_DateFilter.split('/')
    todae = todae[0] + '-' + todae[1] + '-' + todae[2]
    this.from_date_new = fromdate
    this.to_date_new = todae
    this.onsubmi_final(fromdate, todae)

  }
  getEmp() {
    jQuery(this.myModal.nativeElement).modal('show');
    this.EmployeeAttendanceData = []
    this.Onsubmit_getempData(this.Today_date)


  }
  onsubmit() {
    var presentDate = this.Fromdate_DateFilter.day + '-' + this.Fromdate_DateFilter.month + '-' + this.Fromdate_DateFilter.year
    var TodateDate = this.Todate_DateFilter.day + '-' + this.Todate_DateFilter.month + '-' + this.Todate_DateFilter.year
    this.onsubmi_final(presentDate, TodateDate)
  }
  onsubmi_final(fromdate, todate) {
    this.isRequesting = true;
    const body1 = new AttendenceModel(0, null, null, fromdate, todate)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employee_Attendance_Count', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.allEmpAttendence_Data = data.json().extras.EmployeeAttendanceData
          this.TotalEmp = data.json().extras.Count
          this.TotalDays = data.json().extras.Day_Between_Dates
          if (this.TotalEmp == 0) {
            this.isData = true
            this.isPagination = false;
          } else {
            this.isData = false;
            this.isPagination = true;
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  Onsubmit_getempData(presentDateff) {
    var presentDate = presentDateff.day + '-' + presentDateff.month + '-' + presentDateff.year
    this.backendDate = presentDate


    const body1 = new AttendenceModel(this.skip_value, presentDate)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employee_Attendance_Day', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.EmployeeAttendanceData = data.json().extras.EmployeeAttendanceData
          this.TotalEmp_count = data.json().extras.Count


        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )

  }
  pageChangedEmployee(event: number) {
    this.pE = event
    this.nextpageEmployees(this.pE - 1)
  }
  nextpageEmployees(index) {
    this.isRequesting = true;
    this.index_E = index;
    let skip_value = this.index_E * 10
    const body1 = new AttendenceModel(skip_value, null, null, this.from_date_new, this.to_date_new)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employee_Attendance_Count', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.allEmpAttendence_Data = data.json().extras.EmployeeAttendanceData
          this.TotalEmp = data.json().extras.Count
          this.TotalDays = data.json().extras.Day_Between_Dates
          this.skip_value_E = this.index_E * 10

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  pageChanged(event) {
    this.p = event
    this.nextpage(this.p - 1)
  }
  nextpage(index) {

    this.skip_value = index;
    let skip_value = this.skip_value * 10
    let empid = this._cookieService.get('EmployeeID')
    const body1 = new AttendenceModel(skip_value, this.backendDate)
    const body = JSON.stringify(body1)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Employee_Attendance_Day', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {


          this.EmployeeAttendanceData = data.json().extras.EmployeeAttendanceData

          this.skip_value = this.skip_value * 10
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  onPresent(item) {
    this.EmployeeID = item.EmployeeID
    if (item.Whether_Present) {

      var url = '/Remove_Employee_Attendance'
      this.OnAttendence(url, this.EmployeeID)
    } else {
      var url = '/Add_Employee_Attendance'

      this.OnAttendence(url, this.EmployeeID)


    }


  }
  OnAttendence(url, empId) {
    const body1 = new AttendenceModel(null, this.backendDate, empId)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + url, body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {


        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
}
