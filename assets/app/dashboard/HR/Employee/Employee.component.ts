import { driverModel } from './../../../front_end_models/driverModel';
import { AddEmployeemodel } from './../../../front_end_models/add_employeeModel';
import { NgForm } from '@angular/forms';
import { EmployeeBranchModel } from './../../../front_end_models/employee_branchModel';
import { ErrorService } from './../../../errors/error.service';
import { ImageUploadModule, ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AllImagesEditModel } from "../../../front_end_models/images_editModel";

@Component({
 selector: 'app-Employee',
 templateUrl: './Employee.component.html',
 styleUrls: ['./Employee.component.css']
})
export class EmployeeComponent implements OnInit {

  open_loading_images: boolean = false;
  image_gif = "./img/giphy.gif"
  isProfile_Edit: boolean = false;
  isAddress_Edit: boolean = false;
  isPancard_Edit: boolean = false;
  isLicence_Edit: boolean = false;


  edit_Driving_License_Expiry_Date_raju: any;
  isSalaryPermistion: boolean;
  edit_Employee_DOB_shobhan: any;
  Employee_Date_of_Joining_vishu = '2018-12-25'
  edit_Employee_Gender: any;
  edit_Driving_License_Expiry_Date: any;
  edit_Edit_Pan_Card_Number: any;
  edit_Pan_Card_Image: any;
  edit_Employee_Email: any;
  Edit_Pan_Card_Number: any;
  edit_Bank_IFSC_No: any;
  edit_Bank_Name: any;
  edit_Bank_Account_No: any;
  edit_Employee_TDS: any;
  edit_Employee_PF: any;
  Edit_Basic_Salary: any;
  edit_banch_name: any;
  edit_16: any;
  edit_15: any;
  edit_Employee_DOB: any;
  edit_Employee_Address: any;
  edit_Employee_PhoneNumber: any;
  Edit_Employee_Name: any;
  Edit_employee_data: boolean = false;
  Fordelete: any;
  employee_deleted_view: any;
  Product_deleted: any;
  Total_Count: any;
  licence_upload: boolean = false;
  pancard_upload: boolean = false;
  Address_upload: boolean = false;
  Profile_upload: boolean = false;
  prifileimg = "./img/Asset 3hdpi.png"
  prifileimg_1 = "./img/Asset 1xxhdpi.png"
  prifileimg_2 = "./img/Asset 1xxhdpi.png"
  prifileimg_3 = "./img/Asset 1xxhdpi.png"
  activeId: number;
  date_09: string;
  date_08: any;
  Ezshipp_Branch_Name: any;
  issearch: boolean;
  open_zones: boolean;
  p: number = 1;
  index: any = 0;
  open_zones_profile: boolean = false;
  License_view_image: boolean = false;
  Profile_view_image: boolean = false;
  Address_view_image: boolean = false;
  pancard_view_image: boolean = false;
  licence_pic_view: boolean = false;
  licence_pic_url: string;
  pancard_modal: boolean = false;
  card_view_modal: boolean = false;
  address_pic_url: any;
  pancard_pic_url: any;
  profile_pic_view: boolean = false;
  profile_button_close: boolean = true;

  profile_pic_url: any;
  profilepic_name: string;
  EmployeeID: any;

  profile_set: boolean = false;
  Complete_Profile_Set: any;
  driver_json: any = [];
  valu: any;
  IsAsc: boolean;
  Pancard_proof_view: boolean = false;
  address_proof_view: boolean = false;
  licence_proof_view: boolean = false;
  table_data_search: boolean = true;
  Address_Proof_Image: any;
  Driving_License_Image: any;
  licence_image: string;
  ImageURL3: string;
  file11: File;
  filepan: string = "Upload Image";
  Pan_Card_Number: any;
  Pan_Card_Image: any;
  pancard: string = '';
  Pan_Card_Available: boolean;
  array_O: any = [];
  array: any = [];
  isRequesting: boolean;
  Employee_R: any;
  date_06: string;
  date_05: any;
  mymodel: any;
  isData: boolean;
  Address_Proof_Type: any;
  Driving_License_Expiry_Date: any;
  Employee_Image_Url: any;
  Employee_Company_ID: any;
  Bank_IFSC_No: any;
  Bank_Name: any;
  Bank_Account_No: any;
  Employee_PhoneNumber: any;
  Employee_Address: any;
  Employee_Email: any;
  Employee_TDS: any;
  Employee_PF: any;
  Employee_Basic_Salary: any;
  Employee_DOB: any;
  Employee_Gender: any;
  Employee_Date_of_Joining: any = '2018-01-20';
  Employee_Role: any;
  Employee_Name: any;
  Employee_ID: any;
  views: number;
  Employees_Data: any = [];
  Ezshipp_BranchID: any;
  branch_id: any;
  filecard: string = "Upload Image";
  ImageURL2: any;
  file6: File;
  card: any;
  Address_Proof_Available: boolean;
  Driving_License_Available: boolean;
  filelicence: string = "Upload Image";
  ImageURL1: string;
  file3: File;
  licence: string;
  Employee_Image_Available: any;
  fileName: string = "Upload Image";
  ImageURL: string;
  file1: File;
  Picture: string;
  Status: any;
  ZoneData: any = [];
  skip_value: number = 0;
  sort_type: number = 3;
  OperatorID: any;
  OperatorData: any = [];
  Ezshipp_Branch_Data: any = [];
  url: string = '';
  employee_data: boolean = false;
  button_close: boolean = true;
  constructor(private _cookieService: CookieService,
    private router: Router,
    private http: Http, private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService, private ImageUploadModule: ImageUploadModule) {
    var salaryPermistion = this._cookieService.get('HR_SALARY_PERMISSIONS')

    this.isSalaryPermistion = (salaryPermistion == 'true')
  }

  ngOnInit() {
    this.isRequesting = true;
    this.find_Employees_of_Branch();

    if (this._cookieService.get('HR_SALARY_PERMISSIONS') == null) {
      this._cookieService.removeAll()
      this.router.navigateByUrl('/signin')
   } else if (this._cookieService.get('HR_SALARY_PERMISSIONS')) {

    } else {
    }


  }
  findall_branch() {
    const body = new AddEmployeemodel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Ezshipp_Branches', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          this.Ezshipp_Branch_Data = data.json().extras.Ezshipp_Branch_Data
          if (this.Ezshipp_Branch_Data.length) {
            this.Ezshipp_BranchID = this.Ezshipp_Branch_Data[0].Ezshipp_BranchID
            this.Ezshipp_Branch_Name=this.Ezshipp_Branch_Data[0].Ezshipp_Branch_Name


          } else {

          }


          this.isRequesting = false;

          if (this.Ezshipp_Branch_Data.length > 0) {
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
  getStyle(index) {
    if (index == this.index) {
      return "#795548";
    }
  }
  pageChanged_allEmp(value) {
    this.p = value;

    this.nextpage(this.p - 1)
  }
  nextpage(index) {

    this.isRequesting = true
    this.index = index;
    let skip_value = this.index * 10
    const body = new EmployeeBranchModel(null, this.sort_type, skip_value)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.issearch = true;
          this.Employees_Data = data.json().extras.EmployeeData
          this.skip_value = this.index * 10

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  find_Employees_of_Branch() {
    const body = new EmployeeBranchModel(null, this.sort_type, this.skip_value)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Employees', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.isRequesting = false;
          this.Employees_Data = data.json().extras.EmployeeData
          this.driver_json = data.json().extras.EmployeeData
          this.Total_Count = data.json().extras.Count
          let count: number = parseInt(data.json().extras.Count)
          if (this.Employees_Data.length > 0) {
            this.isData = false;

          } else {
            this.isData = true;
          }
          let count1: number = Math.floor(count / 10);
          let count2 = count % 10
          if (count2 == 0) {
            this.array_O.length = count1
          } else {
            this.array_O.length = count1 + 1
          }

        }
        else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  button_click() {
    this.employee_data = true;
    this.button_close = true;

    this.findall_branch();
  }
  back_button() {
    this.employee_data = false;
    this.button_close = true;
    this.prifileimg = "./img/Asset 3hdpi.png"
    this.prifileimg_1 = "./img/Asset 1xxhdpi.png"
    this.prifileimg_2 = "./img/Asset 1xxhdpi.png"
    this.prifileimg_3 = "./img/Asset 1xxhdpi.png"
    this.licence_upload = false
    this.Profile_upload = false
    this.Address_upload = false
    this.pancard_upload = false
    this.License_view_image = false
    this.Address_view_image = false
    this.Profile_view_image = false
    this.pancard_view_image = false


  }
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 800
  };
  selected(imageResult: ImageResult) {
    this.Picture = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.file1 = imageResult.file;


    this.profile_pic_url = this.Picture;
    this.prifileimg = this.profile_pic_url

    this.Employee_Image_Url = this.Picture;


    if (this.Picture.length > 0) {
      this.Profile_view_image = true;
      this.Profile_upload = true
    } else {
      this.Profile_view_image = false;
      var message = "Please fill the image"
      this.ErrorService.handleError(message)
      this.Profile_upload = false


    }
  }
  uploadFile(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileName = file.name;
   this.isProfile_Edit = true;
  }
  pr_button_close() {
    this.profile_pic_view = true;
  }
  pr_button_close_1() {
    this.profile_pic_view = false;
  }
  selected_card(imageResult: ImageResult) {
    this.card = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.file6 = imageResult.file;

    this.address_pic_url = this.card;
    this.prifileimg_1 = this.address_pic_url;

    this.Address_Proof_Image = this.card;


    if (this.card.length > 0) {
      this.Address_view_image = true;
      this.Address_upload = true
    } else {
      this.Address_view_image = false;
      var message = "Please fill the image"
      this.ErrorService.handleError(message)
      this.Address_upload = false
    }
  }
  uploadFile_card(fileInput: any) {
    let file9 = fileInput.target.files[0];
    this.filecard = file9.name;
    this.isAddress_Edit = true;
  }
  card_button_view() {
    this.card_view_modal = true;
  }
  card_view_modal_close() {
    this.card_view_modal = false;
  }
  selected_pancard(imageResult: ImageResult) {
    this.pancard = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.file11 = imageResult.file;
    this.pancard_pic_url = this.pancard;
    this.prifileimg_2 = this.pancard_pic_url

    this.edit_Pan_Card_Image = this.pancard;

    if (this.pancard.length > 0) {
      this.pancard_view_image = true;
      this.pancard_upload = true
    } else {
      this.pancard_view_image = false;
      var message = "Please fill the image"
      this.ErrorService.handleError(message)
      this.pancard_upload = false
    }
  }
  uploadFile_pancard(fileInput: any) {
    let file7 = fileInput.target.files[0];
    this.filepan = file7.name;
    this.isPancard_Edit = true;
  }
  pancard_button_view() {
    this.pancard_modal = true;
  }
  pancard_modal_close() {
    this.pancard_modal = false;
  }
  selected_licence(imageResult: ImageResult) {
    this.licence = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.file3 = imageResult.file;
    this.licence_pic_url = this.licence;
    this.prifileimg_3 = this.licence_pic_url

    this.Driving_License_Image = this.licence


    if (this.licence.length > 0) {
      this.License_view_image = true;
      this.licence_upload = true
    } else {
      this.License_view_image = false;
      var message = "Please fill the image"
      this.ErrorService.handleError(message)
      this.licence_upload = false
    }
  }
  uploadFile_licence(fileInput: any) {
    let file2 = fileInput.target.files[0];
    this.filelicence = file2.name;
    this.isLicence_Edit = true;
  }
  licence_button_view() {
    this.licence_pic_view = true;
  }
  licence_button_close() {
    this.licence_pic_view = false;
  }
  valuechange_biker(value) {
    this.OperatorData = [];
    this.ZoneData = []
    this.Employee_R = value;

    if (value == 1) {
      this.Operators()
      this.zones()
      this.open_zones = true;
      this.Driving_License_Available = true

    } else if (value == 2) {
      this.open_zones = false;
      this.Driving_License_Available = false
    }
  }
  onSubmit_addemployee(form: NgForm) {
    var banch_name = form.value.EZ_Br_name;

    var desginations = form.value.desginations;
    var epm_name = form.value.epm_name;
    let epm_phone = form.value.phone;
    var epm_email = form.value.email;
    var sex_employee = form.value.gender;

    let dtborth = form.value.dtborth;
    var date_01 = dtborth.split('-')
    var date_02 = date_01[2] + '/' + date_01[1] + '/' + date_01[0]
    var Address = form.value.Address;
    var Basicsalory: number;
    var PF_data;
    var TDS_data;
    if (this.isSalaryPermistion) {
      Basicsalory = form.value.Basic_salory;
      PF_data = form.value.PF;
      TDS_data = form.value.TDS;
    } else {
      Basicsalory = 0;
      PF_data = 0;
      TDS_data = 0
    }
    var dtjoining = form.value.dtjoining;
    var date_03 = dtjoining.split('-')
    var date_04 = date_03[2] + '/' + date_03[1] + '/' + date_03[0]
    let Bank_account_no = form.value.Bank_no;
    var Bank_name = form.value.Bank_name;
    var Bank_IFSC_No = form.value.Bank_IFSC_No;
    var operator_id = form.value.operator_id
    var zone_id = form.value.zone_id;
    if (this.Picture.length > 0) {
      this.Employee_Image_Available = true
    } else {
      this.Employee_Image_Available = false
      this.Picture = ''
    }

    if (this.Employee_R == 1) {
      if (this.licence.length) {

        this.Driving_License_Available = true
      } else {
        this.Driving_License_Available = false
        this.licence = ''

      }
      var License_Expiry_Date = form.value.License_Expiry_Date;

      this.date_05 = License_Expiry_Date.split('-')
      this.date_06 = this.date_05[2] + '/' + this.date_05[1] + '/' + this.date_05[0]
    } else {

    }

    if (this.card.length) {
      this.Address_Proof_Available = true
    } else {
      this.Address_Proof_Available = false
      this.card = ''
    }
    var Address_Proof_Picture = form.value.Address_Proof_Picture;

    if (this.pancard.length) {
      this.Pan_Card_Available = true
    } else {
      this.Pan_Card_Available = false
      this.pancard = ''
    }

    var Pan_Card_Image = form.value.Pan_Card_Image;

    var Pan_Card_Number = form.value.Pan_Card_Number;
    if (form.value.br_name != "") {
      this.Ezshipp_Branch_Name = form.value.br_name
    } else {

    }
    if (form.value.Bank_no == "" || form.value.Bank_name == "" || form.value.Bank_IFSC_No == "") {
      var message2 = "Please enter bank Details";
      this.ErrorService.handleError(message2)
    } else {
      const body = new AddEmployeemodel(
        this.Ezshipp_Branch_Name,
        form.value.desginations,
        form.value.epm_name,
        form.value.phone,
        form.value.email,
        form.value.gender,
        date_02,
        form.value.Address,
        Basicsalory,
        PF_data,
        TDS_data,
        date_04,
        form.value.Bank_no,
        form.value.Bank_name,
        form.value.Bank_IFSC_No,
        form.value.operator_id,
        form.value.zone_id,
        this.Employee_Image_Available,
        this.Picture,
        this.Driving_License_Available,
        this.date_06,
        this.licence,
        this.Address_Proof_Available,
        this.card,
        this.Pan_Card_Available,
        this.pancard,
        form.value.Pan_Card_Number


      )
      const headers = new Headers({ 'Content-Type': 'application/json' })
      return this.http.post(this.url + '/Register_Employee_with_Branch_Ezshipp', body, { headers: headers })
        .subscribe(data => {
          if (data.json().success) {


            var message = "Employee Addedd Successfully";
            this.ErrorService.handleError(message)
            this.back_button()
            this.ngOnInit();
            form.resetForm();
          } else {
            const msgNumber: number = parseInt(data.json().extras.msg);

            let message = this._ApiMessageService.ApiMessages[msgNumber]
            this.ErrorService.handleError(message)

          }
        })
    }

  }
  Addresschange(value) {
  }
  Operators() {
    const body = new driverModel()

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Operators', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          this.OperatorData = data.json().extras.OperatorData

          this.OperatorID = this.OperatorData[0].OperatorID
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  zones() {
    const body = new driverModel()

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          this.ZoneData = data.json().extras.ZoneData
          this.Operators()

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  select_branch(value, event) {

    this.Ezshipp_Branch_Name = value;

  }
  close() {
    this.views = -1;

  }
  close_profile() {
    this.views = -1;
  }
  click_button_employee(item, i) {
    this.views = i;

    this.Employee_Company_ID = item.Employee_Company_ID
    this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name
    this.Employee_Name = item.Employee_Name
    this.Employee_Role = item.Employee_Role
    if (this.Employee_Role == 1) {
      this.open_zones_profile = true;


      this.zones()
    } else {
      this.open_zones_profile = false;

    }
    this.Employee_Date_of_Joining = item.Employee_Date_of_Joining
    this.Employee_Email = item.Employee_Email
    this.Employee_Image_Url = item.Employee_Image_Url
    this.Employee_Gender = item.Employee_Gender
    this.Employee_DOB = item.Employee_DOB
    this.Address_Proof_Type = item.Address_Proof_Type
    this.Employee_Address = item.Employee_Address
    this.Employee_PhoneNumber = item.Employee_PhoneNumber
    this.Employee_Basic_Salary = item.Employee_Basic_Salary
    this.Employee_PF = item.Employee_PF
    this.Employee_TDS = item.Employee_TDS
    this.Bank_Account_No = item.Bank_Account_No
    this.Bank_Name = item.Bank_Name
    this.Bank_IFSC_No = item.Bank_IFSC_No
    this.Driving_License_Expiry_Date = item.Driving_License_Expiry_Date
    this.Driving_License_Image = item.Driving_License_Image
    this.Pan_Card_Image = item.Pan_Card_Image
    this.Pan_Card_Number = item.Pan_Card_Number
    this.Address_Proof_Image = item.Address_Proof_Image
    this.Complete_Profile_Set = item.Complete_Profile_Set
    this.ngOnInit();
  }
  click_employee_add(item, i) {
    this.profile_set = true

    this.Ezshipp_BranchID = item.Ezshipp_BranchID
    this.Employee_Company_ID = item.Employee_Company_ID
    this.Employee_Name = item.Employee_Name
    this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name
    this.Employee_Role = item.Employee_Role
    if (this.Employee_Role == 1) {
      this.open_zones_profile = true;

      this.zones()
    } else {
      this.open_zones_profile = false;
    }
    this.Employee_Date_of_Joining = item.Employee_Date_of_Joining

    this.Employee_Email = item.Employee_Email
    this.Employee_Image_Url = item.Employee_Image_Url
    this.Employee_Gender = item.Employee_Gender
    this.Employee_DOB = item.Employee_DOB
    this.Address_Proof_Type = item.Address_Proof_Type
    this.Employee_Address = item.Employee_Address
    this.Employee_PhoneNumber = item.Employee_PhoneNumber
    this.Employee_Basic_Salary = item.Employee_Basic_Salary
    this.Employee_PF = item.Employee_PF
    this.Employee_TDS = item.Employee_TDS
    this.Bank_Account_No = item.Bank_Account_No
    this.Bank_Name = item.Bank_Name
    this.Bank_IFSC_No = item.Bank_IFSC_No
    this.Driving_License_Expiry_Date = item.Driving_License_Expiry_Date
    this.Driving_License_Image = item.Driving_License_Image
    this.Pan_Card_Image = item.Pan_Card_Image
    this.Pan_Card_Number = item.Pan_Card_Number
    this.Address_Proof_Image = item.Address_Proof_Image
    this.Complete_Profile_Set = item.Complete_Profile_Set
    this.EmployeeID = item.EmployeeID
    this.ngOnInit();
    this.findall_branch();
  }
  back_button_profile() {
    this.profile_set = false

    this.prifileimg = "./img/Asset 3hdpi.png"
    this.prifileimg_1 = "./img/Asset 1xxhdpi.png"
    this.prifileimg_2 = "./img/Asset 1xxhdpi.png"
    this.prifileimg_3 = "./img/Asset 1xxhdpi.png"
    this.licence_upload = false
    this.Profile_upload = false
    this.Address_upload = false
    this.pancard_upload = false
    this.License_view_image = false
    this.Address_view_image = false
    this.Profile_view_image = false
    this.pancard_view_image = false

  }
  address_proof() {
    this.address_proof_view = true;
  }
  address_close() {
    this.address_proof_view = false;
  }
  licence_proof() {
    this.licence_proof_view = true;
  }
  licence_close() {
    this.licence_proof_view = false;
  }
  Pancard_proof() {
    this.Pancard_proof_view = true
  }
  Pancard_close() {
    this.Pancard_proof_view = false
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
      return this.http.post(this.url + '/Search_All_Employees', body1, { headers: headers })
        .subscribe(
        data => {
          if (data.json().success) {
            this.issearch = false;

            this.array.length = 0
            this.Employees_Data = data.json().extras.EmployeeData

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
  onSubmit_Profile_set(form: NgForm) {

    var Branch_Id = form.value.Branch_Id;
    var banch_name = form.value.br_name;
    var desginations = form.value.desginations;
    var epm_name = form.value.epm_name;
    let epm_phone = form.value.phone;
    var epm_email = form.value.email;
    var sex_employee = form.value.gender;
    let dtborth = form.value.dtborth;
    var date_11 = dtborth.split('-')
    var date_12 = date_11[2] + '/' + date_11[1] + '/' + date_11[0]
    var Address = form.value.Address;
    var Basicsalory: number;
    var PF_data;
    var TDS_data;
    if (this.isSalaryPermistion) {
      Basicsalory = form.value.Basic_salory;
      PF_data = form.value.PF;
      TDS_data = form.value.TDS;
    } else {
      Basicsalory = 0;
      PF_data = 0;
      TDS_data = 0
    }
    var dtjoining = form.value.dtjoining;
    var date_13 = dtjoining.split('-')
    var date_14 = date_13[2] + '/' + date_13[1] + '/' + date_13[0]
    let Bank_account_no = form.value.Bank_no;
    var Bank_name = form.value.Bank_name;
    var Bank_IFSC_No = form.value.Bank_IFSC_No;
    var operator_id = form.value.operator_id
    var zone_id = form.value.zone_id;
    if (this.Picture) {
      this.Employee_Image_Available = true
    } else {
      this.Employee_Image_Available = false
      this.Picture = ''
    }

    if (this.Employee_Role == 1) {
      var License_Expiry_Date = form.value.License_Expiry_Date;
      this.date_08 = License_Expiry_Date.split('-')
      this.date_09 = this.date_08[2] + '/' + this.date_08[1] + '/' + this.date_08[0]
      if (this.licence) {
        this.Driving_License_Available = true
      } else {
        this.Driving_License_Available = false
        this.licence = ''
      }
    } else {
      this.date_09 = ''
      this.Driving_License_Available = false
      this.licence = ''
    }



    if (this.card) {
      this.Address_Proof_Available = true
    } else {
      this.Address_Proof_Available = false
      this.card = ''
    }
    var Address_Proof_Picture = form.value.Address_Proof_Picture;
    if (this.pancard.length) {
      this.Pan_Card_Available = true
    } else {
      this.Pan_Card_Available = false
      this.pancard = ''
    }

    var Pan_Card_Image = form.value.Pan_Card_Image;

    var Pan_Card_Number = form.value.Pan_Card_Number;

    const body = new AddEmployeemodel(
      form.value.br_name,
      null,
      null,
      null,
      null,
      null,
      date_12,
      form.value.Address,
      Basicsalory,
      PF_data,
      TDS_data,
      date_14,
      form.value.Bank_no,
      form.value.Bank_name,
      form.value.Bank_IFSC_No,
      null,
      null,
      this.Employee_Image_Available,
      this.Picture,
      this.Driving_License_Available,
      this.date_09,
      this.licence,
      this.Address_Proof_Available,
      this.card,
      this.Pan_Card_Available,
      this.pancard,
      form.value.Pan_Card_Number,
      this.EmployeeID
    )

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Activate_Employee_Profile_with_Branch_Ezshipp', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          if (this.Employee_Role == 1) {
            this.Status = "Biker Profile Setted Successfully"
            this.profile_set = false;
            this.ngOnInit()
            this.ErrorService.handleError(this.Status)
            form.resetForm();
          } else {
            this.Status = "Employee Profile Setted Successfully"
            this.profile_set = false;
            this.ngOnInit()
            this.ErrorService.handleError(this.Status)
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }

  Employee_delete() {
    const body = new EmployeeBranchModel(null, null, null, null, this.Product_deleted)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Remove_Employee', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.employee_deleted_view = -1
          this.Employees_Data.splice(this.Fordelete, 1)
          this.isRequesting = false;
          this.Status = data.json().extras.Status


        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })


  }

  Ondelete_view(item, index) {
    this.Product_deleted = item.EmployeeID

    this.employee_deleted_view = index
    this.Fordelete = index
  }
  onClose_Delete() {

    this.employee_deleted_view = -1
  }




  click_edit_employee(item, i) {
    this.Edit_employee_data = true

    this.Ezshipp_BranchID = item.Ezshipp_BranchID
    this.Employee_Company_ID = item.Employee_Company_ID
    this.Edit_Employee_Name = item.Employee_Name

    this.Ezshipp_Branch_Name = item.Ezshipp_Branch_Name

    this.Employee_Role = item.Employee_Role
    if (this.Employee_Role == 1) {
      this.open_zones_profile = true;

      this.zones()
    } else {
      this.open_zones_profile = false;

      this.Driving_License_Available = false
      this.Driving_License_Image = ''

    }
    this.Employee_Date_of_Joining_vishu = item.Employee_Date_of_Joining
    var edit_20 = this.Employee_Date_of_Joining_vishu.split('/')
    this.Employee_Date_of_Joining_vishu = edit_20[2] + '-' + edit_20[1] + '-' + edit_20[0]

    this.edit_Employee_Email = item.Employee_Email

    this.Employee_Image_Url = item.Employee_Image_Url
    this.edit_Employee_Gender = item.Employee_Gender

    this.edit_Employee_DOB_shobhan = item.Employee_DOB
    var edit_21 = this.edit_Employee_DOB_shobhan.split('/')
    this.edit_Employee_DOB_shobhan = edit_21[2] + '-' + edit_21[1] + '-' + edit_21[0]

    this.Address_Proof_Type = item.Address_Proof_Type
    this.edit_Employee_Address = item.Employee_Address
    this.edit_Employee_PhoneNumber = item.Employee_PhoneNumber
    this.Edit_Basic_Salary = item.Employee_Basic_Salary
    this.edit_Employee_PF = item.Employee_PF
    this.edit_Employee_TDS = item.Employee_TDS
    this.edit_Bank_Account_No = item.Bank_Account_No
    this.edit_Bank_Name = item.Bank_Name
    this.edit_Bank_IFSC_No = item.Bank_IFSC_No
    this.edit_Driving_License_Expiry_Date_raju = item.Driving_License_Expiry_Date
    var edit_25 = this.edit_Driving_License_Expiry_Date_raju.split('/')
    this.edit_Driving_License_Expiry_Date_raju = edit_25[2] + '-' + edit_25[1] + '-' + edit_25[0]

    this.Driving_License_Image = item.Driving_License_Image
    this.edit_Pan_Card_Image = item.Pan_Card_Image
    this.Edit_Pan_Card_Number = item.Pan_Card_Number

    this.Address_Proof_Image = item.Address_Proof_Image
    this.Complete_Profile_Set = item.Complete_Profile_Set
    this.EmployeeID = item.EmployeeID

    this.findall_branch();

  }

  onSubmit_edit_form(form: NgForm) {
    this.EmployeeID
    var Branch_Id = form.value.Branch_Id;
    var edit_banch_name = form.value.br_name;
    var edit_Employee_Name = form.value.Employee_Name;
    var edit_Employee_Gender = form.value.gender_value;
    var epm_email = form.value.email;
    let edit_Employee_PhoneNumber = form.value.Employee_PhoneNumber;
    var Date_of_Joining = form.value.Date_of_Joining;
    var edit_13 = Date_of_Joining.split('-')
    var edit_14 = edit_13[2] + '/' + edit_13[1] + '/' + edit_13[0]
    let Edit_Employee_DOB = form.value.Employee_DOB;
    var edit_11 = Edit_Employee_DOB.split('-')
    var edit_12 = edit_11[2] + '/' + edit_11[1] + '/' + edit_11[0]
    var Employee_Address = form.value.Employee_Address;
    var desginations = form.value.desginations;



    var Basicsalory = form.value.Basic_salory;
    var PF_data = form.value.PF;
    var TDS_data = form.value.TDS;

    var Bank_name = form.value.Bank_name;
    let Bank_account_no = form.value.Bank_no;
    var Bank_IFSC_No = form.value.Bank_IFSC_No;


    var operator_id = form.value.operator_id
    var zone_id = form.value.zone_id;

        if ( this.Employee_Image_Url.length) {
      this.Employee_Image_Available = true
    } else {
      this.Employee_Image_Available = false
       this.Employee_Image_Url = ''
    }


    if (this.Employee_Role == 1) {
      var License_Expiry_Date = form.value.License_Expiry_Date;
      this.edit_15 = License_Expiry_Date.split('-')
      this.edit_16 = this.edit_15[2] + '/' + this.edit_15[1] + '/' + this.edit_15[0]

      if (this.Driving_License_Image.length) {
        this.Driving_License_Available = true
      } else {
        this.Driving_License_Available = false
        this.Driving_License_Image = ''
      }
    } else {
      this.edit_16 = ''
      this.Driving_License_Available = false
      this.Driving_License_Image = ''
    }


    if (this.Address_Proof_Image.length) {
      this.Address_Proof_Available = true
    } else {
      this.Address_Proof_Available = false
      this.Address_Proof_Image = ''
    }
    var Address_Proof_Picture = form.value.Address_Proof_Picture;

    if (this.edit_Pan_Card_Image.length) {
      this.Pan_Card_Available = true
    } else {
      this.Pan_Card_Available = false
      this.edit_Pan_Card_Image = ''
    }

    var Pan_Card_Image = form.value.Pan_Card_Image;

    var Pan_Card_Number = form.value.Pan_Card_Number;

    if (form.value.br_name != "") {
      this.edit_banch_name = form.value.br_name
    } else {

    }












































      const body = new AddEmployeemodel(edit_banch_name, form.value.desginations,
      form.value.Employee_Name, form.value.Employee_PhoneNumber,
      form.value.email, form.value.gender_value,
      edit_12, form.value.Employee_Address,
      form.value.Basic_salory, form.value.PF,
      form.value.TDS, edit_14,
      form.value.Bank_no, form.value.Bank_name,
      form.value.Bank_IFSC_No, form.value.operator_id,
      form.value.zone_id, this.Employee_Image_Available,
      this.Employee_Image_Url, this.Driving_License_Available,
      this.edit_16, this.Driving_License_Image,
      this.Address_Proof_Image, this.edit_Pan_Card_Image,
      this.Pan_Card_Available, this.edit_Pan_Card_Image, form.value.Pan_Card_Number,
      this.EmployeeID)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Edit_Employee_Information', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.Edit_Employee_Salary()

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
 }





  Edit_Employee_Salary() {
    const body = new EmployeeBranchModel(null, null, null, null, this.EmployeeID, this.Edit_Basic_Salary, this.edit_Employee_PF, this.edit_Employee_TDS)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Edit_Employee_Salary_Details', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.Edit_Employee_Bank()


        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }

  Edit_Employee_Bank() {
    const body = new EmployeeBranchModel(null, null, null, null,
      this.EmployeeID, this.Edit_Basic_Salary, this.edit_Employee_PF, this.edit_Employee_TDS,
      this.edit_Bank_Account_No, this.edit_Bank_Name, this.edit_Bank_IFSC_No)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Edit_Employee_Bank_Details', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          if (this.isProfile_Edit) {
             this.Employee_Profile_Image_edit()
          } else if(this.isAddress_Edit){
             this.Employee_Address_Proof_edit()
          }else if(this.isPancard_Edit){
            this.Employee_Pan_Cards_image_edit()

          }else if(this.isLicence_Edit && this.Employee_Role == 1){
             this.Employee_Driver_Driving_License_edit()

          }else{
          setTimeout(()=>{
             this.find_Employees_of_Branch();
          },3000)
           this.open_loading_images = true;
       setTimeout(()=>{
        this.open_loading_images = false;
        this.Edit_employee_data = false
        }, 5000);
            this.views = -1;
            var msg = "Updated sucessfully"
            this.ErrorService.handleError(msg)
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }

  Employee_Profile_Image_edit() {
    const body = new AllImagesEditModel(this.EmployeeID, this.Employee_Image_Url)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Update_Employee_Profile_Image', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          if(this.isAddress_Edit){
            this.Employee_Address_Proof_edit()
          }else if(this.isPancard_Edit){
            this.Employee_Pan_Cards_image_edit()

          }else if(this.isLicence_Edit && this.Employee_Role == 1){
            this.Employee_Driver_Driving_License_edit()

          }else{
          setTimeout(()=>{
             this.find_Employees_of_Branch();
          },3000)
          this.open_loading_images = true;
       setTimeout(()=>{
        this.open_loading_images = false;
        this.Edit_employee_data = false
        }, 5000);
          this.views = -1;
          var msg = "Updated sucessfully"
          this.ErrorService.handleError(msg)
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }
  Employee_Pan_Cards_image_edit() {
    const body = new AllImagesEditModel(this.EmployeeID, null, this.edit_Pan_Card_Image, this.Edit_Pan_Card_Number)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Update_Employee_Pan_Cards_Details', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

         if(this.isAddress_Edit){
            this.Employee_Address_Proof_edit()
          }else if(this.isLicence_Edit && this.Employee_Role == 1){
            this.Employee_Driver_Driving_License_edit();

          }else{
          setTimeout(()=>{
             this.find_Employees_of_Branch();
          },3000)
          this.open_loading_images = true;
       setTimeout(()=>{
        this.open_loading_images = false;
        this.Edit_employee_data = false
        }, 5000);
          this.views = -1;
          var msg = "Updated sucessfully"
          this.ErrorService.handleError(msg)
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }

  Employee_Address_Proof_edit() {
    const body = new AllImagesEditModel(this.EmployeeID, null, null, null, this.Address_Proof_Image)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Update_Employee_Address_Proof_Details', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {


          if (this.isLicence_Edit && this.Employee_Role == 1) {
            this.Employee_Driver_Driving_License_edit()

          } else {
             setTimeout(()=>{
             this.find_Employees_of_Branch();
          },3000)
             this.open_loading_images = true;
       setTimeout(()=>{
        this.open_loading_images = false;
        this.Edit_employee_data = false
        }, 5000);
            this.views = -1;
            var msg = "Updated sucessfully"
            this.ErrorService.handleError(msg)
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }

  Employee_Driver_Driving_License_edit() {
    const body = new AllImagesEditModel(this.EmployeeID, null, null, null, null,
      this.edit_16, this.Driving_License_Image)


    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Update_Employee_Driver_Driving_License_Details', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {

          this.Status = data.json().extras.Status
          setTimeout(()=>{
             this.find_Employees_of_Branch();
          },3000)
            this.open_loading_images = true;
       setTimeout(()=>{
        this.open_loading_images = false;
        this.Edit_employee_data = false
        }, 5000);
          this.views = -1;



        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })

  }
  back_button_edit() {
    this.Edit_employee_data = false
    this.licence_upload = false
    this.Profile_upload = false
    this.Address_upload = false
    this.pancard_upload = false
    this.License_view_image = false
    this.Address_view_image = false
    this.Profile_view_image = false
    this.pancard_view_image = false
    this.open_loading_images = false;

  }




}


