// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIDocumentRouting } from './API_Document.routing';
import { API_DocumentComponent } from './API_Document.component';

@NgModule({
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
export class ApiDocumentModule {

}
