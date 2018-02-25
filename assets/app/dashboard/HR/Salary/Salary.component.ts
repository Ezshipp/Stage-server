import { AddEmployeemodel } from './../../../front_end_models/add_employeeModel';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { EmployeeBranchModel } from './../../../front_end_models/employee_branchModel';
import { ErrorService } from './../../../errors/error.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Salary',
  templateUrl: './Salary.component.html',
  styleUrls: ['./Salary.component.css']
})
export class SalaryComponent implements OnInit {
  isSalaryPermistion: boolean;
  constructor(private _cookieService: CookieService) { }
ngOnInit() {
  var salaryPermistion=this._cookieService.get('HR_SALARY_PERMISSIONS')

          this.isSalaryPermistion=(salaryPermistion=='true')

}

}
