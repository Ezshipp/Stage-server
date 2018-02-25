var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from '../../../../shared/shared.module';
import { InvoicesRouting } from './invoices.routing';
import { InvoicesComponent } from './invoices.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
var Invoice_Premium_CustomerModule = /** @class */ (function () {
    function Invoice_Premium_CustomerModule() {
    }
    Invoice_Premium_CustomerModule = __decorate([
        NgModule({
            declarations: [
                InvoicesComponent
            ],
            imports: [
                InvoicesRouting, NgxPaginationModule,
                FormsModule,
                CommonModule,
                HttpModule,
                SharedModule
            ],
        })
    ], Invoice_Premium_CustomerModule);
    return Invoice_Premium_CustomerModule;
}());
export { Invoice_Premium_CustomerModule };
