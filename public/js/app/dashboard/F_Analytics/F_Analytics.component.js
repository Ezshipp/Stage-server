var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AttendenceModel } from './../HR/Attendence/AttendecneModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';
import { DatePickerOptions } from 'ng2-datepicker';
var F_AnalyticsComponent = /** @class */ (function () {
    function F_AnalyticsComponent(_cookieService, http, _ApiMessageService, ErrorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this.ErrorService = ErrorService;
        this.invoice = '0';
        this.activeId = 1;
        this.isloaded = false;
        this.Total_Pricing = [];
        this.url = '';
        this.options_line = {};
        this.Todate_DateRange = new DatePickerOptions();
        this.Todate_DateRange.initialDate = new Date();
    }
    F_AnalyticsComponent.prototype.ngOnInit = function () {
        var d1 = new Date();
        var mon = d1.getMonth() + 1;
        var d23 = d1.getDate() + '/' + mon + '/' + d1.getFullYear();
        this.onsubmi_getAnalytics(d23, d23, 1, '/Find_All_OrderTypes_Collection_Date_Range');
        this.onsubmi_getAnalytics(d23, d23, 2, '/Find_Top_Customer_Driver_Date_Range');
        this.OnDaywise();
        this.toDayDate = d23;
    };
    F_AnalyticsComponent.prototype.getanlaytics = function () {
        var dateFrom = this.FromDate.day + '/' + this.FromDate.month + '/' + this.FromDate.year;
        var dateTo = this.todate.day + '/' + this.todate.month + '/' + this.todate.year;
        this.onsubmi_getAnalytics(dateFrom, dateTo, 1, '/Find_All_OrderTypes_Collection_Date_Range');
        this.onsubmi_getAnalytics(dateFrom, dateTo, 2, '/Find_Top_Customer_Driver_Date_Range');
        var start = new Date(dateFrom);
        var end = new Date(dateTo);
        if (start.toDateString() === end.toDateString()) {
            this.getgraphData(3, null, null, null, dateFrom);
            this.intervalu_count = 0;
            this.chart_Name = 'Day-wise analytics';
        }
        else {
            this.getgraphData(2, dateFrom, dateTo, 1);
            this.intervalu_count = 3;
            this.chart_Name = 'Month-wise analytics';
        }
        this.userFromDate = dateFrom;
        this.userTodate = dateTo;
        this.activeId = -1;
    };
    F_AnalyticsComponent.prototype.Onweek = function () {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var mon = date.getMonth() + 1;
        this.FromDate = date.getDate() + '/' + mon + '/' + date.getFullYear();
    };
    F_AnalyticsComponent.prototype.onsubmi_getAnalytics = function (fromdate, todate, type, url) {
        var _this = this;
        var body1 = new AttendenceModel(null, null, null, fromdate, todate);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + url, body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (type == 1) {
                    _this.Total_Pricing = data.json().extras.Total_Pricing;
                    _this.Total_Price = _this.Total_Pricing.COD_Price + _this.Total_Pricing.Online_Price + _this.Total_Pricing.Premium_Customer_Price;
                }
                else if (type == 2) {
                    _this.Driver_Data = data.json().extras.DriverData;
                    _this.Customer_Data = data.json().extras.CustomerData;
                    if (_this.Customer_Data[0].OrderCount == 0) {
                        _this.custerName = '';
                        _this.custerCount = '';
                    }
                    else {
                        _this.custerName = _this.Customer_Data[0].customerName;
                        _this.custerCount = _this.Customer_Data[0].OrderCount;
                    }
                    if (_this.Driver_Data[0].OrderCount == 0) {
                        _this.DriverName = '';
                        _this.DriverCount = '';
                    }
                    else {
                        _this.DriverName = _this.Driver_Data[0].DriverName;
                        _this.DriverCount = _this.Driver_Data[0].OrderCount;
                    }
                }
                else if (type == 3) {
                    _this.Total_Pricing = data.json().extras.Total_Pricing;
                    _this.Cancelled_Price = _this.Total_Pricing.Cancelled_Price;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this.ErrorService.handleError(message);
            }
        });
    };
    F_AnalyticsComponent.prototype.getgraphData = function (AnalyticType, from_date, to_date, ReturnType, date) {
        var _this = this;
        this.isRequesting = true;
        var body1 = new AttendenceModel(null, null, null, from_date, to_date, AnalyticType, ReturnType, date);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Financial_Price_Analytics', body1, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.isRequesting = false;
                if (AnalyticType == 1 || AnalyticType == 3) {
                    _this.PriceIntervalData = data.json().extras.PriceIntervalData;
                    _this.x_Axix = [];
                    _this.Price = [];
                    for (var i = 0; i < _this.PriceIntervalData.length; i++) {
                        _this.Price.push(_this.PriceIntervalData[i].Price);
                    }
                    for (var i = 0; i < _this.PriceIntervalData.length; i++) {
                        _this.x_Axix.push(_this.PriceIntervalData[i].interval);
                    }
                    var intervalu_count = 3;
                    _this.isloaded = true;
                    _this.options_line = {
                        chart: {
                            type: 'line',
                            options3d: {
                                enabled: true,
                                alpha: 15,
                                beta: 15,
                                depth: 50,
                                viewDistance: 25
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return 'Y-value <b>' + this.point.y + '</b>';
                            }
                        },
                        responsive: {
                            rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            layout: 'horizontal'
                                        },
                                        yAxis: {
                                            labels: {
                                                align: 'left',
                                                x: 0,
                                                y: -5
                                            },
                                            title: {
                                                text: null
                                            }
                                        },
                                        subtitle: {
                                            text: null
                                        },
                                        credits: {
                                            enabled: false
                                        }
                                    }
                                }]
                        },
                        title: { text: _this.chart_Name },
                        credits: {
                            enabled: false
                        }, xAxis: {
                            title: {
                                text: 'Time Intervals'
                            },
                            tickInterval: _this.intervalu_count,
                            categories: _this.x_Axix
                        }, series: [
                            {
                                showInLegend: false,
                                data: _this.Price,
                                allowPointSelect: true,
                                animation: {
                                    duration: 2000
                                }
                            },
                        ]
                    };
                }
                /* analtyic type==2*/
                if (AnalyticType == 2) {
                    if (ReturnType == 1) {
                        _this.PriceDayWiseData = data.json().extras.PriceDayWiseData;
                        _this.x_Axix = [];
                        _this.Price = [];
                        for (var i = 0; i < _this.PriceDayWiseData.length; i++) {
                            _this.Price.push(_this.PriceDayWiseData[i].Price);
                        }
                        for (var i = 0; i < _this.PriceDayWiseData.length; i++) {
                            var str = _this.PriceDayWiseData[i].Date;
                            _this.x_Axix.push(_this.PriceDayWiseData[i].Date);
                        }
                        _this.isloaded = true;
                        _this.options_line = {
                            chart: {
                                type: 'line',
                                options3d: {
                                    enabled: true,
                                    alpha: 15,
                                    beta: 15,
                                    depth: 50,
                                    viewDistance: 25
                                }
                            },
                            title: { text: _this.chart_Name },
                            credits: {
                                enabled: false
                            }, xAxis: {
                                title: {
                                    text: 'Time Intervals'
                                },
                                tooltip: {
                                    formatter: function () {
                                        return 'Y-value <b>' + this.point.y + '</b>';
                                    }
                                },
                                tickInterval: _this.intervalu_count,
                                categories: _this.x_Axix
                            }, series: [
                                {
                                    showInLegend: false,
                                    data: _this.Price,
                                    allowPointSelect: true,
                                    animation: {
                                        duration: 2000
                                    }
                                },
                            ]
                        };
                    }
                    /*month wise*/
                    if (ReturnType == 2) {
                        _this.PriceMonthWiseData = data.json().extras.PriceMonthWiseData;
                        _this.x_Axix = [];
                        _this.Price = [];
                        for (var i = 0; i < _this.PriceMonthWiseData.length; i++) {
                            _this.Price.push(_this.PriceMonthWiseData[i].Price);
                        }
                        for (var i = 0; i < _this.PriceMonthWiseData.length; i++) {
                            _this.x_Axix.push(_this.PriceMonthWiseData[i].From_Date + ' To ' + _this.PriceMonthWiseData[i].To_Date);
                        }
                        var intervalu_count = 3;
                        _this.isloaded = true;
                        _this.options_line = {
                            chart: {
                                type: 'line',
                                options3d: {
                                    enabled: true,
                                    alpha: 15,
                                    beta: 15,
                                    depth: 50,
                                    viewDistance: 25
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return 'Y-value <b>' + this.point.y + '</b>';
                                }
                            },
                            title: { text: 'Analytics' },
                            credits: {
                                enabled: false
                            }, xAxis: {
                                title: {
                                    text: 'Time Intervals'
                                },
                                tickInterval: _this.intervalu_count,
                                categories: _this.x_Axix
                            }, series: [
                                {
                                    showInLegend: false,
                                    data: _this.Price,
                                    allowPointSelect: true,
                                    animation: {
                                        duration: 2000
                                    }
                                },
                            ]
                        };
                    }
                }
            }
        });
    };
    F_AnalyticsComponent.prototype.OnDaywise = function () {
        this.getgraphData(1);
        this.intervalu_count = 0;
        this.activeId = 1;
        this.chart_Name = ' Day-wise analytics';
    };
    F_AnalyticsComponent.prototype.OnMonthwise = function () {
        var date = new Date();
        date.setDate(date.getDate() - 30);
        var dateString = date.toISOString().split('T')[0];
        var Before30TH = dateString.split('-');
        var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0];
        this.getgraphData(2, Before, this.toDayDate, 1);
        this.intervalu_count = 5;
        this.chart_Name = ' 1 Month analytics';
        this.activeId = 2;
    };
    F_AnalyticsComponent.prototype.On3Monthwise = function () {
        var date = new Date();
        date.setDate(date.getDate() - 90);
        var dateString = date.toISOString().split('T')[0];
        var Before30TH = dateString.split('-');
        var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0];
        this.getgraphData(2, Before, this.toDayDate, 2);
        this.intervalu_count = 2;
        this.activeId = 3;
        this.chart_Name = ' 3 Months analytics';
    };
    F_AnalyticsComponent.prototype.On6Monthwise = function () {
        var date = new Date();
        date.setDate(date.getDate() - 180);
        var dateString = date.toISOString().split('T')[0];
        var Before30TH = dateString.split('-');
        var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0];
        this.getgraphData(2, Before, this.toDayDate, 2);
        this.intervalu_count = 2;
        this.activeId = 4;
        this.chart_Name = ' 6 Months analytics';
    };
    F_AnalyticsComponent = __decorate([
        Component({
            selector: 'app-F_Analytics',
            templateUrl: './F_Analytics.component.html',
            styleUrls: ['./F_Analytics.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Http, ApiMessageService,
            ErrorService])
    ], F_AnalyticsComponent);
    return F_AnalyticsComponent;
}());
export { F_AnalyticsComponent };
