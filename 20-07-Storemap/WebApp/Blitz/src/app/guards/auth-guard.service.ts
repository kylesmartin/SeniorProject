import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private  oktaAuth: OktaAuthService, private _router: Router) {
  }
  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    console.log("canActivate"+this.oktaAuth.isAuthenticated());
    let route = this._router;
    return this.oktaAuth.isAuthenticated().then(function(x){
      console.log(x);
      if(x){
        console.log("authenticated");
        return true;
      }else{
        console.log("rerouting");
        // navigate to login page
        route.navigate(['/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
      }
    });
    
    
      
  }

}
