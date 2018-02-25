var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { RazorpayServiceChargeComponent } from './RazorpayServiceCharge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { razorpayServiceRouting } from './RazorpayServiceCharge.routing';
// This Module's Components
var RazorPayServiceModule = /** @class */ (function () {
    function RazorPayServiceModule() {
    }
    RazorPayServiceModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                razorpayServiceRouting,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                RazorpayServiceChargeComponent,
            ],
        })
    ], RazorPayServiceModule);
    return RazorPayServiceModule;
}());
export { RazorPayServiceModule };
