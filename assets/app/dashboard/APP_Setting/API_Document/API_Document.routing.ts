import { Routes, RouterModule } from '@angular/router';
import { API_DocumentComponent } from './API_Document.component';

const APIDocument: Routes = [
   { path: '', component:  API_DocumentComponent }
];
export const  APIDocumentRouting = RouterModule.forChild(APIDocument);