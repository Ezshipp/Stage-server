import { NgxPaginationModule } from 'ngx-pagination';
import { TextFilterPipe } from './../dashboard/Report/filterPipe';
import { ReverseSortPipe } from './../dashboard/Report/ReverseSort.pipe';
import { SortPipe } from './../dashboard/Report/sort.pipe';
import { SpinnerComponent } from './../spinner/spinner.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ImageCropperModule} from 'ng2-img-cropper/index';


@NgModule({
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
    exports:[
        ImageCropperModule,
         SpinnerComponent,SortPipe,ReverseSortPipe,TextFilterPipe,NgxPaginationModule
    ]
})
export class SharedModule {

}