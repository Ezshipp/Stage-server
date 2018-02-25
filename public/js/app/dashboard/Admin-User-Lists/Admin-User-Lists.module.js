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
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AdminUsersListsRouting } from './Admin-User-Lists.routing';
import { UserListsComponent } from './Admin-User-Lists.component';
var UserListsModule = /** @class */ (function () {
    function UserListsModule() {
    }
    UserListsModule = __decorate([
        NgModule({
            declarations: [
                UserListsComponent
            ],
            imports: [
                AdminUsersListsRouting,
                FormsModule,
                SharedModule,
                HttpModule,
                CommonModule
            ],
        })
    ], UserListsModule);
    return UserListsModule;
}());
export { UserListsModule };
