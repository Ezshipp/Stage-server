var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { trigger, style, animate, transition, query, } from '@angular/animations';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    // navigationInterceptor(event: RouterEvent): void {
    //   if (event instanceof NavigationStart) {
    //     // this.loading = true
    //     this.ngProgress.start()
    //   }
    //   if (event instanceof NavigationEnd) {
    //     // this.loading = false
    //     this.ngProgress.done()
    //   }
    //   // Set loading state to false in both of the below events to hide the spinner in case a request fails
    //   if (event instanceof NavigationCancel) {
    //     // this.loading = false
    //     this.ngProgress.done()
    //   }
    //   if (event instanceof NavigationError) {
    //     // this.loading = false
    //     this.ngProgress.done()
    //   }
    // }
    AppComponent.prototype.getRouteAnimation = function (outlet) {
        return outlet.activatedRouteData.animation;
    };
    AppComponent = __decorate([
        Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            animations: [
                trigger('routerAnimation', [
                    transition('* <=> *', [
                        // Initial state of new route
                        query(':enter', style({
                            position: 'fixed',
                            width: '100%',
                            transform: 'translateX(-100%)'
                        }), { optional: true }),
                        // move page off screen right on leave
                        query(':leave', animate('500ms ease', style({
                            position: 'fixed',
                            width: '100%',
                            transform: 'translateX(100%)'
                        })), { optional: true }),
                        // move page in screen from left to right
                        query(':enter', animate('500ms ease', style({
                            opacity: 1,
                            transform: 'translateX(0%)'
                        })), { optional: true }),
                    ])
                ])
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
