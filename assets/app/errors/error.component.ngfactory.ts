/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from './error.component';
import * as i3 from './error.service';
const styles_ErrorComponent:any[] = ['.backdrop[_ngcontent-%COMP%] {\n            background-color: rgba(0,0,0,0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100vh;\n        }\n        .modal[_ngcontent-%COMP%] {\n       background-color: transparent;\n       box-shadow: none;\n   }\n   .button-custom[_ngcontent-%COMP%] {\n       padding: 10px;\n       font-size: 18px;\n       background-color: transparent;\n       box-shadow: none;\n       color: #12a6f1;\n       border: 1px solid #12a6f1;\n       border-radius: 5px;\n       font-weight: 600;\n   }\n   .button-custom[_ngcontent-%COMP%]:hover {\n       background-color: transparent;\n       color:#12a6f1\n   }\n   .button-custom[_ngcontent-%COMP%]:focus {\n       background-color: transparent;\n       color:#12a6f1\n   }'];
export const RenderType_ErrorComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:0,
    styles:styles_ErrorComponent,data:{}});
function View_ErrorComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),6,'div',[['class',
      'form-group'],['style','margin-top: 100px']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n    '])),
      (_l()(),i0.ɵeld(2,0,(null as any),(null as any),3,'div',[['class','col-md-12 text-center']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n        '])),(_l()(),i0.ɵeld(4,0,(null as any),
          (null as any),0,'span',[['class','glyphicon glyphicon-refresh glyphicon-refresh-animate']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),[' Loading…\n    '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n']))],(null as any),(null as any));
}
export function View_ErrorComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),2,'div',[['class',
      'backdrop']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      i0.ɵdid(1,278528,(null as any),0,i1.NgStyle,[i0.KeyValueDiffers,i0.ElementRef,
          i0.Renderer],{ngStyle:[0,'ngStyle']},(null as any)),i0.ɵpod(2,{'display':0}),
      (_l()(),i0.ɵted(-1,(null as any),['\n'])),(_l()(),i0.ɵeld(4,0,(null as any),
          (null as any),28,'div',[['class','modal'],['role','dialog'],['tabindex',
              '-1']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      i0.ɵdid(5,278528,(null as any),0,i1.NgStyle,[i0.KeyValueDiffers,i0.ElementRef,
          i0.Renderer],{ngStyle:[0,'ngStyle']},(null as any)),i0.ɵpod(6,{'display':0}),
      (_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵeld(8,0,(null as any),
          (null as any),23,'div',[['class','modal-dialog'],['role','document']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n        '])),(_l()(),i0.ɵeld(10,0,(null as any),(null as any),
          20,'div',[['class','modal-content bg'],['style','padding: 10px;box-shadow: 0 5px 15px rgba(0,0,0,0.1);']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵeld(12,0,(null as any),
          (null as any),5,'div',[['class','modal-header head'],['style','display: none;']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n                '])),(_l()(),i0.ɵeld(14,
          0,(null as any),(null as any),2,'button',[['aria-label','Close'],['class',
              'close'],['type','button']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.ErrorComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onErrorHandled()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵeld(15,0,(null as any),(null as any),
          1,'span',[['aria-hidden','true']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['×'])),(_l()(),
          i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n            '])),(_l()(),i0.ɵeld(19,0,(null as any),(null as any),4,
          'div',[['class','modal-body bod']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n                '])),
      (_l()(),i0.ɵeld(21,0,(null as any),(null as any),1,'p',[['style','text-align: center;font-weight: bold;font-size: 17px;']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(22,(null as any),['',''])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n            '])),(_l()(),i0.ɵted(-1,(null as any),['\n            '])),
      (_l()(),i0.ɵeld(25,0,(null as any),(null as any),4,'div',[['class','modal-footer foot'],
          ['style','border-top: none;background-color: transparent;']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n                '])),(_l()(),i0.ɵeld(27,0,(null as any),
          (null as any),1,'button',[['class','btn btn-danger button-custom'],['type',
              'button']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.ErrorComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onErrorHandled()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['Close'])),
      (_l()(),i0.ɵted(-1,(null as any),['\n            '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵted(-1,
          (null as any),['\n'])),(_l()(),i0.ɵted(-1,(null as any),['\n'])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ErrorComponent_1)),
      i0.ɵdid(35,16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any))],(_ck,_v) => {
    var _co:i2.ErrorComponent = _v.component;
    const currVal_0:any = _ck(_v,2,0,_co.display);
    _ck(_v,1,0,currVal_0);
    const currVal_1:any = _ck(_v,6,0,_co.display);
    _ck(_v,5,0,currVal_1);
    const currVal_3:any = _co.loading_div;
    _ck(_v,35,0,currVal_3);
  },(_ck,_v) => {
    var _co:i2.ErrorComponent = _v.component;
    const currVal_2:any = ((_co.error == null)? (null as any): _co.error.message);
    _ck(_v,22,0,currVal_2);
  });
}
export function View_ErrorComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),1,'app-error',
      ([] as any[]),(null as any),(null as any),(null as any),View_ErrorComponent_0,
      RenderType_ErrorComponent)),i0.ɵdid(1,114688,(null as any),0,i2.ErrorComponent,
      [i3.ErrorService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const ErrorComponentNgFactory:i0.ComponentFactory<i2.ErrorComponent> = i0.ɵccf('app-error',
    i2.ErrorComponent,View_ErrorComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiRDovRXpzaGlwcC8xMy0wMS0yMDE4L3N1cGVyYWRtaW5fYW5ndWxhci9hc3NldHMvYXBwL2Vycm9ycy9lcnJvci5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vRDovRXpzaGlwcC8xMy0wMS0yMDE4L3N1cGVyYWRtaW5fYW5ndWxhci9hc3NldHMvYXBwL2Vycm9ycy9lcnJvci5jb21wb25lbnQudHMiLCJuZzovLy9EOi9FenNoaXBwLzEzLTAxLTIwMTgvc3VwZXJhZG1pbl9hbmd1bGFyL2Fzc2V0cy9hcHAvZXJyb3JzL2Vycm9yLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vRDovRXpzaGlwcC8xMy0wMS0yMDE4L3N1cGVyYWRtaW5fYW5ndWxhci9hc3NldHMvYXBwL2Vycm9ycy9lcnJvci5jb21wb25lbnQudHMuRXJyb3JDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwiYmFja2Ryb3BcIiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBkaXNwbGF5fVwiPjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIFtuZ1N0eWxlXT1cInsnZGlzcGxheSc6IGRpc3BsYXl9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgYmdcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7Ym94LXNoYWRvdzogMCA1cHggMTVweCByZ2JhKDAsMCwwLDAuMSk7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgaGVhZFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwib25FcnJvckhhbmRsZWQoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBib2RcIj5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO2ZvbnQtd2VpZ2h0OiBib2xkO2ZvbnQtc2l6ZTogMTdweDtcIj57eyBlcnJvcj8ubWVzc2FnZSB9fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgZm9vdFwiIHN0eWxlPVwiYm9yZGVyLXRvcDogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnV0dG9uLWN1c3RvbVwiIChjbGljayk9XCJvbkVycm9ySGFuZGxlZCgpXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgKm5nSWY9XCJsb2FkaW5nX2RpdlwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTAwcHhcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBnbHlwaGljb24tcmVmcmVzaC1hbmltYXRlXCI+PC9zcGFuPiBMb2FkaW5nJmhlbGxpcDtcclxuICAgIDwvZGl2PlxyXG48L2Rpdj4iLCI8YXBwLWVycm9yPjwvYXBwLWVycm9yPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDZ0JBO01BQUE7TUFBQSw4QkFBc0U7TUFDbEU7VUFBQTtNQUFtQyxrREFDL0I7VUFBQTtVQUFBO01BQTJFLHVEQUN6RTtVQUFBOzs7b0JBbkJWO01BQUE7YUFBQTtxQkFBQSxnREFBc0I7TUFBdUMsMENBQzdEO1VBQUE7Y0FBQTthQUFBO3FCQUFBLGdEQUErQztNQUFpQyw4Q0FDNUU7VUFBQTtVQUFBLDBEQUEwQztVQUFBLCtCQUN0QztVQUFBO1VBQUE7TUFBNEYsc0RBQ3hGO1VBQUE7VUFBQTtNQUFzRCwwREFDbEQ7VUFBQTtjQUFBO1VBQUE7WUFBQTtZQUFBO1lBQXVEO2NBQUE7Y0FBQTtZQUFBO1lBQXZEO1VBQUEsZ0NBQWtGO1VBQUE7VUFBQSw4QkFBeUIseUNBQXVCO2lCQUFBLHVDQUNoSTtVQUFBLHFCQUNOO1VBQUE7VUFBQSw4QkFBNEI7TUFDeEI7VUFBQTtNQUFpRSwyQ0FBd0I7VUFBQSxxQkFDdkY7TUFDTjtVQUFBO1VBQUEsMERBQXVGO1VBQUEsdUNBQ25GO1VBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBMkQ7Y0FBQTtjQUFBO1lBQUE7WUFBM0Q7VUFBQSxnQ0FBc0Y7TUFBYyxzREFDbEc7VUFBQSxpQkFDSiw4Q0FDSjtVQUFBLHVCQUNKLDBDQUNOO2lCQUFBO2FBQUE7VUFBQTs7SUFoQnNCO0lBQXRCLFdBQXNCLFNBQXRCO0lBQytDO0lBQS9DLFdBQStDLFNBQS9DO0lBZXdCO0lBQXhCLFlBQXdCLFNBQXhCOzs7SUFSaUY7SUFBQTs7OztvQkNSakY7TUFBQTsrQkFBQSxVQUFBO01BQUE7SUFBQTs7OzsifQ==
