// Angular Imports

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// This Module's Components
import { PromotionComponent } from './promotion.component';
import { promotionRouting } from './promotion.routing';

@NgModule({
    imports: [
CommonModule,
FormsModule,
promotionRouting,
NgxPaginationModule,FormsModule,ReactiveFormsModule
    ],
    declarations: [
        PromotionComponent,
    ],
    exports: [
        PromotionComponent,
    ]
})
export class PromotionModule {

}
