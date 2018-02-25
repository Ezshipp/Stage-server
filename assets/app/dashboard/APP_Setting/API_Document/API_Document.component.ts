import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { ErrorService } from '../../../errors/error.service';
import { Api_EzshippModel } from '../../../front_end_models/api_ezshippModel';
import { FindAllAPIRequest_EzshippModel } from '../../../front_end_models/api_findallapi_requestModel';
import { ErrorResponseModel } from '../../../front_end_models/api_ErrorModel';
import { EditParameterModel } from '../../../front_end_models/api_editparameterModel';

@Component({
	selector: 'API_Document',
	templateUrl: './API_Document.component.html',
	styleUrls: ['./API_Document.component.css']
})

export class API_DocumentComponent implements OnInit {
	isData: boolean;
	ListID_error: any;
	api_open_error: number;
	Status_error: any;
	msg_error: any;
	ListID: any;
	open_Error_Description: boolean = false;
	open_Error_Response: boolean = false;
	api_open_Parameter: number;
	Api_Description: any;
	Api_Datatype: any;
	Api_Param: any;
	open_Success_Description: boolean = false;
	open_Success_Response: boolean = false;
	open_Request_Description: boolean = false;
	open_Content_Type: boolean = false;
	open_Request_JSON_all: boolean = false;
	API_Name_list: any;
	API_Description_list: any;
	CategoryID_list: any;
	CategoryName_list: any;
	Api_Method_list: any;
	Api_URL_list: any;
	Api_Path_list: any;
	open_method_path: boolean = false;
	api_open_description: boolean = false;
	api_open_input: boolean = false;
	Error_Message_Status_Body: any = [];
	Error_Description: any;
	Error_Response: any;
	Success_Description: any;
	Success_Response: any;
	Request_Description: any;
	Content_Type: any;
	Request_JSON_all: any = [];
	Api_Parameters: any = [];
	API_ID_list: any;
	change_category: boolean = false;
	CategoryName_edit: any;
	CategoryID_edit: any;
	Documentation_Body: any = [];
	activeid: number = 1;
	activeid_view: number = 1;
	API_Request_Data: any = [];
	sortOptions: any = [];
	limit: number = 5;
	skip_values: number = 0;
	form_error_view: boolean = false;
	form_Responses_view: boolean = false;
	form_Request_view: boolean = false;
	form_parameter_view: boolean = true;
	open_Error_Responses: boolean = false;
	open_Success_Responses: boolean = false;
	open_request: boolean = false;
	open_parameter: boolean = true;
	add_Api_Category_view: boolean = true;
	Category_ID: any;
	CategoryID: any;
	CategoryName: any;
	Category_Name: any;
	detailview: number;
	Status_edit: any;
	CategoryData: any = [];
	add_Api_Category: boolean = false;
	Status: any;
	url: string = "";

	public invoiceForm: FormGroup;
	constructor(
		private http: Http,
		private _fb: FormBuilder,
		private _ApiMessageService: ApiMessageService,
		private _cookieService: CookieService,
		private router: Router,
		private ErrorService: ErrorService
	) { }

	ngOnInit() {
		this.List_Api_Category();
	}

	List_Api_Category() {
		const body = new Api_EzshippModel(
			this._cookieService.get("ez_admin_cusID")
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_All_Api_Categories", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.CategoryData = data.json().extras.CategoryData;
					if (this.CategoryData.length > 0) {
						this.CategoryID = data.json().extras.CategoryData[0].CategoryID;
						this.CategoryName = data.json().extras.CategoryData[0].CategoryName;
					} else {
						this.isData = true;
					}

				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	CreateApi_Category() {
		if (this.invoiceForm.value.API_Description == "") {
			var message = "Please enter API description";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.API_Name == "") {
			var message = "Please enter API name";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Api_URL == "") {
			var message = "Please enter API URL";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Api_Path == "") {
			var message = "Please enter API Path";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Request_JSON == "") {
			var message = "Please enter Request JSON";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Request_Description == "") {
			var message = "Please enter request description";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Success_Response == "") {
			var message = "Please enter success response";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Success_Description == "") {
			var message = "Please enter success description";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Error_Response == "") {
			var message = "Please enter error response";
			this.ErrorService.handleError(message);
		} else if (this.invoiceForm.value.Error_Description == "") {
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
		} else {
			const body = new Api_EzshippModel(
				this._cookieService.get("ez_admin_cusID"),
				this.invoiceForm.value.Category_Name,
				this.CategoryID,
				this.invoiceForm.value.API_Name,
				this.invoiceForm.value.API_Description,
				this.invoiceForm.value.Api_Method,
				this.invoiceForm.value.Api_URL,

				this.invoiceForm.value.Api_Path,
				this.invoiceForm.value.Api_Parameters,
				this.invoiceForm.value.Request_JSON,
				this.invoiceForm.value.Content_Type,
				this.invoiceForm.value.Request_Description,

				this.invoiceForm.value.Success_Response,
				this.invoiceForm.value.Success_Description,
				this.invoiceForm.value.Error_Response,
				this.invoiceForm.value.Error_Description,
				this.invoiceForm.value.Error_Message_Status_Body
			);
			const headers = new Headers({ "Content-Type": "application/json" });
			return this.http
				.post(this.url + "/Store_Api_in_Documentation", body, {
					headers: headers
				})
				.subscribe(data => {
					if (data.json().success) {
						this.Status = data.json().extras.Status;
						this.add_Api_Category_view = true;
						this.add_Api_Category = false;
						this.ngOnInit();

					} else {
						const msgNumber: number = parseInt(data.json().extras.msg);
						let message = this._ApiMessageService.ApiMessages[msgNumber];
						this.ErrorService.handleError(message);
					}
				});
		}
	}

	List_AllApi_Documentation() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			this.CategoryID,
			this.skip_values,
			this.limit,
			this.sortOptions
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_All_Api_of_Documentation", body, {
				headers: headers
			})
			.subscribe(data => {
				if (data.json().success) {
					this.Documentation_Body = data.json().extras.DocumentationBody;
					this.API_ID_list = data.json().extras.DocumentationBody[0].API_ID;

					this.Api_Path_list = data.json().extras.DocumentationBody[0].Api_Path;
					this.Api_URL_list = data.json().extras.DocumentationBody[0].Api_URL;
					this.Api_Method_list = data.json().extras.DocumentationBody[0].Api_Method;
					this.CategoryName_list = data.json().extras.DocumentationBody[0].CategoryName;
					this.CategoryID_list = data.json().extras.DocumentationBody[0].CategoryID;
					this.API_Description_list = data.json().extras.DocumentationBody[0].API_Description;
					this.API_Name_list = data.json().extras.DocumentationBody[0].API_Name;
					this.List_ApiParameters();
					this.List_ApiSample_Request();
					this.List_ApiSuccess_Response();
					this.List_ApiError_Response();
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	List_ApiParameters() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			null,
			null,
			null,
			null,
			this.API_ID_list
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_Api_Parameters_Page", body, {
				headers: headers
			})
			.subscribe(data => {
				if (data.json().success) {
					this.Api_Parameters = data.json().extras.Api_Parameters;
					this.Api_Param = data.json().extras.Api_Parameters[0].Param;
					this.Api_Datatype = data.json().extras.Api_Parameters[0].Datatype;
					this.Api_Description = data.json().extras.Api_Parameters[0].Description;
					this.ListID = data.json().extras.Api_Parameters[0].ListID;
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	List_ApiSample_Request() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			null,
			null,
			null,
			null,
			this.API_ID_list
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_Api_Sample_Request_Page", body, {
				headers: headers
			})
			.subscribe(data => {
				if (data.json().success) {
					this.Request_JSON_all = data.json().extras.Request_JSON;
					this.Content_Type = data.json().extras.Content_Type;
					this.Request_Description = data.json().extras.Request_Description;

				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	List_ApiSuccess_Response() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			null,
			null,
			null,
			null,
			this.API_ID_list
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_Api_Success_Response_Page", body, {
				headers: headers
			})
			.subscribe(data => {
				if (data.json().success) {
					this.Success_Response = data.json().extras.Success_Response;
					this.Success_Description = data.json().extras.Success_Description;

				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	List_ApiError_Response() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			null,
			null,
			null,
			null,
			this.API_ID_list
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/List_Api_Error_Response_Page", body, {
				headers: headers
			})
			.subscribe(data => {
				if (data.json().success) {
					this.Error_Response = data.json().extras.Error_Response;
					this.Error_Description = data.json().extras.Error_Description;
					this.Error_Message_Status_Body = data.json().extras.Error_Message_Status_Body;
					this.ListID_error = data.json().extras.Error_Message_Status_Body[0].ListID;
					this.msg_error = data.json().extras.Error_Message_Status_Body[0].msg;
					this.Status_error = data.json().extras.Error_Message_Status_Body[0].Status;

				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	button_click() {
		this.add_Api_Category = !this.add_Api_Category
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
	}
	initItem() {
		return this._fb.group({
			msg: ["", Validators.required],
			Status: ["", Validators.required]
		});
	}
	get formData_message() {
		return <FormArray>this.invoiceForm.get("Error_Message_Status_Body");
	}
	addNewRow_error() {
		const control: FormArray = this.invoiceForm.get(
			`Error_Message_Status_Body`
		) as FormArray;
		control.push(this.initItem());
	}
	deleteRow_error(index: number) {
		const control: FormArray = this.invoiceForm.get(
			`Error_Message_Status_Body`
		) as FormArray;
		control.removeAt(index);
	}

	initItemRows() {
		return this._fb.group({
			Param: ["", Validators.required],
			Datatype: ["", Validators.required],
			Description: ["", Validators.required]
		});
	}
	addNewRow() {
		const control: FormArray = this.invoiceForm.get(
			`Api_Parameters`
		) as FormArray;
		control.push(this.initItemRows());
	}
	get formData() {
		return <FormArray>this.invoiceForm.get("Api_Parameters");
	}
	deleteRow(index: number) {
		const control: FormArray = this.invoiceForm.get(
			`Api_Parameters`
		) as FormArray;
		control.removeAt(index);
	}

	OndetailView(item, i: number) {
		this.detailview = i;
		this.CategoryID = item.CategoryID;

		this.List_AllApi_Documentation();
	}

	select_branch(value, event) {
		this.CategoryName = value;

	}
	select_Content_Type(value, event) {
		this.Content_Type = value
	}

	click_parameter() {
		this.open_parameter = true;
		this.open_request = false;
		this.open_Success_Responses = false;
		this.open_Error_Responses = false;
		this.List_ApiParameters();
	}
	click_request() {
		this.open_request = true;
		this.open_parameter = false;
		this.open_Success_Responses = false;
		this.open_Error_Responses = false;
		this.List_ApiSample_Request();
	}
	click_Success_Responses() {
		this.open_Success_Responses = true;
		this.open_request = false;
		this.open_parameter = false;
		this.open_Error_Responses = false;
		this.List_ApiSuccess_Response();
	}
	click_Error_Responses() {
		this.open_Error_Responses = true;
		this.open_request = false;
		this.open_parameter = false;
		this.open_Success_Responses = false;
		this.List_ApiError_Response();
	}
	form_parameter() {
		this.form_parameter_view = true;
		this.form_Request_view = false;
		this.form_Responses_view = false;
		this.form_error_view = false;
	}
	form_Request() {
		this.form_parameter_view = false;
		this.form_Request_view = true;
		this.form_Responses_view = false;
		this.form_error_view = false;
	}
	form_Responses() {
		this.form_parameter_view = false;
		this.form_Request_view = false;
		this.form_Responses_view = true;
		this.form_error_view = false;
	}
	form_error() {
		this.form_parameter_view = false;
		this.form_Request_view = false;
		this.form_Responses_view = false;
		this.form_error_view = true;
	}
	Edit_Category_Name(item, i) {
		this.CategoryID_edit = item.CategoryID;
		this.CategoryName_edit = item.CategoryName;
		this.change_category = true;
	}
	Onclose_category() {
		this.change_category = false;
	}
	onSubmit_Category(form: NgForm) {
		this.CategoryName_edit = form.value.CategoryName;

		const body = new Api_EzshippModel(
			this._cookieService.get("ez_admin_cusID"),
			form.value.CategoryName,
			this.CategoryID_edit
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Category_Name", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.change_category = false;
					this.ngOnInit();
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	close_url_text() {
		this.api_open_input = false;
	}
	close_description_text() {
		this.api_open_description = false;
	}
	click_open_methods() {
		this.open_method_path = true;

	}
	close_method_path() {
		this.open_method_path = false;
	}

	Edit_method_path() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, this.API_Name_list, null, null, this.Api_Path_list, this.Api_Method_list);

		this.update_name_path_method(body, '/Edit_Api_Method_Documentation', 1)
		this.update_name_path_method(body, '/Edit_Api_Path_Documentation', 2)
		this.update_name_path_method(body, '/Edit_Api_Name_Documentation', 3)

	}
	update_name_path_method(body, url, type) {
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http.post(this.url + url, body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.open_method_path = false;

				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});

	}
	click_open_api_path() {
		this.api_open_input = true;
	}

	Edit_Api_URL() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, this.Api_URL_list
		);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_URL_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.api_open_input = false;
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_to_des() {
		this.api_open_description = true;

	}
	Edit_Api_Description() {
		const body = new FindAllAPIRequest_EzshippModel(
			this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, this.API_Description_list);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Description_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.api_open_description = false;
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	click_open_request_json() {
		this.open_Request_JSON_all = true;
	}
	close_Request_JSON_all() {
		this.open_Request_JSON_all = false;
	}
	Edit_Request_JSON_all() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, this.Request_JSON_all);

		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Sample_Request_JSON_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Request_JSON_all = false;
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});

	}
	click_Content_Type() {
		this.open_Content_Type = true
	}
	close_Content_Type() {
		this.open_Content_Type = false
	}
	Edit_Content_Type() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, this.Content_Type);

		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Sample_Request_Content_Type_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Content_Type = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_Request_Description() {
		this.open_Request_Description = true
	}
	close_Request_Description() {
		this.open_Request_Description = false
	}
	Edit_Request_Description() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, this.Request_Description);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Sample_Request_Description_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Request_Description = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_Success_Response() {
		this.open_Success_Response = true
	}
	close_Success_Response() {
		this.open_Success_Response = false
	}
	Edit_Success_Response() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, null, this.Success_Response);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Success_Response_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Success_Response = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_Success_Description() {
		this.open_Success_Description = true
	}
	close_Success_Description() {
		this.open_Success_Description = false
	}
	Edit_Success_Description() {
		const body = new FindAllAPIRequest_EzshippModel(this._cookieService.get("ez_admin_cusID"), null, null, null, null, this.API_ID_list, null, null, null, null, null, null, null, null, null, this.Success_Description);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Success_Description_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Success_Description = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}

	click_Error_Response() {
		this.open_Error_Response = true

	}
	close_Error_Response() {
		this.open_Error_Response = false
	}
	Edit_Error_Response() {
		const body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, this.Error_Response);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Error_Response_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Error_Response = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_Error_Description() {
		this.open_Error_Description = true
	}
	close_Error_Description() {
		this.open_Error_Description = false
	}
	Edit_Error_Description() {
		const body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, null, this.Error_Description);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http
			.post(this.url + "/Edit_Api_Error_Description_Documentation", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.open_Error_Description = false
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_Parameters(item, im) {
		this.api_open_Parameter = im
		this.Api_Param = item.Param
		this.Api_Datatype = item.Datatype
		this.Api_Description = item.Description
		this.ListID = item.ListID

	}
	close_Parameter() {
		this.api_open_Parameter = -1
	}
	Edit_Parameter() {
		const body = new EditParameterModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, this.ListID, this.Api_Param, this.Api_Datatype, this.Api_Description);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http.post(this.url + "/Edit_Api_Parameter", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.api_open_Parameter = -1
					this.List_ApiParameters()
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}
	click_error_msg(item, ir) {
		this.api_open_error = ir
		this.msg_error = item.msg
		this.Status_error = item.Status
		this.ListID_error = item.ListID


	}
	close_error() {
		this.api_open_error = -1
	}
	Edit_error() {
		const body = new ErrorResponseModel(this._cookieService.get("ez_admin_cusID"), this.API_ID_list, null, null, this.ListID_error, this.msg_error, this.Status_error);
		const headers = new Headers({ "Content-Type": "application/json" });
		return this.http.post(this.url + "/Edit_Error_Message", body, { headers: headers })
			.subscribe(data => {
				if (data.json().success) {
					this.Status = data.json().extras.Status;
					this.api_open_error = -1
					this.List_ApiError_Response()
				} else {
					const msgNumber: number = parseInt(data.json().extras.msg);
					let message = this._ApiMessageService.ApiMessages[msgNumber];
					this.ErrorService.handleError(message);
				}
			});
	}


}
