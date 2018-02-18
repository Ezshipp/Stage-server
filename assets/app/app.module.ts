


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './authentication/apimessages.service';
import { HttpModule } from '@angular/http';
import { ErrorService } from './errors/error.service';

import {  APP_ROUTES } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { ErrorComponent } from './errors/error.component';


import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PubNubAngular } from 'pubnub-angular2';
import { AppCustomPreloader } from './app-routing-loader';
import { NgProgressModule } from 'ngx-progressbar';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

declare var require: any;
export function cookieServiceFactory() {
  return new CookieService();
}


@NgModule({
    declarations: [
        AppComponent,


       ErrorComponent


],
    imports: [
    BrowserModule,

    // FormsModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: AppCustomPreloader }),

    // HttpModule,

    BrowserAnimationsModule,




],

    providers:[ErrorService,PubNubAngular,
    ApiMessageService,AppCustomPreloader,AuthGuard,
     { provide: CookieService, useFactory: cookieServiceFactory },
    //  {
	// 		provide: HighchartsStatic,
	// 		useFactory: highchartsFactory
	// 	}

      ],
    bootstrap: [AppComponent]
})
export class AppModule {

}