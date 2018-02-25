var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OrdersModel_admin } from '../../../front_end_models/OrdersModel';
import { NewQueueModel } from '../../../front_end_models/New_queOrder.Mode';
import { ElementRef, NgZone, ViewChild, Component, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader, PolylineManager } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { ApiMessageService } from '../../../authentication/apimessages.service';
import { CookieService } from 'angular2-cookie/core';
import { ErrorService } from '../../../errors/error.service';
import { Router } from '@angular/router';
var NQueOrdersComponent = /** @class */ (function () {
    function NQueOrdersComponent(router, mapsAPILoader, ngZone, http, _ApiMessageService, _cookieService, ErrorService, cdref, _polylineManager) {
        this.router = router;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._cookieService = _cookieService;
        this.ErrorService = ErrorService;
        this.cdref = cdref;
        this._polylineManager = _polylineManager;
        this.isRequesting = false;
        this.isOngoingOrder = false;
        this.isNewOrder = true;
        this.AllDirectionData = [];
        this.DirectionData = [];
        this.reverserDirection = [];
        this.directionArray = [];
        this.limit = 10;
        this.latitude = 17.78455;
        this.longitude = 78.2544;
        this.zoom = 10;
        this.url = '';
        this.NewQueOrdersData = [];
        this.lat = 17.678418;
        this.lng = 78.809007;
    }
    NQueOrdersComponent.prototype.ngOnInit = function () {
        this.searchControl = new FormControl();
        this.getNewQueOrders();
        var width = $(window).height();
        this.height_mapWindow = $(window).height() - 46;
    };
    NQueOrdersComponent.prototype.OnaddOrder = function () {
        this.onCreate_order = true;
    };
    NQueOrdersComponent.prototype.onCloseCreate_Order = function () {
        this.onCreate_order = false;
    };
    NQueOrdersComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (this.isNewOrder || this.isOngoingOrder) {
            var body1 = new NewQueueModel(this._cookieService.get('ez_admin_cusID'), form.value.MobileNumber, this.pickAddress, 0, 0, null, null, null, this.isNewOrder, this.isOngoingOrder);
            var headers = new Headers({ 'Content-Type': 'application/json' });
            return this.http.post(this.url + '/GENERATE_CUSTOMERS_NEW_ORDERS_DIRECTION', body1, { headers: headers })
                .subscribe(function (data) {
                if (data.json().success) {
                    var message = "order created sucessfully";
                    _this.ErrorService.handleError(message);
                    setTimeout(function () {
                        _this.ngOnInit();
                    }, 3000);
                    _this.onCreate_order = false;
                    /* pagination*/
                    /* completed*/
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
        else {
            var message = "Please Select Atleas one Ordertype";
            this.ErrorService.handleError(message);
        }
    };
    NQueOrdersComponent.prototype.getNewQueOrders = function () {
        var _this = this;
        this.isRequesting = true;
        var body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, 0, this.limit);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/New_Orders_Directions_Sequence_Listing', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                _this.NewQueOrdersData = data.json().extras.SequenceData;
                /* pagination*/
                _this.Total_Count = data.json().extras.Count;
                /* completed*/
            }
            else {
                _this.isRequesting = false;
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
    NQueOrdersComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    NQueOrdersComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.index = index;
        var skip_value = this.index * this.limit;
        var empid = this._cookieService.get('EmployeeID');
        var body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, skip_value, this.limit);
        var body = JSON.stringify(body1);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/New_Orders_Directions_Sequence_Listing', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.NewQueOrdersData = data.json().extras.SequenceData;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NQueOrdersComponent.prototype.OnmoreInfo_order = function (item, i) {
        this.SequenceID = item.SequenceID;
        this.Sequence_Code = item.Sequence_Code;
        this.No_Of_Directions = item.No_Of_Directions;
        this.directionArray.length = this.No_Of_Directions;
        this.detailviewIndex = i;
        this.getDirectionOrder(0);
    };
    NQueOrdersComponent.prototype.OncloseDetailsView = function () {
        this.detailviewIndex = -1;
    };
    NQueOrdersComponent.prototype.getDirectionOrder = function (j) {
        this.activeDirection = j;
        this.activeDirectionAssin = -1;
        this.isRecordsView = true;
        this.activeDirection = j + 1;
        this.getDirectionOrdersApi(this.SequenceID, this.activeDirection, '/Find_New_Ongoing_Order_Direction_Number_Data', 1);
    };
    NQueOrdersComponent.prototype.getDirectionOrdersApi = function (SequenceID, Direction_Number, url, type) {
        var _this = this;
        var body1 = new NewQueueModel(this._cookieService.get('ez_cusID'), null, null, null, this.limit, SequenceID, Direction_Number);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.DirectionData = data.json().extras.DirectionData.OrderData;
                    _this.reverserDirection = _this.DirectionData;
                    _this.latBiker = _this.DirectionData[0].dropLatitude;
                    _this.lngBiker = _this.DirectionData[0].dropLongitude;
                    _this.pikLat = _this.reverserDirection[0].pickLatitude;
                    _this.piklng = _this.reverserDirection[0].pickLongitude;
                    var disArr = [];
                    var mainDat = [];
                    var pikLat1 = _this.reverserDirection[0].pickLatitude;
                    var piklng1 = _this.reverserDirection[0].pickLongitude;
                }
                else if (type == 2) {
                    _this.AllDirectionData = data.json().extras.DirectionData;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    NQueOrdersComponent.prototype.onAssign_Driver = function () {
        this.isRecordsView = false;
        this.activeDirectionAssin = 1;
        this.activeDirection = -1;
        this.DirectionData = [];
        this.getDirectionOrdersApi(this.SequenceID, null, '/Get_All_Order_Sequence_Directions', 2);
    };
    NQueOrdersComponent.prototype.onViewMap = function (itemDirc, m) {
        this.directionNumber_Backend = itemDirc.Direction_No;
        this.isOnmap = true;
        this.directionNumber = itemDirc.Direction_No;
        this.getDirectionOrdersApi(this.SequenceID, this.directionNumber_Backend, '/Find_New_Ongoing_Order_Direction_Number_Data', 1);
    };
    NQueOrdersComponent.prototype.onCloseMapview = function () {
        this.isOnmap = false;
        this.DirectionData = [];
    };
    NQueOrdersComponent.prototype.selectDriver = function (itemDirc, m) {
        this.directionNumber_Backend = itemDirc.Direction_No;
        this.isAssignDriver = true;
        this.directionNumber = m + 1;
        this.FindAll_Drivers();
    };
    NQueOrdersComponent.prototype.onCloseDriverAssign = function () {
        this.isAssignDriver = false;
    };
    NQueOrdersComponent.prototype.FindAll_Drivers = function () {
        var _this = this;
        var body = new OrdersModel_admin();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Drivers_of_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.DriverData = data.json().extras.DriverData;
                _this.DriverID = _this.DriverData[0].DriverID;
                _this.Driver_Name = _this.DriverData[0].name;
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
    NQueOrdersComponent.prototype.select_Driver = function (name, driverid) {
        this.DriverID = driverid;
        this.Driver_Name = name;
        this.finalConfirmDriver = true;
    };
    NQueOrdersComponent.prototype.onCloseDriverConfirm = function () {
        this.finalConfirmDriver = false;
    };
    NQueOrdersComponent.prototype.onSubmitDriver = function () {
        var _this = this;
        var body1 = new NewQueueModel(this._cookieService.get('ez_admin_cusID'), null, null, null, null, this.SequenceID, this.directionNumber_Backend, this.DriverID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Manual_Route_Customer_New_Ongoing_Orders_Sequence_Direction', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.issucessDriver_Assign = true;
                // alert("sucess")
                var message = "Driver Assign sucessfully";
                _this.ErrorService.handleError(message);
                _this.isAssignDriver = false;
                _this.detailviewIndex = -1;
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
    // checkBoxOption
    NQueOrdersComponent.prototype.OnselectOrder_new = function (value) {
        this.isNewOrder = !this.isNewOrder;
    };
    NQueOrdersComponent.prototype.OnselectOrder_Ongoing = function (value) {
        this.isOngoingOrder = !this.isOngoingOrder;
    };
    NQueOrdersComponent.prototype.pickadd = function () {
        var _this = this;
        var autocomplete;
        var options = { componentRestrictions: { country: "IN" } };
        this.inputAddress = document.getElementById('address');
        autocomplete = new google.maps.places.Autocomplete(this.inputAddress, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            _this.ngZone.run(function () {
                _this.zoom = 17;
                var place = autocomplete.getPlace();
                _this.pickAddress = place.name + ',' + place.formatted_address;
                var plac = place.name + ',';
                var address = place.formatted_address.indexOf(plac);
                if (address == 0) {
                    _this.pickAddress = place.formatted_address.replace(plac, plac);
                }
                else {
                }
                _this.lat = place.geometry.location.lat();
                _this.lng = place.geometry.location.lng();
            });
        });
    };
    NQueOrdersComponent.prototype.clickedMarker = function (index, data) {
        data['isOpen'] = true;
        if (this._lastOpenIndex > -1)
            this.DirectionData[this._lastOpenIndex]['isOpen'] = false;
        this._lastOpenIndex = index;
        var messa = "dummy";
    };
    NQueOrdersComponent.prototype.getDistence = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    NQueOrdersComponent.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    NQueOrdersComponent.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (a[args] < b[args]) {
                return -1;
            }
            else if (a[args] > b[args]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    __decorate([
        ViewChild("search"),
        __metadata("design:type", ElementRef)
    ], NQueOrdersComponent.prototype, "searchElementRef", void 0);
    NQueOrdersComponent = __decorate([
        Component({
            selector: 'n-que-orders',
            templateUrl: 'n-que-orders.component.html',
            styleUrls: ['n-que-orders.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            MapsAPILoader,
            NgZone,
            Http,
            ApiMessageService,
            CookieService,
            ErrorService,
            ChangeDetectorRef,
            PolylineManager])
    ], NQueOrdersComponent);
    return NQueOrdersComponent;
}());
export { NQueOrdersComponent };
