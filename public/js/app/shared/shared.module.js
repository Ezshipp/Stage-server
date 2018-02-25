var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgxPaginationModule } from 'ngx-pagination';
import { TextFilterPipe } from './../dashboard/Report/filterPipe';
import { ReverseSortPipe } from './../dashboard/Report/ReverseSort.pipe';
import { SortPipe } from './../dashboard/Report/sort.pipe';
import { SpinnerComponent } from './../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ng2-img-cropper/index';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            declarations: [
                SpinnerComponent,
                SortPipe,
                ReverseSortPipe,
                TextFilterPipe
            ],
            imports: [
                ImageCropperModule,
                FormsModule,
                HttpModule,
                NgxPaginationModule,
                CommonModule,
            ],
            exports: [
                ImageCropperModule,
                SpinnerComponent, SortPipe, ReverseSortPipe, TextFilterPipe, NgxPaginationModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
