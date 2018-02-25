import { AddEmployeemodel } from './../../../../front_end_models/add_employeeModel';
import { EmployeeBranchModel } from './../../../../front_end_models/employee_branchModel';
import { ApiMessageService } from './../../../../authentication/apimessages.service';
import { ErrorService } from './../../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { AddingSalaryModal } from "../../../../front_end_models/Add_SalaryModel";
import { ImageUploadModule, ResizeOptions } from 'ng2-imageupload';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-detailSalaryComponent',
    templateUrl: './detailSalaryComponent.component.html',
    styleUrls: ['./detailSalaryComponent.component.css']
})
export class DetailSalaryComponentComponent implements OnInit {
    current_year: string;
    Payment_Type_id: any;

    Attendance_monthly: any;
    Attendance: any;
    noofworkingdays = 0;
    skip_value_data: number = 0;
    index_nextpage_data: number = 0;
    activeId: number;
    activeId_exp: number;
    valu_expencess: any;
    IsAsc_expencess: boolean;
    issearch_valuechange: boolean;
    issearch_empvie: boolean;
    salary_page: number = 1;
    Total_Count_findall_branch: any;
    driver_json_salary: any = [];
    table_data_search_salary: boolean = true;
    Salary_Data: any = [];
    table_data_search: boolean = true;
    valu: any;
    IsAsc: boolean;
    Exp_amount_count: any;
    Expenses_Amount: any;
    Employee_salary_Name: any;
    salary_PhoneNumber: any;
    emp_id_expe: any;
    emp_comppany_expe: any;
    open_zones: boolean = false;
    ProcessStage: boolean;
    PDFLink: any;
    Exp_amount: any = [];
    Employee_Total_Salary: any;
    Total_Deductions: any;
    ExpensesAmount: any;
    Address_Proof_Image: any;
    Pan_Card_Number: any;
    Pan_Card_Image: any;
    Driving_License_Image: any;
    Driving_License_Expiry_Date: any;
    Bank_IFSC_No: any;
    Bank_Name: any;
    Bank_Account_No: any;
    Employee_Address: any;
    Address_Proof_Type: any;
    Employee_DOB: any;
    Employee_Image_Url: any;
    Employee_Date_of_Joining: any;
    profile_set: boolean = false;
    Driving_License_Available: boolean;
    Address_Proof_Available: boolean;
    Pan_Card_Available: boolean;
    filepan: any;
    ImageURL3: string;
    file11: File;
    pancard: string;
    filecard: string = "Upload Image";
    ImageURL2: string;
    file6: File;
    card: string;
    filelicence: string = "Upload Image";
    file3: File;
    ImageURL1: string;
    fileName: string = "Upload Image";
    ImageURL: any;
    file1: File;
    licence: string;
    Employee_R: any;
    date_06: any;
    date_05: any;
    Picture: any;
    Employee_Image_Available: boolean;
    Complete_Profile_Set: any;
    EmployeeData: any = [];
    Employee_salary_view_2: boolean = true;
    views_salary: any;
    add_salary_id: boolean = false;
    count_add: number;
    count: number = 2017;
    item: number;
    add_salary: boolean = false;
    salary_button_close: boolean = true;
    array_O: any = [];
    array: any = [];
    driver_json: any = [];


    Year_Number: any;
    Month_Number: any;
    Date_Time: any;
    Employee_Loss_of_Pay: any;
    p: number = 1; index = 0; issearch: boolean; Total_Count: any;
    mymodel: string;
    mymodelSalary: string
    Total_Expenses: any;
    isRequesting: boolean;
    isData: boolean;
    istransaction: boolean;
    expense: any = [];
    Amount: any = 0;
    status: any;
    Employee_TDS: any;
    Employee_PF: any;
    Employee_Basic_Salary: any;
    Employee_PhoneNumber: any;
    Employee_Gender: any;
    Employee_Email: any;
    Employee_Role: any;
    Employee_Name: any;
    Employee_Company_ID: any;
    views: any;
    Ezshipp_Branch_Data: any = [];

    Employees_Data: any = [];
    skip_value = 0;
    sort_type = 3;
    Ezshipp_BranchID: any = [];
    Status: any;
    Comment: any;
    Purpose_Type: any;
    TransactionID: any;
    Payment_Type: any;
    ExpenseID: any;
    EmployeeID: any;

    url: string = '';
    isaddExpenses: boolean;
    PaymentArray = [
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
    yearnumber = [
        "2017",
        "2018",
        "2019",
        "2020"


    ]
    Expences_yearnumber = [
        "2017",
        "2018",
        "2019",
        "2020"


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







    button_close: boolean = true;
    Employee_salary: boolean = false;
    Employee_salary_view: boolean = true;



    constructor(private _cookieService: CookieService,
        private http: Http, private _ApiMessageService: ApiMessageService,
        private ErrorService: ErrorService, private ImageUploadModule: ImageUploadModule) { }

    ngOnInit() {
        this.isRequesting = true;
        this.find_Employees_of_Branch()

    }

    find_Employees_of_Branch() {
        const body = new EmployeeBranchModel(null, this.sort_type, 0)


        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Employees_Paid_Salaries', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.issearch_empvie = false
                    this.isRequesting = false;
                    this.Employees_Data = data.json().extras.SalaryData
                    this.driver_json = data.json().extras.SalaryData
                    this.Total_Count = data.json().extras.Count
                    let count: number = parseInt(data.json().extras.Count)

                    let count1: number = Math.floor(count / 10);
                    let count2 = count % 10
                    if (count2 == 0) {
                        this.array_O.length = count1
                    } else {
                        this.array_O.length = count1 + 1
                    }


                    this.Total_Count = data.json().extras.Count

                    if (this.Employees_Data.length) {
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

    pageChanged_salary_view(value) {
        this.p = value;

        this.nextpage(this.p - 1)
    }
    nextpage(index) {
        this.isRequesting = true;

        this.index = index;
        let skip_value = this.index * 10
        const body = new EmployeeBranchModel(null, this.sort_type, skip_value)

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees_Paid_Salaries', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting = false;
                    this.issearch = false
                    this.Employees_Data = data.json().extras.SalaryData

                    this.views = null;
                    this.skip_value = this.index * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }

    pageChanged_salary_data(value) {
        this.salary_page = value;

        this.nextpage_data(this.salary_page - 1)
    }
    nextpage_data(index) {
        this.isRequesting = true;

        this.index_nextpage_data = index;
        let skip_value = this.index_nextpage_data * 10
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
                    this.skip_value_data = this.index_nextpage_data * 10
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }

    findall_branch() {
        const body = new EmployeeBranchModel(null, this.sort_type, 0)
        this.salary_page = 1
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.issearch_valuechange = false
                    this.EmployeeData = data.json().extras.EmployeeData
                    this.driver_json_salary = data.json().extras.EmployeeData
                    this.isRequesting = false;
                    this.Total_Count_findall_branch = data.json().extras.Count
                    if (this.EmployeeData.length > 0) {

                        this.Ezshipp_BranchID = this.EmployeeData[0].Ezshipp_BranchID
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

    close_table() {
        this.views = -1;
        this.views_salary = -1;
    }
    close() {
        this.views = -1;
    }

    click_button_employee(item, i) {

        this.add_salary = true;
        this.add_salary_id = false;

        this.Employee_salary_Name = item.Employee_Name
        this.emp_comppany_expe = item.Employee_Company_ID
        this.emp_id_expe = item.EmployeeID
        this.Employee_Basic_Salary = item.Employee_Basic_Salary
        this.Exp_amount_count = item.Exp_amount
        this.Attendance_monthly = item.Attendance

        var d = new Date()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        this.Year_Number = year
        this.Month_Number = month
        this.current_year = year.toString()
        this.Employes_of_Expences(month, year)
    }

    changeMonth(value) {
        this.Employes_of_Expences(value, this.Year_Number);
    }

    moreinfo_salary(item, i) {
        this.views = i;
        this.Employee_Company_ID = item.Employee_Company_ID
        this.PDFLink = item.PDFLink
        this.ProcessStage = item.ProcessStage

        this.Employee_Name = item.Employee_Name
        this.Employee_Role = item.Employee_Role
        this.status = item.status
        this.Employee_Email = item.Employee_Email
        this.Employee_Loss_of_Pay = item.Employee_Loss_of_Pay
        this.Date_Time = item.Date_Time
        this.Employee_Basic_Salary = item.Employee_Basic_Salary
        this.Employee_PF = item.Employee_PF
        this.Employee_TDS = item.Employee_TDS
        this.TransactionID = item.TransactionID
        this.Comment = item.Comment
        this.Month_Number = item.Month_Number

        this.Year_Number = item.Year_Number
        this.Payment_Type_id = item.Payment_Type
        this.EmployeeID = item.EmployeeID
        this.Complete_Profile_Set = item.Complete_Profile_Set
        this.ExpensesAmount = item.ExpensesAmount

        this.Total_Deductions = item.Total_Deductions

        this.Employee_Total_Salary = item.Employee_Total_Salary


    }
    select(value, event) {
        this.Payment_Type_id = value;
        if (value == 1) {
            this.istransaction = false
        } else {
            this.istransaction = true
        }


    }
    selectPurpose(value, event) {
        this.Purpose_Type = value;

    }


    valuechange(newValue: string) {

        this.mymodel = newValue;
        let length = newValue.length
        this.isRequesting = true;
        if (length >= 3) {
            this.Employees_Data = []
            this.array_O = []
            this.skip_value = 0
            const body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees_Paid_Salaries', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {
                        this.issearch_empvie = true

                        this.array.length = 0

                        this.Employees_Data = data.json().extras.SalaryData
                        this.isRequesting = false;
                        this.issearch = true;
                        if (this.Employees_Data.length) {
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

        this.mymodelSalary = newValue;

        let length = newValue.length

        if (length >= 3) {
            this.EmployeeData = []
            this.array_O = []
            this.skip_value_data = 0
            const body1 = new EmployeeBranchModel(null, this.sort_type, null, newValue)

            const headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
                .subscribe(
                data => {
                    if (data.json().success) {

                        this.array.length = 0
                        this.issearch_valuechange = true
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

    addExpenses() {

        this.isaddExpenses = true;
    }

    OncloseAddExpesis() {
        this.isaddExpenses = false;
    }

    salary_button_click() {
        this.add_salary_id = true;
        this.findall_branch()
    }
    back_button() {
        this.add_salary_id = true;
        this.add_salary = false;
    }

    back_button_table() {
        this.add_salary_id = false;
        this.activeId_exp = -1
        this.Employee_salary_view_2 = true;


    }

    onSubmit_addsalary(form: NgForm) {
        var empbasic_salary = form.value.emp_basic_salary;
        var emppf = form.value.emp_pf;
        var emptds = form.value.emp_tds;
        let emplosspay = form.value.emp_losspay;
        var paymenttype = form.value.payment_type;

        var transaction_id = form.value.transaction_id;
        var Comment = form.value.Comment;
        var Monthnumber = form.value.Month_number;
        let Yearnumber = form.value.Year_number;
        this.Exp_amount = form.value.ExpensesAmount
        this.Total_Deductions = form.value.total_deduction
        this.Employee_Total_Salary = form.value.Total_Salary



        const body = new AddingSalaryModal(this.emp_id_expe,
            form.value.emp_basic_salary,
            form.value.emp_pf,
            form.value.emp_tds,
            form.value.emp_losspay,
            form.value.payment_type,
            form.value.transaction_id,
            form.value.Comment,
            form.value.Month_number,
            form.value.Year_number,
            this.Exp_amount,
            form.value.total_deduction,
            form.value.Total_Salary


        )

        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Add_Employee_Salary_Paid_Details', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {


                    var message = "Employee Salary Addedd Successfully";
                    this.ErrorService.handleError(message)

                    this.add_salary = false;
                    this.add_salary_id = false;
                    this.ngOnInit()
                } else {
                    const msgNumber: number = parseInt(data.json().extras.msg);

                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            })
    }
    Employes_of_Expences(val1, val2) {
        const body = new AddingSalaryModal(this.emp_id_expe, null, null, null, null, null, null, null, val1, val2)


        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + '/Send_Employee_Expense', body, { headers: headers })
            .subscribe(data => {
                if (data.json().success) {
                    this.isRequesting = false;
                    this.Exp_amount = data.json().extras.ExpensesAmount
                    this.Attendance = data.json().extras.Attendance




                    if (this.Exp_amount.length >= 0) {
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


    click_employee_add() {

        var message = "Please complete your profile"
        this.ErrorService.handleError(message)
        this.Picture = ''
        this.licence = ''
        this.card = ''
        this.pancard = ''
        this.profile_set = true


    }
    back_button_profile() {
        this.profile_set = false
        this.add_salary_id = true
    }
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 600,
        resizeMaxWidth: 800
    };

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
        this.Employees_Data = this.driver_json.sort(function (a, b) {


            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.Employees_Data
    }


    sortColumn_salary(key) {
        this.IsAsc_expencess = !this.IsAsc_expencess
        this.valu_expencess = key

        this.sort_Results(this.valu_expencess, this.IsAsc_expencess);
    }
    sortColumn_salary_Reverse(key) {
        this.valu_expencess = key
        this.sort_Results(key, false);
    }
    sort_Results(prop, asc) {
        this.EmployeeData = this.driver_json_salary.sort(function (a, b) {


            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.EmployeeData
    }



}
