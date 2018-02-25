import { AttendenceModel } from './../HR/Attendence/AttendecneModel';
import { ErrorService } from './../../errors/error.service';
import { ApiMessageService } from './../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import { DatePickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-F_Analytics',
  templateUrl: './F_Analytics.component.html',
  styleUrls: ['./F_Analytics.component.css']
})
export class F_AnalyticsComponent implements OnInit {
  isRequesting: boolean;

  invoice = '0'
  Total_Price: any;
  chart_Name: any;
  activeId: number = 1
  intervalu_count: number;
  toDayDate: string;
  PriceMonthWiseData: any;
  PriceDayWiseData: any;
  userFromDate: string;
  userTodate: string;
  isloaded: boolean = false;
  Price: any[];
  x_Axix: any[];
  PriceIntervalData: any;
  Cancelled_Price: any;
  DriverName: string;
  DriverCount: string;
  custerCount: any;
  custerName: any;
  Customer_Data: any[];
  Driver_Data: any[];
  Total_Pricing: any = [];
  url: string = '';
  FromDate;
  todate
  options_line: any;
  Todate_DateRange: DatePickerOptions;
  constructor(private _cookieService: CookieService,
    private http: Http, private _ApiMessageService: ApiMessageService,
    private ErrorService: ErrorService) {
    this.options_line = {
    };
    this.Todate_DateRange = new DatePickerOptions()
    this.Todate_DateRange.initialDate = new Date()
  }
  ngOnInit() {
    var d1 = new Date()
    var mon = d1.getMonth() + 1
    var d23 = d1.getDate() + '/' + mon + '/' + d1.getFullYear()
    this.onsubmi_getAnalytics(d23, d23, 1, '/Find_All_OrderTypes_Collection_Date_Range')
    this.onsubmi_getAnalytics(d23, d23, 2, '/Find_Top_Customer_Driver_Date_Range')
    this.OnDaywise()
    this.toDayDate = d23
  }
  getanlaytics() {
    var dateFrom = this.FromDate.day + '/' + this.FromDate.month + '/' + this.FromDate.year
    var dateTo = this.todate.day + '/' + this.todate.month + '/' + this.todate.year
    this.onsubmi_getAnalytics(dateFrom, dateTo, 1, '/Find_All_OrderTypes_Collection_Date_Range')
    this.onsubmi_getAnalytics(dateFrom, dateTo, 2, '/Find_Top_Customer_Driver_Date_Range')
    var start = new Date(dateFrom);
    var end = new Date(dateTo);

    if (start.toDateString() === end.toDateString()) {
      this.getgraphData(3, null, null, null, dateFrom)
      this.intervalu_count = 0
      this.chart_Name = 'Day-wise analytics'

    } else {

      this.getgraphData(2, dateFrom, dateTo, 1)
      this.intervalu_count = 3
      this.chart_Name = 'Month-wise analytics'

    }


    this.userFromDate = dateFrom
    this.userTodate = dateTo

    this.activeId = -1
  }
  Onweek() {
    var date = new Date()
    date.setDate(date.getDate() - 7)
    var mon = date.getMonth() + 1
    this.FromDate = date.getDate() + '/' + mon + '/' + date.getFullYear()
  }
  onsubmi_getAnalytics(fromdate, todate, type, url) {
    const body1 = new AttendenceModel(null, null, null, fromdate, todate)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + url, body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          if (type == 1) {
            this.Total_Pricing = data.json().extras.Total_Pricing
            this.Total_Price = this.Total_Pricing.COD_Price + this.Total_Pricing.Online_Price + this.Total_Pricing.Premium_Customer_Price
          } else if (type == 2) {
            this.Driver_Data = data.json().extras.DriverData
            this.Customer_Data = data.json().extras.CustomerData
            if (this.Customer_Data[0].OrderCount == 0) {
              this.custerName = ''
              this.custerCount = ''
            } else {
              this.custerName = this.Customer_Data[0].customerName
              this.custerCount = this.Customer_Data[0].OrderCount
            }
            if (this.Driver_Data[0].OrderCount == 0) {
              this.DriverName = ''
              this.DriverCount = ''
            } else {
              this.DriverName = this.Driver_Data[0].DriverName
              this.DriverCount = this.Driver_Data[0].OrderCount
            }
          } else if (type == 3) {
            this.Total_Pricing = data.json().extras.Total_Pricing
            this.Cancelled_Price = this.Total_Pricing.Cancelled_Price
          }
        } else {
          const msgNumber: number = parseInt(data.json().extras.msg);
          let message = this._ApiMessageService.ApiMessages[msgNumber]
          this.ErrorService.handleError(message)
        }
      }
      )
  }
  getgraphData(AnalyticType, from_date?, to_date?, ReturnType?, date?) {
    this.isRequesting = true
    const body1 = new AttendenceModel(null, null, null, from_date, to_date, AnalyticType, ReturnType, date)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/Financial_Price_Analytics', body1, { headers: headers })
      .subscribe(
      data => {
        if (data.json().success) {
          this.isRequesting = false
          if (AnalyticType == 1 || AnalyticType == 3) {
            this.PriceIntervalData = data.json().extras.PriceIntervalData
            this.x_Axix = [];
            this.Price = []
            for (var i = 0; i < this.PriceIntervalData.length; i++) {
              this.Price.push(this.PriceIntervalData[i].Price)
            }
            for (var i = 0; i < this.PriceIntervalData.length; i++) {
              this.x_Axix.push(this.PriceIntervalData[i].interval)
            }
            var intervalu_count = 3
            this.isloaded = true
            this.options_line = {
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
              title: { text: this.chart_Name },
              credits: {
                enabled: false
              }, xAxis: {
                title: {
                  text: 'Time Intervals'
                },
                tickInterval: this.intervalu_count,
                categories: this.x_Axix
              }, series: [
                {
                  showInLegend: false,
                  data: this.Price,
                  allowPointSelect: true,
                  animation: {
                    duration: 2000
                  }
                },

              ]
            }
          }
          /* analtyic type==2*/
          if (AnalyticType == 2) {
            if (ReturnType == 1) {
              this.PriceDayWiseData = data.json().extras.PriceDayWiseData
              this.x_Axix = [];
              this.Price = []
              for (var i = 0; i < this.PriceDayWiseData.length; i++) {
                this.Price.push(this.PriceDayWiseData[i].Price)
              }
              for (var i = 0; i < this.PriceDayWiseData.length; i++) {
                var str: string = this.PriceDayWiseData[i].Date
                this.x_Axix.push(this.PriceDayWiseData[i].Date)
              }
              this.isloaded = true
              this.options_line = {
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
                title: { text: this.chart_Name },
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
                  tickInterval: this.intervalu_count,
                  categories: this.x_Axix
                }, series: [
                  {
                    showInLegend: false,
                    data: this.Price,
                    allowPointSelect: true,
                    animation: {
                      duration: 2000
                    }
                  },
                ]
              }
            }
            /*month wise*/
            if (ReturnType == 2) {
              this.PriceMonthWiseData = data.json().extras.PriceMonthWiseData
              this.x_Axix = [];
              this.Price = []
              for (var i = 0; i < this.PriceMonthWiseData.length; i++) {
                this.Price.push(this.PriceMonthWiseData[i].Price)
              }
              for (var i = 0; i < this.PriceMonthWiseData.length; i++) {
                this.x_Axix.push(this.PriceMonthWiseData[i].From_Date + ' To ' + this.PriceMonthWiseData[i].To_Date)
              }
              var intervalu_count = 3
              this.isloaded = true
              this.options_line = {
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
                  tickInterval: this.intervalu_count,
                  categories: this.x_Axix
                }, series: [
                  {
                    showInLegend: false,
                    data: this.Price,
                    allowPointSelect: true,
                    animation: {
                      duration: 2000
                    }
                  },
                ]
              }
            }
          }
        }
      }
      )
  }
  OnDaywise() {
    this.getgraphData(1)
    this.intervalu_count = 0
    this.activeId = 1
    this.chart_Name = ' Day-wise analytics'
  }
  OnMonthwise() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0];
    var Before30TH = dateString.split('-')
    var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0]
    this.getgraphData(2, Before, this.toDayDate, 1)
    this.intervalu_count = 5
    this.chart_Name = ' 1 Month analytics'
    this.activeId = 2
  }
  On3Monthwise() {
    var date = new Date();
    date.setDate(date.getDate() - 90);
    var dateString = date.toISOString().split('T')[0];
    var Before30TH = dateString.split('-')
    var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0]
    this.getgraphData(2, Before, this.toDayDate, 2)
    this.intervalu_count = 2
    this.activeId = 3
    this.chart_Name = ' 3 Months analytics'
  }
  On6Monthwise() {
    var date = new Date();
    date.setDate(date.getDate() - 180);
    var dateString = date.toISOString().split('T')[0];
    var Before30TH = dateString.split('-')
    var Before = Before30TH[2] + '/' + Before30TH[1] + '/' + Before30TH[0]
    this.getgraphData(2, Before, this.toDayDate, 2)
    this.intervalu_count = 2
    this.activeId = 4
    this.chart_Name = ' 6 Months analytics'
  }


}
