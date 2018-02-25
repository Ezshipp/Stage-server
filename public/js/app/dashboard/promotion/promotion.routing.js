import { PromotionComponent } from './promotion.component';
import { RouterModule } from '@angular/router';
var promotion = [
    {
        path: '',
        component: PromotionComponent
    }
];
export var promotionRouting = RouterModule.forChild(promotion);
