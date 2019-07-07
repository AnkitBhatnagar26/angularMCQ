import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { CommonServiceService } from './Shared/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private commonServiceService: CommonServiceService) { };

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userLoggedInStatus = this.commonServiceService.getUserLoggedIn();
    if (!userLoggedInStatus) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
