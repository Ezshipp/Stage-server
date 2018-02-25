var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NewBikersRouting } from './newBikers.routing';
import { NewBikersComponent } from './newBikers.component';
import { DatePickerModule } from 'ng2-datepicker/lib-dist/ng2-datepicker.module';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var NewBikersModule = /** @class */ (function () {
    function NewBikersModule() {
    }
    NewBikersModule = __decorate([
        NgModule({
            declarations: [
                NewBikersComponent
            ],
            imports: [
                NewBikersRouting,
                FormsModule,
                SharedModule, ReactiveFormsModule,
                HttpModule, DatePickerModule,
                CommonModule,
            ],
        })
    ], NewBikersModule);
    return NewBikersModule;
}());
export { NewBikersModule };
