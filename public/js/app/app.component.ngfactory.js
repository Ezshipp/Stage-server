/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from './errors/error.component.ngfactory';
import * as i3 from './errors/error.component';
import * as i4 from './errors/error.service';
import * as i5 from './app.component';
var styles_AppComponent = [];
export var RenderType_AppComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_AppComponent,
    data: { 'animation': [{ type: 7, name: 'routerAnimation', definitions: [{ type: 1, expr: '* <=> *',
                        animation: [{ type: 11, selector: ':enter', animation: { type: 6, styles: { position: 'fixed',
                                        width: '100%', transform: 'translateX(-100%)' }, offset: null }, options: { optional: true } },
                            { type: 11, selector: ':leave', animation: { type: 4, styles: { type: 6, styles: { position: 'fixed',
                                            width: '100%', transform: 'translateX(100%)' }, offset: null }, timings: '500ms ease' },
                                options: { optional: true } }, { type: 11, selector: ':enter', animation: { type: 4,
                                    styles: { type: 6, styles: { opacity: 1, transform: 'translateX(0%)' }, offset: null },
                                    timings: '500ms ease' }, options: { optional: true } }], options: null }],
                options: {} }] } });
export function View_AppComponent_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, 'div', [], [[24, '@routerAnimation', 0]], null, null, null, null)),
        (_l()(), i0.ɵted(-1, null, ['\n    '])), (_l()(), i0.ɵeld(2, 16777216, null, null, 1, 'router-outlet', [], null, null, null, null, null)), i0.ɵdid(3, 212992, [['route', 4]], 0, i1.RouterOutlet, [i1.ChildrenOutletContexts, i0.ViewContainerRef, i0.ComponentFactoryResolver,
            [8, null], i0.ChangeDetectorRef], null, null),
        (_l()(), i0.ɵted(-1, null, ['\n\n'])), (_l()(), i0.ɵted(-1, null, ['\n'])), (_l()(), i0.ɵeld(6, 0, null, null, 1, 'app-error', [], null, null, null, i2.View_ErrorComponent_0, i2.RenderType_ErrorComponent)),
        i0.ɵdid(7, 114688, null, 0, i3.ErrorComponent, [i4.ErrorService], null, null), (_l()(), i0.ɵted(-1, null, ['\n']))], function (_ck, _v) {
        _ck(_v, 3, 0);
        _ck(_v, 7, 0);
    }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.getRouteAnimation(i0.ɵnov(_v, 3));
        _ck(_v, 0, 0, currVal_0);
    });
}
export function View_AppComponent_Host_0(_l) {
    return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, 'my-app', [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
        i0.ɵdid(1, 114688, null, 0, i5.AppComponent, [], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
export var AppComponentNgFactory = i0.ɵccf('my-app', i5.AppComponent, View_AppComponent_Host_0, {}, {}, []);
