var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AnalyticsModel } from './../../front_end_models/analyticsModel';
import { ErrorService } from './../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, NgZone, ViewChild, ElementRef } from '@angular/core';
var AnalyticsComponent = /** @class */ (function () {
    function AnalyticsComponent(http, _ApiMessageService, ngZone, _cookieService, router, ErrorService, _cdref) {
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ngZone = ngZone;
        this._cookieService = _cookieService;
        this.router = router;
        this.ErrorService = ErrorService;
        this._cdref = _cdref;
        this._lastOpenIndex_OrdersBirdview_drop = -1;
        this._lastOpenIndex_OrdersBirdview = -1;
        this.long_ordersBirds = 78.4867;
        this.lat_ordersBirds = 17.3850;
        this.skip_ordersBirdsView = 0;
        this.OrdersData_birds = [];
        this.picmarker_icon = "./images/imageedit_2_4150727599.png";
        this.dropMarker_icon = "./images/imageedit_2_6997711684.png";
        this.isRefresh = false;
        this.skip_map = 0;
        this._lastOpenIndex = -1;
        this.lat = 17.4778;
        this.lng = 78.254788;
        this.zoom = 10;
        this.DriverData = [];
        this.p_orders = 1;
        this.Details_orders = [];
        this.p = 1;
        this.CustomerData = [];
        this.isLoading_pie = false;
        this.SignupData = [];
        this.url = '';
        this.typeWise = 'Day wise signup Users';
        this.options_pie = {
            chart: { type: 'pie' }
        };
        this.options_pie2 = {
            chart: { type: 'pie' }
        };
        var date = new Date();
        var d1 = date.getMonth() + 1;
        this.toDate = date.getDate() + '/' + d1 + '/' + date.getFullYear();
        this.fromDate = this.toDate;
    }
    AnalyticsComponent.prototype.ngOnInit = function () {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 17.4471, lng: 78.454 },
            zoom: 10
        });
        this.onDay();
        this.getDriverData(this.skip_map, false);
        this.findAll_Zones();
    };
    AnalyticsComponent.prototype.onDay = function () {
        clearInterval(this.RefreshId);
        this.isRefresh = false;
        this.fromDate = this.toDate;
        this.activeid = 1;
        this.typeWise = 'Day wise signup Users';
        this.SignupUsers(this.fromDate, this.toDate);
        this.getOrdersData(this.fromDate, this.toDate);
        this.OrdersBirdView(0, this.fromDate, this.toDate);
        this.OrdersData_birds = [];
        var dat = new Date();
    };
    AnalyticsComponent.prototype.Onweek = function () {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var mon = date.getMonth() + 1;
        var d2 = date.getDate() + '/' + mon + '/' + date.getFullYear();
        var present = new Date();
        var p1 = present.getMonth() + 1;
        var sdf = present.getDate() + '/' + p1 + '/' + present.getFullYear();
        this.isRefresh = false;
        clearInterval(this.RefreshId);
        this.OrdersBirdView(0, d2, sdf);
        this.SignupUsers(d2, sdf);
        this.getOrdersData(d2, sdf);
        this.isRequesting = true;
        this.activeid = 2;
        this.OrdersData_birds = [];
    };
    AnalyticsComponent.prototype.OnMonth = function () {
        this.isRefresh = false;
        clearInterval(this.RefreshId);
        var date = new Date();
        date.setDate(date.getDate() - 30);
        var mon = date.getMonth() + 1;
        var d2 = date.getDate() + '/' + mon + '/' + date.getFullYear();
        var present = new Date();
        var p1 = present.getMonth() + 1;
        var sdf = present.getDate() + '/' + p1 + '/' + present.getFullYear();
        this.isRequesting = true;
        this.SignupUsers(d2, sdf);
        this.getOrdersData(d2, sdf);
        this.activeid = 3;
        this.OrdersBirdView(0, d2, sdf);
        this.OrdersData_birds = [];
    };
    AnalyticsComponent.prototype.OnYearly = function () {
        this.typeWise = 'Year wise signup Users';
        this.activeid = 4;
    };
    AnalyticsComponent.prototype.OnTotal = function () {
        this.typeWise = '';
        this.typeWise = 'Total signup Users';
        this.activeid = 5;
    };
    AnalyticsComponent.prototype.clickHandler = function (event) {
        if (event.point) {
            jQuery(this.myModal.nativeElement).modal('show');
            this.CustomerData = [];
            var name = event.point.name;
            this.name_slicedPie = name;
            if (this.name_slicedPie == 'Ios') {
                this.deviceType = 1;
                this.devecieCount = this.ios_Count;
            }
            else if (this.name_slicedPie == 'Android') {
                this.deviceType = 2;
                this.devecieCount = this.android_Count;
            }
            else if (this.name_slicedPie == 'Web') {
                this.deviceType = 3;
                this.devecieCount = this.web_Count;
            }
            this.getCustMerData(0, 0, this.deviceType, this.fromDateFinal, this.todateFinal);
        }
    };
    AnalyticsComponent.prototype.clickHandler_orders = function (event) {
        if (event.point) {
            jQuery(this.myModalOrders.nativeElement).modal('show');
            this.index_moreinfor = -1;
            this.Details_orders = [];
            var name = event.point.name;
            name = name.trim();
            if (name == 'Completed') {
                this.type = 3;
                this.totalCount_orders = this.Completed_Orders;
                this.order_type = 'Completed Orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
            else if (name == 'Ongoing') {
                this.type = 2;
                this.totalCount_orders = this.Ongoing_Orders;
                this.order_type = 'Ongoing Orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
            else if (name == 'New') {
                this.type = 1;
                this.totalCount_orders = this.new_orders;
                this.order_type = 'new orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
            else if (name == 'Same Day') {
                this.type = 6;
                this.totalCount_orders = this.Same_Day_Orders;
                this.order_type = 'Same Day Orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
            else if (name == '4 Hours') {
                this.type = 5;
                this.totalCount_orders = this.four_hours_Orders;
                this.order_type = 'four hours Orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
            else if (name == 'Instant') {
                this.type = 4;
                this.totalCount_orders = this.Instant_Orders;
                this.order_type = 'Instant Orders';
                this.getOrders_details_data(this.fromDateFinal, this.todateFinal, this.type);
            }
        }
    };
    AnalyticsComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    AnalyticsComponent.prototype.onsave = function () {
        this.closeModal();
    };
    AnalyticsComponent.prototype.Ondateto = function (todate) {
    };
    AnalyticsComponent.prototype.OnFromDate = function (fromdate) {
    };
    AnalyticsComponent.prototype.getanlaytics = function (fromdateui, toDate_ui) {
        var fromDate = fromdateui.split('-');
        fromDate = fromDate[2] + '/' + fromDate[1] + '/' + fromDate[0];
        var toDate = toDate_ui.split('-');
        toDate = toDate[2] + '/' + toDate[1] + '/' + toDate[0];
        this.SignupUsers(fromDate, toDate);
        this.getOrdersData(fromDate, toDate);
        this.OrdersBirdView(0, fromDate, toDate);
        this.OrdersData_birds = [];
    };
    AnalyticsComponent.prototype.OnRefresh = function () {
        this.isRefresh = !this.isRefresh;
        if (this.isRefresh) {
            this.Onselect_RefreshTime(60000);
        }
        else {
            clearInterval(this.RefreshId);
        }
    };
    AnalyticsComponent.prototype.Onselect_RefreshTime = function (value) {
        var _this = this;
        if (this.isRefresh) {
            if (value > 0) {
                this.RefreshId = setInterval(function () {
                    _this.SignupUsers(_this.fromDateFinal, _this.todateFinal);
                    _this.getOrdersData(_this.fromDateFinal, _this.todateFinal);
                }, value);
            }
        }
    };
    AnalyticsComponent.prototype.SignupUsers = function (fromDate, Todate) {
        var _this = this;
        this.fromDateFinal = fromDate;
        this.todateFinal = Todate;
        var body = new AnalyticsModel(null, null, null, fromDate, Todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Signups_Devices_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.SignupData = (data.json().extras.SignupData);
                _this.web_Count = +_this.SignupData.web;
                if (_this.web_Count <= 0) {
                    _this.web_Count = null;
                }
                else {
                }
                _this.android_Count = +_this.SignupData.android;
                if (_this.android_Count <= 0) {
                    _this.android_Count = null;
                }
                else {
                }
                _this.ios_Count = +_this.SignupData.ios;
                if (_this.ios_Count <= 0) {
                    _this.ios_Count = null;
                }
                else {
                }
                _this.total_count_pie = _this.SignupData.total;
                _this.isLoading_pie = true;
                if (_this.total_count_pie == 0) {
                    _this.isSignupdata = false;
                }
                else {
                    _this.isSignupdata = true;
                }
                _this.options_pie = {
                    chart: { type: 'pie' },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function () {
                            return this.key + ':' + this.point.y + '</b>';
                        }
                    },
                    title: { text: 'Customers' + '(' + _this.total_count_pie + ')' },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.y}</b>',
                                distance: -50,
                                color: 'black'
                            }
                        },
                        series: {
                            animation: {
                                duration: 2000
                            }
                        }
                    },
                    series: [
                        {
                            data: [
                                {
                                    y: _this.web_Count,
                                    name: 'Web',
                                    color: '#4885ed'
                                }, {
                                    y: _this.android_Count,
                                    name: 'Android',
                                    color: '#3cba54'
                                }, {
                                    y: _this.ios_Count,
                                    name: 'Ios',
                                    color: '#f4c20d'
                                }
                            ],
                            allowPointSelect: true,
                            showInLegend: true,
                        },
                    ]
                };
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                alert(_this._ApiMessageService.ApiMessages[msgNumber]);
            }
        });
    };
    AnalyticsComponent.prototype.getOrdersData = function (fromdate, todate) {
        var _this = this;
        var body = new AnalyticsModel(null, null, null, fromdate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Order_Complete_Analytics', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                var Total_Orders = +data.json().extras.Total_Orders;
                if (Total_Orders == 0) {
                    _this.isorders_pie = false;
                }
                else {
                    _this.isorders_pie = true;
                }
                _this.new_orders = +data.json().extras.New_Orders;
                _this.Ongoing_Orders = +data.json().extras.Ongoing_Orders;
                _this.Completed_Orders = +data.json().extras.Completed_Orders;
                _this.Instant_Orders = +data.json().extras.Instant_Orders;
                _this.four_hours_Orders = +data.json().extras.four_hours_Orders;
                _this.Same_Day_Orders = +data.json().extras.Same_Day_Orders;
                if (_this.new_orders <= 0) {
                    _this.new_orders = null;
                }
                else {
                }
                if (_this.Ongoing_Orders <= 0) {
                    _this.Ongoing_Orders = null;
                }
                else {
                }
                if (_this.Completed_Orders <= 0) {
                    _this.Completed_Orders = null;
                }
                else {
                }
                if (_this.Instant_Orders <= 0) {
                    _this.Instant_Orders = null;
                }
                else {
                }
                if (_this.four_hours_Orders <= 0) {
                    _this.four_hours_Orders = null;
                }
                else {
                }
                if (_this.Same_Day_Orders <= 0) {
                    _this.Same_Day_Orders = null;
                }
                else {
                }
                var order_count = _this.new_orders + _this.Completed_Orders + _this.Ongoing_Orders;
                var order_bookingtyp = _this.Same_Day_Orders + _this.Instant_Orders + _this.four_hours_Orders;
                _this.options_pie2 = {
                    chart: { type: 'pie' },
                    credits: {
                        enabled: false
                    },
                    title: { text: 'Orders Status' + '(' + order_count + ')' },
                    tooltip: {
                        formatter: function () {
                            return this.key + ':' + this.point.y + '</b>';
                        }
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: ' <h1>{point.y}</h1>',
                                distance: -40,
                                color: 'white'
                            }
                        },
                        series: {
                            animation: {
                                duration: 2000
                            }
                        }
                    },
                    series: [
                        {
                            data: [
                                {
                                    y: _this.new_orders,
                                    name: 'New',
                                    color: '#4885ed'
                                }, {
                                    y: _this.Ongoing_Orders,
                                    name: 'Ongoing',
                                    color: '#3cba54'
                                }, {
                                    y: _this.Completed_Orders,
                                    name: 'Completed',
                                    color: '#f4c20d',
                                    dataLabels: {
                                        distance: -40,
                                        color: 'white'
                                    }
                                }
                            ],
                            allowPointSelect: true,
                            showInLegend: true,
                        },
                    ]
                };
                _this.options_pie3 = {
                    chart: { type: 'pie' },
                    credits: {
                        enabled: false
                    },
                    title: { text: 'Orders  Booking Type' + '(' + order_bookingtyp + ')' },
                    tooltip: {
                        formatter: function () {
                            return this.key + ':' + this.point.y + '</b>';
                        }
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<strong>{point.y}</strong>',
                                style: {
                                    fontSize: '14px',
                                    border: 'black',
                                    fontWeight: '800'
                                },
                                distance: -30,
                                color: 'black',
                            }
                        },
                        series: {
                            animation: {
                                duration: 2000
                            }
                        }
                    },
                    exporting: {
                        enabled: true,
                    },
                    series: [
                        {
                            data: [
                                {
                                    y: _this.Instant_Orders,
                                    name: 'Instant',
                                    color: '#00BFFF'
                                }, {
                                    y: _this.four_hours_Orders,
                                    name: '4 Hours ',
                                    color: '#fb641b'
                                }, {
                                    y: _this.Same_Day_Orders,
                                    name: 'Same Day ',
                                    color: '#ee9b0a'
                                }
                            ],
                            allowPointSelect: true,
                            showInLegend: true,
                        },
                    ]
                };
            }
        });
    };
    AnalyticsComponent.prototype.getCustMerData = function (skip, type, deviceType, fromdate, todate) {
        var _this = this;
        var body = new AnalyticsModel(skip, type, deviceType, fromdate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'Detailed_Customer_Registered_View_All_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.CustomerData = data.json().extras.CustomerData;
            }
        });
    };
    AnalyticsComponent.prototype.pageChanged = function (event) {
        this.p = event;
        this.nextpage(this.p - 1);
    };
    AnalyticsComponent.prototype.nextpage = function (index) {
        var _this = this;
        this.index_signup = index;
        var skip_value = this.index_signup * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new AnalyticsModel(skip_value, null, this.deviceType, this.fromDateFinal, this.todateFinal);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Detailed_Customer_Registered_View_All_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.CustomerData = data.json().extras.CustomerData;
                _this.skip_value_signup = _this.index_signup * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AnalyticsComponent.prototype.getOrders_details_data = function (fromdate, todate, type) {
        var _this = this;
        var body = new AnalyticsModel(0, type, null, fromdate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Orders_Analytics_Details_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Details_orders = data.json().extras.OrderData;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AnalyticsComponent.prototype.moreinfo = function (item, i) {
        this.index_moreinfor = i;
        this.receiverName = item.receiverName;
        this.receiverPhone = item.receiverPhone;
        this.itemName = item.itemName;
        this.deliverycharge = item.deliverycharge;
        this.First_name = item.First_name;
        this.Phone = item.Phone;
        this.Email = item.Email;
        this.Driver_Name = item.Driver_Name;
        this.Driver_PhoneNumber = item.Driver_PhoneNumber;
        this.Driver_Email = item.Driver_Email;
        this.order_datetime = item.order_datetime;
        if (item.OfferApplied) {
            this.OfferApplied = true;
            this.OfferName = item.OfferName;
            this.OfferDescription = item.OfferDescription;
            this.OfferCode = item.OfferCode;
        }
        else {
            this.OfferApplied = false;
        }
        this.itemImage = item.itemImage;
        if (this.itemImage.length) {
            this.isimage = true;
        }
        else {
            this.isimage = false;
        }
    };
    AnalyticsComponent.prototype.pageChanged_orders = function (event) {
        this.p_orders = event;
        this.nextpage_orders(this.p_orders - 1);
    };
    AnalyticsComponent.prototype.nextpage_orders = function (index) {
        var _this = this;
        this.index_orders = index;
        var skip_value = this.index_orders * 10;
        var empid = this._cookieService.get('EmployeeID');
        var result_table_data = new AnalyticsModel(skip_value, this.type, null, this.fromDateFinal, this.todateFinal);
        var body = JSON.stringify(result_table_data);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Orders_Analytics_Details_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.Details_orders = data.json().extras.OrderData;
                _this.skip_value_orders = _this.index_orders * 10;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AnalyticsComponent.prototype.getDriverData = function (skip, iszoneid, ZoneID) {
        var _this = this;
        var body = new AnalyticsModel(skip, null, null, null, null, ZoneID);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Driver_Bird_View_Total', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var driverdata = [];
                driverdata = data.json().extras.DriverData;
                if (iszoneid) {
                    _this.DriverData = [];
                    _this.DriverData = data.json().extras.DriverData;
                }
                else {
                    if (driverdata.length == 0) {
                        return;
                    }
                    else {
                        Array.prototype.push.apply(_this.DriverData, driverdata);
                        _this.lat = _this.DriverData[0].lat;
                        _this.lng = _this.DriverData[0].long;
                        _this.skip_map = _this.skip_map + driverdata.length;
                        _this.getDriverData(_this.skip_map, false);
                    }
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AnalyticsComponent.prototype.OrdersBirdView = function (skip, fromDate, todate) {
        var _this = this;
        var body = new AnalyticsModel(skip, null, null, fromDate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/All_Orders_Bird_View_Date_Range', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                var PickData = [];
                PickData = data.json().extras.OrderData;
                if (PickData.length == 0) {
                    return;
                }
                else {
                    Array.prototype.push.apply(_this.OrdersData_birds, PickData);
                    skip = skip + PickData.length;
                    _this.OrdersBirdView(skip, fromDate, todate);
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    AnalyticsComponent.prototype.clickedMarker = function (index, data) {
        data['isOpen'] = true;
        if (this._lastOpenIndex > -1)
            this.DriverData[this._lastOpenIndex]['isOpen'] = false;
        this._lastOpenIndex = index;
        this.getGeoLocation(data.lat, data.long);
    };
    AnalyticsComponent.prototype.clickedMarker_ordersBIrd = function (index, data) {
        data['isOpen'] = true;
        if (this._lastOpenIndex_OrdersBirdview > -1)
            this.OrdersData_birds[this._lastOpenIndex_OrdersBirdview]['isOpen'] = false;
        this._lastOpenIndex_OrdersBirdview = index;
    };
    AnalyticsComponent.prototype.clickedMarker_ordersBIrd_drop = function (index, data) {
        data['isOpenDrop'] = true;
        if (this._lastOpenIndex_OrdersBirdview_drop > -1)
            this.OrdersData_birds[this._lastOpenIndex_OrdersBirdview_drop]['isOpenDrop'] = false;
        this._lastOpenIndex_OrdersBirdview_drop = index;
    };
    AnalyticsComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        this.DriverAddress = '';
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    var rsltAdrComponent = result.address_components;
                    var resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        var pickadd = results[0].formatted_address;
                        _this.DriverAddress = pickadd;
                    }
                    else {
                        _this.DriverAddress = 'No address avilable';
                    }
                }
                else {
                    _this.DriverAddress = 'No address avilable';
                }
            });
        }
    };
    AnalyticsComponent.prototype.findAll_Zones = function () {
        var _this = this;
        var body = new AnalyticsModel();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Find_All_Zones', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.ZoneData = data.json().extras.ZoneData;
                _this.zoneid = _this.ZoneData[0].ZoneID;
            }
        });
    };
    AnalyticsComponent.prototype.onselectZone = function (event) {
        this.zoneid = event.target.value;
        this.getDriverData(0, true, this.zoneid);
    };
    AnalyticsComponent.prototype.markerDragEnd = function (event) { };
    __decorate([
        ViewChild('myModal'),
        __metadata("design:type", ElementRef)
    ], AnalyticsComponent.prototype, "myModal", void 0);
    __decorate([
        ViewChild('myModalOrders'),
        __metadata("design:type", ElementRef)
    ], AnalyticsComponent.prototype, "myModalOrders", void 0);
    __decorate([
        ViewChild('closebtn'),
        __metadata("design:type", ElementRef)
    ], AnalyticsComponent.prototype, "closeBtn", void 0);
    AnalyticsComponent = __decorate([
        Component({
            selector: 'app-analytics',
            templateUrl: './analytics.component.html',
            styleUrls: ['./analytics.component.css']
        }),
        __metadata("design:paramtypes", [Http,
            ApiMessageService,
            NgZone,
            CookieService,
            Router,
            ErrorService, ChangeDetectorRef])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());
export { AnalyticsComponent };
