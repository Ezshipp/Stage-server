import { OrdersModel_admin } from './../../front_end_models/OrdersModel';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router } from '@angular/router';
import { ErrorService } from './../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { ImageResult, ResizeOptions, ImageUploadModule } from 'ng2-imageupload';
import { AddStoreModel } from './../../front_end_models/store/Addstoremodel';
import { Http, Headers } from '@angular/http';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { GetLatLngModel } from '../../front_end_models/getLatLngModel';
declare var jQuery: any;
declare var google: any;
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild('closebtn') closebtn_deleteConform:ElementRef;
  deleteIndex: any;
  branchSectionindex: number = 0;
  branchSection = ["Branch Details", " Branch Timings", " Admin info"]

  @ViewChild('myModalimage') myModal: ElementRef;
  /* slider*/
  test: number = 200;
  minValue: number = 1;
  maxValue: number = 500;
  /* pop up of imageupload*/
  isimagecropping: boolean;

  /* cropper */

  data1: any;
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  StoreAdminID: any;
  isdeleteAdminIndex: any;
  OnetimeAdd: boolean;
  isadminAdd: boolean;
  Admin_name = '';
  Admin_Email = '';
  Admin_Phone = ''
  vi: any;
  i = 2
  image_view: boolean = false;
  isRequesting: boolean;
  @ViewChild('closebtn') closeBtn: ElementRef
  isBranchAdmin_edit: boolean;
  BranchID: any;
  isadminTimeEdit: boolean;
  imageSrc: any;
  isbranchdetails_Edit: boolean = false;
  isEnableEditClick: boolean = true;
  isadmindata: boolean;
  AdminData: any[] = [];
  isBranchTimes: boolean;
  isbranchDetails: boolean;
  Branch_Image_URL: any;
  Address_info: any;
  CityName: any;
  CountryName: any;
  Description: any;
  Website: any;
  Branch_PhoneNumber: any;
  BranchData_info: any;
  view: number = -1;
  BranchData: any=[];
  addresBackend: string;
  address_new: HTMLElement;
  body: AddStoreModel;
  Country_Data: any;
  city_Data: any;
  Thursday_Available: boolean = false;
  Friday_Available: boolean = false;
  Saturday_Available: boolean = false;
  Wednesday_Available: boolean = false;
  Sunday_Available: boolean = false
  Monday_Available: boolean = false
  Tuesday_Available: boolean = false
  lat = 17.4587
  lng = 78.2547888
  Picture: string;
  Address
  zoom: number = 8;
  activeid: number;
  activeBranch: number = 1;
  CategoryData: any = [];
  EntityData: any = [];
  url: string = '';
  address;
  public invoiceForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private http: Http,
    private ngZone: NgZone,
    private router: Router,
    private ErrorService: ErrorService,
    private mapsAPILoader: MapsAPILoader,
    private _ApiMessageService: ApiMessageService,
  ) {

    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 200;
    this.cropperSettings1.minHeight = 200;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.minWithRelativeToResolution = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;


    this.data1 = {};
  }
  cropped(bounds: Bounds) {

  }
  ngOnInit() {
    this.viewallBranches()
    this.All_CountryAndCity('/Find_All_Countries', 1)
    this.All_CountryAndCity('/Find_All_Cities', 2)
    this.Find_All_Entities_Name('/Find_All_Entities_Name', 1)
    this.Find_All_Entities_Name('/Find_All_Categories', 2)
    this.invoiceForm = this._fb.group({
      Store_Entity_Name: ['', Validators.required],
      Branch_Name: ['', Validators.required],
      Branch_PhoneNumber: ['', Validators.required],
      Website: ['', Validators.required],
      Description: ['', Validators.required],
      CategoryName: ['', Validators.required],
      Picture: ['', Validators.required],
      Address: ['', Validators.required],
      Sunday_Start: [''],
      Sunday_Stop: [''],
      Monday_AvailableStart: [''],
      Monday_AvailableStop: [''],
      Tuesday_AvailableStart: [''],
      Tuesday_AvailableStop: [''],
      Wednesday_AvailableStart: [''],
      Wednesday_AvailableStop: [''],
      Thursday_AvailableStart: [''],
      Thursday_AvailableStop: [''],
      Friday_AvailableStart: [''],
      Friday_AvailableStop: [''],
      Saturday_AvailableStart: [''],
      Saturday_AvailableStop: [''],
      CountryID: [''],
      CityID: [''],
      AdminData: this._fb.array([this.initItemRows()])
    });
  }
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 800
  };
  selected(imageResult: ImageResult) {
    this.Picture = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.imageSrc = this.Picture
    if (this.Picture.length > 0) {
      this.image_view = true;

    } else {
      this.image_view = false;
    }
  }
  uploadFile(fileInput: any) {
    this.isimagecropping = true
    let file = fileInput.target.files[0];
  }
  All_CountryAndCity(url: string, type: number) {
    const body1 = new ManualOrderModel()
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + url, body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          if (type == 1) {
            this.Country_Data = data.json().extras.CountryData
          } else if (type == 2) {
            this.city_Data = data.json().extras.CityData
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




        }
      }
      )
  }
  Find_All_Entities_Name(url: string, value: number) {
    const body1 = new AddStoreModel()
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + url, body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          if (value == 1) {
            this.EntityData = data.json().extras.EntityData
          } else if (value == 2) {
            this.CategoryData = data.json().extras.CategoryData
          }
        }
      })
  }
  initItemRows() {
    return this._fb.group({
      Name: [''],
      EmailID: [null, Validators.email],
      PhoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });
  }
  addNewRow() {
    const control: FormArray = this.invoiceForm.get(`AdminData`) as FormArray;
    control.push(this.initItemRows());
  }
  deleteRow(index: number) {
    const control: FormArray = this.invoiceForm.get(`AdminData`) as FormArray;
    control.removeAt(index);
  }
  get formData() {
    return <FormArray>this.invoiceForm.get('AdminData');
  }
  StoreAddress() {
    var autocomplete: any;
    var options = { componentRestrictions: { country: "IN" } };
    this.address_new = document.getElementById('address');
    autocomplete = new google.maps.places.Autocomplete(this.address_new, options)
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.ngZone.run(() => {
        this.zoom = 17;
        var place = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.addresBackend = place.formatted_address
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      });
    });
  }
  onOpenhours_monday(Monday_Available) {
    this.Monday_Available = !this.Monday_Available
  }
  onOpenhours_sunday(Sunday_Available) {
    this.Sunday_Available = !this.Sunday_Available
  }
  onOpenhours_tuesday(Tuesday_Available) {
    this.Tuesday_Available = !this.Tuesday_Available
  }
  onOpenH_Wednesday_Available() {
    this.Wednesday_Available = !this.Wednesday_Available
  }
  onOpenH_Thursday_Available_Available() {
    this.Thursday_Available = !this.Thursday_Available
  }
  onOpenH_Friday_Available_Available() {
    this.Friday_Available = !this.Friday_Available
  }
  onOpenH_Saturday_Available_Available() {
    this.Saturday_Available = !this.Saturday_Available
  }
  onclickImageCropping() {

    jQuery(this.myModal.nativeElement).modal('show');
  }
  onsubmit_premiumCust(HubName) {
    const body = new GetLatLngModel(HubName)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
        .subscribe(
        data => {
            if (data.json().success) {
                var address = data.json().extras.Data
                if (address.latlong == true) {
                    this.lat=address.latitude
                    this.lng=address.longitude

                }
                else {
                    alert("No address Found")
                }
            }
            else {
                alert("No address Found")
            }
        }
        )
}
OnRegister_store(){
  const body = new GetLatLngModel(this.addresBackend)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    var address = data.json().extras.Data
                    if (address.latlong == true) {
                        this.lat=address.latitude
                        this.lng=address.longitude
                        // this.OnAddressHub=HubName
                        this.OnRegister_storeFinal()
                    }
                    else {
                        alert("No address Found")
                    }
                }
                else {
                    alert("No address Found")
                }
            }
            )
}
  OnRegister_storeFinal() {
console.log("enter "+this.addresBackend)
    var picture = this.data1.image
    if (this.data1.image.indexOf('image/png')) {

      picture = this.data1.image.replace('image/png', 'image/jpeg')

    } else {
      picture = this.data1.image

    }
    this.isRequesting = true
    if (this.Sunday_Available) {
      var Sunday_Timings = []
      Sunday_Timings.push({
        From_Time: this.invoiceForm.value.Sunday_Start,
        To_Time: (this.invoiceForm.value.Sunday_Stop)
      })
    }
    if (this.Monday_Available) {
      var Monday_Timings = []
      Monday_Timings.push({
        From_Time: (this.invoiceForm.value.Monday_AvailableStart),
        To_Time: (this.invoiceForm.value.Monday_AvailableStop)
      })
    }
    if (this.Tuesday_Available) {
      var Tuesday_Timings = []
      Tuesday_Timings.push({
        From_Time: (this.invoiceForm.value.Tuesday_AvailableStart),
        To_Time: (this.invoiceForm.value.Tuesday_AvailableStop)
      })
    }
    if (this.Wednesday_Available) {
      var Wednesday_Timings = []
      Wednesday_Timings.push({
        From_Time: (this.invoiceForm.value.Wednesday_AvailableStart),
        To_Time: (this.invoiceForm.value.Wednesday_AvailableStop)
      })
    }
    if (this.Thursday_Available) {
      var Thursday_Timings = []
      Thursday_Timings.push({
        From_Time: (this.invoiceForm.value.Thursday_AvailableStart),
        To_Time: (this.invoiceForm.value.Thursday_AvailableStop)
      })
    }
    if (this.Friday_Available) {
      var Friday_Timings = []
      Friday_Timings.push({
        From_Time: (this.invoiceForm.value.Friday_AvailableStart),
        To_Time: (this.invoiceForm.value.Friday_AvailableStop)
      })
    }
    if (this.Saturday_Available) {
      var Saturday_Timings = []
      Saturday_Timings.push({
        From_Time: (this.invoiceForm.value.Saturday_AvailableStart),
        To_Time: (this.invoiceForm.value.Saturday_AvailableStop)
      })
    }
    const body = new AddStoreModel(this.invoiceForm.value.Store_Entity_Name
      , this.invoiceForm.value.Branch_Name
      , this.invoiceForm.value.Branch_PhoneNumber
      , this.invoiceForm.value.Website
      , this.invoiceForm.value.Description
      , this.invoiceForm.value.CategoryName
      , picture
      , "58ff0542128c80391053056e"
      , "59017436128c803f4753056e"
      , this.addresBackend,
      this.lat
      , this.lng
      , this.Monday_Available
      , Monday_Timings
      , this.Tuesday_Available
      , Tuesday_Timings
      , this.Wednesday_Available
      , Wednesday_Timings
      , this.Thursday_Available
      , Thursday_Timings
      , this.Friday_Available
      , Friday_Timings
      , this.Saturday_Available
      , Saturday_Timings, this.Sunday_Available
      , Sunday_Timings
      , this.invoiceForm.value.AdminData)
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.url + '/Add_Entity_Branch', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          var message = "Branch added sucessfully";
          this.ErrorService.handleError(message)
          this.closeModal()
          this.viewallBranches()
          this.invoiceForm.reset()
          this.Picture = ''
          this.isRequesting = false

        } else {
          this.closeModal()
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]


          this.ErrorService.handleError(message)
          this.isRequesting = false

        }
      })
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  pos_pick($event) {
    let pos = ($event);
    this.lat = pos.coords.lat;
    this.lng = pos.coords.lng;

  }
  viewallBranches() {
    const body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 1)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Find_All_Ezshipp_Business_Branches', body1, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.BranchData = data.json().extras.BranchData

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  Details_view(item, i) {
    this.activeBranch = 1
    this.view = i
    this.GetBranchInfo(item.BranchID)
  }
  GetBranchInfo(BranchID, isedit?: boolean) {
    this.BranchID = BranchID
    const body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, BranchID)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Branch_In_Detail', body1, { headers: headers })
      .subscribe(data => {
        if (data.json().success) {
          this.BranchData_info = data.json().extras.BranchData


          if (isedit) {
            this.viewData()
          } else {
            this.getBranchDetails()
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      })
  }
  viewData() {
    this.Branch_PhoneNumber = this.BranchData_info.Branch_PhoneNumber
    this.Website = this.BranchData_info.Website
    this.Description = this.BranchData_info.Description
    this.CountryName = this.BranchData_info.CountryName
    this.CityName = this.BranchData_info.CityName
    this.Address_info = this.BranchData_info.Address
    this.Branch_Image_URL = this.BranchData_info.Branch_Image_URL
    this.imageSrc = this.Branch_Image_URL
    this.addresBackend = this.Address_info
    this.AdminData = this.BranchData_info.AdminData

    this.lat = this.BranchData_info.Latitude
    this.lng = this.BranchData_info.Longitude
  }
  getBranchDetails() {
    this.isbranchDetails = true
    this.isadmindata = false
    this.isBranchTimes = false
    this.isadminTimeEdit = false
    this.isbranchdetails_Edit = false
    this.viewData()
    this.isBranchAdmin_edit = false
  }
  getBranchTimes() {
    this.isbranchDetails = false
    this.isBranchTimes = true
    this.isadmindata = false
    this.isbranchdetails_Edit = false
    this.isEnableEditClick = true
    this.isBranchAdmin_edit = false
    this.isadminTimeEdit = false
  }
  getAdminData() {
    this.isadmindata = true
    this.isBranchTimes = false
    this.isbranchDetails = false
    this.isBranchAdmin_edit = false
    this.isadminTimeEdit = false
    this.isbranchdetails_Edit = false
  }
  closeBranchInfo() {
    this.view = -1;
  }
  editBranchInfo(item, i) {
    this.GetBranchInfo(this.BranchID, true)
    this.isbranchdetails_Edit = true
    this.isbranchDetails = false
    this.isBranchAdmin_edit = false
  }
  closeEditView_branch() {
    this.isbranchdetails_Edit = false;
    this.isbranchDetails = true
    this.GetBranchInfo(this.BranchID, true)
  }
  submitUpdate() {
    const body = new AddStoreModel(null, this.BranchData_info.Branch_Name, this.Branch_PhoneNumber, this.Website, this.Description,
      this.BranchData_info.CategoryName, null, this.BranchData_info.CountryID, this.BranchData_info.CityID, this.addresBackend, this.lat,
      this.lng, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchData_info.BranchID)

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Edit_Branch_Information', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          var message = data.json().extras.Status
          this.ErrorService.handleError(message)
          this.closeEditView_branch();
          this.closeBranchInfo();
          this.viewallBranches()
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
        }
      })
  }
  updateBranchIMage() {
    const body1 = new AddStoreModel(null, null, null, null, null, null, this.Picture, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchData_info.BranchID)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Update_Branch_Image', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.closeEditView_branch();
          this.closeBranchInfo();
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  editBranchTime(item, i) {
    this.GetBranchInfo(this.BranchID, true)
    this.isBranchTimes = false
    this.isadminTimeEdit = true
    this.isEnableEditClick = false
    this.isBranchAdmin_edit = false
  }
  close_branchEditTimengs() {
    this.GetBranchInfo(this.BranchID, true)
    this.isadminTimeEdit = false;
    this.isBranchTimes = true
    this.isEnableEditClick = true
    this.isBranchAdmin_edit = false
  }
  checkSelected_Thursday(e, value: boolean) {

  }
  checkSelected_Sunday(value) {
    this.BranchData_info.Sunday_Available = !this.BranchData_info.Sunday_Available
  }
  checkSelected_Monday() {
    this.BranchData_info.Monday_Available = !this.BranchData_info.Monday_Available
  }
  checkSelected_Day(e) {
    if (e.target.name == 'Sunday') {
      this.BranchData_info.Sunday_Available = !this.BranchData_info.Sunday_Available
    } else if (e.target.name == 'Monday') {
      this.BranchData_info.Monday_Available = !this.BranchData_info.Monday_Available
    }
    else if (e.target.name == 'Tuesday') {
      this.BranchData_info.Tuesday_Available = !this.BranchData_info.Tuesday_Available
    } else if (e.target.name == 'Wednesday') {
      this.BranchData_info.Wednesday_Available = !this.BranchData_info.Wednesday_Available
    } else if (e.target.name == 'Thursday') {
      this.BranchData_info.Thursday_Available = !this.BranchData_info.Thursday_Available
    } else if (e.target.name == 'Friday') {
      this.BranchData_info.Friday_Available = !this.BranchData_info.Friday_Available
    } else if (e.target.name == 'Saturday') {
      this.BranchData_info.Saturday_Available = !this.BranchData_info.Saturday_Available
    }
  }
  Onupdate_Timeings() {
    if (this.BranchData_info.Sunday_Available) {
      var Sunday_Timings = []
      Sunday_Timings.push({
        From_Time: this.BranchData_info.Sunday_Timings[0].From_Time,
        To_Time: this.BranchData_info.Sunday_Timings[0].To_Time
      })
    }
    if (this.BranchData_info.Monday_Available) {
      var Monday_Timings = []
      Monday_Timings.push({
        From_Time: (this.BranchData_info.Monday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Monday_Timings[0].To_Time)
      })
    }
    if (this.BranchData_info.Tuesday_Available) {
      var Tuesday_Timings = []
      Tuesday_Timings.push({
        From_Time: (this.BranchData_info.Tuesday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Tuesday_Timings[0].To_Time)
      })
    }
    if (this.BranchData_info.Wednesday_Available) {
      var Wednesday_Timings = []
      Wednesday_Timings.push({
        From_Time: (this.BranchData_info.Wednesday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Wednesday_Timings[0].To_Time)
      })
    }
    if (this.BranchData_info.Thursday_Available) {
      var Thursday_Timings = []
      Thursday_Timings.push({
        From_Time: (this.BranchData_info.Thursday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Thursday_Timings[0].To_Time)
      })
    }
    if (this.BranchData_info.Friday_Available) {
      var Friday_Timings = []
      Friday_Timings.push({
        From_Time: (this.BranchData_info.Thursday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Thursday_Timings[0].To_Time)
      })
    }
    if (this.BranchData_info.Saturday_Available) {
      var Saturday_Timings = []
      Saturday_Timings.push({
        From_Time: (this.BranchData_info.Friday_Timings[0].From_Time),
        To_Time: (this.BranchData_info.Friday_Timings[0].To_Time)
      })
    }
    const body = new AddStoreModel(null
      , null
      , null
      , null
      , null
      , null
      , null
      , null
      , null
      , null
      , null
      , null
      , this.BranchData_info.Monday_Available
      , Monday_Timings
      , this.BranchData_info.Tuesday_Available
      , Tuesday_Timings
      , this.BranchData_info.Wednesday_Available
      , Wednesday_Timings
      , this.BranchData_info.Thursday_Available
      , Thursday_Timings
      , this.BranchData_info.Friday_Available
      , Friday_Timings
      , this.BranchData_info.Saturday_Available
      , Saturday_Timings,
      this.BranchData_info.Sunday_Available
      , Sunday_Timings, null, null, null, this.BranchID)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Edit_Branch_Timings', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.close_branchEditTimengs();
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  editBranchAdminData(item, i) {
    this.isadmindata = false
    this.isBranchAdmin_edit = true
    this.GetBranchInfo(this.BranchID, true)
    this.isadminAdd = false
    this.OnetimeAdd = true
    this.isdeleteAdminIndex = -1
  }
  closeEditBranchAdmin() {
    this.isbranchdetails_Edit = false
    this.isadmindata = true
    this.isbranchdetails_Edit = false
    this.isBranchTimes = false
    this.isBranchAdmin_edit = false
    this.GetBranchInfo(this.BranchID, true)

  }
  OnRemove_admin(item, i) {
    this.isdeleteAdminIndex = i
    this.StoreAdminID = item.StoreAdminID



  }
  onClose_Delete() {
    this.isdeleteAdminIndex = -1
  }
  remove_Admin() {

    const body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID, this.StoreAdminID)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Remove_Store_Admin', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.AdminData.splice(this.isdeleteAdminIndex, 1)
          this.close_branchEditTimengs();
          this.closeBranchInfo();
          this.isdeleteAdminIndex = -1
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  OnAddAdminData() {
    this.OnetimeAdd = false
    this.isadminAdd = true


  }
  OndeleteNewRow() {
    this.isadminAdd = false;
    this.OnetimeAdd = true;
    this.Admin_Email = '';
    this.Admin_name = '';
    this.Admin_Phone = ''
  }
  onsubmitAdmin() {
    this.AdminData.push({ 'Name': this.Admin_name, 'EmailID': this.Admin_Email, 'PhoneNumber': this.Admin_Phone })
    this.OnetimeAdd = true
    this.isadminAdd = false
    this.Admin_Email = '';
    this.Admin_name = '';
    const body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID, null, this.Admin_name, this.Admin_name, this.Admin_Phone)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Add_Store_Admin_to_Branch', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.AdminData.splice(this.isdeleteAdminIndex, 1)
          this.close_branchEditTimengs();
          this.closeBranchInfo();


          this.Admin_Phone = ''

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);





          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )

  }
  OncloseImagecropping() {
    this.isimagecropping = false
  }
  Onselect_Branch(j: number, branchSection) {
    this.branchSectionindex = j
    if (j == 0) {
      this.getBranchDetails()
    } else if (j == 1) {
      this.getBranchTimes()

    } else if (j == 2) {
      this.getAdminData()

    }
  }
  Ondelete(item, i) {

    this.BranchID = item.BranchID
    this.deleteIndex = i
  }
  remove_Branch() {

    const body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Inactivate_Store_Branch', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.BranchData.splice(this.deleteIndex, 1)
          this.close_branchEditTimengs();
          this.closeBranchInfo();
          this.deleteIndex = -1
          this.closebtn_deleteConform.nativeElement.click()
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);




          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
}
