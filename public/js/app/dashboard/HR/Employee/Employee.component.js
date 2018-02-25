var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { driverModel } from './../../../front_end_models/driverModel';
import { AddEmployeemodel } from './../../../front_end_models/add_employeeModel';
import { EmployeeBranchModel } from './../../../front_end_models/employee_branchModel';
import { ErrorService } from './../../../errors/error.service';
import { ImageUploadModule } from 'ng2-imageupload';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AllImagesEditModel } from "../../../front_end_models/images_editModel";
var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(_cookieService, router, http, _ApiMessageService, ErrorService, ImageUploadModule) {
        this._cookieService = _cookieService;
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.ImageUploadModule = ImageUploadModule;
        this.open_loading_images = false;
        this.image_gif = "./img/giphy.gif";
        this.isProfile_Edit = false;
        this.isAddress_Edit = false;
        this.isPancard_Edit = false;
        this.isLicence_Edit = false;
        this.Employee_Date_of_Joining_vishu = '2018-12-25';
        this.Edit_employee_data = false;
        this.licence_upload = false;
        this.pancard_upload = false;
        this.Address_upload = false;
        this.Profile_upload = false;
        this.prifileimg = "./img/Asset 3hdpi.png";
        this.prifileimg_1 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_2 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_3 = "./img/Asset 1xxhdpi.png";
        this.p = 1;
        this.index = 0;
        this.open_zones_profile = false;
        this.License_view_image = false;
        this.Profile_view_image = false;
        this.Address_view_image = false;
        this.pancard_view_image = false;
        this.licence_pic_view = false;
        this.pancard_modal = false;
        this.card_view_modal = false;
        this.profile_pic_view = false;
        this.profile_button_close = true;
        this.profile_set = false;
        this.driver_json = [];
        this.Pancard_proof_view = false;
        this.address_proof_view = false;
        this.licence_proof_view = false;
        this.table_data_search = true;
        this.filepan = "Upload Image";
        this.pancard = '';
        this.array_O = [];
        this.array = [];
        this.Employee_Date_of_Joining = '2018-01-20';
        this.Employees_Data = [];
        this.filecard = "Upload Image";
        this.filelicence = "Upload Image";
        this.fileName = "Upload Image";
        this.ZoneData = [];
        this.skip_value = 0;
        this.sort_type = 3;
        this.OperatorData = [];
        this.Ezshipp_Branch_Data = [];
        this.url = '';
        this.employee_data = false;
        this.button_close = true;
        this.resizeOptions = {
            resizeMaxHeight: 600,
            resizeMaxWidth: 800
        };
        var salaryPermistion = this._cookieService.get('HR_SALARY_PERMISSIONS');
        this.isSalaryPermistion = (salaryPermistion == 'true');
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.isRequesting = true;
        this.find_Employees_of_Branch();
        if (this._cookieService.get('HR_SALARY_PERMISSIONS') == null) {
            this._cookieService.removeAll();
            this.router.navigateByUrl('/signin');
        }
        else if (this._cookieService.get('HR_SALARY_PERMISSIONS')) {
        }
        else {
        }
    };
    EmployeeComponent.prototype.findall_branch = function () {
        var _this = this;
        var body = new AddEmployeemodel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Ezshipp_Branches', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Ezshipp_Branch_Data = data.json().extras.Ezshipp_Branch_Data;
                if (_this.Ezshipp_Branch_Data.length) {
                    _this.Ezshipp_BranchID = _this.Ezshipp_Branch_Data[0].Ezshipp_BranchID;
                    _this.Ezshipp_Branch_Name = _this.Ezshipp_Branch_Data[0].Ezshipp_Branch_Name;
                }
                else {
                }
                _this.isRequesting = false;
                if (_this.Ezshipp_Branch_Data.length > 0) {
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
    EmployeeComponent.prototype.getStyle = function (index) {
        if (index == this.index) {
            return "#795548";
        }
    };
    EmployeeComponent.prototype.pageChanged_allEmp = function (value) {
        this.p = value;
        this.nextpage(this.p - 1);
    };
    EmployeeComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        var skip_value = this.index * 10;
        var body = new EmployeeBranchModel(null, this.sort_type, skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.issearch = true;
                _this.Employees_Data = data.json().extras.EmployeeData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.find_Employees_of_Branch = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, this.sort_type, this.skip_value);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.Employees_Data = data.json().extras.EmployeeData;
                _this.driver_json = data.json().extras.EmployeeData;
                _this.Total_Count = data.json().extras.Count;
                var count = parseInt(data.json().extras.Count);
                if (_this.Employees_Data.length > 0) {
                    _this.isData = false;
                }
                else {
                    _this.isData = true;
                }
                var count1 = Math.floor(count / 10);
                var count2 = count % 10;
                if (count2 == 0) {
                    _this.array_O.length = count1;
                }
                else {
                    _this.array_O.length = count1 + 1;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.button_click = function () {
        this.employee_data = true;
        this.button_close = true;
        this.findall_branch();
    };
    EmployeeComponent.prototype.back_button = function () {
        this.employee_data = false;
        this.button_close = true;
        this.prifileimg = "./img/Asset 3hdpi.png";
        this.prifileimg_1 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_2 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_3 = "./img/Asset 1xxhdpi.png";
        this.licence_upload = false;
        this.Profile_upload = false;
        this.Address_upload = false;
        this.pancard_upload = false;
        this.License_view_image = false;
        this.Address_view_image = false;
        this.Profile_view_image = false;
        this.pancard_view_image = false;
    };
    EmployeeComponent.prototype.selected = function (imageResult) {
        this.Picture = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.file1 = imageResult.file;
        this.profile_pic_url = this.Picture;
        this.prifileimg = this.profile_pic_url;
        this.Employee_Image_Url = this.Picture;
        if (this.Picture.length > 0) {
            this.Profile_view_image = true;
            this.Profile_upload = true;
        }
        else {
            this.Profile_view_image = false;
            var message = "Please fill the image";
            this.ErrorService.handleError(message);
            this.Profile_upload = false;
        }
    };
    EmployeeComponent.prototype.uploadFile = function (fileInput) {
        var file = fileInput.target.files[0];
        this.fileName = file.name;
        this.isProfile_Edit = true;
    };
    EmployeeComponent.prototype.pr_button_close = function () {
        this.profile_pic_view = true;
    };
    EmployeeComponent.prototype.pr_button_close_1 = function () {
        this.profile_pic_view = false;
    };
    EmployeeComponent.prototype.selected_card = function (imageResult) {
        this.card = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.file6 = imageResult.file;
        this.address_pic_url = this.card;
        this.prifileimg_1 = this.address_pic_url;
        this.Address_Proof_Image = this.card;
        if (this.card.length > 0) {
            this.Address_view_image = true;
            this.Address_upload = true;
        }
        else {
            this.Address_view_image = false;
            var message = "Please fill the image";
            this.ErrorService.handleError(message);
            this.Address_upload = false;
        }
    };
    EmployeeComponent.prototype.uploadFile_card = function (fileInput) {
        var file9 = fileInput.target.files[0];
        this.filecard = file9.name;
        this.isAddress_Edit = true;
    };
    EmployeeComponent.prototype.card_button_view = function () {
        this.card_view_modal = true;
    };
    EmployeeComponent.prototype.card_view_modal_close = function () {
        this.card_view_modal = false;
    };
    EmployeeComponent.prototype.selected_pancard = function (imageResult) {
        this.pancard = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.file11 = imageResult.file;
        this.pancard_pic_url = this.pancard;
        this.prifileimg_2 = this.pancard_pic_url;
        this.edit_Pan_Card_Image = this.pancard;
        if (this.pancard.length > 0) {
            this.pancard_view_image = true;
            this.pancard_upload = true;
        }
        else {
            this.pancard_view_image = false;
            var message = "Please fill the image";
            this.ErrorService.handleError(message);
            this.pancard_upload = false;
        }
    };
    EmployeeComponent.prototype.uploadFile_pancard = function (fileInput) {
        var file7 = fileInput.target.files[0];
        this.filepan = file7.name;
        this.isPancard_Edit = true;
    };
    EmployeeComponent.prototype.pancard_button_view = function () {
        this.pancard_modal = true;
    };
    EmployeeComponent.prototype.pancard_modal_close = function () {
        this.pancard_modal = false;
    };
    EmployeeComponent.prototype.selected_licence = function (imageResult) {
        this.licence = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.file3 = imageResult.file;
        this.licence_pic_url = this.licence;
        this.prifileimg_3 = this.licence_pic_url;
        this.Driving_License_Image = this.licence;
        if (this.licence.length > 0) {
            this.License_view_image = true;
            this.licence_upload = true;
        }
        else {
            this.License_view_image = false;
            var message = "Please fill the image";
            this.ErrorService.handleError(message);
            this.licence_upload = false;
        }
    };
    EmployeeComponent.prototype.uploadFile_licence = function (fileInput) {
        var file2 = fileInput.target.files[0];
        this.filelicence = file2.name;
        this.isLicence_Edit = true;
    };
    EmployeeComponent.prototype.licence_button_view = function () {
        this.licence_pic_view = true;
    };
    EmployeeComponent.prototype.licence_button_close = function () {
        this.licence_pic_view = false;
    };
    EmployeeComponent.prototype.valuechange_biker = function (value) {
        this.OperatorData = [];
        this.ZoneData = [];
        this.Employee_R = value;
        if (value == 1) {
            this.Operators();
            this.zones();
            this.open_zones = true;
            this.Driving_License_Available = true;
        }
        else if (value == 2) {
            this.open_zones = false;
            this.Driving_License_Available = false;
        }
    };
    EmployeeComponent.prototype.onSubmit_addemployee = function (form) {
        var _this = this;
        var banch_name = form.value.EZ_Br_name;
        var desginations = form.value.desginations;
        var epm_name = form.value.epm_name;
        var epm_phone = form.value.phone;
        var epm_email = form.value.email;
        var sex_employee = form.value.gender;
        var dtborth = form.value.dtborth;
        var date_01 = dtborth.split('-');
        var date_02 = date_01[2] + '/' + date_01[1] + '/' + date_01[0];
        var Address = form.value.Address;
        var Basicsalory;
        var PF_data;
        var TDS_data;
        if (this.isSalaryPermistion) {
            Basicsalory = form.value.Basic_salory;
            PF_data = form.value.PF;
            TDS_data = form.value.TDS;
        }
        else {
            Basicsalory = 0;
            PF_data = 0;
            TDS_data = 0;
        }
        var dtjoining = form.value.dtjoining;
        var date_03 = dtjoining.split('-');
        var date_04 = date_03[2] + '/' + date_03[1] + '/' + date_03[0];
        var Bank_account_no = form.value.Bank_no;
        var Bank_name = form.value.Bank_name;
        var Bank_IFSC_No = form.value.Bank_IFSC_No;
        var operator_id = form.value.operator_id;
        var zone_id = form.value.zone_id;
        if (this.Picture.length > 0) {
            this.Employee_Image_Available = true;
        }
        else {
            this.Employee_Image_Available = false;
            this.Picture = '';
        }
        if (this.Employee_R == 1) {
            if (this.licence.length) {
                this.Driving_License_Available = true;
            }
            else {
                this.Driving_License_Available = false;
                this.licence = '';
            }
            var License_Expiry_Date = form.value.License_Expiry_Date;
            this.date_05 = License_Expiry_Date.split('-');
            this.date_06 = this.date_05[2] + '/' + this.date_05[1] + '/' + this.date_05[0];
        }
        else {
        }
        if (this.card.length) {
            this.Address_Proof_Available = true;
        }
        else {
            this.Address_Proof_Available = false;
            this.card = '';
        }
        var Address_Proof_Picture = form.value.Address_Proof_Picture;
        if (this.pancard.length) {
            this.Pan_Card_Available = true;
        }
        else {
            this.Pan_Card_Available = false;
            this.pancard = '';
        }
        var Pan_Card_Image = form.value.Pan_Card_Image;
        var Pan_Card_Number = form.value.Pan_Card_Number;
        if (form.value.br_name != "") {
            this.Ezshipp_Branch_Name = form.value.br_name;
        }
        else {
        }
        if (form.value.Bank_no == "" || form.value.Bank_name == "" || form.value.Bank_IFSC_No == "") {
            var message2 = "Please enter bank Details";
            this.ErrorService.handleError(message2);
        }
        else {
            var body = new AddEmployeemodel(this.Ezshipp_Branch_Name, form.value.desginations, form.value.epm_name, form.value.phone, form.value.email, form.value.gender, date_02, form.value.Address, Basicsalory, PF_data, TDS_data, date_04, form.value.Bank_no, form.value.Bank_name, form.value.Bank_IFSC_No, form.value.operator_id, form.value.zone_id, this.Employee_Image_Available, this.Picture, this.Driving_License_Available, this.date_06, this.licence, this.Address_Proof_Available, this.card, this.Pan_Card_Available, this.pancard, form.value.Pan_Card_Number);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Register_Employee_with_Branch_Ezshipp', body, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var message = "Employee Addedd Successfully";
                    _this.ErrorService.handleError(message);
                    _this.back_button();
                    _this.ngOnInit();
                    form.resetForm();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message_1);
                }
            });
        }
    };
    EmployeeComponent.prototype.Addresschange = function (value) {
    };
    EmployeeComponent.prototype.Operators = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Operators', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.OperatorData = data.json().extras.OperatorData;
                _this.OperatorID = _this.OperatorData[0].OperatorID;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.zones = function () {
        var _this = this;
        var body = new driverModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
                _this.Operators();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.select_branch = function (value, event) {
        this.Ezshipp_Branch_Name = value;
    };
    EmployeeComponent.prototype.close = function () {
        this.views = -1;
    };
    EmployeeComponent.prototype.close_profile = function () {
        this.views = -1;
    };
    EmployeeComponent.prototype.click_button_employee = function (item, i) {
        this.views = i;
        this.Employee_Company_ID = item.Employee_Company_ID;
        this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name;
        this.Employee_Name = item.Employee_Name;
        this.Employee_Role = item.Employee_Role;
        if (this.Employee_Role == 1) {
            this.open_zones_profile = true;
            this.zones();
        }
        else {
            this.open_zones_profile = false;
        }
        this.Employee_Date_of_Joining = item.Employee_Date_of_Joining;
        this.Employee_Email = item.Employee_Email;
        this.Employee_Image_Url = item.Employee_Image_Url;
        this.Employee_Gender = item.Employee_Gender;
        this.Employee_DOB = item.Employee_DOB;
        this.Address_Proof_Type = item.Address_Proof_Type;
        this.Employee_Address = item.Employee_Address;
        this.Employee_PhoneNumber = item.Employee_PhoneNumber;
        this.Employee_Basic_Salary = item.Employee_Basic_Salary;
        this.Employee_PF = item.Employee_PF;
        this.Employee_TDS = item.Employee_TDS;
        this.Bank_Account_No = item.Bank_Account_No;
        this.Bank_Name = item.Bank_Name;
        this.Bank_IFSC_No = item.Bank_IFSC_No;
        this.Driving_License_Expiry_Date = item.Driving_License_Expiry_Date;
        this.Driving_License_Image = item.Driving_License_Image;
        this.Pan_Card_Image = item.Pan_Card_Image;
        this.Pan_Card_Number = item.Pan_Card_Number;
        this.Address_Proof_Image = item.Address_Proof_Image;
        this.Complete_Profile_Set = item.Complete_Profile_Set;
        this.ngOnInit();
    };
    EmployeeComponent.prototype.click_employee_add = function (item, i) {
        this.profile_set = true;
        this.Ezshipp_BranchID = item.Ezshipp_BranchID;
        this.Employee_Company_ID = item.Employee_Company_ID;
        this.Employee_Name = item.Employee_Name;
        this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name;
        this.Employee_Role = item.Employee_Role;
        if (this.Employee_Role == 1) {
            this.open_zones_profile = true;
            this.zones();
        }
        else {
            this.open_zones_profile = false;
        }
        this.Employee_Date_of_Joining = item.Employee_Date_of_Joining;
        this.Employee_Email = item.Employee_Email;
        this.Employee_Image_Url = item.Employee_Image_Url;
        this.Employee_Gender = item.Employee_Gender;
        this.Employee_DOB = item.Employee_DOB;
        this.Address_Proof_Type = item.Address_Proof_Type;
        this.Employee_Address = item.Employee_Address;
        this.Employee_PhoneNumber = item.Employee_PhoneNumber;
        this.Employee_Basic_Salary = item.Employee_Basic_Salary;
        this.Employee_PF = item.Employee_PF;
        this.Employee_TDS = item.Employee_TDS;
        this.Bank_Account_No = item.Bank_Account_No;
        this.Bank_Name = item.Bank_Name;
        this.Bank_IFSC_No = item.Bank_IFSC_No;
        this.Driving_License_Expiry_Date = item.Driving_License_Expiry_Date;
        this.Driving_License_Image = item.Driving_License_Image;
        this.Pan_Card_Image = item.Pan_Card_Image;
        this.Pan_Card_Number = item.Pan_Card_Number;
        this.Address_Proof_Image = item.Address_Proof_Image;
        this.Complete_Profile_Set = item.Complete_Profile_Set;
        this.EmployeeID = item.EmployeeID;
        this.ngOnInit();
        this.findall_branch();
    };
    EmployeeComponent.prototype.back_button_profile = function () {
        this.profile_set = false;
        this.prifileimg = "./img/Asset 3hdpi.png";
        this.prifileimg_1 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_2 = "./img/Asset 1xxhdpi.png";
        this.prifileimg_3 = "./img/Asset 1xxhdpi.png";
        this.licence_upload = false;
        this.Profile_upload = false;
        this.Address_upload = false;
        this.pancard_upload = false;
        this.License_view_image = false;
        this.Address_view_image = false;
        this.Profile_view_image = false;
        this.pancard_view_image = false;
    };
    EmployeeComponent.prototype.address_proof = function () {
        this.address_proof_view = true;
    };
    EmployeeComponent.prototype.address_close = function () {
        this.address_proof_view = false;
    };
    EmployeeComponent.prototype.licence_proof = function () {
        this.licence_proof_view = true;
    };
    EmployeeComponent.prototype.licence_close = function () {
        this.licence_proof_view = false;
    };
    EmployeeComponent.prototype.Pancard_proof = function () {
        this.Pancard_proof_view = true;
    };
    EmployeeComponent.prototype.Pancard_close = function () {
        this.Pancard_proof_view = false;
    };
    EmployeeComponent.prototype.valuechange = function (newValue) {
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
            return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.issearch = false;
                    _this.array.length = 0;
                    _this.Employees_Data = data.json().extras.EmployeeData;
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
    EmployeeComponent.prototype.sortColumn = function (key) {
        this.IsAsc = !this.IsAsc;
        this.valu = key;
        this.sortResults(this.valu, this.IsAsc);
    };
    EmployeeComponent.prototype.sortColumnReverse = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    EmployeeComponent.prototype.sortResults = function (prop, asc) {
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
    EmployeeComponent.prototype.onSubmit_Profile_set = function (form) {
        var _this = this;
        var Branch_Id = form.value.Branch_Id;
        var banch_name = form.value.br_name;
        var desginations = form.value.desginations;
        var epm_name = form.value.epm_name;
        var epm_phone = form.value.phone;
        var epm_email = form.value.email;
        var sex_employee = form.value.gender;
        var dtborth = form.value.dtborth;
        var date_11 = dtborth.split('-');
        var date_12 = date_11[2] + '/' + date_11[1] + '/' + date_11[0];
        var Address = form.value.Address;
        var Basicsalory;
        var PF_data;
        var TDS_data;
        if (this.isSalaryPermistion) {
            Basicsalory = form.value.Basic_salory;
            PF_data = form.value.PF;
            TDS_data = form.value.TDS;
        }
        else {
            Basicsalory = 0;
            PF_data = 0;
            TDS_data = 0;
        }
        var dtjoining = form.value.dtjoining;
        var date_13 = dtjoining.split('-');
        var date_14 = date_13[2] + '/' + date_13[1] + '/' + date_13[0];
        var Bank_account_no = form.value.Bank_no;
        var Bank_name = form.value.Bank_name;
        var Bank_IFSC_No = form.value.Bank_IFSC_No;
        var operator_id = form.value.operator_id;
        var zone_id = form.value.zone_id;
        if (this.Picture) {
            this.Employee_Image_Available = true;
        }
        else {
            this.Employee_Image_Available = false;
            this.Picture = '';
        }
        if (this.Employee_Role == 1) {
            var License_Expiry_Date = form.value.License_Expiry_Date;
            this.date_08 = License_Expiry_Date.split('-');
            this.date_09 = this.date_08[2] + '/' + this.date_08[1] + '/' + this.date_08[0];
            if (this.licence) {
                this.Driving_License_Available = true;
            }
            else {
                this.Driving_License_Available = false;
                this.licence = '';
            }
        }
        else {
            this.date_09 = '';
            this.Driving_License_Available = false;
            this.licence = '';
        }
        if (this.card) {
            this.Address_Proof_Available = true;
        }
        else {
            this.Address_Proof_Available = false;
            this.card = '';
        }
        var Address_Proof_Picture = form.value.Address_Proof_Picture;
        if (this.pancard.length) {
            this.Pan_Card_Available = true;
        }
        else {
            this.Pan_Card_Available = false;
            this.pancard = '';
        }
        var Pan_Card_Image = form.value.Pan_Card_Image;
        var Pan_Card_Number = form.value.Pan_Card_Number;
        var body = new AddEmployeemodel(form.value.br_name, null, null, null, null, null, date_12, form.value.Address, Basicsalory, PF_data, TDS_data, date_14, form.value.Bank_no, form.value.Bank_name, form.value.Bank_IFSC_No, null, null, this.Employee_Image_Available, this.Picture, this.Driving_License_Available, this.date_09, this.licence, this.Address_Proof_Available, this.card, this.Pan_Card_Available, this.pancard, form.value.Pan_Card_Number, this.EmployeeID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Activate_Employee_Profile_with_Branch_Ezshipp', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (_this.Employee_Role == 1) {
                    _this.Status = "Biker Profile Setted Successfully";
                    _this.profile_set = false;
                    _this.ngOnInit();
                    _this.ErrorService.handleError(_this.Status);
                    form.resetForm();
                }
                else {
                    _this.Status = "Employee Profile Setted Successfully";
                    _this.profile_set = false;
                    _this.ngOnInit();
                    _this.ErrorService.handleError(_this.Status);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Employee_delete = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, null, null, null, this.Product_deleted);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Remove_Employee', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.employee_deleted_view = -1;
                _this.Employees_Data.splice(_this.Fordelete, 1);
                _this.isRequesting = false;
                _this.Status = data.json().extras.Status;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Ondelete_view = function (item, index) {
        this.Product_deleted = item.EmployeeID;
        this.employee_deleted_view = index;
        this.Fordelete = index;
    };
    EmployeeComponent.prototype.onClose_Delete = function () {
        this.employee_deleted_view = -1;
    };
    EmployeeComponent.prototype.click_edit_employee = function (item, i) {
        this.Edit_employee_data = true;
        this.Ezshipp_BranchID = item.Ezshipp_BranchID;
        this.Employee_Company_ID = item.Employee_Company_ID;
        this.Edit_Employee_Name = item.Employee_Name;
        this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name;
        this.Employee_Role = item.Employee_Role;
        if (this.Employee_Role == 1) {
            this.open_zones_profile = true;
            this.zones();
        }
        else {
            this.open_zones_profile = false;
            this.Driving_License_Available = false;
            this.Driving_License_Image = '';
        }
        this.Employee_Date_of_Joining_vishu = item.Employee_Date_of_Joining;
        var edit_20 = this.Employee_Date_of_Joining_vishu.split('/');
        this.Employee_Date_of_Joining_vishu = edit_20[2] + '-' + edit_20[1] + '-' + edit_20[0];
        this.edit_Employee_Email = item.Employee_Email;
        this.Employee_Image_Url = item.Employee_Image_Url;
        this.edit_Employee_Gender = item.Employee_Gender;
        this.edit_Employee_DOB_shobhan = item.Employee_DOB;
        var edit_21 = this.edit_Employee_DOB_shobhan.split('/');
        this.edit_Employee_DOB_shobhan = edit_21[2] + '-' + edit_21[1] + '-' + edit_21[0];
        this.Address_Proof_Type = item.Address_Proof_Type;
        this.edit_Employee_Address = item.Employee_Address;
        this.edit_Employee_PhoneNumber = item.Employee_PhoneNumber;
        this.Edit_Basic_Salary = item.Employee_Basic_Salary;
        this.edit_Employee_PF = item.Employee_PF;
        this.edit_Employee_TDS = item.Employee_TDS;
        this.edit_Bank_Account_No = item.Bank_Account_No;
        this.edit_Bank_Name = item.Bank_Name;
        this.edit_Bank_IFSC_No = item.Bank_IFSC_No;
        this.edit_Driving_License_Expiry_Date_raju = item.Driving_License_Expiry_Date;
        var edit_25 = this.edit_Driving_License_Expiry_Date_raju.split('/');
        this.edit_Driving_License_Expiry_Date_raju = edit_25[2] + '-' + edit_25[1] + '-' + edit_25[0];
        this.Driving_License_Image = item.Driving_License_Image;
        this.edit_Pan_Card_Image = item.Pan_Card_Image;
        this.Edit_Pan_Card_Number = item.Pan_Card_Number;
        this.Address_Proof_Image = item.Address_Proof_Image;
        this.Complete_Profile_Set = item.Complete_Profile_Set;
        this.EmployeeID = item.EmployeeID;
        this.findall_branch();
    };
    EmployeeComponent.prototype.onSubmit_edit_form = function (form) {
        var _this = this;
        this.EmployeeID;
        var Branch_Id = form.value.Branch_Id;
        var edit_banch_name = form.value.br_name;
        var edit_Employee_Name = form.value.Employee_Name;
        var edit_Employee_Gender = form.value.gender_value;
        var epm_email = form.value.email;
        var edit_Employee_PhoneNumber = form.value.Employee_PhoneNumber;
        var Date_of_Joining = form.value.Date_of_Joining;
        var edit_13 = Date_of_Joining.split('-');
        var edit_14 = edit_13[2] + '/' + edit_13[1] + '/' + edit_13[0];
        var Edit_Employee_DOB = form.value.Employee_DOB;
        var edit_11 = Edit_Employee_DOB.split('-');
        var edit_12 = edit_11[2] + '/' + edit_11[1] + '/' + edit_11[0];
        var Employee_Address = form.value.Employee_Address;
        var desginations = form.value.desginations;
        var Basicsalory = form.value.Basic_salory;
        var PF_data = form.value.PF;
        var TDS_data = form.value.TDS;
        var Bank_name = form.value.Bank_name;
        var Bank_account_no = form.value.Bank_no;
        var Bank_IFSC_No = form.value.Bank_IFSC_No;
        var operator_id = form.value.operator_id;
        var zone_id = form.value.zone_id;
        if (this.Employee_Image_Url.length) {
            this.Employee_Image_Available = true;
        }
        else {
            this.Employee_Image_Available = false;
            this.Employee_Image_Url = '';
        }
        if (this.Employee_Role == 1) {
            var License_Expiry_Date = form.value.License_Expiry_Date;
            this.edit_15 = License_Expiry_Date.split('-');
            this.edit_16 = this.edit_15[2] + '/' + this.edit_15[1] + '/' + this.edit_15[0];
            if (this.Driving_License_Image.length) {
                this.Driving_License_Available = true;
            }
            else {
                this.Driving_License_Available = false;
                this.Driving_License_Image = '';
            }
        }
        else {
            this.edit_16 = '';
            this.Driving_License_Available = false;
            this.Driving_License_Image = '';
        }
        if (this.Address_Proof_Image.length) {
            this.Address_Proof_Available = true;
        }
        else {
            this.Address_Proof_Available = false;
            this.Address_Proof_Image = '';
        }
        var Address_Proof_Picture = form.value.Address_Proof_Picture;
        if (this.edit_Pan_Card_Image.length) {
            this.Pan_Card_Available = true;
        }
        else {
            this.Pan_Card_Available = false;
            this.edit_Pan_Card_Image = '';
        }
        var Pan_Card_Image = form.value.Pan_Card_Image;
        var Pan_Card_Number = form.value.Pan_Card_Number;
        if (form.value.br_name != "") {
            this.edit_banch_name = form.value.br_name;
        }
        else {
        }
        var body = new AddEmployeemodel(edit_banch_name, form.value.desginations, form.value.Employee_Name, form.value.Employee_PhoneNumber, form.value.email, form.value.gender_value, edit_12, form.value.Employee_Address, form.value.Basic_salory, form.value.PF, form.value.TDS, edit_14, form.value.Bank_no, form.value.Bank_name, form.value.Bank_IFSC_No, form.value.operator_id, form.value.zone_id, this.Employee_Image_Available, this.Employee_Image_Url, this.Driving_License_Available, this.edit_16, this.Driving_License_Image, this.Address_Proof_Image, this.edit_Pan_Card_Image, this.Pan_Card_Available, this.edit_Pan_Card_Image, form.value.Pan_Card_Number, this.EmployeeID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Employee_Information', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Edit_Employee_Salary();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Edit_Employee_Salary = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, null, null, null, this.EmployeeID, this.Edit_Basic_Salary, this.edit_Employee_PF, this.edit_Employee_TDS);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Employee_Salary_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Edit_Employee_Bank();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Edit_Employee_Bank = function () {
        var _this = this;
        var body = new EmployeeBranchModel(null, null, null, null, this.EmployeeID, this.Edit_Basic_Salary, this.edit_Employee_PF, this.edit_Employee_TDS, this.edit_Bank_Account_No, this.edit_Bank_Name, this.edit_Bank_IFSC_No);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Employee_Bank_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (_this.isProfile_Edit) {
                    _this.Employee_Profile_Image_edit();
                }
                else if (_this.isAddress_Edit) {
                    _this.Employee_Address_Proof_edit();
                }
                else if (_this.isPancard_Edit) {
                    _this.Employee_Pan_Cards_image_edit();
                }
                else if (_this.isLicence_Edit && _this.Employee_Role == 1) {
                    _this.Employee_Driver_Driving_License_edit();
                }
                else {
                    setTimeout(function () {
                        _this.find_Employees_of_Branch();
                    }, 3000);
                    _this.open_loading_images = true;
                    setTimeout(function () {
                        _this.open_loading_images = false;
                        _this.Edit_employee_data = false;
                    }, 5000);
                    _this.views = -1;
                    var msg = "Updated sucessfully";
                    _this.ErrorService.handleError(msg);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Employee_Profile_Image_edit = function () {
        var _this = this;
        var body = new AllImagesEditModel(this.EmployeeID, this.Employee_Image_Url);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Update_Employee_Profile_Image', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (_this.isAddress_Edit) {
                    _this.Employee_Address_Proof_edit();
                }
                else if (_this.isPancard_Edit) {
                    _this.Employee_Pan_Cards_image_edit();
                }
                else if (_this.isLicence_Edit && _this.Employee_Role == 1) {
                    _this.Employee_Driver_Driving_License_edit();
                }
                else {
                    setTimeout(function () {
                        _this.find_Employees_of_Branch();
                    }, 3000);
                    _this.open_loading_images = true;
                    setTimeout(function () {
                        _this.open_loading_images = false;
                        _this.Edit_employee_data = false;
                    }, 5000);
                    _this.views = -1;
                    var msg = "Updated sucessfully";
                    _this.ErrorService.handleError(msg);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Employee_Pan_Cards_image_edit = function () {
        var _this = this;
        var body = new AllImagesEditModel(this.EmployeeID, null, this.edit_Pan_Card_Image, this.Edit_Pan_Card_Number);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Update_Employee_Pan_Cards_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (_this.isAddress_Edit) {
                    _this.Employee_Address_Proof_edit();
                }
                else if (_this.isLicence_Edit && _this.Employee_Role == 1) {
                    _this.Employee_Driver_Driving_License_edit();
                }
                else {
                    setTimeout(function () {
                        _this.find_Employees_of_Branch();
                    }, 3000);
                    _this.open_loading_images = true;
                    setTimeout(function () {
                        _this.open_loading_images = false;
                        _this.Edit_employee_data = false;
                    }, 5000);
                    _this.views = -1;
                    var msg = "Updated sucessfully";
                    _this.ErrorService.handleError(msg);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Employee_Address_Proof_edit = function () {
        var _this = this;
        var body = new AllImagesEditModel(this.EmployeeID, null, null, null, this.Address_Proof_Image);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Update_Employee_Address_Proof_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (_this.isLicence_Edit && _this.Employee_Role == 1) {
                    _this.Employee_Driver_Driving_License_edit();
                }
                else {
                    setTimeout(function () {
                        _this.find_Employees_of_Branch();
                    }, 3000);
                    _this.open_loading_images = true;
                    setTimeout(function () {
                        _this.open_loading_images = false;
                        _this.Edit_employee_data = false;
                    }, 5000);
                    _this.views = -1;
                    var msg = "Updated sucessfully";
                    _this.ErrorService.handleError(msg);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.Employee_Driver_Driving_License_edit = function () {
        var _this = this;
        var body = new AllImagesEditModel(this.EmployeeID, null, null, null, null, this.edit_16, this.Driving_License_Image);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Update_Employee_Driver_Driving_License_Details', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                setTimeout(function () {
                    _this.find_Employees_of_Branch();
                }, 3000);
                _this.open_loading_images = true;
                setTimeout(function () {
                    _this.open_loading_images = false;
                    _this.Edit_employee_data = false;
                }, 5000);
                _this.views = -1;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    EmployeeComponent.prototype.back_button_edit = function () {
        this.Edit_employee_data = false;
        this.licence_upload = false;
        this.Profile_upload = false;
        this.Address_upload = false;
        this.pancard_upload = false;
        this.License_view_image = false;
        this.Address_view_image = false;
        this.Profile_view_image = false;
        this.pancard_view_image = false;
        this.open_loading_images = false;
    };
    EmployeeComponent = __decorate([
        Component({
            selector: 'app-Employee',
            templateUrl: './Employee.component.html',
            styleUrls: ['./Employee.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Router,
            Http, ApiMessageService,
            ErrorService, ImageUploadModule])
    ], EmployeeComponent);
    return EmployeeComponent;
}());
export { EmployeeComponent };
