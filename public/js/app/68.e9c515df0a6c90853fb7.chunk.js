webpackJsonp([68],{719:function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=n(7),r=n(845),i=n(383),c=n(47),u=n(382),d=n(385),l=n(411),a=n(387),s=n(55);o.DriversModuleNgFactory=t.ɵcmf(r.DriversModule,[],function(e){return t.ɵmod([t.ɵmpd(512,t.ComponentFactoryResolver,t.ɵCodegenComponentFactoryResolver,[[8,[]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t.ɵmpd(4608,i.ɵi,i.ɵi,[]),t.ɵmpd(4608,c.NgLocalization,c.NgLocaleLocalization,[t.LOCALE_ID]),t.ɵmpd(4608,u.BrowserXhr,u.BrowserXhr,[]),t.ɵmpd(4608,u.ResponseOptions,u.BaseResponseOptions,[]),t.ɵmpd(5120,u.XSRFStrategy,u.ɵb,[]),t.ɵmpd(4608,u.XHRBackend,u.XHRBackend,[u.BrowserXhr,u.ResponseOptions,u.XSRFStrategy]),t.ɵmpd(4608,u.RequestOptions,u.BaseRequestOptions,[]),t.ɵmpd(5120,u.Http,u.ɵc,[u.XHRBackend,u.RequestOptions]),t.ɵmpd(4608,d.PaginationService,d.PaginationService,[]),t.ɵmpd(512,i.ɵba,i.ɵba,[]),t.ɵmpd(512,i.FormsModule,i.FormsModule,[]),t.ɵmpd(512,c.CommonModule,c.CommonModule,[]),t.ɵmpd(512,l.ImageCropperModule,l.ImageCropperModule,[]),t.ɵmpd(512,u.HttpModule,u.HttpModule,[]),t.ɵmpd(512,d.NgxPaginationModule,d.NgxPaginationModule,[]),t.ɵmpd(512,a.SharedModule,a.SharedModule,[]),t.ɵmpd(512,s.RouterModule,s.RouterModule,[[2,s.ɵa],[2,s.Router]]),t.ɵmpd(512,r.DriversModule,r.DriversModule,[]),t.ɵmpd(1024,s.ROUTES,function(){return[[{path:"",redirectTo:"active_Drivers",pathMatch:"full"},{path:"active_Drivers",loadChildren:function(){return new Promise(function(e){n.e(5).then(function(o){e(n(717).ActiveDrviersModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"inActive_Drivers",loadChildren:function(){return new Promise(function(e){n.e(49).then(function(o){e(n(720).InActiveDriversModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"new_bikers",loadChildren:function(){return new Promise(function(e){n.e(6).then(function(o){e(n(721).NewBikersModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"cancel_R",loadChildren:function(){return new Promise(function(e){n.e(58).then(function(o){e(n(718).CancelReasonsModuleNgFactory)}.bind(null,n)).catch(n.oe)})}}]]},[])])})},845:function(e,o,n){"use strict";var t=this&&this.__decorate||function(e,o,n,t){var r,i=arguments.length,c=i<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,n):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,n,t);else for(var u=e.length-1;u>=0;u--)(r=e[u])&&(c=(i<3?r(c):i>3?r(o,n,c):r(o,n))||c);return i>3&&c&&Object.defineProperty(o,n,c),c};Object.defineProperty(o,"__esModule",{value:!0});var r=n(846),i=n(387),c=n(383),u=n(382),d=n(47),l=n(7),a=function(){function e(){}return e=t([l.NgModule({declarations:[],imports:[c.FormsModule,i.SharedModule,u.HttpModule,d.CommonModule,r.DriversRouting]})],e)}();o.DriversModule=a},846:function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=n(55),r=[{path:"",redirectTo:"active_Drivers",pathMatch:"full"},{path:"active_Drivers",loadChildren:function(){return new Promise(function(e){n.e(5).then(function(o){e(n(717).ActiveDrviersModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"inActive_Drivers",loadChildren:function(){return new Promise(function(e){n.e(49).then(function(o){e(n(720).InActiveDriversModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"new_bikers",loadChildren:function(){return new Promise(function(e){n.e(6).then(function(o){e(n(721).NewBikersModuleNgFactory)}.bind(null,n)).catch(n.oe)})}},{path:"cancel_R",loadChildren:function(){return new Promise(function(e){n.e(58).then(function(o){e(n(718).CancelReasonsModuleNgFactory)}.bind(null,n)).catch(n.oe)})}}];o.DriversRouting=t.RouterModule.forChild(r)}});