/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from '@angular/core';
import * as i1 from './app_setting.module';
import * as i2 from '../../../../node_modules/angular2-busy/build/busy.component.ngfactory';
import * as i3 from '../../../../node_modules/angular2-busy/build/busy-backdrop.component.ngfactory';
import * as i4 from './Delivery/delivery.component.ngfactory';
import * as i5 from '@angular/forms';
import * as i6 from '@angular/common';
import * as i7 from '@angular/http';
import * as i8 from 'ngx-pagination';
import * as i9 from 'angular2-busy/build/busy.service';
import * as i10 from 'angular2-busy/build/busy-config';
import * as i11 from 'angular2-busy/build/busy.module';
import * as i12 from 'ng2-img-cropper/src/imageCropperModule';
import * as i13 from '../../shared/shared.module';
import * as i14 from '@angular/router';
import * as i15 from './Delivery/Delivery.module';
import * as i16 from './Delivery/delivery.component';
export var APP_SettingModuleNgFactory = i0.ɵcmf(i1.APP_SettingModule, [], function (_l) {
    return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i2.BusyComponentNgFactory, i3.BusyBackdropComponentNgFactory, i4.DeliveryComponentNgFactory]],
            [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i5.ɵi, i5.ɵi, []), i0.ɵmpd(4608, i6.NgLocalization, i6.NgLocaleLocalization, [i0.LOCALE_ID]), i0.ɵmpd(4608, i7.BrowserXhr, i7.BrowserXhr, []),
        i0.ɵmpd(4608, i7.ResponseOptions, i7.BaseResponseOptions, []), i0.ɵmpd(5120, i7.XSRFStrategy, i7.ɵb, []), i0.ɵmpd(4608, i7.XHRBackend, i7.XHRBackend, [i7.BrowserXhr, i7.ResponseOptions, i7.XSRFStrategy]), i0.ɵmpd(4608, i7.RequestOptions, i7.BaseRequestOptions, []), i0.ɵmpd(5120, i7.Http, i7.ɵc, [i7.XHRBackend,
            i7.RequestOptions]), i0.ɵmpd(4608, i8.PaginationService, i8.PaginationService, []), i0.ɵmpd(4608, i9.BusyService, i9.BusyService, [[2, i10.BusyConfig]]),
        i0.ɵmpd(5120, i0.Compiler, i11.createJitCompiler, []), i0.ɵmpd(4608, i5.FormBuilder, i5.FormBuilder, []), i0.ɵmpd(512, i5.ɵba, i5.ɵba, []), i0.ɵmpd(512, i5.FormsModule, i5.FormsModule, []),
        i0.ɵmpd(512, i6.CommonModule, i6.CommonModule, []), i0.ɵmpd(512, i12.ImageCropperModule, i12.ImageCropperModule, []), i0.ɵmpd(512, i7.HttpModule, i7.HttpModule, []), i0.ɵmpd(512, i8.NgxPaginationModule, i8.NgxPaginationModule, []), i0.ɵmpd(512, i13.SharedModule, i13.SharedModule, []),
        i0.ɵmpd(512, i11.BusyModule, i11.BusyModule, []), i0.ɵmpd(512, i14.RouterModule, i14.RouterModule, [[2, i14.ɵa], [2, i14.Router]]), i0.ɵmpd(512, i5.ReactiveFormsModule, i5.ReactiveFormsModule, []), i0.ɵmpd(512, i15.DeliveryModule, i15.DeliveryModule, []), i0.ɵmpd(512, i1.APP_SettingModule, i1.APP_SettingModule, []), i0.ɵmpd(1024, i14.ROUTES, function () {
            return [[{ path: '', component: i16.DeliveryComponent }], [{ path: '', redirectTo: 'delivery_settings',
                        pathMatch: 'full' }, { path: 'delivery_settings', loadChildren: './Delivery/Delivery.module#DeliveryModule' }]];
        }, [])]);
});
