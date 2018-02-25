var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { InActiveAdminUsersRouting } from './In_Active_AdminUsers.routing';
import { In_Active_AdminUsersComponent } from './In_Active_AdminUsers.component';
var InActiveAdminUsersModule = /** @class */ (function () {
    function InActiveAdminUsersModule() {
    }
    InActiveAdminUsersModule = __decorate([
        NgModule({
            declarations: [
                In_Active_AdminUsersComponent
            ],
            imports: [
                InActiveAdminUsersRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                CommonModule
            ],
        })
    ], InActiveAdminUsersModule);
    return InActiveAdminUsersModule;
}());
export { InActiveAdminUsersModule };
