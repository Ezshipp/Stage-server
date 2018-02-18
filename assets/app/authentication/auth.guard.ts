import { CookieService } from 'angular2-cookie/core';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _cookieservice:CookieService) { }

  canActivate() {
    if(this._cookieservice.get('ez_admin_cusID')!=null){
return true;
    }
     else{
this.router.navigate(['/signin']);
    return false;
     }

  }
   canActivateChild() {
    if(this._cookieservice.get('ez_admin_cusID')!=null){
return true;
    }
     else{
this.router.navigate(['/signin']);
    return false;
     }
  }
}