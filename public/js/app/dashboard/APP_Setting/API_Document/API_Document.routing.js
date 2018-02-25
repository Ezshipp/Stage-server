import { RouterModule } from '@angular/router';
import { API_DocumentComponent } from './API_Document.component';
var APIDocument = [
    { path: '', component: API_DocumentComponent }
];
export var APIDocumentRouting = RouterModule.forChild(APIDocument);
