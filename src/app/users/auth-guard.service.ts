import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    return this.authService.isLoggedIn().map(e => {
         if (e) {
             return true;
         } else {
             this.router.navigate(["/users-sign-in"]);
             return false;
         }
        });
  }

}
