var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ReportModal } from './../../front_end_models/reportModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
var ReportComponent = /** @class */ (function () {
    function ReportComponent(_cookieService, http, _ApiMessageService, _errorService) {
        this._cookieService = _cookieService;
        this.http = http;
        this._ApiMessageService = _ApiMessageService;
        this._errorService = _errorService;
        this.marginLeft = 225;
        this.pie_data = [];
        this.report_collection = [
            "(orders) from -hyderabad-",
            "(orders) today",
            "(orders) between -20/05/2017- -21/05/2017-",
            "(Orders) today -accepted-",
            "(Orders) today -Arrived_At_Shop-",
            "(Orders) today -Order_Picked-",
            "(Orders) today -Order_Reached_At_Delivery-",
            "(Orders) today -Order_Dropped_At_Delivery-",
            "(Orders) today -Driver_On_Way_To_Pickup-",
            "(Orders) today -rejected-",
            "(Orders) today -completed-",
            "(Orders) today -finish-",
            "(Orders) today -cancelled-",
            "(Orders) today -cancel-",
            "(Orders) today -new-",
            "(Orders) today -latest-",
            "(Orders) between -20/05/2017- -22/05/2017- status -new-",
            "(Orders) between -20/05/2017- -22/05/2017- status -accepted-",
            "(Orders) between -20/05/2017- -22/05/ 2017- status -arrived_at_shop-",
            "(Orders) between -20/05/2017- -22/05/2017- status -order_picked-",
            "(Orders) between -20/05/2017- -22/05/2017- status -Order_Reached_At_Delivery-",
            "(Orders) between -20/05/2017- -22/05/2017- status -Order_Dropped_At_Delivery-",
            "(Orders) between -20/05/2017- -22/05/2017- status -Driver_On_Way_To_Pickup-",
            "(Orders) between -20/05/2017- -22/05/2017- status -rejected-",
            "(Orders) between -20/05/2017- -22/05/2017- status -completed-",
            "(Orders) between -20/05/2017- -22/05/2017- status -cancelled-",
            "(Orders) from (Zones) -hyd-",
            "(Orders) from (Drivers) -raju-",
            "(Orders) from (Customer) -uday-",
            "(Orders) from (zones) -hyd- between  -20/05/2017- -21/05/2017-",
            "(Orders) from (drivers) -raju- between  -20/05/2017- -21/05/2017-",
            "(Orders) from (Customer) -uday- between  -20/05/2017- -21/05/2017-",
            "(Recursive_Orders) from -hyderabad-",
            "(Recursive_Orders) today",
            "(Recursive_Orders) between -10/05/2017- -22/05/2017-",
        ];
        this.dum = [];
        this.filteredData = null;
        this.headers = null;
        this.query = {};
        this.demoChk = [];
        this.lat1 = [];
        this.obj = {};
        this.pieChart = [];
        this.ResultData1 = [];
        this.output = [];
        this.userFilter = "";
        this.keys = [];
        this.lats_c = 35.8617;
        this.lngs_c = 104.1954;
        this.sample = false;
        this.collection_array = [];
        this.ResultData_search = [];
        this.isActive = true;
        this.imagemap5 = "./images/Slice 5.png";
        this.imagemap6 = "./images/Slice 6.png";
        this.imagemap7 = "./images/Slice 7.png";
        this.imagemap8 = "./images/Slice 8.png";
        this.imagemap9 = "./images/Slice 9.png";
        this.imagemap13 = "./images/Slice 13.png";
        this.imagemap14 = "./images/Slice 14.png";
        this.imagemap15 = "./images/Slice 15.png";
        this.lats = 20.5937;
        this.lngs = 78.9629;
        this.showmap = false;
        this.lat_lng_array = [];
        this.lat_array = [];
        this.lng_array = [];
        this.issucess = false;
        this.table_view = false;
        this.ResultData = [];
        this.url = '';
        this.collection = [];
        this.search_terms = false;
        this.zoom = 11;
    }
    ReportComponent.prototype.ngOnInit = function () {
        this.search_terms = true;
    };
    ReportComponent.prototype.Report_value = function () {
        var _this = this;
        this.issucess = true;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ReportModal(null, null, null, this.search, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Report_Generation_From_Query', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                if (data.json().extras.ResultData.length == 0) {
                    alert("no records found");
                }
                _this.ResultData = data.json().extras.ResultData;
                for (var i = 0; i < _this.ResultData.length; i++) {
                    var str = '';
                    var pick = _this.ResultData[i].pickAddress;
                    _this.ResultData[i].pickAddress = pick.replace('Telangana', '');
                    _this.ResultData[i].pickAddress = _this.ResultData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.ResultData.length; i++) {
                    var str = '';
                    var pick = _this.ResultData[i].dropAddress;
                    _this.ResultData[i].dropAddress = pick.replace('Telangana', '');
                    _this.ResultData[i].dropAddress = _this.ResultData[i].dropAddress.replace(', India', '');
                }
                var length_1 = _this.ResultData.length;
                if (_this.ResultData.length) {
                    _this.issucess = false;
                    _this.collection_array.push(_this.search);
                    _this.search_terms = true;
                }
                else {
                    _this.issucess = false;
                    _this.search_terms = true;
                }
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    ReportComponent.prototype.table_data_all_vies = function (index) {
        this.index = index;
        this.isActive = false;
        this.ResultData1 = [];
        this.demoChk = [];
        var value = this.collection_array[index];
        this.filteredData = [];
        this.headers = [];
        this.Report_value_1(value);
    };
    ReportComponent.prototype.Report_value_1 = function (search) {
        var _this = this;
        this.issucess = true;
        var uid = this._cookieService.get('ez_cusID');
        var body = new ReportModal(null, null, null, search, this._cookieService.get('ez_admin_cusID'));
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/Report_Generation_From_Query', body, { headers: headers })
            .subscribe(function (data) {
            if (data.json().success) {
                _this.search_terms = false;
                _this.table_view = true;
                _this.ResultData_search = data.json().extras.ResultData;
                _this.ResultData = data.json().extras.ResultData;
                for (var i = 0; i < _this.ResultData.length; i++) {
                    var str = '';
                    var pick = _this.ResultData[i].pickAddress;
                    _this.ResultData[i].pickAddress = pick.replace('Telangana', '');
                    _this.ResultData[i].pickAddress = _this.ResultData[i].pickAddress.replace(', India', '');
                }
                for (var i = 0; i < _this.ResultData.length; i++) {
                    var str = '';
                    var pick = _this.ResultData[i].dropAddress;
                    _this.ResultData[i].dropAddress = pick.replace('Telangana', '');
                    _this.ResultData[i].dropAddress = _this.ResultData[i].dropAddress.replace(', India', '');
                }
                setTimeout(function () {
                    _this.allData = _this.ResultData_search; // store all your data
                    _this.filteredData = _this.allData; // At first the user doesn't filter, so display everything
                    _this.headers = []; // Create an empty array to use headers.push()
                    for (var prop in _this.allData[0]) {
                        _this.headers.push(prop); // push the property in the header
                    }
                }, 1000);
                _this.issucess = false;
            }
            else {
                var msgNumber = parseInt(data.json().extras.msg);
                var message = _this._ApiMessageService.ApiMessages[msgNumber];
                _this._errorService.handleError(message);
            }
        });
    };
    ReportComponent.prototype.dummy = function (modalName) {
        this.search_value = '(' + this.collectionName + ')' + " from " + '-' + modalName + '-';
    };
    ReportComponent.prototype.search_terms_view = function () {
        this.search_terms = true;
        this.table_view = false;
        this.isActive = true;
        this.index = -1;
    };
    ReportComponent.prototype.onSubmit_Report = function (form) {
        this.search = form.value.search_value;
        this.Report_value();
    };
    ReportComponent.prototype.show_map = function () {
        this.showmap = true;
        var light = [];
        this.dum = [];
        light = this.demoChk.reverse();
        for (var i = 0; i < this.ResultData_search.length; i++) {
            this.dum.push({ lat: this.filteredData[i][light[1]], lng: this.filteredData[i][light[0]] });
        }
    };
    ReportComponent.prototype.onErrorHandled = function () {
        this.showmap = false;
    };
    ReportComponent.prototype.open_filter = function () {
        this.filter = !this.filter;
        this.is_dropdown = true;
    };
    ReportComponent.prototype.filter_condition = function () {
        this.filter_condition_all = true;
    };
    ReportComponent.prototype.check_box = function (value, event) {
        if (event.target.checked) {
            this.demoChk.push(value);
        }
        else if (!event.target.checked) {
            var indexx = this.demoChk.indexOf(value);
            this.demoChk.splice(indexx, 1);
        }
    };
    /*  function for to get array by passing key to json*/
    // filter_id(key){
    // this.ResultData1=[]
    // for(var i=0;i<this.ResultData.length;i++){
    //           this.ResultData1.push(this.ResultData[i][key])
    //                                      }
    // }
    ReportComponent.prototype.sort = function (key) {
        this.isAsc = !this.isAsc;
        this.valu = key;
        this.sortResults(key, this.isAsc);
    };
    ReportComponent.prototype.reverse_array = function (key) {
        this.valu = key;
        this.sortResults(key, false);
    };
    ReportComponent.prototype.resetAll = function () {
        this.ResultData_search.forEach(function (item) {
            item.checked = true;
        });
    };
    ReportComponent.prototype.resetAll_clear = function () {
        this.ResultData_search.forEach(function (item) {
            item.checked = false;
        });
    };
    ReportComponent.prototype.click_dropdown = function () {
        this.click_dropdown_all = true;
    };
    // sortObject(obj) {
    //     var arr = [];
    //     for (var prop in obj) {
    //         if (obj.hasOwnProperty(prop)) {
    //             arr.push({
    //                 'key': prop,
    //                 'value': obj[prop]
    //             });
    //         }
    //     }
    //     arr.sort(function(a, b) { return a.value - b.value; });
    //     return arr; // returns array
    // }
    ReportComponent.prototype.show_bar = function () {
        this.show_pie('bar');
    };
    ReportComponent.prototype.show_column = function () {
        this.show_pie('column');
    };
    ReportComponent.prototype.show_line = function () {
        this.show_pie('line');
    };
    ReportComponent.prototype.show_Pie1 = function () {
        this.show_pie('pie');
    };
    ReportComponent.prototype.show_pie = function (value) {
        this.pie_data = [];
        this.ResultData1 = [];
        var count = {};
        for (var _i = 0, _a = this.demoChk; _i < _a.length; _i++) {
            var letter = _a[_i];
            for (var i = 0; i < this.filteredData.length; i++) {
                this.ResultData1.push(this.filteredData[i][letter]);
            }
        }
        this.ResultData1.forEach(function (el) {
            count[el] = count[el] + 1 || 1;
        });
        this.lables = [],
            this.values_pie = [];
        for (var property in count) {
            if (!count.hasOwnProperty(property)) {
                continue;
            }
            this.lables.push(property);
            this.values_pie.push(count[property]);
        }
        for (var i = 0; i < this.lables.length; i++) {
            this.pie_data.push({
                name: this.lables[i],
                y: this.values_pie[i]
            });
        }
        if (value == 'line') {
            this.show_bar_chart = false;
            this.show_line_chart = true;
            this.show_pie_Chart = false;
            this.showmap = false;
            this.show_column_Chart1 = false;
        }
        else if (value == 'pie') {
            this.show_bar_chart = false;
            this.show_line_chart = false;
            this.show_pie_Chart = true;
            this.showmap = false;
            this.show_column_Chart1 = false;
        }
        else if (value == 'bar') {
            this.show_bar_chart = true;
            this.show_line_chart = false;
            this.show_pie_Chart = false;
            this.showmap = false;
            this.show_column_Chart1 = false;
        }
        else if (value == 'column') {
            this.show_bar_chart = false;
            this.show_line_chart = false;
            this.show_pie_Chart = false;
            this.showmap = false;
            this.show_column_Chart1 = true;
        }
        this.pieChart.push({
            name: this.lables,
            y: this.values_pie,
        });
        this.showmap = false;
        this.options_pie = this.options_pie = {
            chart: { type: value },
            title: { text: null },
            tooltip: {
                formatter: function () {
                    return 'Y-value <b>' + this.point.y + '</b>';
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    colorByPoint: true
                },
                series: {
                    borderColor: '#fed944',
                    animation: {
                        duration: 2000
                    }
                }
            },
            xAxis: {
                categories: this.lables,
                labels: {
                    staggerLines: 2
                }
            },
            series: [
                {
                    showInLegend: false,
                    data: this.pie_data,
                    allowPointSelect: true,
                },
            ],
        };
    };
    ReportComponent.prototype.Onclose_pie = function () {
        this.show_pie_Chart = false;
        this.show_bar_chart = false;
        this.show_bar_chart = false;
        this.show_line_chart = false;
        this.show_column_Chart1 = false;
    };
    ReportComponent.prototype.Onclose_pie_bar = function () {
        this.show_bar_chart = false;
        this.show_pie_Chart = false;
        this.show_bar_chart = false;
        this.show_bar_chart = false;
        this.show_line_chart = false;
    };
    ReportComponent.prototype.Onclose_line = function () {
        this.show_line_chart = false;
        this.show_bar_chart = false;
        this.show_pie_Chart = false;
        this.show_bar_chart = false;
        this.show_bar_chart = false;
        this.show_line_chart = false;
    };
    ReportComponent.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    ReportComponent.prototype.sortBy = function (prop) {
        var _this = this;
        // if the data includes the query, then it shows it
        this.filteredData = this.allData.filter(function (el) {
            return el[prop] && el[prop].toString().includes(_this.query[prop]);
        });
    };
    ReportComponent.prototype.find_in_object = function (my_object, my_criteria) {
        return my_object.filter(function (obj) {
            return Object.keys(my_criteria).every(function (c) {
                return obj[c] == my_criteria[c];
            });
        });
    };
    /* Function for Sorting Starts */
    ReportComponent.prototype.sortResults = function (prop, asc) {
        this.filteredData = this.ResultData_search.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return this.filteredData;
    };
    /* Function for Sorting Ends */
    ReportComponent.prototype.paset_value = function (key) {
        this.search_value = key;
    };
    ReportComponent = __decorate([
        Component({
            selector: 'app-report',
            templateUrl: './report.component.html',
            styleUrls: ['./report.component.css'],
        }),
        __metadata("design:paramtypes", [CookieService,
            Http,
            ApiMessageService,
            ErrorService])
    ], ReportComponent);
    return ReportComponent;
}());
export { ReportComponent };
