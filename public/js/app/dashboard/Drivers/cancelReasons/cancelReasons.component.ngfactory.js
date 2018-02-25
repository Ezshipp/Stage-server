/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from './cancelReasons.component.css.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/forms';
import * as i3 from '@angular/common';
import * as i4 from './cancelReasons.component';
import * as i5 from '@angular/router';
import * as i6 from '@angular/http';
import * as i7 from '../../../authentication/apimessages.service';
import * as i8 from 'angular2-cookie/services/cookies.service';
import * as i9 from '../../../errors/error.service';
var styles_CancelReasonsComponent = [i0.styles];
export var RenderType_CancelReasonsComponent = i1.ɵcrt({ encapsulation: 0,
    styles: styles_CancelReasonsComponent, data: {} });
function View_CancelReasonsComponent_2(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 14, 'td', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(2, 0, null, null, 11, 'div', [['class', 'form-group']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                               '])), (_l()(), i1.ɵeld(4, 0, null, null, 5, 'input', [['class', 'form-control'], ['name', 'item.Reason'], ['placeholder',
                'Regular'], ['type', 'text'], ['value', '']], [[2, 'ng-untouched', null],
            [2, 'ng-touched', null], [2, 'ng-pristine', null], [2, 'ng-dirty',
                null], [2, 'ng-valid', null], [2, 'ng-invalid', null],
            [2, 'ng-pending', null]], [[null, 'ngModelChange'], [null,
                'input'], [null, 'blur'], [null, 'compositionstart'], [null,
                'compositionend']], function (_v, en, $event) {
            var ad = true;
            if (('input' === en)) {
                var pd_0 = (i1.ɵnov(_v, 5)._handleInput($event.target.value) !== false);
                ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
                var pd_1 = (i1.ɵnov(_v, 5).onTouched() !== false);
                ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
                var pd_2 = (i1.ɵnov(_v, 5)._compositionStart() !== false);
                ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
                var pd_3 = (i1.ɵnov(_v, 5)._compositionEnd($event.target.value) !== false);
                ad = (pd_3 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_4 = ((_v.parent.context.$implicit.Reason = $event) !== false);
                ad = (pd_4 && ad);
            }
            return ad;
        }, null, null)), i1.ɵdid(5, 16384, null, 0, i2.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null),
        i1.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [i2.DefaultValueAccessor]), i1.ɵdid(7, 671744, null, 0, i2.NgModel, [[8,
                null], [8, null], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { name: [0, 'name'], model: [1, 'model'] }, { update: 'ngModelChange' }), i1.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i1.ɵdid(9, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(),
            i1.ɵted(-1, null, ['\n                               '])), (_l()(),
            i1.ɵeld(11, 0, null, null, 1, 'i', [['class', 'material-icons'],
                ['style', 'position: absolute;right: 0;top: 10px;color: #F00;cursor: pointer;']], null, [[null, 'click']], function (_v, en, $event) {
                var ad = true;
                var _co = _v.component;
                if (('click' === en)) {
                    var pd_0 = (_co.onClick() !== false);
                    ad = (pd_0 && ad);
                }
                return ad;
            }, null, null)), (_l()(), i1.ɵted(-1, null, ['clear'])),
        (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(),
            i1.ɵted(-1, null, ['\n                       ']))], function (_ck, _v) {
        var currVal_7 = 'item.Reason';
        var currVal_8 = _v.parent.context.$implicit.Reason;
        _ck(_v, 7, 0, currVal_7, currVal_8);
    }, function (_ck, _v) {
        var currVal_0 = i1.ɵnov(_v, 9).ngClassUntouched;
        var currVal_1 = i1.ɵnov(_v, 9).ngClassTouched;
        var currVal_2 = i1.ɵnov(_v, 9).ngClassPristine;
        var currVal_3 = i1.ɵnov(_v, 9).ngClassDirty;
        var currVal_4 = i1.ɵnov(_v, 9).ngClassValid;
        var currVal_5 = i1.ɵnov(_v, 9).ngClassInvalid;
        var currVal_6 = i1.ɵnov(_v, 9).ngClassPending;
        _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6);
    });
}
function View_CancelReasonsComponent_3(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 5, 'td', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(3, 0, null, null, 1, 'i', [['class', 'material-icons'], ['style', 'color: #55b559;margin-top: 20px;cursor: pointer;']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.onsubmitEdit(_v.parent.context.$implicit) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['done'])),
        (_l()(), i1.ɵted(-1, null, ['\n                       ']))], null, null);
}
function View_CancelReasonsComponent_1(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 23, 'tr', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵeld(2, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(3, null, ['', ''])), (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(),
            i1.ɵeld(5, 0, null, null, 1, 'td', [], [[8, 'hidden', 0]], null, null, null, null)), (_l()(), i1.ɵted(6, null, ['', ''])), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_2)),
        i1.ɵdid(9, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_3)),
        i1.ɵdid(12, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n\n                       '])),
        (_l()(), i1.ɵeld(14, 0, null, null, 8, 'td', [], [[8, 'hidden',
                0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(16, 0, null, null, 4, 'button', [['class', 'btn  btn-simple btn-xs'], ['rel', 'tooltip'],
            ['title', 'edit'], ['type', 'button']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.onEdit(_v.context.$implicit, _v.context.index) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                               '])),
        (_l()(), i1.ɵeld(18, 0, null, null, 1, 'i', [['class', 'material-icons']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['edit'])), (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵted(-1, null, ['\n                           '])),
        (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵted(-1, null, ['\n\n                   ']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_3 = (_v.context.index == _co.index);
        _ck(_v, 9, 0, currVal_3);
        var currVal_4 = (_v.context.index == _co.index);
        _ck(_v, 12, 0, currVal_4);
    }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = (_v.context.index + 1);
        _ck(_v, 3, 0, currVal_0);
        var currVal_1 = (_v.context.index == _co.index);
        _ck(_v, 5, 0, currVal_1);
        var currVal_2 = _v.context.$implicit.Reason;
        _ck(_v, 6, 0, currVal_2);
        var currVal_5 = (_v.context.index == _co.index);
        _ck(_v, 14, 0, currVal_5);
    });
}
function View_CancelReasonsComponent_5(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, 'tr', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(2, 0, null, null, 1, 'td', [['style', 'border-top: none;text-align: center;color: #12A6F1;']], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['Loading…'])), (_l()(), i1.ɵted(-1, null, ['\n                       ']))], null, null);
}
function View_CancelReasonsComponent_6(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, 'tr', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(2, 0, null, null, 1, 'td', [['style', 'border-top: none;text-align: center;']], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['Biker Cancellation Reason Added Successfully'])),
        (_l()(), i1.ɵted(-1, null, ['\n                       ']))], null, null);
}
function View_CancelReasonsComponent_4(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 66, 'div', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵeld(2, 0, null, null, 0, 'div', [['class', 'backdrop']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵeld(4, 0, null, null, 61, 'div', [['class', 'modal'], ['role', 'dialog'],
            ['style', 'margin-top: -5%;'], ['tabindex', '-1']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(), i1.ɵeld(6, 0, null, null, 58, 'div', [['class',
                'modal-dialog'], ['role', 'document']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n           '])),
        (_l()(), i1.ɵeld(8, 0, null, null, 55, 'div', [['class', 'modal-content']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵeld(10, 0, null, null, 10, 'div', [['class', 'modal-header']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵeld(12, 0, null, null, 4, 'button', [['aria-label', 'Close'], ['class', 'close'], ['type',
                'button']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.onCloseCreate_Reason() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                                   '])),
        (_l()(), i1.ɵeld(14, 0, null, null, 1, 'span', [['aria-hidden', 'true'],
            ['style', 'font-size: 25px;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                                       ×\n                                   '])),
        (_l()(), i1.ɵted(-1, null, ['\n                               '])), (_l()(),
            i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵeld(18, 0, null, null, 1, 'h4', [['style', 'text-align: center']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Create Biker Reason'])), (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵted(-1, null, ['\n               '])),
        (_l()(), i1.ɵeld(22, 0, null, null, 40, 'div', [['class', 'modal-body'],
            ['style', 'padding-top: 0px;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                   '])),
        (_l()(), i1.ɵeld(24, 0, null, null, 37, 'form', [['class', 'web_form'],
            ['novalidate', '']], [[2, 'ng-untouched', null], [2, 'ng-touched', null],
            [2, 'ng-pristine', null], [2, 'ng-dirty', null], [2, 'ng-valid',
                null], [2, 'ng-invalid', null], [2, 'ng-pending', null]], [[null, 'ngSubmit'], [null, 'submit'], [null, 'reset']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('submit' === en)) {
                var pd_0 = (i1.ɵnov(_v, 26).onSubmit($event) !== false);
                ad = (pd_0 && ad);
            }
            if (('reset' === en)) {
                var pd_1 = (i1.ɵnov(_v, 26).onReset() !== false);
                ad = (pd_1 && ad);
            }
            if (('ngSubmit' === en)) {
                var pd_2 = (_co.onSubmit(i1.ɵnov(_v, 26)) !== false);
                ad = (pd_2 && ad);
            }
            return ad;
        }, null, null)), i1.ɵdid(25, 16384, null, 0, i2.ɵbf, [], null, null), i1.ɵdid(26, 16384, [['f', 4]], 0, i2.NgForm, [[8, null], [8, null]], null, { ngSubmit: 'ngSubmit' }),
        i1.ɵprd(2048, null, i2.ControlContainer, null, [i2.NgForm]), i1.ɵdid(28, 16384, null, 0, i2.NgControlStatusGroup, [i2.ControlContainer], null, null), (_l()(), i1.ɵted(-1, null, ['\n                   '])),
        (_l()(), i1.ɵeld(30, 0, null, null, 11, 'div', [['class', 'form-group']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵeld(32, 0, null, null, 1, 'label', [['style', 'color: #000;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Reason:'])), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵeld(35, 0, null, null, 5, 'input', [['class', 'form-control'],
            ['name', 'Reason'], ['ngModel', ''], ['placeholder', 'Enter Biker Reason'], ['type',
                'text'], ['value', '']], [[2, 'ng-untouched', null], [2, 'ng-touched',
                null], [2, 'ng-pristine', null], [2, 'ng-dirty', null],
            [2, 'ng-valid', null], [2, 'ng-invalid', null], [2, 'ng-pending',
                null]], [[null, 'input'], [null, 'blur'], [null,
                'compositionstart'], [null, 'compositionend']], function (_v, en, $event) {
            var ad = true;
            if (('input' === en)) {
                var pd_0 = (i1.ɵnov(_v, 36)._handleInput($event.target.value) !== false);
                ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
                var pd_1 = (i1.ɵnov(_v, 36).onTouched() !== false);
                ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
                var pd_2 = (i1.ɵnov(_v, 36)._compositionStart() !== false);
                ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
                var pd_3 = (i1.ɵnov(_v, 36)._compositionEnd($event.target.value) !== false);
                ad = (pd_3 && ad);
            }
            return ad;
        }, null, null)), i1.ɵdid(36, 16384, null, 0, i2.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [i2.DefaultValueAccessor]), i1.ɵdid(38, 671744, null, 0, i2.NgModel, [[2,
                i2.ControlContainer], [8, null], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { name: [0, 'name'], model: [1, 'model'] }, null), i1.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i1.ɵdid(40, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(),
            i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵeld(43, 0, null, null, 17, 'table', [['class', 'table table-responsive']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵeld(45, 0, null, null, 15, 'tbody', [], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_5)), i1.ɵdid(47, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null),
        (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵeld(49, 0, null, null, 7, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(51, 0, null, null, 4, 'td', [['style', 'border-top: none;text-align: center;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                               '])), (_l()(), i1.ɵeld(53, 0, null, null, 1, 'button', [['class', 'btn btn-info'], ['type',
                'submit']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['Submit'])), (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_6)),
        i1.ɵdid(59, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n                   '])),
        (_l()(), i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵted(-1, null, ['\n           '])),
        (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(), i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵted(-1, null, ['\n']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_14 = 'Reason';
        var currVal_15 = '';
        _ck(_v, 38, 0, currVal_14, currVal_15);
        var currVal_16 = _co.isRequesting;
        _ck(_v, 47, 0, currVal_16);
        var currVal_17 = _co.Status_OK;
        _ck(_v, 59, 0, currVal_17);
    }, function (_ck, _v) {
        var currVal_0 = i1.ɵnov(_v, 28).ngClassUntouched;
        var currVal_1 = i1.ɵnov(_v, 28).ngClassTouched;
        var currVal_2 = i1.ɵnov(_v, 28).ngClassPristine;
        var currVal_3 = i1.ɵnov(_v, 28).ngClassDirty;
        var currVal_4 = i1.ɵnov(_v, 28).ngClassValid;
        var currVal_5 = i1.ɵnov(_v, 28).ngClassInvalid;
        var currVal_6 = i1.ɵnov(_v, 28).ngClassPending;
        _ck(_v, 24, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6);
        var currVal_7 = i1.ɵnov(_v, 40).ngClassUntouched;
        var currVal_8 = i1.ɵnov(_v, 40).ngClassTouched;
        var currVal_9 = i1.ɵnov(_v, 40).ngClassPristine;
        var currVal_10 = i1.ɵnov(_v, 40).ngClassDirty;
        var currVal_11 = i1.ɵnov(_v, 40).ngClassValid;
        var currVal_12 = i1.ɵnov(_v, 40).ngClassInvalid;
        var currVal_13 = i1.ɵnov(_v, 40).ngClassPending;
        _ck(_v, 35, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13);
    });
}
export function View_CancelReasonsComponent_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 44, 'div', [['class',
                'container-fluid']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵeld(2, 0, null, null, 13, 'div', [['class', 'row']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(), i1.ɵeld(4, 0, null, null, 10, 'div', [['style',
                'float: right;margin-bottom: 10px;padding-right: 15px;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n           '])), (_l()(), i1.ɵeld(6, 0, null, null, 1, 'label', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['Add Reason'])), (_l()(), i1.ɵted(-1, null, ['\n           '])), (_l()(), i1.ɵeld(9, 0, null, null, 4, 'button', [['class', 'btn btn-info'], ['rel', 'tooltip'], ['style', 'padding: 3px;'], ['title',
                'Create Reason'], ['type', 'button']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.onCreateReason() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['\n               '])),
        (_l()(), i1.ɵeld(11, 0, null, null, 1, 'i', [['class', 'material-icons']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['add'])), (_l()(), i1.ɵted(-1, null, ['\n           '])), (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(),
            i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵted(-1, null, ['\n   '])),
        (_l()(), i1.ɵeld(17, 0, null, null, 25, 'div', [['class', 'row']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(), i1.ɵeld(19, 0, null, null, 22, 'div', [['class', 'col-xs-12 col-sm-12 col-md-12']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n           '])), (_l()(), i1.ɵeld(21, 0, null, null, 19, 'table', [['class', 'table table-responsive'], ['style', 'box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵeld(23, 0, null, null, 16, 'tbody', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵeld(25, 0, null, null, 10, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵeld(27, 0, null, null, 1, 'th', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['S.No.'])), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵeld(30, 0, null, null, 1, 'th', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Reason'])), (_l()(), i1.ɵted(-1, null, ['\n                       '])),
        (_l()(), i1.ɵeld(33, 0, null, null, 1, 'th', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Activity'])), (_l()(), i1.ɵted(-1, null, ['\n                   '])),
        (_l()(), i1.ɵted(-1, null, ['\n                   '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_1)),
        i1.ɵdid(38, 802816, null, 0, i3.NgForOf, [i1.ViewContainerRef, i1.TemplateRef,
            i1.IterableDiffers], { ngForOf: [0, 'ngForOf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n               '])), (_l()(), i1.ɵted(-1, null, ['\n           '])),
        (_l()(), i1.ɵted(-1, null, ['\n       '])), (_l()(), i1.ɵted(-1, null, ['\n   '])), (_l()(), i1.ɵted(-1, null, ['\n'])), (_l()(), i1.ɵted(-1, null, ['\n'])), (_l()(), i1.ɵted(-1, null, ['\n\n'])), (_l()(),
            i1.ɵand(16777216, null, null, 1, null, View_CancelReasonsComponent_4)),
        i1.ɵdid(47, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n\n']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.ReasonData;
        _ck(_v, 38, 0, currVal_0);
        var currVal_1 = _co.onCreate_Reason;
        _ck(_v, 47, 0, currVal_1);
    }, null);
}
export function View_CancelReasonsComponent_Host_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, 'app-cancelReasons', [], null, null, null, View_CancelReasonsComponent_0, RenderType_CancelReasonsComponent)), i1.ɵdid(1, 114688, null, 0, i4.CancelReasonsComponent, [i5.Router, i6.Http, i7.ApiMessageService, i8.CookieService, i9.ErrorService, i1.ElementRef], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
export var CancelReasonsComponentNgFactory = i1.ɵccf('app-cancelReasons', i4.CancelReasonsComponent, View_CancelReasonsComponent_Host_0, {}, {}, []);