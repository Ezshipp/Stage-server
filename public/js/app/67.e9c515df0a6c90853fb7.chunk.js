webpackJsonp([67],{743:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=t(7),n=t(938),d=t(383),l=t(382),u=t(47),c=t(55);o.AllOrdersModuleNgFactory=r.ɵcmf(n.AllOrdersModule,[],function(e){return r.ɵmod([r.ɵmpd(512,r.ComponentFactoryResolver,r.ɵCodegenComponentFactoryResolver,[[8,[]],[3,r.ComponentFactoryResolver],r.NgModuleRef]),r.ɵmpd(4608,d.ɵi,d.ɵi,[]),r.ɵmpd(4608,l.BrowserXhr,l.BrowserXhr,[]),r.ɵmpd(4608,l.ResponseOptions,l.BaseResponseOptions,[]),r.ɵmpd(5120,l.XSRFStrategy,l.ɵb,[]),r.ɵmpd(4608,l.XHRBackend,l.XHRBackend,[l.BrowserXhr,l.ResponseOptions,l.XSRFStrategy]),r.ɵmpd(4608,l.RequestOptions,l.BaseRequestOptions,[]),r.ɵmpd(5120,l.Http,l.ɵc,[l.XHRBackend,l.RequestOptions]),r.ɵmpd(4608,u.NgLocalization,u.NgLocaleLocalization,[r.LOCALE_ID]),r.ɵmpd(512,d.ɵba,d.ɵba,[]),r.ɵmpd(512,d.FormsModule,d.FormsModule,[]),r.ɵmpd(512,l.HttpModule,l.HttpModule,[]),r.ɵmpd(512,u.CommonModule,u.CommonModule,[]),r.ɵmpd(512,c.RouterModule,c.RouterModule,[[2,c.ɵa],[2,c.Router]]),r.ɵmpd(512,n.AllOrdersModule,n.AllOrdersModule,[]),r.ɵmpd(1024,c.ROUTES,function(){return[[{path:"",redirectTo:"allorder",pathMatch:"full"},{path:"allorder",loadChildren:function(){return new Promise(function(e){t.e(13).then(function(o){e(t(741).AllOrderModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"pendingorders",loadChildren:function(){return new Promise(function(e){t.e(15).then(function(o){e(t(744).PendingOrdersModuleNgFactory)}.bind(null,t)).catch(t.oe)})}}]]},[])])})},932:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=t(55),n=[{path:"",redirectTo:"allorder",pathMatch:"full"},{path:"allorder",loadChildren:function(){return new Promise(function(e){t.e(13).then(function(o){e(t(741).AllOrderModuleNgFactory)}.bind(null,t)).catch(t.oe)})}},{path:"pendingorders",loadChildren:function(){return new Promise(function(e){t.e(15).then(function(o){e(t(744).PendingOrdersModuleNgFactory)}.bind(null,t)).catch(t.oe)})}}];o.AllOrdersroutesRouting=r.RouterModule.forChild(n)},938:function(e,o,t){"use strict";var r=this&&this.__decorate||function(e,o,t,r){var n,d=arguments.length,l=d<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,o,t,r);else for(var u=e.length-1;u>=0;u--)(n=e[u])&&(l=(d<3?n(l):d>3?n(o,t,l):n(o,t))||l);return d>3&&l&&Object.defineProperty(o,t,l),l};Object.defineProperty(o,"__esModule",{value:!0});var n=t(932),d=t(383),l=t(382),u=t(47),c=t(7),i=function(){function e(){}return e=r([c.NgModule({declarations:[],imports:[d.FormsModule,l.HttpModule,u.CommonModule,n.AllOrdersroutesRouting]})],e)}();o.AllOrdersModule=i}});