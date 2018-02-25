import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { HttpModule } from "@angular/http";
import { BikerLeaveComponent } from "./biker-leave.component";
import { BikerLeavesRouting } from "./biker-leave.routing";
@NgModule({
    imports: [
        CommonModule,
        BikerLeavesRouting,
        SharedModule, HttpModule
    ],
    declarations: [
        BikerLeaveComponent,
    ],
    exports: [
        BikerLeaveComponent,
    ]
})
export class Bikers_leaveModule {

}
