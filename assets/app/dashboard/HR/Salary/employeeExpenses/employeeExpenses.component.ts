import { AddingSalaryModal } from './../../../../front_end_models/Add_SalaryModel';
import { NgForm } from '@angular/forms';
import { EmployeeBranchModel } from './../../../../front_end_models/employee_branchModel';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { ImageUploadModule } from 'ng2-imageupload';

@Component({
  selector: 'app-employeeExpenses',
  templateUrl: './employeeExpenses.component.html',
  styleUrls: ['./employeeExpenses.component.css']
})
export class EmployeeExpensesComponent implements OnInit {
  index_pop: number = 0;
  skip_value_pop: number = 0;
  activeId: number;



  IsAsc_salary: boolean;
  expense_page: number = 1;
  driver_json_salary: any = [];
  Total_Count_findall_branch: any;
  mymodel_expences: string;
  Total_Count: any;
  table_data_search_salary: boolean = true;
  valu: any;
  IsAsc: boolean;
  table_data_search: boolean = true;
  mymodel: string;
  array: any = [];
  issearch: boolean;
  current_year: string;
  p: number = 1;
  index: any = 0;
  current_month: string;
  ExpensesData: any = [];
  emp_comppany_expe: any;
  emp_id_expe: any;
  form_data: boolean = false;
  Ezshipp_BranchID: any = [];
  EmployeeData: any = [];
  Status: any;
  Expencess_data: boolean = false;
  Employee_PhoneNumber: any;
  Purpose_Type: any;
  Amount: any;
  EmployeeID: any;
  Payment_Type: any;
  Year_Number: any;
  Month_Number: any;
  Comment: any;
  TransactionID: any;
  Date_Time: any;
  Employee_Email: any;
  Employee_Name: any;
  Employee_Company_ID: any;
  views: any;
  Expenses_Data: any = [];
  url: string = '';
  skip_value = 0;
  sort_type = 3;
  isData: boolean;
  isRequesting: boolean;
  array_O: any = [];
  driver_json: any = [];


  constructor(private _cookieService: CookieService,
    private http: Http, private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService, private ImageUploadModule: ImageUploadModule) { }
  yearnumber = [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024"


  ]
  Expences_monthnumber = [
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
  ]
  ngOnInit() {
    this.Find_All_Employees_Expenses()
  }
  Find_All_Employees_Expenses() {
    const body = new EmployeeBranchModel(null, this.sort_type, 0)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employees_Expenses', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.Expenses_Data = data.json().extras.ExpensesData
          this.driver_json = data.json().extras.ExpensesData
          this.Total_Count = data.json().extras.Count

          if (this.Expenses_Data.length > 0) {
            this.isData = false;
          } else {
            this.isData = true;
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  pageChanged_empExp(event) {

    this.p = event
    this.nextpage(this.p - 1)
  }
  nextpage(index) {

    this.isRequesting = true
    this.index = index;
    let skip_value = this.index * 10
    const body = new EmployeeBranchModel(null, this.sort_type, skip_value)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Employees_Expenses', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.issearch = true;
          this.Expenses_Data = data.json().extras.ExpensesData
          this.skip_value = this.index * 10
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  pageChanged_data(value) {
    this.expense_page = value
    this.nextpage_data(this.expense_page - 1)
  }
  nextpage_data(index) {
    this.isRequesting = true;

    this.index_pop = index;
    let skip_value = this.index_pop * 10
    const body = new EmployeeBranchModel(null, this.sort_type, skip_value)

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.issearch = false
          this.EmployeeData = data.json().extras.EmployeeData


          this.views = null;
          this.skip_value_pop = this.index_pop * 10
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  employee_expences(item, i) {
    this.views = i;
    this.Employee_Company_ID = item.Employee_Company_ID
    this.Employee_Name = item.Employee_Name
    this.Employee_PhoneNumber = item.Employee_PhoneNumber
    this.Employee_Email = item.Employee_Email
    this.Amount = item.Amount
    this.Date_Time = item.Date_Time
    this.TransactionID = item.TransactionID
    this.Comment = item.Comment
    this.Month_Number = item.Month_Number
    this.Year_Number = item.Year_Number
    this.Payment_Type = item.Payment_Type
    this.EmployeeID = item.EmployeeID
    this.Purpose_Type = item.Purpose_Type


  }
  click_employee_add() {

    var message = "Please complete your profile"
    this.ErrorService.handleError(message)


  }
  close_table() {
    this.views = -1;
  }
  button_click() {
    this.Expencess_data = true
    this.findall_branch()


  }
  back_button_table() {
    this.Expencess_data = false

  }
  click_button_employee(item, i) {
    this.form_data = true;
    this.Expencess_data = false
    this.emp_comppany_expe = item.Employee_Company_ID
    this.emp_id_expe = item.EmployeeID
    var d = new Date()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    this.current_year = year.toString()
  }
  back_button_profile() {
    this.Expencess_data = true
    this.form_data = false;
  }
  onSubmit_expencess(form: NgForm) {
    this.Amount = form.value.Amount
    var paymenttype = form.value.payment_type;
    var transaction_id = form.value.transaction_id;
    var PurposeType = form.value.Purpose_Type;
    var Comment = form.value.Comment;
    var Monthnumber = form.value.Month_number;
    let Yearnumber = form.value.Year_number;


    const body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null,
      form.value.payment_type, form.value.transaction_id, form.value.Comment,
      form.value.Month_number, form.value.Year_number, null, null, null, form.value.Amount, form.value.Purpose_Type)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Employee_Expenses', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {


          var message = "Employee Expenses Addedd Successfully";
          this.ErrorService.handleError(message)

          this.form_data = false;
          this.Expencess_data = false;
          this.ngOnInit()
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);

          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  findall_branch() {
    const body = new EmployeeBranchModel(null, this.sort_type, 0)
    this.expense_page = 1
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          this.EmployeeData = data.json().extras.EmployeeData
          this.driver_json_salary = data.json().extras.ExpensesData
          this.Total_Count_findall_branch = data.json().extras.Count

          this.isRequesting = false;
          if (this.EmployeeData.length > 0) {
            this.isRequesting = false;
          } else {
            this.isData = true;
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  changeMonth(value) {
  }

  valuechange(newValue: string) {

    this.mymodel = newValue;
    let length = newValue.length
    this.isRequesting = true;
    if (length >= 3) {
      this.Expenses_Data = []
      this.array_O = []
      this.skip_value = 0
      const body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue)

      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(this.url + '/Search_All_Employees_Expenses', body1, { headers: headers })
        .subscribe(
        data => {
          if (data.json().success) {
            this.issearch = true;
            this.array.length = 0
            this.Expenses_Data = data.json().extras.ExpensesData

            this.isRequesting = false;
            this.issearch = true;
            if (this.Expenses_Data.length) {
              this.isData = false;
              this.table_data_search = true;
            } else {
              this.isData = true;
              this.table_data_search = false;
            }

          }
          else {
            const msgNumber: number = parseInt(data.json().extras.msg);
            let message = this._ApiMessageService.ApiMessages[msgNumber]
            this.ErrorService.handleError(message)
          }
        }
        )
    } else {
      this.ngOnInit()
    }
  }

  salary_valuechange(newValue: string) {

    this.mymodel_expences = newValue;

    let length = newValue.length
    this.isRequesting = true;
    if (length >= 3) {
      this.EmployeeData = []
      this.array_O = []
      this.skip_value = 0
      const body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue)

      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
        .subscribe(
        data => {
          if (data.json().success) {

            this.array.length = 0

            this.EmployeeData = data.json().extras.EmployeeData
            this.isRequesting = false;
            this.issearch = true;
            if (this.EmployeeData.length) {
              this.isData = false;
              this.table_data_search_salary = true;
            } else {
              this.isData = true;
              this.table_data_search_salary = false;
            }
          }
          else {
            const msgNumber: number = parseInt(data.json().extras.msg);
            let message = this._ApiMessageService.ApiMessages[msgNumber]
            this.ErrorService.handleError(message)
          }
        }
        )
    } else {
      this.findall_branch()
    }
  }

  mployees_Expenses_Month_Year(month, year) {
    const body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null, null, null, null, month, year, null, null, null, null, null, this.skip_value, this.sort_type)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employees_Expenses_Month_Year', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.ExpensesData = data.json().extras.ExpensesData

          if (this.ExpensesData.length >= 0) {
            this.isData = true;
          } else {
          }



        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }


  sortColumn(key) {
    this.IsAsc = !this.IsAsc
    this.valu = key

    this.sortResults(this.valu, this.IsAsc);
  }
  sortColumnReverse(key) {
    this.valu = key
    this.sortResults(key, false);
  }
  sortResults(prop, asc) {
    this.Expenses_Data = this.driver_json.sort(function (a, b) {


      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
    return this.Expenses_Data
  }

























}
