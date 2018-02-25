var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AddingSalaryModal } from './../../../../front_end_models/Add_SalaryModel';
import { EmployeeBranchModel } from './../../../../front_end_models/employee_branchModel';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { ImageUploadModule } from 'ng2-imageupload';
var EmployeeExpensesComponent = /** @class */ (function () {
    function EmployeeExpensesComponent(_cookieService, http, _ApiMessageService, ErrorService, ImageUploadModule) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ImageUploadModule = ImageUploadModule;
        this.index_pop = 0;
        this.skip_value_pop = 0;
        this.expense_page = 1;
        this.driver_json_salary = [];
        this.table_data_search_salary = true;
        this.table_data_search = true;
        this.array = [];
        this.p = 1;
        this.index = 0;
        this.ExpensesData = [];
        this.form_data = false;
        this.Ezshipp_BranchID = [];
        this.EmployeeData = [];
        this.Expencess_data = false;
        this.Expenses_Data = [];
        this.url = '';
        this.skip_value = 0;
        this.sort_type = 3;
        this.array_O = [];
        this.driver_json = [];
        this.yearnumber = [
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024"
        ];
        this.Expences_monthnumber = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    }
    EmployeeExpensesComponent.prototype.ngOnInit = function () {
        this.Find_All_Employees_Expenses();
    };
    EmployeeExpensesComponent.prototype.Find_All_Employees_Expenses = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, this.sort_type, 0);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Expenses', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Expenses_Data = data.json().extras.ExpensesData;
                _this.driver_json = data.json().extras.ExpensesData;
                _this.Total_Count = data.json().extras.Count;
                if (_this.Expenses_Data.length > 0) {
                    _this.isData = false;
                }
                else {
                    _this.isData = true;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeExpensesComponent.prototype.pageChanged_empExp = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    EmployeeExpensesComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var body = new EmployeeBranchModel(null, this.sort_type, skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Expenses', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = true;
                _this.Expenses_Data = data.json().extras.ExpensesData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeExpensesComponent.prototype.pageChanged_data = function (value) {
        this.expense_page = value;
        this.nextpage_data(this.expense_page - 1);
    };
    EmployeeExpensesComponent.prototype.nextpage_data = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index_pop = index;
        var skip_value = this.index_pop * 10;
        var body = new EmployeeBranchModel(null, this.sort_type, skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.EmployeeData = data.json().extras.EmployeeData;
                _this.views = null;
                _this.skip_value_pop = _this.index_pop * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeExpensesComponent.prototype.employee_expences = function (item, i) {
        this.views = i;
        this.Employee_Company_ID = item.Employee_Company_ID;
        this.Employee_Name = item.Employee_Name;
        this.Employee_PhoneNumber = item.Employee_PhoneNumber;
        this.Employee_Email = item.Employee_Email;
        this.Amount = item.Amount;
        this.Date_Time = item.Date_Time;
        this.TransactionID = item.TransactionID;
        this.Comment = item.Comment;
        this.Month_Number = item.Month_Number;
        this.Year_Number = item.Year_Number;
        this.Payment_Type = item.Payment_Type;
        this.EmployeeID = item.EmployeeID;
        this.Purpose_Type = item.Purpose_Type;
    };
    EmployeeExpensesComponent.prototype.click_employee_add = function () {
        var message = "Please complete your profile";
        this.ErrorService.handleError(message);
    };
    EmployeeExpensesComponent.prototype.close_table = function () {
        this.views = -1;
    };
    EmployeeExpensesComponent.prototype.button_click = function () {
        this.Expencess_data = true;
        this.findall_branch();
    };
    EmployeeExpensesComponent.prototype.back_button_table = function () {
        this.Expencess_data = false;
    };
    EmployeeExpensesComponent.prototype.click_button_employee = function (item, i) {
        this.form_data = true;
        this.Expencess_data = false;
        this.emp_comppany_expe = item.Employee_Company_ID;
        this.emp_id_expe = item.EmployeeID;
        var d = new Date();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        this.current_year = year.toString();
    };
    EmployeeExpensesComponent.prototype.back_button_profile = function () {
        this.Expencess_data = true;
        this.form_data = false;
    };
    EmployeeExpensesComponent.prototype.onSubmit_expencess = function (form) {
        var _this = this;
        this.Amount = form.value.Amount;
        var paymenttype = form.value.payment_type;
        var transaction_id = form.value.transaction_id;
        var PurposeType = form.value.Purpose_Type;
        var Comment = form.value.Comment;
        var Monthnumber = form.value.Month_number;
        var Yearnumber = form.value.Year_number;
        var body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null, form.value.payment_type, form.value.transaction_id, form.value.Comment, form.value.Month_number, form.value.Year_number, null, null, null, form.value.Amount, form.value.Purpose_Type);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Employee_Expenses', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = "Employee Expenses Addedd Successfully";
                _this.ErrorService.handleError(message);
                _this.form_data = false;
                _this.Expencess_data = false;
                _this.ngOnInit();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message_1);
            }
        });
    };
    EmployeeExpensesComponent.prototype.findall_branch = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, this.sort_type, 0);
        this.expense_page = 1;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.EmployeeData = data.json().extras.EmployeeData;
                _this.driver_json_salary = data.json().extras.ExpensesData;
                _this.Total_Count_findall_branch = data.json().extras.Count;
                _this.isRequesting = false;
                if (_this.EmployeeData.length > 0) {
                    _this.isRequesting = false;
                }
                else {
                    _this.isData = true;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeExpensesComponent.prototype.changeMonth = function (value) {
    };
    EmployeeExpensesComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.mymodel = newValue;
        var length = newValue.length;
        this.isRequesting = true;
        if (length >= 3) {
            this.Expenses_Data = [];
            this.array_O = [];
            this.skip_value = 0;
            var body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees_Expenses', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.issearch = true;
                    _this.array.length = 0;
                    _this.Expenses_Data = data.json().extras.ExpensesData;
                    _this.isRequesting = false;
                    _this.issearch = true;
                    if (_this.Expenses_Data.length) {
                        _this.isData = false;
                        _this.table_data_search = true;
                    }
                    else {
                        _this.isData = true;
                        _this.table_data_search = false;
                    }
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            this.ngOnInit();
        }
    };
    EmployeeExpensesComponent.prototype.salary_valuechange = function (newValue) {
        var _this = this;
        this.mymodel_expences = newValue;
        var length = newValue.length;
        this.isRequesting = true;
        if (length >= 3) {
            this.EmployeeData = [];
            this.array_O = [];
            this.skip_value = 0;
            var body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.array.length = 0;
                    _this.EmployeeData = data.json().extras.EmployeeData;
                    _this.isRequesting = false;
                    _this.issearch = true;
                    if (_this.EmployeeData.length) {
                        _this.isData = false;
                        _this.table_data_search_salary = true;
                    }
                    else {
                        _this.isData = true;
                        _this.table_data_search_salary = false;
                    }
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
        else {
            this.findall_branch();
        }
    };
    EmployeeExpensesComponent.prototype.mployees_Expenses_Month_Year = function (month, year) {
        var _this = this;
        var body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null, null, null, null, month, year, null, null, null, null, null, this.skip_value, this.sort_type);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Expenses_Month_Year', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.ExpensesData = data.json().extras.ExpensesData;
                if (_this.ExpensesData.length >= 0) {
                    _this.isData = true;
                }
                else {
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeExpensesComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.sortResults(this.valu, this.IsAsc);
    };
    EmployeeExpensesComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    EmployeeExpensesComponent.prototype.sortResults = function (prop, asc) {
        this.Expenses_Data = this.driver_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.Expenses_Data;
    };
    EmployeeExpensesComponent = __decorate([
        Component({
            selector: 'app-employeeExpenses',
            templateUrl: './employeeExpenses.component.html',
            styleUrls: ['./employeeExpenses.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService, ImageUploadModule])
    ], EmployeeExpensesComponent);
    return EmployeeExpensesComponent;
}());
export { EmployeeExpensesComponent };
