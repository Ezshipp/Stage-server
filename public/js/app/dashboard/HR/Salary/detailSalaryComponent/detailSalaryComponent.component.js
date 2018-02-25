var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EmployeeBranchModel } from './../../../../front_end_models/employee_branchModel';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { AddingSalaryModal } from "../../../../front_end_models/Add_SalaryModel";
import { ImageUploadModule } from 'ng2-imageupload';
var DetailSalaryComponentComponent = /** @class */ (function () {
    function DetailSalaryComponentComponent(_cookieService, http, _ApiMessageService, ErrorService, ImageUploadModule) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ImageUploadModule = ImageUploadModule;
        this.noofworkingdays = 0;
        this.skip_value_data = 0;
        this.index_nextpage_data = 0;
        this.salary_page = 1;
        this.driver_json_salary = [];
        this.table_data_search_salary = true;
        this.Salary_Data = [];
        this.table_data_search = true;
        this.open_zones = false;
        this.Exp_amount = [];
        this.profile_set = false;
        this.filecard = "Upload Image";
        this.filelicence = "Upload Image";
        this.fileName = "Upload Image";
        this.EmployeeData = [];
        this.Employee_salary_view_2 = true;
        this.add_salary_id = false;
        this.count = 2017;
        this.add_salary = false;
        this.salary_button_close = true;
        this.array_O = [];
        this.array = [];
        this.driver_json = [];
        this.p = 1;
        this.index = 0;
        this.expense = [];
        this.Amount = 0;
        this.Ezshipp_Branch_Data = [];
        this.Employees_Data = [];
        this.skip_value = 0;
        this.sort_type = 3;
        this.Ezshipp_BranchID = [];
        this.url = '';
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
        this.yearnumber = [
            "2017",
            "2018",
            "2019",
            "2020"
        ];
        this.Expences_yearnumber = [
            "2017",
            "2018",
            "2019",
            "2020"
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
        this.button_close = true;
        this.Employee_salary = false;
        this.Employee_salary_view = true;
        this.resizeOptions = {
            resizeMaxHeight: 600,
            resizeMaxWidth: 800
        };
    }
    DetailSalaryComponentComponent.prototype.ngOnInit = function () {
        this.isRequesting = true;
        this.find_Employees_of_Branch();
    };
    DetailSalaryComponentComponent.prototype.find_Employees_of_Branch = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, this.sort_type, 0);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Paid_Salaries', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.issearch_empvie = false;
                _this.isRequesting = false;
                _this.Employees_Data = data.json().extras.SalaryData;
                _this.driver_json = data.json().extras.SalaryData;
                _this.Total_Count = data.json().extras.Count;
                var count = parseInt(data.json().extras.Count);
                var count1 = Math.floor(count / 10);
                var count2 = count % 10;
                if (count2 == 0) {
                    _this.array_O.length = count1;
                }
                else {
                    _this.array_O.length = count1 + 1;
                }
                _this.Total_Count = data.json().extras.Count;
                if (_this.Employees_Data.length) {
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
    DetailSalaryComponentComponent.prototype.pageChanged_salary_view = function (value) {
        this.p = value;
        this.nextpage(this.p - 1);
    };
    DetailSalaryComponentComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var body = new EmployeeBranchModel(null, this.sort_type, skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Paid_Salaries', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.Employees_Data = data.json().extras.SalaryData;
                _this.views = null;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    DetailSalaryComponentComponent.prototype.pageChanged_salary_data = function (value) {
        this.salary_page = value;
        this.nextpage_data(this.salary_page - 1);
    };
    DetailSalaryComponentComponent.prototype.nextpage_data = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index_nextpage_data = index;
        var skip_value = this.index_nextpage_data * 10;
        var body = new EmployeeBranchModel(null, this.sort_type, skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = false;
                _this.EmployeeData = data.json().extras.EmployeeData;
                _this.views = null;
                _this.skip_value_data = _this.index_nextpage_data * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    DetailSalaryComponentComponent.prototype.findall_branch = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, this.sort_type, 0);
        this.salary_page = 1;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.issearch_valuechange = false;
                _this.EmployeeData = data.json().extras.EmployeeData;
                _this.driver_json_salary = data.json().extras.EmployeeData;
                _this.isRequesting = false;
                _this.Total_Count_findall_branch = data.json().extras.Count;
                if (_this.EmployeeData.length > 0) {
                    _this.Ezshipp_BranchID = _this.EmployeeData[0].Ezshipp_BranchID;
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
    DetailSalaryComponentComponent.prototype.close_table = function () {
        this.views = -1;
        this.views_salary = -1;
    };
    DetailSalaryComponentComponent.prototype.close = function () {
        this.views = -1;
    };
    DetailSalaryComponentComponent.prototype.click_button_employee = function (item, i) {
        this.add_salary = true;
        this.add_salary_id = false;
        this.Employee_salary_Name = item.Employee_Name;
        this.emp_comppany_expe = item.Employee_Company_ID;
        this.emp_id_expe = item.EmployeeID;
        this.Employee_Basic_Salary = item.Employee_Basic_Salary;
        this.Exp_amount_count = item.Exp_amount;
        this.Attendance_monthly = item.Attendance;
        var d = new Date();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        this.Year_Number = year;
        this.Month_Number = month;
        this.current_year = year.toString();
        this.Employes_of_Expences(month, year);
    };
    DetailSalaryComponentComponent.prototype.changeMonth = function (value) {
        this.Employes_of_Expences(value, this.Year_Number);
    };
    DetailSalaryComponentComponent.prototype.moreinfo_salary = function (item, i) {
        this.views = i;
        this.Employee_Company_ID = item.Employee_Company_ID;
        this.PDFLink = item.PDFLink;
        this.ProcessStage = item.ProcessStage;
        this.Employee_Name = item.Employee_Name;
        this.Employee_Role = item.Employee_Role;
        this.status = item.status;
        this.Employee_Email = item.Employee_Email;
        this.Employee_Loss_of_Pay = item.Employee_Loss_of_Pay;
        this.Date_Time = item.Date_Time;
        this.Employee_Basic_Salary = item.Employee_Basic_Salary;
        this.Employee_PF = item.Employee_PF;
        this.Employee_TDS = item.Employee_TDS;
        this.TransactionID = item.TransactionID;
        this.Comment = item.Comment;
        this.Month_Number = item.Month_Number;
        this.Year_Number = item.Year_Number;
        this.Payment_Type_id = item.Payment_Type;
        this.EmployeeID = item.EmployeeID;
        this.Complete_Profile_Set = item.Complete_Profile_Set;
        this.ExpensesAmount = item.ExpensesAmount;
        this.Total_Deductions = item.Total_Deductions;
        this.Employee_Total_Salary = item.Employee_Total_Salary;
    };
    DetailSalaryComponentComponent.prototype.select = function (value, event) {
        this.Payment_Type_id = value;
        if (value == 1) {
            this.istransaction = false;
        }
        else {
            this.istransaction = true;
        }
    };
    DetailSalaryComponentComponent.prototype.selectPurpose = function (value, event) {
        this.Purpose_Type = value;
    };
    DetailSalaryComponentComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.mymodel = newValue;
        var length = newValue.length;
        this.isRequesting = true;
        if (length >= 3) {
            this.Employees_Data = [];
            this.array_O = [];
            this.skip_value = 0;
            var body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees_Paid_Salaries', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.issearch_empvie = true;
                    _this.array.length = 0;
                    _this.Employees_Data = data.json().extras.SalaryData;
                    _this.isRequesting = false;
                    _this.issearch = true;
                    if (_this.Employees_Data.length) {
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
    DetailSalaryComponentComponent.prototype.salary_valuechange = function (newValue) {
        var _this = this;
        this.mymodelSalary = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.EmployeeData = [];
            this.array_O = [];
            this.skip_value_data = 0;
            var body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.array.length = 0;
                    _this.issearch_valuechange = true;
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
    DetailSalaryComponentComponent.prototype.addExpenses = function () {
        this.isaddExpenses = true;
    };
    DetailSalaryComponentComponent.prototype.OncloseAddExpesis = function () {
        this.isaddExpenses = false;
    };
    DetailSalaryComponentComponent.prototype.salary_button_click = function () {
        this.add_salary_id = true;
        this.findall_branch();
    };
    DetailSalaryComponentComponent.prototype.back_button = function () {
        this.add_salary_id = true;
        this.add_salary = false;
    };
    DetailSalaryComponentComponent.prototype.back_button_table = function () {
        this.add_salary_id = false;
        this.activeId_exp = -1;
        this.Employee_salary_view_2 = true;
    };
    DetailSalaryComponentComponent.prototype.onSubmit_addsalary = function (form) {
        var _this = this;
        var empbasic_salary = form.value.emp_basic_salary;
        var emppf = form.value.emp_pf;
        var emptds = form.value.emp_tds;
        var emplosspay = form.value.emp_losspay;
        var paymenttype = form.value.payment_type;
        var transaction_id = form.value.transaction_id;
        var Comment = form.value.Comment;
        var Monthnumber = form.value.Month_number;
        var Yearnumber = form.value.Year_number;
        this.Exp_amount = form.value.ExpensesAmount;
        this.Total_Deductions = form.value.total_deduction;
        this.Employee_Total_Salary = form.value.Total_Salary;
        var body = new AddingSalaryModal(this.emp_id_expe, form.value.emp_basic_salary, form.value.emp_pf, form.value.emp_tds, form.value.emp_losspay, form.value.payment_type, form.value.transaction_id, form.value.Comment, form.value.Month_number, form.value.Year_number, this.Exp_amount, form.value.total_deduction, form.value.Total_Salary);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Employee_Salary_Paid_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = "Employee Salary Addedd Successfully";
                _this.ErrorService.handleError(message);
                _this.add_salary = false;
                _this.add_salary_id = false;
                _this.ngOnInit();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message_1);
            }
        });
    };
    DetailSalaryComponentComponent.prototype.Employes_of_Expences = function (val1, val2) {
        var _this = this;
        var body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null, null, null, null, val1, val2);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Send_Employee_Expense', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Exp_amount = data.json().extras.ExpensesAmount;
                _this.Attendance = data.json().extras.Attendance;
                if (_this.Exp_amount.length >= 0) {
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
    DetailSalaryComponentComponent.prototype.click_employee_add = function () {
        var message = "Please complete your profile";
        this.ErrorService.handleError(message);
        this.Picture = '';
        this.licence = '';
        this.card = '';
        this.pancard = '';
        this.profile_set = true;
    };
    DetailSalaryComponentComponent.prototype.back_button_profile = function () {
        this.profile_set = false;
        this.add_salary_id = true;
    };
    DetailSalaryComponentComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.sortResults(this.valu, this.IsAsc);
    };
    DetailSalaryComponentComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    DetailSalaryComponentComponent.prototype.sortResults = function (prop, asc) {
        this.Employees_Data = this.driver_json.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.Employees_Data;
    };
    DetailSalaryComponentComponent.prototype.sortColumn_salary = function (key) {
        this.IsAsc_expencess = !this.IsAsc_expencess;
        this.valu_expencess = key;
        this.sort_Results(this.valu_expencess, this.IsAsc_expencess);
    };
    DetailSalaryComponentComponent.prototype.sortColumn_salary_Reverse = function (key) {
        this.valu_expencess = key;
        this.sort_Results(key, false);
    };
    DetailSalaryComponentComponent.prototype.sort_Results = function (prop, asc) {
        this.EmployeeData = this.driver_json_salary.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.EmployeeData;
    };
    DetailSalaryComponentComponent = __decorate([
        Component({
            selector: 'app-detailSalaryComponent',
            templateUrl: './detailSalaryComponent.component.html',
            styleUrls: ['./detailSalaryComponent.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService, ImageUploadModule])
    ], DetailSalaryComponentComponent);
    return DetailSalaryComponentComponent;
}());
export { DetailSalaryComponentComponent };
