import {NgProgress} from 'ngx-progressbar';
import { Component } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
  } from '@angular/animations';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    animations: [
        trigger('routerAnimation', [
          transition('* <=> *', [
            // Initial state of new route
            query(':enter',
              style({
                position: 'fixed',
                width:'100%',
                transform: 'translateX(-100%)'
              }),
              {optional:true}),
            // move page off screen right on leave
            query(':leave',
              animate('500ms ease',
                style({
                  position: 'fixed',
                  width:'100%',
                  transform: 'translateX(100%)'
                })
              ),
            {optional:true}),
            // move page in screen from left to right
            query(':enter',
              animate('500ms ease',
                style({
                  opacity: 1,
                  transform: 'translateX(0%)'
                })
              ),
            {optional:true}),
          ])
        ])
      ]


})
export class AppComponent {

ngOnInit() {


}
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
getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
}