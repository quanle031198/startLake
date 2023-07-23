import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, of, switchMap, map} from 'rxjs';
import {AccountService} from '../../services/account.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {CommonUtils} from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  /**
   * Constructor
   */
  constructor(
    private _oauthService: OAuthService,
    private _router: Router,
    private accountService: AccountService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(childRoute);
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
   return this.check(route);
  }

  check(route: ActivatedRouteSnapshot | Route): Observable<boolean> | Promise<boolean> | boolean {
    const hasIdToken = this._oauthService.hasValidIdToken();
    const hasAccessToken = this._oauthService.hasValidAccessToken();
    const authorities = route.data['authorities'];
    if (this._oauthService.hasValidAccessToken()) {
      return (hasIdToken && hasAccessToken && (!authorities || authorities?.filter(authorize => CommonUtils.havePermission(authorize)).length > 0));
    }

    this._router.navigate([this._router.url]);
    return this._oauthService.loadDiscoveryDocumentAndLogin();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
