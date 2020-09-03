import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { UserDetails } from '../services/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _sessionService: SessionService, private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails = <UserDetails>this._sessionService.getItem(SESSION_STORAGE.currentUser);
    if (!userDetails) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
