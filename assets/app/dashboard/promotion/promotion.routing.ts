import { PromotionComponent } from './promotion.component';
import { Routes, RouterModule } from '@angular/router';


const promotion: Routes = [
    {
        path: '',
        component: PromotionComponent
    }
];
export const promotionRouting = RouterModule.forChild(promotion);

