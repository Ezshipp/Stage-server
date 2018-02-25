import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit, EventEmitter, ElementRef, Input } from "@angular/core";
import { driverModel } from "../../../front_end_models/driverModel";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';
const Moment: any = (<any>moment).default || moment;
@Component({
    selector: "app-activeDrivers",
    templateUrl: "./activeDrivers.component.html",
    styleUrls: ["./activeDrivers.component.css"]
})
export class ActiveDriversComponent implements OnInit {
    isdeleteDriver: boolean;
    Status: any;
    ConfirmPassword_id: any;
    change_password_id: any;
    change_pwd: any;
    DriverId_password: any;
    change_password: boolean = false;
    Total_Count_json: number;
    zone15: any;
    zoneBackend: string;
    ZoneName: any;
    ZoneID: any;
    ZoneData: any;
    isChaneZone: boolean;
    isSearch_individual: boolean;
    Total_individual: number;
    pIndividualOrder: number = 1;
    issearch: boolean;
    p: number = 1;
    activeId
    istransaction: boolean;
    IsAsc: boolean;
    Total_Expenses: any;
    From1_Vishu: any;
    ToDate_Vishu: any;
    isData: boolean;
    index_Order = 0;
    val: any;
    array_O = [];
    Order_Skip = 0;
    orderViewProperty: any;
    Order_bookingType: number;
    isviewOrderData: boolean;
    Order_OrderData: any = [];
    Order_Count: any;
    issubmit: boolean;
    d1: string;
    d2: string;
    DriverData_json: any;
    valu: any;
    status: any;
    CurrentStatus: any;
    LastOnline: any;
    email: any;
    acc_status: any;
    Total_Collection: any; isRequesting: boolean = false;
    Amount: any = 0;
    TransactionID;
    Purpose_Type: any;
    Payment_Type: any;
    isaddExpenses: boolean; PaymentArray = [
        "Select Payment",
        "Cash",
        "NEFT",
        "PAYTM"
    ];
    PurposeArray = [
        "Select Purpose",
        "Salary",
        "Petrol",
        "MISCELLANEOUS"
    ];
    ExpensesData: any = []; expensesElementsNot: boolean; expensesAssigned: boolean;
    from;
    to;
    CancelledOrderData: any = [];
    IncompletedOrderData: any = [];
    OrderData: any = [];
    Count: any;
    @Input() inputEvents: EventEmitter<{ type: string, data: string | DateModel }>;
    currentDate: any;
    DriverName: any;
    salaryEditview: boolean;
    salaryAssigned: boolean;
    addSalaryElements: boolean;
    salaryElementsNot: boolean;
    salary_table: boolean;
    Salary: any = 0;
    Salary_Assigned: any;
    SalaryData: any = [];
    expenses_property: boolean = false;
    orders_property: boolean = true;
    i: boolean = false;
    analytics: boolean = false;
    Same_Day_Count: any;
    Four_Hours_Count: any;
    Instant_Count: any;
    Total_Counts: any;
    AnalyticData: any[] = [];
    DriverID: any;
    views: any;
    date_from: DateModel;
    date_to: DateModel;
    options: DatePickerOptions;
    mymodel = ''; mymodel_Order = '';
    Total_Count: any;
    index = 0; array = [];
    skip_value = 0;
    DriverData: any = [];
    url: string = '';
    options_Todate: DatePickerOptions
    constructor(private _cookieService: CookieService,
        private http: Http, private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService) {
        this.options = new DatePickerOptions();
        this.options_Todate = new DatePickerOptions()
        this.currentDate = new Date();
        var d = new Date();
        var last;
        last = new Date(d.getTime() - (7 * 24 * 60 * 60 * 1000));
        this.options.initialDate = new Date(last)
        if (this.options.initialDate instanceof Date) {
            this.currentDate = Moment(this.options.initialDate);
        }
        if (this.options_Todate.initialDate instanceof Date) {
            this.currentDate = Moment(this.options_Todate.initialDate);
        }
        this.options_Todate.initialDate = new Date()
        var from_month = this.options.initialDate.getMonth() + 1
        var to_month = this.options_Todate.initialDate.getMonth() + 1
        var datfrom: any = this.options.initialDate.getDate() + '/' + from_month + '/' + this.options.initialDate.getFullYear()
        this.date_from = datfrom
        var datto: any = this.options_Todate.initialDate.getDate() + '/' + to_month + '/' + this.options_Todate.initialDate.getFullYear()
        this.date_to = datto
        this.ErrorService.from_date = this.date_from;
        this.ErrorService.to_date = this.date_to
    }
    setMoment() {
    }
    ngOnInit() {
        this.Find_Allzones()
        this.findAllActiveDrivers(this.date_from, this.date_to);
    }
    onSubmit() {
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        this.issubmit = true
        this.findAllActiveDrivers(this.d1, this.d2);
        this.ErrorService.from_date = this.d1
        this.ErrorService.to_date = this.d2
    }
    findAllActiveDrivers(date_from, date_to) {
        this.From1_Vishu = date_from;
        this.ToDate_Vishu = date_to
        this.isRequesting = true;
        this.expensesElementsNot = true;
        let uid = this._cookieService.get('ez_cusID')
        const body1 = new driverModel(this.skip_value, null, null, date_from, date_to)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Active_Drivers', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.DriverData = data.json().extras.DriverData
                    this.DriverData_json = data.json().extras.DriverData
                    this.Total_Count_json = data.json().extras.Count
                    this.isRequesting = false;
                    this.issearch = false
                    let count: number = parseInt(data.json().extras.Count)
                    let count1: number = Math.floor(count / 10);
                    let count2 = count % 10
                    if (count2 == 0) {
                        this.array.length = count1
                    } else {
                        this.array.length = count1 + 1
                    }
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    getStyle(index) {
        if (index == this.index) {
            return "#795548";
        }
    }
    pageChanged(event: number) {
        this.p = event
        this.nextpage(this.p - 1)
        this.isRequesting = true
    }
    nextpage(index) {
        this.index = index;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        let skip_value = this.index * 10
        let empid = this._cookieService.get('EmployeeID')
        const body = new driverModel(skip_value, null, null, this.d1, this.d2)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Drivers', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.issearch = false
                    this.views = null;
                    this.DriverData = data.json().extras.DriverData
                    this.DriverData_json = data.json().extras.DriverData
                    this.isRequesting = false
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    valuechange(newValue: string) {
        this.isRequesting = true;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        this.mymodel = newValue;
        let length = newValue.length
        if (length >= 3) {
            this.issearch = true
            this.DriverData = []
            this.array = []
            this.skip_value = 0
            const body1 = new driverModel(null, newValue, null, this.d1, this.d2)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Active_Drivers', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        let DriverData = []
                        this.array.length = 0
                        this.DriverData = data.json().extras.DriverData
                        this.array.length = 0
                        this.isRequesting = false;
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);
                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)
                    }
                }
                )
        } else if (length == 0) {
            this.DriverData = []
            if (this.issubmit) {
                this.findAllActiveDrivers(this.d1, this.d2);
            } else {
                var from_month = this.options.initialDate.getMonth() + 1
                var to_month = this.options_Todate.initialDate.getMonth() + 1
                var datfrom: any = this.options.initialDate.getDate() + '/' + from_month + '/' + this.options.initialDate.getFullYear()
                var datto: any = this.options_Todate.initialDate.getDate() + '/' + to_month + '/' + this.options_Todate.initialDate.getFullYear()
                this.findAllActiveDrivers(datfrom, datto);
            }
            this.array.length = 0
            this.index = 0
        }
    }
    view_analytics(item, index) {
        this.acc_status = item.acc_status;
        this.email = item.email;
        this.Salary_Assigned = item.Salary_Assigned;
        this.Salary = item.Salary;
        this.LastOnline = item.LastOnline;
        this.CurrentStatus = item.CurrentStatus;
        this.status = item.status;
        this.Total_Count = item.Total_Count;
        this.DriverID = item.DriverID;
        this.ErrorService.DriverID = this.DriverID;
        this.Total_Expenses = item.Total_Expenses
        this.ZoneName = item.ZoneName
        this.ZoneID = item.ZoneID
        this.zoneBackend = this.ZoneID + '/' + this.ZoneName
        this.views = index;
        this.orderViewProperty = null;
    }
    sortColumn(key) {
        this.valu = key
        this.IsAsc = !this.IsAsc
        this.sortResults(this.valu, this.IsAsc);
    }
    sortColumnReverse(key) {
        this.valu = key
        this.sortResults(key, false);
    }
    sortResults(prop, asc) {
        this.DriverData = this.DriverData_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.DriverData
    }
    setDriverInterval() {
    }
    getExpense() {
        const body1 = new driverModel(null, null, this.DriverID, this.from, this.to)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Total_Expense_Amount_Interval', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.Amount = data.json().extras.Total_Expenses
                    this.getCollection();
                }
            }
            )
    }
    getCollection() {
        const body1 = new driverModel(null, null, this.DriverID, this.from, this.to)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Collection_Interval', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.Total_Collection = data.json().extras.Total_Collection
                }
            }
            )
    }
    close() {
        this.views = null;
    }
    orders_view() {
        this.orders_property = true;
        this.expenses_property = false;
    }
    expenses_view() {
        this.expenses_property = true;
        this.orders_property = false;
    }
    checkDriver_Salary() {
        const body1 = new driverModel(null, null, this.DriverID)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Check_for_Driver_Salary', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.salary_table = true;
                    this.SalaryData = data.json().extras.SalaryData
                    this.Salary_Assigned = this.SalaryData.Salary_Assigned
                    if (this.Salary_Assigned == false) {
                        this.salaryElementsNot = true;
                        this.salaryAssigned = false;
                    } else {
                        this.salaryAssigned = true;
                        this.salaryElementsNot = false;
                    }
                    this.Salary = this.SalaryData.Salary
                    this.setDriverInterval();
                }
            }
            )
    }
    addSalary_View() {
        this.addSalaryElements = true;
        this.salaryElementsNot = false;
    }
    onSubmit_Salary(form: NgForm) {
        const body1 = new driverModel(null, null, this.DriverID, null, null, form.value.Salary)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Driver_Salary', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.addSalaryElements = false;
                    this.checkDriver_Salary();
                }
            }
            )
    }
    edit_view() {
        this.salaryAssigned = false;
        this.salaryEditview = true;
    }
    onSubmit_Salary_Edit(form: NgForm) {
        const body1 = new driverModel(null, null, this.DriverID, null, null, form.value.Salary)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Driver_Salary', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.salaryEditview = false;
                    this.checkDriver_Salary();
                }
            }
            )
    }
    addExpenses() {
        this.isaddExpenses = true;
    }
    OncloseAddExpesis() {
        this.isaddExpenses = false;
    }
    select(value, event) {
        this.Payment_Type = value;
        if (value == 1) {
            this.istransaction = false
        } else {
            this.istransaction = true
        }
    }
    selectPurpose(value, event) {
        this.Purpose_Type = value;
    }
    onSubmit_Expenses(form: NgForm) {
        if (this.Payment_Type == 1) {
            this.TransactionID = "";
        } else {
            this.TransactionID = form.value.TransactionID;
        }
        const body1 = new driverModel(null, null, this.DriverID, null, null, null, form.value.Amount, this.Payment_Type, this.TransactionID, this.Purpose_Type, form.value.Comment)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Driver_Expenses', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    var message = data.json().extras.Status
                    this.ErrorService.handleError(message)
                    form.resetForm();
                    this.OncloseAddExpesis();
                    this.getCollection();
                    this.views = -1
                    this.findAllActiveDrivers(this.From1_Vishu, this.ToDate_Vishu)
                }
            }
            )
    }
    find_Instant_Orders(DriverID, i) {
        this.Order_bookingType = 1;
        this.DriverID = DriverID;
        this.orderViewProperty = i;
        this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    }
    find_Four_Hours_Orders(DriverID, i) {
        this.Order_bookingType = 2;
        this.DriverID = DriverID;
        this.orderViewProperty = i; this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    }
    find_Same_Day_Orders(DriverID, i) {
        this.Order_bookingType = 3;
        this.DriverID = DriverID;
        this.orderViewProperty = i; this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    }
    find_Orders(val, DriverID) {
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        this.val = val;
        this.isRequesting = true;
        const body1 = new driverModel(this.Order_Skip, null, DriverID, this.d1, this.d2, null, null, null, null, null, null, this.val)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Completed_Orders_Interval_Booking_Type', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.Order_Count = data.json().extras.Count
                    this.Order_OrderData = data.json().extras.OrderData
                    this.isRequesting = false;
                    if (this.Order_OrderData.length) {
                        this.isSearch_individual = false
                        this.isData = false;
                    } else {
                        this.isSearch_individual = true
                        this.isData = true;
                    }
                    this.Total_individual = parseInt(data.json().extras.Count)
                    let count_O: number = parseInt(data.json().extras.Count)
                    let count1_O: number = Math.floor(count_O / 10);
                    let count2_O = count_O % 10
                    if (count2_O == 0) {
                        this.array_O.length = count1_O
                    } else {
                        this.array_O.length = count1_O + 1
                    }
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    closeOrders() {
        this.orderViewProperty = null;
    }
    getStyle_Order(index) {
        if (index == this.index_Order) {
            return "#795548";
        }
    }
    pageChanged_individualOrder(event) {
        this.pIndividualOrder = event
        this.nextpage_Order(this.p - 1)
    }
    nextpage_Order(index) {
        this.index_Order = index;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        let skip_value = this.index_Order * 10
        const body = new driverModel(skip_value, null, this.DriverID, this.d1, this.d2, null, null, null, null, null, null, this.val)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Completed_Orders_Interval_Booking_Type', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.views = null;
                    this.Order_OrderData = data.json().extras.OrderData
                    this.Order_Skip = this.index_Order * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    valuechange_Order(newval) {
        this.isRequesting = true;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year
        this.mymodel = newval;
        let length = newval.length
        if (length >= 3) {
            this.Order_OrderData = []
            this.array_O = []
            this.Order_Skip = 0
            const body1 = new driverModel(null, newval, this.DriverID, this.d1, this.d2, null, null, null, null, null, null, this.Order_bookingType)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Driver_Completed_Orders_Interval_Booking_Type', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        let Order_OrderData = []
                        this.array_O.length = 0
                        this.Order_OrderData = data.json().extras.OrderData
                        this.isSearch_individual = false
                        this.array_O.length = 0
                        this.isRequesting = false;
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);
                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)
                    }
                }
                )
        } else if (length == 0) {
            this.Order_OrderData = []
            this.find_Orders(this.val, this.DriverID);
            this.array_O.length = 0
            this.index_Order = 0
        }
    }
    changeZone(item) {
        this.isChaneZone = true
        this.DriverID = item.DriverID
    }
    OncloseZone() {
        this.isChaneZone = false
    }
    Find_Allzones() {
        const body1 = new driverModel()
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.ZoneData = data.json().extras.ZoneData
                }
            }
            )
    }
    OnchangeZone(value) {
        this.zone15 = value
        var vl = value.split('/')
        this.ZoneID = vl[0]
    }
    onsubmitChangeZone() {
        const body1 = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, null, this.ZoneID)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Driver_Zone', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    var sd = this.zone15.split('/')
                    this.ZoneName = sd[1]
                    this.OncloseZone()
                }
            }
            )
    }
    onSubmit_password(form: NgForm) {
        this.change_password_id = form.value.Password
        this.ConfirmPassword_id = form.value.ConfirmPassword
        if (this.change_password_id == this.ConfirmPassword_id) {
            const body1 = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, null, null, form.value.Password)
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Edit_Driver_Password', body1, { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        this.Status = data.json().extras.Status
                        this.Status = "Biker Change Password Successfully"
                        this.ErrorService.handleError(this.Status)
                        this.change_password = false;
                        form.resetForm();
                    } else {
                        const msgNumber: number = parseInt(data.json().extras.msg);
                        let message = this._ApiMessageService.ApiMessages[msgNumber]
                        this.ErrorService.handleError(message)
                    }
                })
        }
        else {
            this.Status = "Confirm Password and New password are not maching"
            this.ErrorService.handleError(this.Status)
            form.resetForm();
        }
    }
    change_password_link() {
        this.change_password = true;
    }
    Onclosepassword() {
        this.change_password = false;
    }
    onDeleteConformDriver(DriverData2, i) {
        this.DriverName = DriverData2.name
        this.isdeleteDriver = true
    }
    OnclosedeleteDriver() {
        this.isdeleteDriver = false
    }
    remove_Driver() {
        const body1 = new driverModel(null, null, this.DriverID)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Reject_Driver', body1, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isdeleteDriver = false;
                    this.DriverData.splice(this.views, 1)
                    this.views = -1;
                } else {
                }
            }
            )
    }
}
