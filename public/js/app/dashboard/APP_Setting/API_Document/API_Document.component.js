var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ErrorService } from '../../../errors/error.service';
import { Api_EzshippModel } from '../../../front_end_models/api_ezshippModel';
import { FindAllAPIRequest_EzshippModel } from '../../../front_end_models/api_findallapi_requestModel';
import { ErrorResponseModel } from '../../../front_end_models/api_ErrorModel';
import { EditParameterModel } from '../../../front_end_models/api_editparameterModel';
var API_DocumentComponent = /** @class */ (function () {
    function API_DocumentComponent(http, _fb, _ApiMessageService, _cookieService, router, ErrorService) {
        this.http = http;
        this._fb = _fb;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this.open_Error_Description = false;
        this.open_Error_Response = false;
        this.open_Success_Description = false;
        this.open_Success_Response = false;
        this.open_Request_Description = false;
        this.open_Content_Type = false;
        this.open_Request_JSON_all = false;
        this.open_method_path = false;
        this.api_open_description = false;
        this.api_open_input = false;
        this.Error_Message_Status_Body = [];
        this.Request_JSON_all = [];
        this.Api_Parameters = [];
        this.change_category = false;
        this.Documentation_Body = [];
        this.activeid = 1;
        this.activeid_view = 1;
        this.API_Request_Data = [];
        this.sortOptions = [];
        this.limit = 5;
        this.skip_values = 0;
        this.form_error_view = false;
        this.form_Responses_view = false;
        this.form_Request_view = false;
        this.form_parameter_view = true;
        this.open_Error_Responses = false;
        this.open_Success_Responses = false;
        this.open_request = false;
        this.open_parameter = true;
        this.add_Api_Category_view = true;
        this.CategoryData = [];
        this.add_Api_Category = false;
        this.url = "";
    }
    API_DocumentComponent.prototype.ngOnInit = function () {
        this.List_Api_Category();
    };
    API_DocumentComponent.prototype.List_Api_Category = function () {
        var _this = this;
        var body = new Api_EzshippModel(this._cookieService.get("ez_admin_cusID"));
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_All_Api_Categories", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.CategoryData = data.json().extras.CategoryData;
                if (_this.CategoryData.length > 0) {
                    _this.CategoryID = data.json().extras.CategoryData[0].CategoryID;
                    _this.CategoryName = data.json().extras.CategoryData[0].CategoryName;
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
    API_DocumentComponent.prototype.CreateApi_Category = function () {
        var _this = this;
        if (this.invoiceForm.value.API_Description == "") {
            var message = "Please enter API description";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.API_Name == "") {
            var message = "Please enter API name";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Api_URL == "") {
            var message = "Please enter API URL";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Api_Path == "") {
            var message = "Please enter API Path";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Request_JSON == "") {
            var message = "Please enter Request JSON";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Request_Description == "") {
            var message = "Please enter request description";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Success_Response == "") {
            var message = "Please enter success response";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Success_Description == "") {
            var message = "Please enter success description";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Error_Response == "") {
            var message = "Please enter error response";
            this.ErrorService.handleError(message);
        }
        else if (this.invoiceForm.value.Error_Description == "") {
            var message = "Please enter error description";
            this.ErrorService.handleError(message);
            /*don't delete the code*/
            // } else if (this.invoiceForm.value.Error_Message_Status_Body.length) {
            //   var message = "Please enter Message Status Body";
            //   this.ErrorService.handleError(message);
            // } else if (this.invoiceForm.value.Api_Parameters.length > 0) {
            // var i
            // for(i=0; i<this.invoiceForm.value.Api_Parameters; i++){
            //   if (this.invoiceForm.value.Api_Parameters[0].Param == "") {
            //     var message = "Please enter Param";
            //     this.ErrorService.handleError(message);
            //   } else {
            //     var message = "Please enter API Parameters";
            //     this.ErrorService.handleError(message);
            //   }
            // }
        }
        else {
            var body = new Api_EzshippModel(this._cookieService.get("ez_admin_cusID"), this.invoiceForm.value.Category_Name, this.CategoryID, this.invoiceForm.value.API_Name, this.invoiceForm.value.API_Description, this.invoiceForm.value.Api_Method, this.invoiceForm.value.Api_URL, this.invoiceForm.value.Api_Path, this.invoiceForm.value.Api_Parameters, this.invoiceForm.value.Request_JSON, this.invoiceForm.value.Content_Type, this.invoiceForm.value.Request_Description, this.invoiceForm.value.Success_Response, this.invoiceForm.value.Success_Description, this.invoiceForm.value.Error_Response, this.invoiceForm.value.Error_Description, this.invoiceForm.value.Error_Message_Status_Body);
            var headers = new Headers({ "Content-Type": "application/json" });
            return this.http
                .post(this.url + "/Store_Api_in_Documentation", body, {
                headers: headers
            })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.Status = data.json().extras.Status;
                    _this.add_Api_Category_view = true;
                    _this.add_Api_Category = false;
                    _this.ngOnInit();
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    var message_1 = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message_1);
                }
            });
        }
    };
    API_DocumentComponent.prototype.List_AllApi_Documentation = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), this.CategoryID, this.skip_values, this.limit, this.sortOptions);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_All_Api_of_Documentation", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Documentation_Body = data.json().extras.DocumentationBody;
                _this.API_ID_list = data.json().extras.DocumentationBody[0].API_ID;
                _this.Api_Path_list = data.json().extras.DocumentationBody[0].Api_Path;
                _this.Api_URL_list = data.json().extras.DocumentationBody[0].Api_URL;
                _this.Api_Method_list = data.json().extras.DocumentationBody[0].Api_Method;
                _this.CategoryName_list = data.json().extras.DocumentationBody[0].CategoryName;
                _this.CategoryID_list = data.json().extras.DocumentationBody[0].CategoryID;
                _this.API_Description_list = data.json().extras.DocumentationBody[0].API_Description;
                _this.API_Name_list = data.json().extras.DocumentationBody[0].API_Name;
                _this.List_ApiParameters();
                _this.List_ApiSample_Request();
                _this.List_ApiSuccess_Response();
                _this.List_ApiError_Response();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.List_ApiParameters = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_Api_Parameters_Page", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Api_Parameters = data.json().extras.Api_Parameters;
                _this.Api_Param = data.json().extras.Api_Parameters[0].Param;
                _this.Api_Datatype = data.json().extras.Api_Parameters[0].Datatype;
                _this.Api_Description = data.json().extras.Api_Parameters[0].Description;
                _this.ListID = data.json().extras.Api_Parameters[0].ListID;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.List_ApiSample_Request = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_Api_Sample_Request_Page", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Request_JSON_all = data.json().extras.Request_JSON;
                _this.Content_Type = data.json().extras.Content_Type;
                _this.Request_Description = data.json().extras.Request_Description;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.List_ApiSuccess_Response = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_Api_Success_Response_Page", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Success_Response = data.json().extras.Success_Response;
                _this.Success_Description = data.json().extras.Success_Description;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.List_ApiError_Response = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/List_Api_Error_Response_Page", body, {
            headers: headers
        })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Error_Response = data.json().extras.Error_Response;
                _this.Error_Description = data.json().extras.Error_Description;
                _this.Error_Message_Status_Body = data.json().extras.Error_Message_Status_Body;
                _this.ListID_error = data.json().extras.Error_Message_Status_Body[0].ListID;
                _this.msg_error = data.json().extras.Error_Message_Status_Body[0].msg;
                _this.Status_error = data.json().extras.Error_Message_Status_Body[0].Status;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.button_click = function () {
        this.add_Api_Category = !this.add_Api_Category;
        this.invoiceForm = this._fb.group({
            Category_Name: ["", Validators.required],
            API_Name: ["", Validators.required],
            API_Description: ["", Validators.required],
            Api_Method: ["", Validators.required],
            Api_URL: ["", Validators.required],
            Api_Path: ["", Validators.required],
            Api_Parameters: this._fb.array([this.initItemRows()]),
            Request_JSON: ["", Validators.required],
            Content_Type: ["", Validators.required],
            Request_Description: ["", Validators.required],
            Success_Response: ["", Validators.required],
            Success_Description: ["", Validators.required],
            Error_Response: ["", Validators.required],
            Error_Description: ["", Validators.required],
            Error_Message_Status_Body: this._fb.array([this.initItem()])
        });
    };
    API_DocumentComponent.prototype.initItem = function () {
        return this._fb.group({
            msg: ["", Validators.required],
            Status: ["", Validators.required]
        });
    };
    Object.defineProperty(API_DocumentComponent.prototype, "formData_message", {
        get: function () {
            return this.invoiceForm.get("Error_Message_Status_Body");
        },
        enumerable: true,
        configurable: true
    });
    API_DocumentComponent.prototype.addNewRow_error = function () {
        var control = this.invoiceForm.get("Error_Message_Status_Body");
        control.push(this.initItem());
    };
    API_DocumentComponent.prototype.deleteRow_error = function (index) {
        var control = this.invoiceForm.get("Error_Message_Status_Body");
        control.removeAt(index);
    };
    API_DocumentComponent.prototype.initItemRows = function () {
        return this._fb.group({
            Param: ["", Validators.required],
            Datatype: ["", Validators.required],
            Description: ["", Validators.required]
        });
    };
    API_DocumentComponent.prototype.addNewRow = function () {
        var control = this.invoiceForm.get("Api_Parameters");
        control.push(this.initItemRows());
    };
    Object.defineProperty(API_DocumentComponent.prototype, "formData", {
        get: function () {
            return this.invoiceForm.get("Api_Parameters");
        },
        enumerable: true,
        configurable: true
    });
    API_DocumentComponent.prototype.deleteRow = function (index) {
        var control = this.invoiceForm.get("Api_Parameters");
        control.removeAt(index);
    };
    API_DocumentComponent.prototype.OndetailView = function (item, i) {
        this.detailview = i;
        this.CategoryID = item.CategoryID;
        this.List_AllApi_Documentation();
    };
    API_DocumentComponent.prototype.select_branch = function (value, event) {
        this.CategoryName = value;
    };
    API_DocumentComponent.prototype.select_Content_Type = function (value, event) {
        this.Content_Type = value;
    };
    API_DocumentComponent.prototype.click_parameter = function () {
        this.open_parameter = true;
        this.open_request = false;
        this.open_Success_Responses = false;
        this.open_Error_Responses = false;
        this.List_ApiParameters();
    };
    API_DocumentComponent.prototype.click_request = function () {
        this.open_request = true;
        this.open_parameter = false;
        this.open_Success_Responses = false;
        this.open_Error_Responses = false;
        this.List_ApiSample_Request();
    };
    API_DocumentComponent.prototype.click_Success_Responses = function () {
        this.open_Success_Responses = true;
        this.open_request = false;
        this.open_parameter = false;
        this.open_Error_Responses = false;
        this.List_ApiSuccess_Response();
    };
    API_DocumentComponent.prototype.click_Error_Responses = function () {
        this.open_Error_Responses = true;
        this.open_request = false;
        this.open_parameter = false;
        this.open_Success_Responses = false;
        this.List_ApiError_Response();
    };
    API_DocumentComponent.prototype.form_parameter = function () {
        this.form_parameter_view = true;
        this.form_Request_view = false;
        this.form_Responses_view = false;
        this.form_error_view = false;
    };
    API_DocumentComponent.prototype.form_Request = function () {
        this.form_parameter_view = false;
        this.form_Request_view = true;
        this.form_Responses_view = false;
        this.form_error_view = false;
    };
    API_DocumentComponent.prototype.form_Responses = function () {
        this.form_parameter_view = false;
        this.form_Request_view = false;
        this.form_Responses_view = true;
        this.form_error_view = false;
    };
    API_DocumentComponent.prototype.form_error = function () {
        this.form_parameter_view = false;
        this.form_Request_view = false;
        this.form_Responses_view = false;
        this.form_error_view = true;
    };
    API_DocumentComponent.prototype.Edit_Category_Name = function (item, i) {
        this.CategoryID_edit = item.CategoryID;
        this.CategoryName_edit = item.CategoryName;
        this.change_category = true;
    };
    API_DocumentComponent.prototype.Onclose_category = function () {
        this.change_category = false;
    };
    API_DocumentComponent.prototype.onSubmit_Category = function (form) {
        var _this = this;
        this.CategoryName_edit = form.value.CategoryName;
        var body = new Api_EzshippModel(this._cookieService.get("ez_admin_cusID"), form.value.CategoryName, this.CategoryID_edit);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Category_Name", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.change_category = false;
                _this.ngOnInit();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.close_url_text = function () {
        this.api_open_input = false;
    };
    API_DocumentComponent.prototype.close_description_text = function () {
        this.api_open_description = false;
    };
    API_DocumentComponent.prototype.click_open_methods = function () {
        this.open_method_path = true;
    };
    API_DocumentComponent.prototype.close_method_path = function () {
        this.open_method_path = false;
    };
    API_DocumentComponent.prototype.Edit_method_path = function () {
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, this.API_Name_list, null, null, this.Api_Path_list, this.Api_Method_list);
        this.update_name_path_method(body, '/Edit_Api_Method_Documentation', 1);
        this.update_name_path_method(body, '/Edit_Api_Path_Documentation', 2);
        this.update_name_path_method(body, '/Edit_Api_Name_Documentation', 3);
    };
    API_DocumentComponent.prototype.update_name_path_method = function (body, url, type) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.open_method_path = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_open_api_path = function () {
        this.api_open_input = true;
    };
    API_DocumentComponent.prototype.Edit_Api_URL = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, this.Api_URL_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_URL_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.api_open_input = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_to_des = function () {
        this.api_open_description = true;
    };
    API_DocumentComponent.prototype.Edit_Api_Description = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, this.API_Description_list);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Description_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.api_open_description = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_open_request_json = function () {
        this.open_Request_JSON_all = true;
    };
    API_DocumentComponent.prototype.close_Request_JSON_all = function () {
        this.open_Request_JSON_all = false;
    };
    API_DocumentComponent.prototype.Edit_Request_JSON_all = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, this.Request_JSON_all);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Sample_Request_JSON_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Request_JSON_all = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Content_Type = function () {
        this.open_Content_Type = true;
    };
    API_DocumentComponent.prototype.close_Content_Type = function () {
        this.open_Content_Type = false;
    };
    API_DocumentComponent.prototype.Edit_Content_Type = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, this.Content_Type);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Sample_Request_Content_Type_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Content_Type = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Request_Description = function () {
        this.open_Request_Description = true;
    };
    API_DocumentComponent.prototype.close_Request_Description = function () {
        this.open_Request_Description = false;
    };
    API_DocumentComponent.prototype.Edit_Request_Description = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, this.Request_Description);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Sample_Request_Description_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Request_Description = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Success_Response = function () {
        this.open_Success_Response = true;
    };
    API_DocumentComponent.prototype.close_Success_Response = function () {
        this.open_Success_Response = false;
    };
    API_DocumentComponent.prototype.Edit_Success_Response = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, null, this.Success_Response);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Success_Response_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Success_Response = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Success_Description = function () {
        this.open_Success_Description = true;
    };
    API_DocumentComponent.prototype.close_Success_Description = function () {
        this.open_Success_Description = false;
    };
    API_DocumentComponent.prototype.Edit_Success_Description = function () {
        var _this = this;
        var body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, null, null, this.Success_Description);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Success_Description_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Success_Description = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Error_Response = function () {
        this.open_Error_Response = true;
    };
    API_DocumentComponent.prototype.close_Error_Response = function () {
        this.open_Error_Response = false;
    };
    API_DocumentComponent.prototype.Edit_Error_Response = function () {
        var _this = this;
        var body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, this.Error_Response);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Error_Response_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Error_Response = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Error_Description = function () {
        this.open_Error_Description = true;
    };
    API_DocumentComponent.prototype.close_Error_Description = function () {
        this.open_Error_Description = false;
    };
    API_DocumentComponent.prototype.Edit_Error_Description = function () {
        var _this = this;
        var body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, null, this.Error_Description);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post(this.url + "/Edit_Api_Error_Description_Documentation", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.open_Error_Description = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_Parameters = function (item, im) {
        this.api_open_Parameter = im;
        this.Api_Param = item.Param;
        this.Api_Datatype = item.Datatype;
        this.Api_Description = item.Description;
        this.ListID = item.ListID;
    };
    API_DocumentComponent.prototype.close_Parameter = function () {
        this.api_open_Parameter = -1;
    };
    API_DocumentComponent.prototype.Edit_Parameter = function () {
        var _this = this;
        var body = new EditParameterModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, this.ListID, this.Api_Param, this.Api_Datatype, this.Api_Description);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http.post(this.url + "/Edit_Api_Parameter", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.api_open_Parameter = -1;
                _this.List_ApiParameters();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent.prototype.click_error_msg = function (item, ir) {
        this.api_open_error = ir;
        this.msg_error = item.msg;
        this.Status_error = item.Status;
        this.ListID_error = item.ListID;
    };
    API_DocumentComponent.prototype.close_error = function () {
        this.api_open_error = -1;
    };
    API_DocumentComponent.prototype.Edit_error = function () {
        var _this = this;
        var body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, null, null, this.ListID_error, this.msg_error, this.Status_error);
        var headers = new Headers({ "Content-Type": "application/json" });
        return this.http.post(this.url + "/Edit_Error_Message", body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Status = data.json().extras.Status;
                _this.api_open_error = -1;
                _this.List_ApiError_Response();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    API_DocumentComponent = __decorate([
        Component({
            selector: 'API_Document',
            templateUrl: './API_Document.component.html',
            styleUrls: ['./API_Document.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            FormBuilder,
            ApiMessageService,
            CookieService,
            Router,
            ErrorService])
    ], API_DocumentComponent);
    return API_DocumentComponent;
}());
export { API_DocumentComponent };
