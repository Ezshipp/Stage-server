var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIDocumentRouting } from './API_Document.routing';
import { API_DocumentComponent } from './API_Document.component';
var ApiDocumentModule = /** @class */ (function () {
    function ApiDocumentModule() {
    }
    ApiDocumentModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                APIDocumentRouting,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                API_DocumentComponent,
            ],
            exports: [
                API_DocumentComponent,
            ]
        })
    ], ApiDocumentModule);
    return ApiDocumentModule;
}());
export { ApiDocumentModule };
