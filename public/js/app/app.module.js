var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'angular2-cookie/core';
import { ApiMessageService } from './authentication/apimessages.service';
import { ErrorService } from './errors/error.service';
import { APP_ROUTES } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { ErrorComponent } from './errors/error.component';
import { PubNubAngular } from 'pubnub-angular2';
import { AppCustomPreloader } from './app-routing-loader';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
export function cookieServiceFactory() {
    return new CookieService();
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
            providers: [ErrorService, PubNubAngular,
                ApiMessageService, AppCustomPreloader, AuthGuard,
                { provide: CookieService, useFactory: cookieServiceFactory },
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
