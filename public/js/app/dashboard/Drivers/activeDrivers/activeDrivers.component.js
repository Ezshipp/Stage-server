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
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, EventEmitter, Input } from "@angular/core";
import { driverModel } from "../../../front_end_models/driverModel";
import { DatePickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
var Moment = moment.default || moment;
var ActiveDriversComponent = /** @class */ (function () {
    function ActiveDriversComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.change_password = false;
        this.pIndividualOrder = 1;
        this.p = 1;
        this.index_Order = 0;
        this.array_O = [];
        this.Order_Skip = 0;
        this.Order_OrderData = [];
        this.isRequesting = false;
        this.Amount = 0;
        this.PaymentArray = [
            "Select Payment",
            "Cash",
            "NEFT",
            "PAYTM"
        ];
        this.PurposeArray = [
            "Select Purpose",
            "Salary",
            "Petrol",
            "MISCELLANEOUS"
        ];
        this.ExpensesData = [];
        this.CancelledOrderData = [];
        this.IncompletedOrderData = [];
        this.OrderData = [];
        this.Salary = 0;
        this.SalaryData = [];
        this.expenses_property = false;
        this.orders_property = true;
        this.i = false;
        this.analytics = false;
        this.AnalyticData = [];
        this.mymodel = '';
        this.mymodel_Order = '';
        this.index = 0;
        this.array = [];
        this.skip_value = 0;
        this.DriverData = [];
        this.url = '';
        this.options = new DatePickerOptions();
        this.options_Todate = new DatePickerOptions();
        this.currentDate = new Date();
        var d = new Date();
        var last;
        last = new Date(d.getTime() - (7 * 24 * 60 * 60 * 1000));
        this.options.initialDate = new Date(last);
        if (this.options.initialDate instanceof Date) {
            this.currentDate = Moment(this.options.initialDate);
        }
        if (this.options_Todate.initialDate instanceof Date) {
            this.currentDate = Moment(this.options_Todate.initialDate);
        }
        this.options_Todate.initialDate = new Date();
        var from_month = this.options.initialDate.getMonth() + 1;
        var to_month = this.options_Todate.initialDate.getMonth() + 1;
        var datfrom = this.options.initialDate.getDate() + '/' + from_month + '/' + this.options.initialDate.getFullYear();
        this.date_from = datfrom;
        var datto = this.options_Todate.initialDate.getDate() + '/' + to_month + '/' + this.options_Todate.initialDate.getFullYear();
        this.date_to = datto;
        this.ErrorService.from_date = this.date_from;
        this.ErrorService.to_date = this.date_to;
    }
    ActiveDriversComponent.prototype.setMoment = function () {
    };
    ActiveDriversComponent.prototype.ngOnInit = function () {
        this.Find_Allzones();
        this.findAllActiveDrivers(this.date_from, this.date_to);
    };
    ActiveDriversComponent.prototype.onSubmit = function () {
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        this.issubmit = true;
        this.findAllActiveDrivers(this.d1, this.d2);
        this.ErrorService.from_date = this.d1;
        this.ErrorService.to_date = this.d2;
    };
    ActiveDriversComponent.prototype.findAllActiveDrivers = function (date_from, date_to) {
        var _this = this;
        this.From1_Vishu = date_from;
        this.ToDate_Vishu = date_to;
        this.isRequesting = true;
        this.expensesElementsNot = true;
        var uid = this._cookieService.get('ez_cusID');
        var body1 = new driverModel(this.skip_value, null, null, date_from, date_to);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Drivers', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriverData = data.json().extras.DriverData;
                _this.DriverData_json = data.json().extras.DriverData;
                _this.Total_Count_json = data.json().extras.Count;
                _this.isRequesting = false;
                _this.issearch = false;
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
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveDriversComponent.prototype.getStyle = function (index) {
        if (index == this.index) {
            return "#795548";
        }
    };
    ActiveDriversComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
        this.isRequesting = true;
    };
    ActiveDriversComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.index = index;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        var skip_value = this.index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var body = new driverModel(skip_value, null, null, this.d1, this.d2);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Drivers', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.issearch = false;
                _this.views = null;
                _this.DriverData = data.json().extras.DriverData;
                _this.DriverData_json = data.json().extras.DriverData;
                _this.isRequesting = false;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveDriversComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.isRequesting = true;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.issearch = true;
            this.DriverData = [];
            this.array = [];
            this.skip_value = 0;
            var body1 = new driverModel(null, newValue, null, this.d1, this.d2);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Active_Drivers', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var DriverData = [];
                    _this.array.length = 0;
                    _this.DriverData = data.json().extras.DriverData;
                    _this.array.length = 0;
                    _this.isRequesting = false;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else if (length == 0) {
            this.DriverData = [];
            if (this.issubmit) {
                this.findAllActiveDrivers(this.d1, this.d2);
            }
            else {
                var from_month = this.options.initialDate.getMonth() + 1;
                var to_month = this.options_Todate.initialDate.getMonth() + 1;
                var datfrom = this.options.initialDate.getDate() + '/' + from_month + '/' + this.options.initialDate.getFullYear();
                var datto = this.options_Todate.initialDate.getDate() + '/' + to_month + '/' + this.options_Todate.initialDate.getFullYear();
                this.findAllActiveDrivers(datfrom, datto);
            }
            this.array.length = 0;
            this.index = 0;
        }
    };
    ActiveDriversComponent.prototype.view_analytics = function (item, index) {
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
        this.Total_Expenses = item.Total_Expenses;
        this.ZoneName = item.ZoneName;
        this.ZoneID = item.ZoneID;
        this.zoneBackend = this.ZoneID + '/' + this.ZoneName;
        this.views = index;
        this.orderViewProperty = null;
    };
    ActiveDriversComponent.prototype.sortColumn = function (key) {
        this.valu = key;
        this.IsAsc = !this.IsAsc;
        this.sortResults(this.valu, this.IsAsc);
    };
    ActiveDriversComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    ActiveDriversComponent.prototype.sortResults = function (prop, asc) {
        this.DriverData = this.DriverData_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.DriverData;
    };
    ActiveDriversComponent.prototype.setDriverInterval = function () {
    };
    ActiveDriversComponent.prototype.getExpense = function () {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID, this.from, this.to);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Total_Expense_Amount_Interval', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Amount = data.json().extras.Total_Expenses;
                _this.getCollection();
            }
        });
    };
    ActiveDriversComponent.prototype.getCollection = function () {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID, this.from, this.to);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Collection_Interval', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Total_Collection = data.json().extras.Total_Collection;
            }
        });
    };
    ActiveDriversComponent.prototype.close = function () {
        this.views = null;
    };
    ActiveDriversComponent.prototype.orders_view = function () {
        this.orders_property = true;
        this.expenses_property = false;
    };
    ActiveDriversComponent.prototype.expenses_view = function () {
        this.expenses_property = true;
        this.orders_property = false;
    };
    ActiveDriversComponent.prototype.checkDriver_Salary = function () {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Check_for_Driver_Salary', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.salary_table = true;
                _this.SalaryData = data.json().extras.SalaryData;
                _this.Salary_Assigned = _this.SalaryData.Salary_Assigned;
                if (_this.Salary_Assigned == false) {
                    _this.salaryElementsNot = true;
                    _this.salaryAssigned = false;
                }
                else {
                    _this.salaryAssigned = true;
                    _this.salaryElementsNot = false;
                }
                _this.Salary = _this.SalaryData.Salary;
                _this.setDriverInterval();
            }
        });
    };
    ActiveDriversComponent.prototype.addSalary_View = function () {
        this.addSalaryElements = true;
        this.salaryElementsNot = false;
    };
    ActiveDriversComponent.prototype.onSubmit_Salary = function (form) {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID, null, null, form.value.Salary);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Driver_Salary', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.addSalaryElements = false;
                _this.checkDriver_Salary();
            }
        });
    };
    ActiveDriversComponent.prototype.edit_view = function () {
        this.salaryAssigned = false;
        this.salaryEditview = true;
    };
    ActiveDriversComponent.prototype.onSubmit_Salary_Edit = function (form) {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID, null, null, form.value.Salary);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Driver_Salary', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.salaryEditview = false;
                _this.checkDriver_Salary();
            }
        });
    };
    ActiveDriversComponent.prototype.addExpenses = function () {
        this.isaddExpenses = true;
    };
    ActiveDriversComponent.prototype.OncloseAddExpesis = function () {
        this.isaddExpenses = false;
    };
    ActiveDriversComponent.prototype.select = function (value, event) {
        this.Payment_Type = value;
        if (value == 1) {
            this.istransaction = false;
        }
        else {
            this.istransaction = true;
        }
    };
    ActiveDriversComponent.prototype.selectPurpose = function (value, event) {
        this.Purpose_Type = value;
    };
    ActiveDriversComponent.prototype.onSubmit_Expenses = function (form) {
        var _this = this;
        if (this.Payment_Type == 1) {
            this.TransactionID = "";
        }
        else {
            this.TransactionID = form.value.TransactionID;
        }
        var body1 = new driverModel(null, null, this.DriverID, null, null, null, form.value.Amount, this.Payment_Type, this.TransactionID, this.Purpose_Type, form.value.Comment);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Driver_Expenses', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = data.json().extras.Status;
                _this.ErrorService.handleError(message);
                form.resetForm();
                _this.OncloseAddExpesis();
                _this.getCollection();
                _this.views = -1;
                _this.findAllActiveDrivers(_this.From1_Vishu, _this.ToDate_Vishu);
            }
        });
    };
    ActiveDriversComponent.prototype.find_Instant_Orders = function (DriverID, i) {
        this.Order_bookingType = 1;
        this.DriverID = DriverID;
        this.orderViewProperty = i;
        this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    };
    ActiveDriversComponent.prototype.find_Four_Hours_Orders = function (DriverID, i) {
        this.Order_bookingType = 2;
        this.DriverID = DriverID;
        this.orderViewProperty = i;
        this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    };
    ActiveDriversComponent.prototype.find_Same_Day_Orders = function (DriverID, i) {
        this.Order_bookingType = 3;
        this.DriverID = DriverID;
        this.orderViewProperty = i;
        this.views = null;
        this.find_Orders(this.Order_bookingType, this.DriverID);
    };
    ActiveDriversComponent.prototype.find_Orders = function (val, DriverID) {
        var _this = this;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        this.val = val;
        this.isRequesting = true;
        var body1 = new driverModel(this.Order_Skip, null, DriverID, this.d1, this.d2, null, null, null, null, null, null, this.val);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Completed_Orders_Interval_Booking_Type', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Order_Count = data.json().extras.Count;
                _this.Order_OrderData = data.json().extras.OrderData;
                _this.isRequesting = false;
                if (_this.Order_OrderData.length) {
                    _this.isSearch_individual = false;
                    _this.isData = false;
                }
                else {
                    _this.isSearch_individual = true;
                    _this.isData = true;
                }
                _this.Total_individual = parseInt(data.json().extras.Count);
                var count_O = parseInt(data.json().extras.Count);
                var count1_O = Math.floor(count_O / 10);
                var count2_O = count_O % 10;
                if (count2_O == 0) {
                    _this.array_O.length = count1_O;
                }
                else {
                    _this.array_O.length = count1_O + 1;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveDriversComponent.prototype.closeOrders = function () {
        this.orderViewProperty = null;
    };
    ActiveDriversComponent.prototype.getStyle_Order = function (index) {
        if (index == this.index_Order) {
            return "#795548";
        }
    };
    ActiveDriversComponent.prototype.pageChanged_individualOrder = function (event) {
        this.pIndividualOrder = event;
        this.nextpage_Order(this.p - 1);
    };
    ActiveDriversComponent.prototype.nextpage_Order = function (index) {
        var _this = this;
        this.index_Order = index;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        var skip_value = this.index_Order * 10;
        var body = new driverModel(skip_value, null, this.DriverID, this.d1, this.d2, null, null, null, null, null, null, this.val);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Driver_Completed_Orders_Interval_Booking_Type', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.views = null;
                _this.Order_OrderData = data.json().extras.OrderData;
                _this.Order_Skip = _this.index_Order * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveDriversComponent.prototype.valuechange_Order = function (newval) {
        var _this = this;
        this.isRequesting = true;
        this.d1 = this.date_from.day + '/' + this.date_from.month + '/' + this.date_from.year;
        this.d2 = this.date_to.day + '/' + this.date_to.month + '/' + this.date_to.year;
        this.mymodel = newval;
        var length = newval.length;
        if (length >= 3) {
            this.Order_OrderData = [];
            this.array_O = [];
            this.Order_Skip = 0;
            var body1 = new driverModel(null, newval, this.DriverID, this.d1, this.d2, null, null, null, null, null, null, this.Order_bookingType);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Driver_Completed_Orders_Interval_Booking_Type', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var Order_OrderData = [];
                    _this.array_O.length = 0;
                    _this.Order_OrderData = data.json().extras.OrderData;
                    _this.isSearch_individual = false;
                    _this.array_O.length = 0;
                    _this.isRequesting = false;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else if (length == 0) {
            this.Order_OrderData = [];
            this.find_Orders(this.val, this.DriverID);
            this.array_O.length = 0;
            this.index_Order = 0;
        }
    };
    ActiveDriversComponent.prototype.changeZone = function (item) {
        this.isChaneZone = true;
        this.DriverID = item.DriverID;
    };
    ActiveDriversComponent.prototype.OncloseZone = function () {
        this.isChaneZone = false;
    };
    ActiveDriversComponent.prototype.Find_Allzones = function () {
        var _this = this;
        var body1 = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
            }
        });
    };
    ActiveDriversComponent.prototype.OnchangeZone = function (value) {
        this.zone15 = value;
        var vl = value.split('/');
        this.ZoneID = vl[0];
    };
    ActiveDriversComponent.prototype.onsubmitChangeZone = function () {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, null, this.ZoneID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Driver_Zone', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var sd = _this.zone15.split('/');
                _this.ZoneName = sd[1];
                _this.OncloseZone();
            }
        });
    };
    ActiveDriversComponent.prototype.onSubmit_password = function (form) {
        var _this = this;
        this.change_password_id = form.value.Password;
        this.ConfirmPassword_id = form.value.ConfirmPassword;
        if (this.change_password_id == this.ConfirmPassword_id) {
            var body1 = new driverModel(null, null, this.DriverID, null, null, null, null, null, null, null, null, null, null, null, form.value.Password);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Edit_Driver_Password', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.Status = data.json().extras.Status;
                    _this.Status = "Biker Change Password Successfully";
                    _this.ErrorService.handleError(_this.Status);
                    _this.change_password = false;
                    form.resetForm();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            this.Status = "Confirm Password and New password are not maching";
            this.ErrorService.handleError(this.Status);
            form.resetForm();
        }
    };
    ActiveDriversComponent.prototype.change_password_link = function () {
        this.change_password = true;
    };
    ActiveDriversComponent.prototype.Onclosepassword = function () {
        this.change_password = false;
    };
    ActiveDriversComponent.prototype.onDeleteConformDriver = function (DriverData2, i) {
        this.DriverName = DriverData2.name;
        this.isdeleteDriver = true;
    };
    ActiveDriversComponent.prototype.OnclosedeleteDriver = function () {
        this.isdeleteDriver = false;
    };
    ActiveDriversComponent.prototype.remove_Driver = function () {
        var _this = this;
        var body1 = new driverModel(null, null, this.DriverID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Reject_Driver', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isdeleteDriver = false;
                _this.DriverData.splice(_this.views, 1);
                _this.views = -1;
            }
            else {
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", EventEmitter)
    ], ActiveDriversComponent.prototype, "inputEvents", void 0);
    ActiveDriversComponent = __decorate([
        Component({
            selector: "app-activeDrivers",
            templateUrl: "./activeDrivers.component.html",
            styleUrls: ["./activeDrivers.component.css"]
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], ActiveDriversComponent);
    return ActiveDriversComponent;
}());
export { ActiveDriversComponent };
