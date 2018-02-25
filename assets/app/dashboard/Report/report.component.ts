import { reverse } from 'dns';
import { ReportModal } from './../../front_end_models/reportModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  show_column_Chart1: boolean;
  show_column_Chart: boolean;
  marginLeft: number=225;
  isAsc: boolean;
  pie_data: any = [];
  searchValue: string
  report_collection = [
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
  ]
  dum = [];
  allData: any[];
  filteredData = null
  headers = null
  query = { // This is an object that handles every query you make with the inputs
  };
  filterdat: any[];
  demoChk: any = [];
  valu: any;
  lat1 = [];
  show_bar_chart: boolean;
  show_line_chart: boolean;
  show_column_chart: boolean;
  chart: Object;
  show_pie_Chart: boolean;
  values_pie: any[];
  lables: any[];
  chart_pie: Object;
  options_pie: Object;
  obj: any = {
  };
  pieChart = [];
  index_dropDown: any;
  isdropdwon: boolean;
  ResultData1 = [];
  output: any = [];
  userFilter: any = "";
  filter: boolean;
  is_dropdown: boolean;
  filter_condition_all: boolean;
  click_dropdown_all: boolean;
  text: any;
  keys: string[] = [];
  values: any[];
  arrayOfKeys: string[];
  index: any;
  pick: string;
  drop: string;
  lats_c = 35.8617;
  lngs_c = 104.1954;
  sample: boolean = false
  dropAddress: boolean;
  picAddress: boolean;
  collection_array: any = [];
  ResultData_search: any[] = [];
  isActive: boolean = true
 
  imagemap5 = "./images/Slice 5.png";
  imagemap6 = "./images/Slice 6.png";
  imagemap7 = "./images/Slice 7.png";
  imagemap8 = "./images/Slice 8.png";
  imagemap9 = "./images/Slice 9.png";

  imagemap13 = "./images/Slice 13.png";
  imagemap14 = "./images/Slice 14.png";
  imagemap15 = "./images/Slice 15.png";
 
  lats = 20.5937;
  lngs = 78.9629;
  showmap: boolean = false;
  lat_lng_array: any = []; lat_array: any = []; lng_array: any = [];
  issucess: boolean = false;
  table_view: boolean = false;
  ResultData: any = [];
  search: string;
  report_list: any;
  url: string = '';
  search_value: string;
  modalName: any;
  collectionName: any;
  collection = []
  search_terms: boolean = false;
  zoom = 11;
  constructor(private _cookieService: CookieService,
    private http: Http,
    private _ApiMessageService: ApiMessageService,
    private _errorService: ErrorService) {
  }
  ngOnInit() {
    
    this.search_terms = true;

  }

  Report_value() {
    this.issucess = true;
    let uid = this._cookieService.get('ez_cusID')
    const body = new ReportModal(null, null, null, this.search, this._cookieService.get('ez_admin_cusID'))
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Report_Generation_From_Query', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
         
          if (data.json().extras.ResultData.length == 0) {
            alert("no records found")
          }
          this.ResultData = data.json().extras.ResultData

          for (var i = 0; i < this.ResultData.length; i++) {
            var str: string = ''
            var pick: string = this.ResultData[i].pickAddress
            this.ResultData[i].pickAddress = pick.replace('Telangana', '')
            this.ResultData[i].pickAddress = this.ResultData[i].pickAddress.replace(', India', '')
          }
          for (var i = 0; i < this.ResultData.length; i++) {
            var str: string = ''
            var pick: string = this.ResultData[i].dropAddress
            this.ResultData[i].dropAddress = pick.replace('Telangana', '')
            this.ResultData[i].dropAddress = this.ResultData[i].dropAddress.replace(', India', '')
          }
          let length = this.ResultData.length;
          if (this.ResultData.length) {
            this.issucess = false;
            this.collection_array.push(this.search)
            this.search_terms = true;
          } else {
            this.issucess = false;
            this.search_terms = true;
          }

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this._errorService.handleError(message)
        }
      }
      )
  }

  table_data_all_vies(index) {
    this.index = index
    this.isActive = false
    this.ResultData1 = []
    this.demoChk = []
    var value = this.collection_array[index]
    this.filteredData = []
    this.headers = []
    this.Report_value_1(value)

  }
  Report_value_1(search) {
    this.issucess = true;
    let uid = this._cookieService.get('ez_cusID')
    const body = new ReportModal(null, null, null, search, this._cookieService.get('ez_admin_cusID'))
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/Report_Generation_From_Query', body, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
      
          this.search_terms = false
          this.table_view = true
          this.ResultData_search = data.json().extras.ResultData

          this.ResultData = data.json().extras.ResultData
          for (var i = 0; i < this.ResultData.length; i++) {
            var str: string = ''
            var pick: string = this.ResultData[i].pickAddress
            this.ResultData[i].pickAddress = pick.replace('Telangana', '')
            this.ResultData[i].pickAddress = this.ResultData[i].pickAddress.replace(', India', '')
          }
          for (var i = 0; i < this.ResultData.length; i++) {
            var str: string = ''
            var pick: string = this.ResultData[i].dropAddress
            this.ResultData[i].dropAddress = pick.replace('Telangana', '')
            this.ResultData[i].dropAddress = this.ResultData[i].dropAddress.replace(', India', '')
          }

          setTimeout(() => { // simulates an HTTP call
            this.allData = this.ResultData_search; // store all your data
            this.filteredData = this.allData; // At first the user doesn't filter, so display everything
            this.headers = []; // Create an empty array to use headers.push()
            for (let prop in this.allData[0]) { // let xx in xxx read the keys (here it's name, extn and position)
              this.headers.push(prop); // push the property in the header
            }
          }, 1000);
          this.issucess = false

        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this._errorService.handleError(message)
        }
      }
      )
  }

  dummy(modalName) {
    this.search_value = '(' + this.collectionName + ')' + " from " + '-' + modalName + '-'
  }
  search_terms_view() {
    this.search_terms = true;
    this.table_view = false;
    this.isActive = true
    this.index = -1
  }
  onSubmit_Report(form: NgForm) {
    this.search = form.value.search_value;
    this.Report_value();
  }
  show_map() {
    this.showmap = true;
    var light = []
    this.dum = []
    light = this.demoChk.reverse()

    for (var i = 0; i < this.ResultData_search.length; i++) {
      this.dum.push({ lat: this.filteredData[i][light[1]], lng: this.filteredData[i][light[0]] })
    }
  }
  onErrorHandled() {
    this.showmap = false;
  }
  open_filter() {
    this.filter = !this.filter;
    this.is_dropdown = true;
  }
  filter_condition() {
    this.filter_condition_all = true;

  }
  check_box(value, event) {
    if (event.target.checked) {
      this.demoChk.push(value);
    }
    else if (!event.target.checked) {
      let indexx = this.demoChk.indexOf(value);
      this.demoChk.splice(indexx, 1);
    }
  }
  /*  function for to get array by passing key to json*/
  // filter_id(key){
  // this.ResultData1=[]
  // for(var i=0;i<this.ResultData.length;i++){
  //           this.ResultData1.push(this.ResultData[i][key])
  //                                      }
  // }
  sort(key) {
    this.isAsc = !this.isAsc
    this.valu = key
    this.sortResults(key, this.isAsc);
  }
  reverse_array(key) {
    this.valu = key
    this.sortResults(key, false);
  }
  resetAll() {
    this.ResultData_search.forEach((item) => {
      item.checked = true;
    })
  }
  resetAll_clear() {
    this.ResultData_search.forEach((item) => {
      item.checked = false;
    })
  }
  click_dropdown() {
    this.click_dropdown_all = true;
  }
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
  show_bar() {
    this.show_pie('bar')
  }
  show_column() {
    this.show_pie('column')
  }
  show_line() {
    this.show_pie('line')
  }
  show_Pie1() {
    this.show_pie('pie')
  }
  show_pie(value) {
    this.pie_data = []
    this.ResultData1 = []
    var count: any = {}
    for (var letter of this.demoChk) {
      for (var i = 0; i < this.filteredData.length; i++) {
        this.ResultData1.push(this.filteredData[i][letter])
      }
    }
    this.ResultData1.forEach((el) => {
      count[el] = count[el] + 1 || 1
    })
    this.lables = [],
      this.values_pie = [];
    for (var property in count) {
      if (!count.hasOwnProperty(property)) {
        continue;
      }
      this.lables.push(property)
      this.values_pie.push(count[property])


    }
    for (var i = 0; i < this.lables.length; i++) {
      this.pie_data.push({
        name: this.lables[i],
        y: this.values_pie[i]
      });
    }

    if (value == 'line') {
      this.show_bar_chart = false
      this.show_line_chart = true
      this.show_pie_Chart = false
      this.showmap = false;
      this.show_column_Chart1 = false
    }
    else if (value == 'pie') {
      this.show_bar_chart = false
      this.show_line_chart = false
      this.show_pie_Chart = true
      this.showmap = false;
      this.show_column_Chart1 = false
    }
    else if (value == 'bar') {
      this.show_bar_chart = true
      this.show_line_chart = false
      this.show_pie_Chart = false
      this.showmap = false;
      this.show_column_Chart1 = false
    }else if (value == 'column') {
      this.show_bar_chart = false
      this.show_line_chart = false
      this.show_pie_Chart = false
      this.showmap = false;
      this.show_column_Chart1 = true
    }
    this.pieChart.push({
      name: this.lables,
      y: this.values_pie,
  
    });

    this.showmap = false
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
  }

  Onclose_pie() {
    this.show_pie_Chart = false
    this.show_bar_chart = false
    this.show_bar_chart = false
    this.show_line_chart = false
    this.show_column_Chart1=false
  }
  Onclose_pie_bar() {
    this.show_bar_chart = false
    this.show_pie_Chart = false
    this.show_bar_chart = false
    this.show_bar_chart = false
    this.show_line_chart = false
  }
  Onclose_line() {
    this.show_line_chart = false
    this.show_bar_chart = false
    this.show_pie_Chart = false
    this.show_bar_chart = false
    this.show_bar_chart = false
    this.show_line_chart = false
  }
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }
  sortBy(prop: string): void {
    // if the data includes the query, then it shows it
    this.filteredData = this.allData.filter(el =>
      el[prop] && el[prop].toString().includes(this.query[prop]))
  }
  find_in_object(my_object, my_criteria) {
    return my_object.filter(function (obj) {
      return Object.keys(my_criteria).every(function (c) {
        return obj[c] == my_criteria[c];
      });
    });
  }
  /* Function for Sorting Starts */
  sortResults(prop, asc) {
    this.filteredData = this.ResultData_search.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
    return this.filteredData
  }
  /* Function for Sorting Ends */
  paset_value(key) {
    this.search_value = key
  }
}


