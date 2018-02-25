var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiMessageService } from './../../authentication/apimessages.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router } from '@angular/router';
import { ErrorService } from './../../errors/error.service';
import { ManualOrderModel } from './../../front_end_models/manualorderModel';
import { AddStoreModel } from './../../front_end_models/store/Addstoremodel';
import { Http, Headers } from '@angular/http';
import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { GetLatLngModel } from '../../front_end_models/getLatLngModel';
var StoresComponent = /** @class */ (function () {
    function StoresComponent(_fb, http, ngZone, router, ErrorService, mapsAPILoader, _ApiMessageService) {
        this._fb = _fb;
        this.http = http;
        this.ngZone = ngZone;
        this.router = router;
        this.ErrorService = ErrorService;
        this.mapsAPILoader = mapsAPILoader;
        this._ApiMessageService = _ApiMessageService;
        this.branchSectionindex = 0;
        this.branchSection = ["Branch Details", " Branch Timings", " Admin info"];
        /* slider*/
        this.test = 200;
        this.minValue = 1;
        this.maxValue = 500;
        this.Admin_name = '';
        this.Admin_Email = '';
        this.Admin_Phone = '';
        this.i = 2;
        this.image_view = false;
        this.isbranchdetails_Edit = false;
        this.isEnableEditClick = true;
        this.AdminData = [];
        this.view = -1;
        this.BranchData = [];
        this.Thursday_Available = false;
        this.Friday_Available = false;
        this.Saturday_Available = false;
        this.Wednesday_Available = false;
        this.Sunday_Available = false;
        this.Monday_Available = false;
        this.Tuesday_Available = false;
        this.lat = 17.4587;
        this.lng = 78.2547888;
        this.zoom = 8;
        this.activeBranch = 1;
        this.CategoryData = [];
        this.EntityData = [];
        this.url = '';
        this.resizeOptions = {
            resizeMaxHeight: 600,
            resizeMaxWidth: 800
        };
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
    StoresComponent.prototype.cropped = function (bounds) {
    };
    StoresComponent.prototype.ngOnInit = function () {
        this.viewallBranches();
        this.All_CountryAndCity('/Find_All_Countries', 1);
        this.All_CountryAndCity('/Find_All_Cities', 2);
        this.Find_All_Entities_Name('/Find_All_Entities_Name', 1);
        this.Find_All_Entities_Name('/Find_All_Categories', 2);
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
    };
    StoresComponent.prototype.selected = function (imageResult) {
        this.Picture = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.imageSrc = this.Picture;
        if (this.Picture.length > 0) {
            this.image_view = true;
        }
        else {
            this.image_view = false;
        }
    };
    StoresComponent.prototype.uploadFile = function (fileInput) {
        this.isimagecropping = true;
        var file = fileInput.target.files[0];
    };
    StoresComponent.prototype.All_CountryAndCity = function (url, type) {
        var _this = this;
        var body1 = new ManualOrderModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.Country_Data = data.json().extras.CountryData;
                }
                else if (type == 2) {
                    _this.city_Data = data.json().extras.CityData;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
            }
        });
    };
    StoresComponent.prototype.Find_All_Entities_Name = function (url, value) {
        var _this = this;
        var body1 = new AddStoreModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (value == 1) {
                    _this.EntityData = data.json().extras.EntityData;
                }
                else if (value == 2) {
                    _this.CategoryData = data.json().extras.CategoryData;
                }
            }
        });
    };
    StoresComponent.prototype.initItemRows = function () {
        return this._fb.group({
            Name: [''],
            EmailID: [null, Validators.email],
            PhoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
        });
    };
    StoresComponent.prototype.addNewRow = function () {
        var control = this.invoiceForm.get("AdminData");
        control.push(this.initItemRows());
    };
    StoresComponent.prototype.deleteRow = function (index) {
        var control = this.invoiceForm.get("AdminData");
        control.removeAt(index);
    };
    Object.defineProperty(StoresComponent.prototype, "formData", {
        get: function () {
            return this.invoiceForm.get('AdminData');
        },
        enumerable: true,
        configurable: true
    });
    StoresComponent.prototype.StoreAddress = function () {
        var _this = this;
        var autocomplete;
        var options = { componentRestrictions: { country: "IN" } };
        this.address_new = document.getElementById('address');
        autocomplete = new google.maps.places.Autocomplete(this.address_new, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this.ngZone.run(function () {
                _this.zoom = 17;
                var place = autocomplete.getPlace();
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }
                _this.addresBackend = place.formatted_address;
                _this.lat = place.geometry.location.lat();
                _this.lng = place.geometry.location.lng();
            });
        });
    };
    StoresComponent.prototype.onOpenhours_monday = function (Monday_Available) {
        this.Monday_Available = !this.Monday_Available;
    };
    StoresComponent.prototype.onOpenhours_sunday = function (Sunday_Available) {
        this.Sunday_Available = !this.Sunday_Available;
    };
    StoresComponent.prototype.onOpenhours_tuesday = function (Tuesday_Available) {
        this.Tuesday_Available = !this.Tuesday_Available;
    };
    StoresComponent.prototype.onOpenH_Wednesday_Available = function () {
        this.Wednesday_Available = !this.Wednesday_Available;
    };
    StoresComponent.prototype.onOpenH_Thursday_Available_Available = function () {
        this.Thursday_Available = !this.Thursday_Available;
    };
    StoresComponent.prototype.onOpenH_Friday_Available_Available = function () {
        this.Friday_Available = !this.Friday_Available;
    };
    StoresComponent.prototype.onOpenH_Saturday_Available_Available = function () {
        this.Saturday_Available = !this.Saturday_Available;
    };
    StoresComponent.prototype.onclickImageCropping = function () {
        jQuery(this.myModal.nativeElement).modal('show');
    };
    StoresComponent.prototype.onsubmit_premiumCust = function (HubName) {
        var _this = this;
        var body = new GetLatLngModel(HubName);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var address = data.json().extras.Data;
                if (address.latlong == true) {
                    _this.lat = address.latitude;
                    _this.lng = address.longitude;
                }
                else {
                    alert("No address Found");
                }
            }
            else {
                alert("No address Found");
            }
        });
    };
    StoresComponent.prototype.OnRegister_store = function () {
        var _this = this;
        var body = new GetLatLngModel(this.addresBackend);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Address_Lat_long', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var address = data.json().extras.Data;
                if (address.latlong == true) {
                    _this.lat = address.latitude;
                    _this.lng = address.longitude;
                    // this.OnAddressHub=HubName
                    _this.OnRegister_storeFinal();
                }
                else {
                    alert("No address Found");
                }
            }
            else {
                alert("No address Found");
            }
        });
    };
    StoresComponent.prototype.OnRegister_storeFinal = function () {
        var _this = this;
        console.log("enter " + this.addresBackend);
        var picture = this.data1.image;
        if (this.data1.image.indexOf('image/png')) {
            picture = this.data1.image.replace('image/png', 'image/jpeg');
        }
        else {
            picture = this.data1.image;
        }
        this.isRequesting = true;
        if (this.Sunday_Available) {
            var Sunday_Timings = [];
            Sunday_Timings.push({
                From_Time: this.invoiceForm.value.Sunday_Start,
                To_Time: (this.invoiceForm.value.Sunday_Stop)
            });
        }
        if (this.Monday_Available) {
            var Monday_Timings = [];
            Monday_Timings.push({
                From_Time: (this.invoiceForm.value.Monday_AvailableStart),
                To_Time: (this.invoiceForm.value.Monday_AvailableStop)
            });
        }
        if (this.Tuesday_Available) {
            var Tuesday_Timings = [];
            Tuesday_Timings.push({
                From_Time: (this.invoiceForm.value.Tuesday_AvailableStart),
                To_Time: (this.invoiceForm.value.Tuesday_AvailableStop)
            });
        }
        if (this.Wednesday_Available) {
            var Wednesday_Timings = [];
            Wednesday_Timings.push({
                From_Time: (this.invoiceForm.value.Wednesday_AvailableStart),
                To_Time: (this.invoiceForm.value.Wednesday_AvailableStop)
            });
        }
        if (this.Thursday_Available) {
            var Thursday_Timings = [];
            Thursday_Timings.push({
                From_Time: (this.invoiceForm.value.Thursday_AvailableStart),
                To_Time: (this.invoiceForm.value.Thursday_AvailableStop)
            });
        }
        if (this.Friday_Available) {
            var Friday_Timings = [];
            Friday_Timings.push({
                From_Time: (this.invoiceForm.value.Friday_AvailableStart),
                To_Time: (this.invoiceForm.value.Friday_AvailableStop)
            });
        }
        if (this.Saturday_Available) {
            var Saturday_Timings = [];
            Saturday_Timings.push({
                From_Time: (this.invoiceForm.value.Saturday_AvailableStart),
                To_Time: (this.invoiceForm.value.Saturday_AvailableStop)
            });
        }
        var body = new AddStoreModel(this.invoiceForm.value.Store_Entity_Name, this.invoiceForm.value.Branch_Name, this.invoiceForm.value.Branch_PhoneNumber, this.invoiceForm.value.Website, this.invoiceForm.value.Description, this.invoiceForm.value.CategoryName, picture, "58ff0542128c80391053056e", "59017436128c803f4753056e", this.addresBackend, this.lat, this.lng, this.Monday_Available, Monday_Timings, this.Tuesday_Available, Tuesday_Timings, this.Wednesday_Available, Wednesday_Timings, this.Thursday_Available, Thursday_Timings, this.Friday_Available, Friday_Timings, this.Saturday_Available, Saturday_Timings, this.Sunday_Available, Sunday_Timings, this.invoiceForm.value.AdminData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Entity_Branch', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = "Branch added sucessfully";
                _this.ErrorService.handleError(message);
                _this.closeModal();
                _this.viewallBranches();
                _this.invoiceForm.reset();
                _this.Picture = '';
                _this.isRequesting = false;
            }
            else {
                _this.closeModal();
                var msgNumber = parseInt(data.json().extras.msg);
                var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message_1);
                _this.isRequesting = false;
            }
        });
    };
    StoresComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    StoresComponent.prototype.pos_pick = function ($event) {
        var pos = ($event);
        this.lat = pos.coords.lat;
        this.lng = pos.coords.lng;
    };
    StoresComponent.prototype.viewallBranches = function () {
        var _this = this;
        var body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Ezshipp_Business_Branches', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.BranchData = data.json().extras.BranchData;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.Details_view = function (item, i) {
        this.activeBranch = 1;
        this.view = i;
        this.GetBranchInfo(item.BranchID);
    };
    StoresComponent.prototype.GetBranchInfo = function (BranchID, isedit) {
        var _this = this;
        this.BranchID = BranchID;
        var body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, BranchID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Branch_In_Detail', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.BranchData_info = data.json().extras.BranchData;
                if (isedit) {
                    _this.viewData();
                }
                else {
                    _this.getBranchDetails();
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.viewData = function () {
        this.Branch_PhoneNumber = this.BranchData_info.Branch_PhoneNumber;
        this.Website = this.BranchData_info.Website;
        this.Description = this.BranchData_info.Description;
        this.CountryName = this.BranchData_info.CountryName;
        this.CityName = this.BranchData_info.CityName;
        this.Address_info = this.BranchData_info.Address;
        this.Branch_Image_URL = this.BranchData_info.Branch_Image_URL;
        this.imageSrc = this.Branch_Image_URL;
        this.addresBackend = this.Address_info;
        this.AdminData = this.BranchData_info.AdminData;
        this.lat = this.BranchData_info.Latitude;
        this.lng = this.BranchData_info.Longitude;
    };
    StoresComponent.prototype.getBranchDetails = function () {
        this.isbranchDetails = true;
        this.isadmindata = false;
        this.isBranchTimes = false;
        this.isadminTimeEdit = false;
        this.isbranchdetails_Edit = false;
        this.viewData();
        this.isBranchAdmin_edit = false;
    };
    StoresComponent.prototype.getBranchTimes = function () {
        this.isbranchDetails = false;
        this.isBranchTimes = true;
        this.isadmindata = false;
        this.isbranchdetails_Edit = false;
        this.isEnableEditClick = true;
        this.isBranchAdmin_edit = false;
        this.isadminTimeEdit = false;
    };
    StoresComponent.prototype.getAdminData = function () {
        this.isadmindata = true;
        this.isBranchTimes = false;
        this.isbranchDetails = false;
        this.isBranchAdmin_edit = false;
        this.isadminTimeEdit = false;
        this.isbranchdetails_Edit = false;
    };
    StoresComponent.prototype.closeBranchInfo = function () {
        this.view = -1;
    };
    StoresComponent.prototype.editBranchInfo = function (item, i) {
        this.GetBranchInfo(this.BranchID, true);
        this.isbranchdetails_Edit = true;
        this.isbranchDetails = false;
        this.isBranchAdmin_edit = false;
    };
    StoresComponent.prototype.closeEditView_branch = function () {
        this.isbranchdetails_Edit = false;
        this.isbranchDetails = true;
        this.GetBranchInfo(this.BranchID, true);
    };
    StoresComponent.prototype.submitUpdate = function () {
        var _this = this;
        var body = new AddStoreModel(null, this.BranchData_info.Branch_Name, this.Branch_PhoneNumber, this.Website, this.Description, this.BranchData_info.CategoryName, null, this.BranchData_info.CountryID, this.BranchData_info.CityID, this.addresBackend, this.lat, this.lng, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchData_info.BranchID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Branch_Information', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var message = data.json().extras.Status;
                _this.ErrorService.handleError(message);
                _this.closeEditView_branch();
                _this.closeBranchInfo();
                _this.viewallBranches();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
            }
        });
    };
    StoresComponent.prototype.updateBranchIMage = function () {
        var _this = this;
        var body1 = new AddStoreModel(null, null, null, null, null, null, this.Picture, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchData_info.BranchID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Update_Branch_Image', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.closeEditView_branch();
                _this.closeBranchInfo();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.editBranchTime = function (item, i) {
        this.GetBranchInfo(this.BranchID, true);
        this.isBranchTimes = false;
        this.isadminTimeEdit = true;
        this.isEnableEditClick = false;
        this.isBranchAdmin_edit = false;
    };
    StoresComponent.prototype.close_branchEditTimengs = function () {
        this.GetBranchInfo(this.BranchID, true);
        this.isadminTimeEdit = false;
        this.isBranchTimes = true;
        this.isEnableEditClick = true;
        this.isBranchAdmin_edit = false;
    };
    StoresComponent.prototype.checkSelected_Thursday = function (e, value) {
    };
    StoresComponent.prototype.checkSelected_Sunday = function (value) {
        this.BranchData_info.Sunday_Available = !this.BranchData_info.Sunday_Available;
    };
    StoresComponent.prototype.checkSelected_Monday = function () {
        this.BranchData_info.Monday_Available = !this.BranchData_info.Monday_Available;
    };
    StoresComponent.prototype.checkSelected_Day = function (e) {
        if (e.target.name == 'Sunday') {
            this.BranchData_info.Sunday_Available = !this.BranchData_info.Sunday_Available;
        }
        else if (e.target.name == 'Monday') {
            this.BranchData_info.Monday_Available = !this.BranchData_info.Monday_Available;
        }
        else if (e.target.name == 'Tuesday') {
            this.BranchData_info.Tuesday_Available = !this.BranchData_info.Tuesday_Available;
        }
        else if (e.target.name == 'Wednesday') {
            this.BranchData_info.Wednesday_Available = !this.BranchData_info.Wednesday_Available;
        }
        else if (e.target.name == 'Thursday') {
            this.BranchData_info.Thursday_Available = !this.BranchData_info.Thursday_Available;
        }
        else if (e.target.name == 'Friday') {
            this.BranchData_info.Friday_Available = !this.BranchData_info.Friday_Available;
        }
        else if (e.target.name == 'Saturday') {
            this.BranchData_info.Saturday_Available = !this.BranchData_info.Saturday_Available;
        }
    };
    StoresComponent.prototype.Onupdate_Timeings = function () {
        var _this = this;
        if (this.BranchData_info.Sunday_Available) {
            var Sunday_Timings = [];
            Sunday_Timings.push({
                From_Time: this.BranchData_info.Sunday_Timings[0].From_Time,
                To_Time: this.BranchData_info.Sunday_Timings[0].To_Time
            });
        }
        if (this.BranchData_info.Monday_Available) {
            var Monday_Timings = [];
            Monday_Timings.push({
                From_Time: (this.BranchData_info.Monday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Monday_Timings[0].To_Time)
            });
        }
        if (this.BranchData_info.Tuesday_Available) {
            var Tuesday_Timings = [];
            Tuesday_Timings.push({
                From_Time: (this.BranchData_info.Tuesday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Tuesday_Timings[0].To_Time)
            });
        }
        if (this.BranchData_info.Wednesday_Available) {
            var Wednesday_Timings = [];
            Wednesday_Timings.push({
                From_Time: (this.BranchData_info.Wednesday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Wednesday_Timings[0].To_Time)
            });
        }
        if (this.BranchData_info.Thursday_Available) {
            var Thursday_Timings = [];
            Thursday_Timings.push({
                From_Time: (this.BranchData_info.Thursday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Thursday_Timings[0].To_Time)
            });
        }
        if (this.BranchData_info.Friday_Available) {
            var Friday_Timings = [];
            Friday_Timings.push({
                From_Time: (this.BranchData_info.Thursday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Thursday_Timings[0].To_Time)
            });
        }
        if (this.BranchData_info.Saturday_Available) {
            var Saturday_Timings = [];
            Saturday_Timings.push({
                From_Time: (this.BranchData_info.Friday_Timings[0].From_Time),
                To_Time: (this.BranchData_info.Friday_Timings[0].To_Time)
            });
        }
        var body = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, this.BranchData_info.Monday_Available, Monday_Timings, this.BranchData_info.Tuesday_Available, Tuesday_Timings, this.BranchData_info.Wednesday_Available, Wednesday_Timings, this.BranchData_info.Thursday_Available, Thursday_Timings, this.BranchData_info.Friday_Available, Friday_Timings, this.BranchData_info.Saturday_Available, Saturday_Timings, this.BranchData_info.Sunday_Available, Sunday_Timings, null, null, null, this.BranchID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Edit_Branch_Timings', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.close_branchEditTimengs();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.editBranchAdminData = function (item, i) {
        this.isadmindata = false;
        this.isBranchAdmin_edit = true;
        this.GetBranchInfo(this.BranchID, true);
        this.isadminAdd = false;
        this.OnetimeAdd = true;
        this.isdeleteAdminIndex = -1;
    };
    StoresComponent.prototype.closeEditBranchAdmin = function () {
        this.isbranchdetails_Edit = false;
        this.isadmindata = true;
        this.isbranchdetails_Edit = false;
        this.isBranchTimes = false;
        this.isBranchAdmin_edit = false;
        this.GetBranchInfo(this.BranchID, true);
    };
    StoresComponent.prototype.OnRemove_admin = function (item, i) {
        this.isdeleteAdminIndex = i;
        this.StoreAdminID = item.StoreAdminID;
    };
    StoresComponent.prototype.onClose_Delete = function () {
        this.isdeleteAdminIndex = -1;
    };
    StoresComponent.prototype.remove_Admin = function () {
        var _this = this;
        var body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID, this.StoreAdminID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Remove_Store_Admin', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.AdminData.splice(_this.isdeleteAdminIndex, 1);
                _this.close_branchEditTimengs();
                _this.closeBranchInfo();
                _this.isdeleteAdminIndex = -1;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.OnAddAdminData = function () {
        this.OnetimeAdd = false;
        this.isadminAdd = true;
    };
    StoresComponent.prototype.OndeleteNewRow = function () {
        this.isadminAdd = false;
        this.OnetimeAdd = true;
        this.Admin_Email = '';
        this.Admin_name = '';
        this.Admin_Phone = '';
    };
    StoresComponent.prototype.onsubmitAdmin = function () {
        var _this = this;
        this.AdminData.push({ 'Name': this.Admin_name, 'EmailID': this.Admin_Email, 'PhoneNumber': this.Admin_Phone });
        this.OnetimeAdd = true;
        this.isadminAdd = false;
        this.Admin_Email = '';
        this.Admin_name = '';
        var body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID, null, this.Admin_name, this.Admin_name, this.Admin_Phone);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Add_Store_Admin_to_Branch', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.AdminData.splice(_this.isdeleteAdminIndex, 1);
                _this.close_branchEditTimengs();
                _this.closeBranchInfo();
                _this.Admin_Phone = '';
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    StoresComponent.prototype.OncloseImagecropping = function () {
        this.isimagecropping = false;
    };
    StoresComponent.prototype.Onselect_Branch = function (j, branchSection) {
        this.branchSectionindex = j;
        if (j == 0) {
            this.getBranchDetails();
        }
        else if (j == 1) {
            this.getBranchTimes();
        }
        else if (j == 2) {
            this.getAdminData();
        }
    };
    StoresComponent.prototype.Ondelete = function (item, i) {
        this.BranchID = item.BranchID;
        this.deleteIndex = i;
    };
    StoresComponent.prototype.remove_Branch = function () {
        var _this = this;
        var body1 = new AddStoreModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.BranchID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Inactivate_Store_Branch', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.BranchData.splice(_this.deleteIndex, 1);
                _this.close_branchEditTimengs();
                _this.closeBranchInfo();
                _this.deleteIndex = -1;
                _this.closebtn_deleteConform.nativeElement.click();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    __decorate([
        ViewChild('closebtn'),
        __metadata("design:type", ElementRef)
    ], StoresComponent.prototype, "closebtn_deleteConform", void 0);
    __decorate([
        ViewChild('myModalimage'),
        __metadata("design:type", ElementRef)
    ], StoresComponent.prototype, "myModal", void 0);
    __decorate([
        ViewChild('cropper', undefined),
        __metadata("design:type", ImageCropperComponent)
    ], StoresComponent.prototype, "cropper", void 0);
    __decorate([
        ViewChild('closebtn'),
        __metadata("design:type", ElementRef)
    ], StoresComponent.prototype, "closeBtn", void 0);
    StoresComponent = __decorate([
        Component({
            selector: 'app-stores',
            templateUrl: './stores.component.html',
            styleUrls: ['./stores.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Http,
            NgZone,
            Router,
            ErrorService,
            MapsAPILoader,
            ApiMessageService])
    ], StoresComponent);
    return StoresComponent;
}());
export { StoresComponent };
