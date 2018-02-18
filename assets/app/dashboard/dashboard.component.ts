import { Http, Headers } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/core";

import {
  animate,
  query,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { NgForm } from "@angular/forms";
import { ApiMessageService } from "../authentication/apimessages.service";
import { PayServiceModel } from "../front_end_models/payServiceModel";
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { NgProgress } from "ngx-progressbar";
@Component({
  selector: "app-das",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)"
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(-100%, 0, 0)"
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out"))
    ]),
    trigger("slideInOutforrouter", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)"
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(0, 0, 0)"
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out"))
    ]),
    trigger("routerAnimation", [
      transition("* <=> *", [
        // Initial state of new route
        query(
          ":enter",
          style({
            position: "fixed",
            width: "100%",
            transform: "translateY(-100%)"
          }),
          { optional: true }
        ),
        // move page off screen right on leave
        query(
          ":leave",
          animate(
            "500ms ease",
            style({
              position: "fixed",
              width: "100%",
              transform: "translateX(100%)"
            })
          ),
          { optional: true }
        ),
        // move page in screen from left to right
        query(
          ":enter",
          animate(
            "500ms ease",
            style({
              opacity: 1,
              transform: "translateY(0%)"
            })
          ),
          { optional: true }
        )
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  url: string = "";
  change_password: boolean;
  marginLeft = 190;
  height;
  menuState: string = "in";
  routerState: string = "in";
  isSideNav: boolean = true;
  adminName;
  isUserSection: boolean;
  selected: any;
  imgLogo = "./img/logo-blue-1.png";
  imgLogo_new = "./img/ezshippLogoNew.png";
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private _errorService: ErrorService,
    private _ApiMessageService: ApiMessageService,
    private http: Http,
    public ngProgress: NgProgress,
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }
  ngOnInit() {
    this.isUserSection =
      this.cookieService.get("ADMIN_USER_PERMISSIONS") == "true";

    if (this.cookieService.get("ez_admin_cusID") == null) {
      this.router.navigateByUrl("/signin");
    } else {
     // this.router.navigateByUrl("/dashboard");
      this.adminName = this.cookieService.get("ez_admin_Name");
    }
    this.height = window.innerHeight;
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      // this.loading = true
      this.ngProgress.start()
    }
    if (event instanceof NavigationEnd) {
      // this.loading = false
      this.ngProgress.done()
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      // this.loading = false
      this.ngProgress.done()
    }
    if (event instanceof NavigationError) {
      // this.loading = false
      this.ngProgress.done()
    }
  }
  logout() {
    this.cookieService.removeAll();
    this.router.navigateByUrl("/signin");
  }
  onselect_nav() {
    this.menuState = this.menuState === "out" ? "in" : "out";
    this.routerState = this.routerState === "out" ? "in" : "out";
    if (this.menuState == "out") {
      this.marginLeft = 0;
    } else {
      this.marginLeft = 190;
    }
    this.isSideNav = !this.isSideNav;
    this._errorService.isSideNav = !this._errorService.isSideNav;
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  onCompleteOrder() {
    this.change_password = true;
  }
  Onclosepassword() {
    this.change_password = false;
  }
  onSubmit_password(form: NgForm) {
    var Password = form.value.Password;
    var ConfirmPassword = form.value.ConfirmPassword;
    if (Password == ConfirmPassword) {
      const body = new PayServiceModel(
        this.cookieService.get("ez_admin_cusID"),
        null,
        null,
        null,
        Password,
        form.value.OldPassword
      );
      const headers = new Headers({ "Content-Type": "application/json" });
      return this.http
        .post(this.url + "/Update_Super_Admin_Password", body, {
          headers: headers
        })
        .subscribe(data => {
          if (data.json().success) {
            this.change_password = false;
            form.resetForm();
            var message = data.json().extras.Status;
            this._errorService.handleError(message);
          } else {
            const msgNumber: number = parseInt(data.json().extras.msg);
            let message = this._ApiMessageService.ApiMessages[msgNumber];
            this._errorService.handleError(message);
          }
        });
    } else {
      var message = "New Password and Confirm Password should match";
      this._errorService.handleError(message);
    }
  }
}
