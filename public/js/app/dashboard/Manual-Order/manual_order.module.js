var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Manual_orderRouting } from './manual_order.routing';
import { ManualOrderComponent } from './manual_order.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var ManualOrderModule = /** @class */ (function () {
    function ManualOrderModule() {
    }
    ManualOrderModule = __decorate([
        NgModule({
            declarations: [
                ManualOrderComponent
            ],
            imports: [
                Manual_orderRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                CommonModule,
            ],
        })
    ], ManualOrderModule);
    return ManualOrderModule;
}());
export { ManualOrderModule };
