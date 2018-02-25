var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { adminOrder_SearchModal } from './../../../front_end_models/adminOrderSearchModal';
import { OrdersModel_admin } from './../../../front_end_models/OrdersModel';
import { ErrorService } from './../../../errors/error.service';
import { ApiMessageService } from './../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef } from '@angular/core';
import { PayServiceModel } from '../../../front_end_models/payServiceModel';
var ActiveCustomerComponent = /** @class */ (function () {
    function ActiveCustomerComponent(router, http, _ApiMessageService, _cookieService, ErrorService, cdref) {
        this.router = router;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this.limit = 10;
        this.sortoptions_Cust_Orders = {};
        this.sortOptions = {};
        this.Cu_Or_Index = 0;
        this.ordersCount = 1;
        this.p = 1;
        this.array_orderscount = [];
        this.CustomersOrders = [];
        this.active_json = [];
        this.AddressLog = [];
        this.Devices = [];
        this.skip_value = 0;
        this.index = 0;
        this.url = '';
        this.active_CustomersData = [];
    }
    ActiveCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        this.isviewOrders = -1;
        var uid = this._cookieService.get('ez_admin_cusID');
        var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, uid, this.limit, this.sortOptions);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Customers_Without_Filter', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.active_CustomersData = data.json().extras.CustomerData;
                _this.active_json = data.json().extras.CustomerData;
                _this.isSearching = false;
                if (_this.active_CustomersData.length == 0) {
                    _this.isData = true;
                }
                /* pagination*/
                _this.Total_Count = data.json().extras.Count;
                if (_this.active_CustomersData.length == 0) {
                    _this.isData = true;
                }
                /* completed*/
                _this.customerAnalytics();
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveCustomerComponent.prototype.customerAnalytics = function () {
        var _this = this;
        var body = new PayServiceModel(this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Active_Customer_Analytics', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Total_Customers = data.json().extras.Total_Customers;
                _this.Ordered_Customers = data.json().extras.Ordered_Customers;
                _this.Non_Ordered_Customers = data.json().extras.Non_Ordered_Customers;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveCustomerComponent.prototype.getStyle = function (index) {
        if (index == this.index) {
            return "#795548";
        }
    };
    ActiveCustomerComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    ActiveCustomerComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.isRequesting = true;
        this.index = index;
        this.isviewOrders = -1;
        var skip_value = this.index * 10;
        var uid = this._cookieService.get('ez_admin_cusID');
        var result_table_data = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, uid, this.limit, this.sortOptions);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Active_Customers_Without_Filter', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.active_CustomersData = data.json().extras.CustomerData;
                _this.active_json = data.json().extras.CustomerData;
                _this.skip_value = _this.index * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveCustomerComponent.prototype.valuechange = function (newValue) {
        var _this = this;
        this.activeId = null;
        this.mymodel = newValue;
        var length = newValue.length;
        if (length >= 3) {
            this.active_CustomersData = [];
            this.p = 1;
            this.isviewOrders = -1;
            this.skip_value = 0;
            var body1 = new adminOrder_SearchModal(null, newValue, null, this.sortOptions, this._cookieService.get('ez_admin_cusID'));
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/Search_Active_Customers', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var resultdata = [];
                    _this.isSearching = true;
                    _this.active_CustomersData = data.json().extras.CustomerData;
                }
            });
        }
        else {
            this.active_CustomersData = [];
            this.ngOnInit();
            this.index = 0;
        }
    };
    ActiveCustomerComponent.prototype.edit = function (item) {
        this.Devices = item.Devices;
        this.AddressLog = item.AddressLog;
        this.CustomerID = item.CustomerID;
        this.First_name = item.customerName;
        this.Email = item.customerEmail;
        this.Phone = item.customerPhone;
    };
    ActiveCustomerComponent.prototype.onDeviceInfo = function (item) {
        this.edit(item);
        this.isdetails_View_devices = true;
    };
    ActiveCustomerComponent.prototype.onAddressInfo = function (item) {
        this.edit(item);
        this.isdetails_View_AddressLog = true;
    };
    ActiveCustomerComponent.prototype.onInactive = function (item, index) {
        this.isdelete = true;
        this.edit(item);
        this.CustomerID = item.CustomerID;
        this.index_delete = index;
    };
    ActiveCustomerComponent.prototype.sortColumn = function (key) {
        var pattern;
        if (this.Sort_value != key) {
            this.Sort_value = key;
            this.IsAsc = true;
        }
        else {
            this.IsAsc = !this.IsAsc;
        }
        if (this.IsAsc == true) {
            pattern = 1;
        }
        if (this.IsAsc == false) {
            pattern = -1;
        }
        this.sortOptions = {};
        this.sortOptions[key] = pattern;
        this.ngOnInit();
        this.p = 1;
    };
    ActiveCustomerComponent.prototype.sortColumnCustomer = function (key) {
        var pattern;
        if (this.Sort_value_orders != key) {
            this.Sort_value_orders = key;
            this.IsAsc_orders = true;
        }
        else {
            this.IsAsc_orders = !this.IsAsc_orders;
        }
        if (this.IsAsc_orders == true) {
            pattern = 1;
        }
        if (this.IsAsc_orders == false) {
            pattern = -1;
        }
        this.sortoptions_Cust_Orders = {};
        this.sortoptions_Cust_Orders[key] = pattern;
        this.getOrders(this.indRow_cus, this.isviewOrders);
    };
    ActiveCustomerComponent.prototype.OnDelete = function () {
        var _this = this;
        var body1 = new adminOrder_SearchModal(null, null, this.CustomerID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Make_Customer_Inactive', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.active_CustomersData.splice(_this.index_delete, 1);
                _this.isdelete = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                if (msgNumber == 21) {
                    _this._cookieService.remove('ez_cusID');
                    _this.router.navigate(['/signissssn']);
                }
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveCustomerComponent.prototype.onClose_Delete = function () {
        this.isdelete = false;
    };
    ActiveCustomerComponent.prototype.onClose_details_View = function () {
        this.isdetails_View_devices = false;
    };
    ActiveCustomerComponent.prototype.onClose_details_View_AddressLog = function () {
        this.isdetails_View_AddressLog = false;
    };
    ActiveCustomerComponent.prototype.moreData = function (item) {
        this.First_name = item.customerName;
        this.Email = item.customerEmail;
        this.Phone = item.customerPhone;
        this.referral_code = item.referral_code;
        if (item.Devices.length) {
            this.Devices = item.Devices;
        }
        else {
            this.Devices = '';
        }
        if (item.AddressLog.length) {
            this.AddressLog = item.AddressLog;
        }
        else {
            this.AddressLog = '';
        }
        if (item.CustomerImage.length) {
        }
        else {
        }
    };
    ActiveCustomerComponent.prototype.onMoreInfo = function (item) {
        this.isMoreinfo = true;
        this.moreData(item);
    };
    ActiveCustomerComponent.prototype.onClose_moreInfo = function () {
        this.isMoreinfo = false;
    };
    ActiveCustomerComponent.prototype.OnviewDevices = function () {
        this.isviewDevicess = true;
        this.isAddressLog = false;
    };
    ActiveCustomerComponent.prototype.onViewAddress = function () {
        this.isviewDevicess = false;
        this.isAddressLog = true;
    };
    ActiveCustomerComponent.prototype.getOrders = function (item, i) {
        var _this = this;
        this.indRow_cus = item;
        if (item.OrdersCount > 0) {
            this._cookieService.put('ez_CusID_Order', item.CustomerID);
            this.ordersCount = 1;
            this.isOrdersDetails = i;
            this.isviewOrders = i;
            this.isRequesting = true;
            var uid = this._cookieService.get('ez_cusID');
            var body1 = new OrdersModel_admin(null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, item.CustomerID, null, 10, this.sortoptions_Cust_Orders);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/VIEW_ALL_CUSTOMER_ORDERS', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    _this.isRequesting = false;
                    _this.CustomersOrders = data.json().extras.OrderData;
                    /* pagination*/
                    _this.Total_orders_count = data.json().extras.Count;
                }
                else {
                    var msgNumber = parseInt(data.json().extras.msg);
                    if (msgNumber == 21) {
                        _this._cookieService.remove('ez_cusID');
                        _this.router.navigate(['/signissssn']);
                    }
                    var message = _this._ApiMessageService.ApiMessages[msgNumber];
                    _this.ErrorService.handleError(message);
                }
            });
        }
    };
    ActiveCustomerComponent.prototype.pageChanged_orders = function (event) {
        this.ordersCount = event;
        this.nextpage_orders(this.ordersCount - 1);
    };
    ActiveCustomerComponent.prototype.closeOrders = function () {
        this.isviewOrders = -1;
    };
    ActiveCustomerComponent.prototype.nextpage_orders = function (index) {
        var _this = this;
        this.isRequesting = true;
        var skip_value = index * 10;
        var empid = this._cookieService.get('EmployeeID');
        var body1 = new OrdersModel_admin(null, skip_value, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this._cookieService.get('ez_CusID_Order'), null, 10, this.sortoptions_Cust_Orders);
        var body = JSON.stringify(body1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/VIEW_ALL_CUSTOMER_ORDERS', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.CustomersOrders = data.json().extras.OrderData;
            }
            else {
                _this.isRequesting = false;
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    ActiveCustomerComponent = __decorate([
        Component({
            selector: 'app-active',
            templateUrl: "./activeCustomers.component.html",
            styleUrls: ["./activeCustomers.component.css"]
        }),
        __metadata("design:paramtypes", [Router,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef])
    ], ActiveCustomerComponent);
    return ActiveCustomerComponent;
}());
export { ActiveCustomerComponent };
