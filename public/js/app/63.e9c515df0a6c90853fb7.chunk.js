webpackJsonp([63],{1137:function(n,e){n.exports='<div class="container-fluid containers">\r\n    <ul class="nav nav-tabs nav_tab_background" style="display: block;">\r\n        <li routerLinkActive="active"><a [routerLink]="[\'Expenses_D\']">Expenses</a></li>\r\n        <li routerLinkActive="active" *ngIf="isSalaryPermistion"><a [routerLink]="[\'Salary_D\']" >Salary &amp; Pay Slips</a></li>\r\n    </ul>\r\n    <hr>\r\n    <router-outlet></router-outlet>\r\n </div>\r\n\r\n\r\n\r\n'},1219:function(n,e){n.exports=".nav-tabs>li.active>a,\r\n.nav-tabs>li.active>a:focus,\r\n.nav-tabs>li.active>a:hover {\r\n color: #12A6F1!important;\r\n cursor: default;\r\n border-bottom: 1px solid #12A6F1!important;\r\n /* border-bottom: none; */\r\n background-color: transparent;\r\n}\r\n\r\n.nav-tabs>li>a {\r\n color: #12A6F1!important;\r\n}\r\n\r\n.zone-heading {\r\n text-align: center;\r\n font-size: 23px;\r\n font-family: Proxima-Nova-Regular;\r\n}\r\n\r\n.nav_tab_background {\r\n padding-top: 10px;\r\n border-bottom: none;\r\n background-color: transparent;\r\n}"},623:function(n,e,t){"use strict";var o=this&&this.__decorate||function(n,e,t,o){var l,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,e,t,o);else for(var u=n.length-1;u>=0;u--)(l=n[u])&&(a=(r<3?l(a):r>3?l(e,t,a):l(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a},l=this&&this.__metadata||function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=t(103),a=t(7),u=function(){function n(n){this._cookieService=n}return n.prototype.ngOnInit=function(){var n=this._cookieService.get("HR_SALARY_PERMISSIONS");this.isSalaryPermistion="true"==n},n=o([a.Component({selector:"app-Salary",template:t(1137),styles:[t(1219)]}),l("design:paramtypes",[r.CookieService])],n)}();e.SalaryComponent=u},727:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(7),l=t(877),r=t(882),a=t(383),u=t(47),i=t(382),c=t(385),d=t(411),s=t(387),p=t(55),f=t(623);e.HRModuleNgFactory=o.ɵcmf(l.HRModule,[],function(n){return o.ɵmod([o.ɵmpd(512,o.ComponentFactoryResolver,o.ɵCodegenComponentFactoryResolver,[[8,[r.SalaryComponentNgFactory]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o.ɵmpd(4608,a.ɵi,a.ɵi,[]),o.ɵmpd(4608,u.NgLocalization,u.NgLocaleLocalization,[o.LOCALE_ID]),o.ɵmpd(4608,i.BrowserXhr,i.BrowserXhr,[]),o.ɵmpd(4608,i.ResponseOptions,i.BaseResponseOptions,[]),o.ɵmpd(5120,i.XSRFStrategy,i.ɵb,[]),o.ɵmpd(4608,i.XHRBackend,i.XHRBackend,[i.BrowserXhr,i.ResponseOptions,i.XSRFStrategy]),o.ɵmpd(4608,i.RequestOptions,i.BaseRequestOptions,[]),o.ɵmpd(5120,i.Http,i.ɵc,[i.XHRBackend,i.RequestOptions]),o.ɵmpd(4608,c.PaginationService,c.PaginationService,[]),o.ɵmpd(4608,a.FormBuilder,a.FormBuilder,[]),o.ɵmpd(512,a.ɵba,a.ɵba,[]),o.ɵmpd(512,a.FormsModule,a.FormsModule,[]),o.ɵmpd(512,u.CommonModule,u.CommonModule,[]),o.ɵmpd(512,d.ImageCropperModule,d.ImageCropperModule,[]),o.ɵmpd(512,i.HttpModule,i.HttpModule,[]),o.ɵmpd(512,c.NgxPaginationModule,c.NgxPaginationModule,[]),o.ɵmpd(512,s.SharedModule,s.SharedModule,[]),o.ɵmpd(512,a.ReactiveFormsModule,a.ReactiveFormsModule,[]),o.ɵmpd(512,p.RouterModule,p.RouterModule,[[2,p.ɵa],[2,p.Router]]),o.ɵmpd(512,l.HRModule,l.HRModule,[]),o.ɵmpd(1024,p.ROUTES,function(){return[[{path:"",redirectTo:"employee",pathMatch:"full"},{path:"employee",loadChildren:function(){return new Promise(function(n){t.e(29).then(function(e){n(t(726).EmployeeModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"salary",component:f.SalaryComponent,loadChildren:function(){return new Promise(function(n){t.e(25).then(function(e){n(t(729).SalaryModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"Attendence",loadChildren:function(){return new Promise(function(n){t.e(3).then(function(e){n(t(725).AttendenceModuleNgFactory)}.bind(null,t)).catch(t.oe)})}}]]},[])])})},877:function(n,e,t){"use strict";var o=this&&this.__decorate||function(n,e,t,o){var l,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,e,t,o);else for(var u=n.length-1;u>=0;u--)(l=n[u])&&(a=(r<3?l(a):r>3?l(e,t,a):l(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a};Object.defineProperty(e,"__esModule",{value:!0});var l=t(623),r=t(878),a=t(387),u=t(383),i=t(382),c=t(47),d=t(7),s=function(){function n(){}return n=o([d.NgModule({declarations:[l.SalaryComponent],imports:[u.FormsModule,a.SharedModule,i.HttpModule,u.ReactiveFormsModule,c.CommonModule,r.HRRouting]})],n)}();e.HRModule=s},878:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(623),l=t(55),r=[{path:"",redirectTo:"employee",pathMatch:"full"},{path:"employee",loadChildren:function(){return new Promise(function(n){t.e(29).then(function(e){n(t(726).EmployeeModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"salary",component:o.SalaryComponent,loadChildren:function(){return new Promise(function(n){t.e(25).then(function(e){n(t(729).SalaryModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"Attendence",loadChildren:function(){return new Promise(function(n){t.e(3).then(function(e){n(t(725).AttendenceModuleNgFactory)}.bind(null,t)).catch(t.oe)})}}];e.HRRouting=l.RouterModule.forChild(r)},881:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.styles=[".nav-tabs[_ngcontent-%COMP%] > li.active[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], .nav-tabs[_ngcontent-%COMP%] > li.active[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:focus, .nav-tabs[_ngcontent-%COMP%] > li.active[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover {\r\n color: #12A6F1!important;\r\n cursor: default;\r\n border-bottom: 1px solid #12A6F1!important;\r\n \r\n background-color: transparent;\r\n}\r\n\r\n.nav-tabs[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%] {\r\n color: #12A6F1!important;\r\n}\r\n\r\n.zone-heading[_ngcontent-%COMP%] {\r\n text-align: center;\r\n font-size: 23px;\r\n font-family: Proxima-Nova-Regular;\r\n}\r\n\r\n.nav_tab_background[_ngcontent-%COMP%] {\r\n padding-top: 10px;\r\n border-bottom: none;\r\n background-color: transparent;\r\n}"]},882:function(n,e,t){"use strict";function o(n){return u.ɵvid(0,[(n()(),u.ɵeld(0,0,null,null,7,"li",[["routerLinkActive","active"]],null,null,null,null,null)),u.ɵdid(1,1720320,null,2,i.RouterLinkActive,[i.Router,u.ElementRef,u.Renderer2,u.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),u.ɵqud(603979776,3,{links:1}),u.ɵqud(603979776,4,{linksWithHrefs:1}),(n()(),u.ɵeld(4,0,null,null,3,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,e,t){var o=!0;if("click"===e){o=!1!==u.ɵnov(n,5).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&o}return o},null,null)),u.ɵdid(5,671744,[[4,4]],0,i.RouterLinkWithHref,[i.Router,i.ActivatedRoute,c.LocationStrategy],{routerLink:[0,"routerLink"]},null),u.ɵpad(6,1),(n()(),u.ɵted(-1,null,["Salary & Pay Slips"]))],function(n,e){n(e,1,0,"active"),n(e,5,0,n(e,6,0,"Salary_D"))},function(n,e){n(e,4,0,u.ɵnov(e,5).target,u.ɵnov(e,5).href)})}function l(n){return u.ɵvid(0,[(n()(),u.ɵeld(0,0,null,null,21,"div",[["class","container-fluid containers"]],null,null,null,null,null)),(n()(),u.ɵted(-1,null,["\n    "])),(n()(),u.ɵeld(2,0,null,null,13,"ul",[["class","nav nav-tabs nav_tab_background"],["style","display: block;"]],null,null,null,null,null)),(n()(),u.ɵted(-1,null,["\n        "])),(n()(),u.ɵeld(4,0,null,null,7,"li",[["routerLinkActive","active"]],null,null,null,null,null)),u.ɵdid(5,1720320,null,2,i.RouterLinkActive,[i.Router,u.ElementRef,u.Renderer2,u.ChangeDetectorRef],{routerLinkActive:[0,"routerLinkActive"]},null),u.ɵqud(603979776,1,{links:1}),u.ɵqud(603979776,2,{linksWithHrefs:1}),(n()(),u.ɵeld(8,0,null,null,3,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,e,t){var o=!0;if("click"===e){o=!1!==u.ɵnov(n,9).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&o}return o},null,null)),u.ɵdid(9,671744,[[2,4]],0,i.RouterLinkWithHref,[i.Router,i.ActivatedRoute,c.LocationStrategy],{routerLink:[0,"routerLink"]},null),u.ɵpad(10,1),(n()(),u.ɵted(-1,null,["Expenses"])),(n()(),u.ɵted(-1,null,["\n        "])),(n()(),u.ɵand(16777216,null,null,1,null,o)),u.ɵdid(14,16384,null,0,c.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u.ɵted(-1,null,["\n    "])),(n()(),u.ɵted(-1,null,["\n    "])),(n()(),u.ɵeld(17,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),u.ɵted(-1,null,["\n    "])),(n()(),u.ɵeld(19,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),u.ɵdid(20,212992,null,0,i.RouterOutlet,[i.ChildrenOutletContexts,u.ViewContainerRef,u.ComponentFactoryResolver,[8,null],u.ChangeDetectorRef],null,null),(n()(),u.ɵted(-1,null,["\n "])),(n()(),u.ɵted(-1,null,["\n\n\n\n"]))],function(n,e){var t=e.component;n(e,5,0,"active"),n(e,9,0,n(e,10,0,"Expenses_D")),n(e,14,0,t.isSalaryPermistion),n(e,20,0)},function(n,e){n(e,8,0,u.ɵnov(e,9).target,u.ɵnov(e,9).href)})}function r(n){return u.ɵvid(0,[(n()(),u.ɵeld(0,0,null,null,1,"app-Salary",[],null,null,null,l,e.RenderType_SalaryComponent)),u.ɵdid(1,114688,null,0,d.SalaryComponent,[s.CookieService],null,null)],function(n,e){n(e,1,0)},null)}Object.defineProperty(e,"__esModule",{value:!0});var a=t(881),u=t(7),i=t(55),c=t(47),d=t(623),s=t(102),p=[a.styles];e.RenderType_SalaryComponent=u.ɵcrt({encapsulation:0,styles:p,data:{}}),e.View_SalaryComponent_0=l,e.View_SalaryComponent_Host_0=r,e.SalaryComponentNgFactory=u.ɵccf("app-Salary",d.SalaryComponent,r,{},{},[])}});