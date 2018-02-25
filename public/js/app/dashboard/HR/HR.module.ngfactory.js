/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from '@angular/core';
import * as i1 from './HR.module';
import * as i2 from './Salary/Salary.component.ngfactory';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/common';
import * as i5 from '@angular/http';
import * as i6 from 'ngx-pagination';
import * as i7 from 'ng2-img-cropper/src/imageCropperModule';
import * as i8 from '../../shared/shared.module';
import * as i9 from '@angular/router';
import * as i10 from './Salary/Salary.component';
export var HRModuleNgFactory = i0.ɵcmf(i1.HRModule, [], function (_l) {
    return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i2.SalaryComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
        i0.ɵmpd(4608, i3.ɵi, i3.ɵi, []), i0.ɵmpd(4608, i4.NgLocalization, i4.NgLocaleLocalization, [i0.LOCALE_ID]), i0.ɵmpd(4608, i5.BrowserXhr, i5.BrowserXhr, []),
        i0.ɵmpd(4608, i5.ResponseOptions, i5.BaseResponseOptions, []), i0.ɵmpd(5120, i5.XSRFStrategy, i5.ɵb, []), i0.ɵmpd(4608, i5.XHRBackend, i5.XHRBackend, [i5.BrowserXhr, i5.ResponseOptions, i5.XSRFStrategy]), i0.ɵmpd(4608, i5.RequestOptions, i5.BaseRequestOptions, []), i0.ɵmpd(5120, i5.Http, i5.ɵc, [i5.XHRBackend,
            i5.RequestOptions]), i0.ɵmpd(4608, i6.PaginationService, i6.PaginationService, []), i0.ɵmpd(4608, i3.FormBuilder, i3.FormBuilder, []),
        i0.ɵmpd(512, i3.ɵba, i3.ɵba, []), i0.ɵmpd(512, i3.FormsModule, i3.FormsModule, []), i0.ɵmpd(512, i4.CommonModule, i4.CommonModule, []),
        i0.ɵmpd(512, i7.ImageCropperModule, i7.ImageCropperModule, []), i0.ɵmpd(512, i5.HttpModule, i5.HttpModule, []), i0.ɵmpd(512, i6.NgxPaginationModule, i6.NgxPaginationModule, []), i0.ɵmpd(512, i8.SharedModule, i8.SharedModule, []), i0.ɵmpd(512, i3.ReactiveFormsModule, i3.ReactiveFormsModule, []), i0.ɵmpd(512, i9.RouterModule, i9.RouterModule, [[2, i9.ɵa],
            [2, i9.Router]]), i0.ɵmpd(512, i1.HRModule, i1.HRModule, []), i0.ɵmpd(1024, i9.ROUTES, function () {
            return [[{ path: '', redirectTo: 'employee', pathMatch: 'full' }, { path: 'employee',
                        loadChildren: './Employee/Employee.module#EmployeeModule' }, { path: 'salary',
                        component: i10.SalaryComponent, loadChildren: './Salary/Salary.module#SalaryModule' },
                    { path: 'Attendence', loadChildren: './Attendence/Attendence.module#AttendenceModule' }]];
        }, [])]);
});
