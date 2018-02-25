import { ExpiredJobsModel } from '../../front_end_models/expiredModel';
import { ErrorService } from '../../errors/error.service';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from '../../authentication/apimessages.service';
import { Http, Headers } from '@angular/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promoto',
    templateUrl: './PromotationContacts.component.html',
    styleUrls: ['./PromotationContacts.component.css']
})
export class PromotionalContactsComponent implements OnInit {
    export_Loadin='Export Data'
    excellData=[]
    mymodel: string;
    IsAsc: boolean;
    valu: string;
    views: number;
    isSearch: boolean;
    Total_Count: any;
    PromotionalContactsData: any = [];
    p: number;
    isRequesting: boolean;
    sortOptions: any={
        "Name":1

    };
    limit: number=10;
    skip: number=0;
    url: string = '';
    activeId:number
    constructor(private http: Http,
        private _ApiMessageService: ApiMessageService,
        private _cookieService: CookieService,
        private ErrorService: ErrorService,
        private cdref: ChangeDetectorRef) { }

    ngOnInit() {
        this.getPromotionalContacts(1, '/Find_All_Contacts_Promotional')
    }
    getPromotionalContacts(type: number, url: string, searchValue?) {
        this.isRequesting=true
        const body = new ExpiredJobsModel(null, this.skip, this.limit, searchValue, this.sortOptions)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return this.http.post(this.url + url, body, { headers: headers })
            .subscribe(
            data => {
                if (data.json().success) {
                    this.isRequesting=false
                    this.isRequesting = false
                    if (type == 1) {
                        this.p = 1
                        this.isSearch = false
                        this.PromotionalContactsData = data.json().extras.ContactData

                        this.Total_Count = data.json().extras.Count

                    } else if (type == 2) {
                        this.PromotionalContactsData = data.json().extras.ContactData

                    } else if (type == 3) {
                        setTimeout(() => {
                            this.PromotionalContactsData = data.json().extras.ContactData
                            if (this.PromotionalContactsData.length == 0) {
                                this.isSearch = false
                            }
                        }, 2000)
                    }
                 

                }
                else {
                    this.isRequesting=false
                    const msgNumber: number = parseInt(data.json().extras.msg);
                    this.isRequesting = false
                    if (msgNumber == 21) {
                        this._cookieService.remove('ez_cusID')

                    }
                    let message = this._ApiMessageService.ApiMessages[msgNumber]
                    this.ErrorService.handleError(message)
                }
            }
            )
    }
    pageChanged(event: number) {
        this.p = event
        var p = this.p - 1
        this.isRequesting = true
        let skip_value = p * this.limit
        this.skip = skip_value
        this.isRequesting = true
        this.getPromotionalContacts(2, '/Find_All_Contacts_Promotional')
    }
    edit(item, i: number) {
        this.views = i
    }
    close() {
        this.views = -1
    }
    valuechange(value: string) {
        this.mymodel = value;
        let length = value.length
       setTimeout(()=>{

        if (length >= 3) {
            this.isSearch=true
            this.activeId=null
            this.PromotionalContactsData = []
            this.isRequesting = true

            this.getPromotionalContacts(3, '/Find_All_Contacts_Promotional',this.mymodel)
        }
        else{
            this.activeId=null
            this.skip=0
            this.ngOnInit()
        }
       },2000)

    }
    OnClumnSort(key:string,ev){
        this.activeId=ev.target.id
      
        if (this.valu != key) {
            this.valu = key
            this.IsAsc = true
           
        } else {
          
            this.IsAsc = !this.IsAsc
        }

        if (this.IsAsc == true) {
            var sort = 1
        } else if (this.IsAsc == false) {
            sort = -1
        }
        this.sortOptions = {}
        this.sortOptions[key] = sort

            this.ngOnInit()


        this.p = 1
    }
    OnselectCount(event) {
        this.limit = event.target.value

        this.skip = 0
        this.ngOnInit()
        this.p = 1
    }
    OnExcel_Download() {
        this.export_Loadin='Downlaoding ...'
          this.getPromotional_Excel(0)
   
      }
      getPromotional_Excel(skip){
          var sortoptions={}
         
          const body = new ExpiredJobsModel(null, skip, 50, null, sortoptions)
          const headers = new Headers({ 'Content-Type': 'application/json' })
          return this.http.post(this.url +'/Find_All_Contacts_Promotional', body, { headers: headers })
              .subscribe(
              data => {
                  if (data.json().success) {
                      let resultdata: any = []
                      resultdata = data.json().extras.ContactData
                      if (resultdata.length == 0) {
                         
                          this.export_Loadin='Export Data'
                          var csvData = this.ErrorService.ConvertToCSV(this.excellData)
                          var a = document.createElement("a");
                          a.setAttribute('style', 'display:none;');
                          document.body.appendChild(a);
                          var blob = new Blob([csvData], { type: 'text/csv' });
                          var url = window.URL.createObjectURL(blob);
                          a.href = url;
                          a.download = 'PromotionalContacts.csv';
                          a.click();
   
                          return 'success';
                      }
                      else {
                          skip = skip + resultdata.length
                          Array.prototype.push.apply(this.excellData, resultdata);
                          this.getPromotional_Excel(skip)
   
                      }
                  }
                  else {
                      this.isRequesting = false
                      const msgNumber: number = parseInt(data.json().extras.msg);
                   
                      if (msgNumber == 21) {
                          this._cookieService.remove('ez_cusID')
   
                      }
                      let message = this._ApiMessageService.ApiMessages[msgNumber]
                      this.ErrorService.handleError(message)
                  }
              }
              )
      }
   

}