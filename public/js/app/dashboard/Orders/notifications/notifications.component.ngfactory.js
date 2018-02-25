/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from './notifications.component.css.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from 'ngx-pagination';
import * as i4 from './notifications.component';
import * as i5 from '@angular/router';
import * as i6 from '@angular/http';
import * as i7 from '../../../authentication/apimessages.service';
import * as i8 from 'angular2-cookie/services/cookies.service';
import * as i9 from '../../../errors/error.service';
import * as i10 from '@angular/forms';
var styles_notificationsComponent = [i0.styles];
export var RenderType_notificationsComponent = i1.ɵcrt({ encapsulation: 0,
    styles: styles_notificationsComponent, data: { 'animation': [{ type: 7, name: 'itemAnim',
                definitions: [{ type: 1, expr: ':enter', animation: [{ type: 6, styles: { transform: 'translateY(-100%)' },
                                offset: null }, { type: 4, styles: null, timings: 350 }], options: null },
                    { type: 1, expr: ':leave', animation: [{ type: 3, steps: [{ type: 4, styles: { type: 6,
                                            styles: { transform: 'translate(150px,25px)' }, offset: null }, timings: '0.2s ease' },
                                    { type: 4, styles: { type: 6, styles: { opacity: 0 }, offset: null }, timings: '0.5s 0.2s ease' }],
                                options: null }], options: null }], options: {} }, { type: 7,
                name: 'itemAnim1', definitions: [{ type: 1, expr: ':enter', animation: [{ type: 6, styles: { transform: 'translateX(100%)' },
                                offset: null }, { type: 4, styles: null, timings: 350 }], options: null },
                    { type: 1, expr: ':leave', animation: [{ type: 3, steps: [{ type: 4, styles: { type: 6,
                                            styles: { transform: 'translate(150px,25px)' }, offset: null }, timings: '0.2s ease' },
                                    { type: 4, styles: { type: 6, styles: { opacity: 0 }, offset: null }, timings: '0.5s 0.2s ease' }],
                                options: null }], options: null }], options: {} }, { type: 7,
                name: 'focusPanel', definitions: [{ type: 0, name: 'inactive', styles: { type: 6, styles: { transform: 'scale(1)' },
                            offset: null }, options: undefined }, { type: 0, name: 'active',
                        styles: { type: 6, styles: { transform: 'scale(1.1)' }, offset: null }, options: undefined },
                    { type: 1, expr: 'inactive => active', animation: { type: 4, styles: null,
                            timings: '100ms ease-in' }, options: null }, { type: 1, expr: 'active => inactive',
                        animation: { type: 4, styles: null, timings: '100ms ease-out' }, options: null }],
                options: {} }, { type: 7, name: 'movePanel', definitions: [{ type: 1, expr: 'void => *',
                        animation: [{ type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: 'translateY(-200px)',
                                                offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: 'translateY(25px)',
                                                offset: 0.75 }, offset: null }, { type: 6, styles: { opacity: 1, transform: 'translateY(0)',
                                                offset: 1 }, offset: null }] }, timings: 600 }], options: null }],
                options: {} }, { type: 7, name: 'visibilityChanged', definitions: [{ type: 0, name: 'true',
                        styles: { type: 6, styles: { opacity: 1, transform: 'scale(1.0)' }, offset: null },
                        options: undefined }, { type: 0, name: 'false', styles: { type: 6, styles: { opacity: 0,
                                transform: 'scale(0.0)' }, offset: null }, options: undefined },
                    { type: 1, expr: '1 => 0', animation: { type: 4, styles: null, timings: '300ms' },
                        options: null }, { type: 1, expr: '0 => 1', animation: { type: 4, styles: null,
                            timings: '900ms' }, options: null }], options: {} }] } });
function View_notificationsComponent_1(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 22, null, null, null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n          '])), (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵeld(3, 0, null, null, 18, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                '])),
        (_l()(), i1.ɵeld(5, 0, null, null, 4, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                    '])), (_l()(), i1.ɵeld(7, 0, null, null, 1, 'div', [], null, null, null, null, null)), (_l()(), i1.ɵted(8, null, ['', ''])),
        (_l()(), i1.ɵted(-1, null, ['\n                '])), (_l()(), i1.ɵted(-1, null, ['\n                '])), (_l()(), i1.ɵeld(11, 0, null, null, 4, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                    '])),
        (_l()(), i1.ɵeld(13, 0, null, null, 1, 'div', [], null, null, null, null, null)), (_l()(), i1.ɵted(14, null, ['', ''])), (_l()(), i1.ɵted(-1, null, ['\n                '])),
        (_l()(), i1.ɵted(-1, null, ['\n                 '])), (_l()(), i1.ɵeld(17, 0, null, null, 2, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(18, null, ['', ''])), i1.ɵppd(19, 2), (_l()(), i1.ɵted(-1, null, ['\n                 '])),
        (_l()(), i1.ɵted(-1, null, ['\n            '])), (_l()(), i1.ɵted(-1, null, ['\n                 ']))], null, function (_ck, _v) {
        var currVal_0 = _v.context.$implicit.contents.en;
        _ck(_v, 8, 0, currVal_0);
        var currVal_1 = _v.context.$implicit.id;
        _ck(_v, 14, 0, currVal_1);
        var currVal_2 = i1.ɵunv(_v, 18, 0, _ck(_v, 19, 0, i1.ɵnov(_v.parent, 0), (_v.context.$implicit.queued_at * 1000), 'dd-MM-yyyy HH:mm:ss Z'));
        _ck(_v, 18, 0, currVal_2);
    });
}
export function View_notificationsComponent_0(_l) {
    return i1.ɵvid(0, [i1.ɵpid(0, i2.DatePipe, [i1.LOCALE_ID]), (_l()(), i1.ɵted(-1, null, ['\n\n'])), (_l()(), i1.ɵeld(2, 0, null, null, 19, 'table', [['border',
                '1']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵeld(4, 0, null, null, 17, 'tbody', [], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 10, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n        '])), (_l()(),
            i1.ɵeld(7, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [' Message'])), (_l()(), i1.ɵted(-1, null, ['\n        '])),
        (_l()(), i1.ɵeld(10, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [' Message Id'])), (_l()(), i1.ɵted(-1, null, ['\n        '])),
        (_l()(), i1.ɵeld(13, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [' Notification Time'])), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵand(16777216, null, null, 3, null, View_notificationsComponent_1)),
        i1.ɵdid(18, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef,
            i1.IterableDiffers], { ngForOf: [0, 'ngForOf'] }, null), i1.ɵpod(19, { itemsPerPage: 0,
            currentPage: 1, totalItems: 2 }), i1.ɵpid(0, i3.PaginatePipe, [i3.PaginationService]),
        (_l()(), i1.ɵted(-1, null, ['\n    ']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = i1.ɵunv(_v, 18, 0, i1.ɵnov(_v, 20).transform(_co.allnotifications, _ck(_v, 19, 0, _co.limit, _co.p, _co.Total_Count)));
        _ck(_v, 18, 0, currVal_0);
    }, null);
}
export function View_notificationsComponent_Host_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, 'app-all', [], null, null, null, View_notificationsComponent_0, RenderType_notificationsComponent)),
        i1.ɵdid(1, 114688, null, 0, i4.notificationsComponent, [i5.Router, i6.Http,
            i7.ApiMessageService, i8.CookieService, i9.ErrorService, i1.ChangeDetectorRef,
            i10.FormBuilder], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
export var notificationsComponentNgFactory = i1.ɵccf('app-all', i4.notificationsComponent, View_notificationsComponent_Host_0, {}, {}, []);
