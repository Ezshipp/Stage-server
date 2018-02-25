var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { SharedModule } from '../../shared/shared.module';
import { PromotionalContactsComponent } from './PromotationContacts.component';
import { PromotionalComponentRouting } from './PromotationContacts.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// This Module's Components
var PromotionalContactsModule = /** @class */ (function () {
    function PromotionalContactsModule() {
    }
    PromotionalContactsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                PromotionalComponentRouting,
                SharedModule, FormsModule, ReactiveFormsModule
            ],
            declarations: [
                PromotionalContactsComponent,
            ],
        })
    ], PromotionalContactsModule);
    return PromotionalContactsModule;
}());
export { PromotionalContactsModule };
