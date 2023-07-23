/* eslint-disable arrow-parens */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AppStorage } from '@core/services/AppStorage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  /**
   * Constructor
   */
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.check(route)) {
      return true;
    }
    // dashboards
    this.router.navigate([`/dashboards`]);

    this._snackBar.open(
      'Bạn không có quyền truy cập, vui lòng liên hệ quản trị viên.',
      '',
      {
        panelClass: 'bg-primary',
      }
    );
    return false;
  }

  check(
    route: ActivatedRouteSnapshot | Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    const resourcePermissions = AppStorage.getResourcePermission();
    const permissions = route.data.permissions;
    return resourcePermissions.some((resourcePermission) =>
      permissions.includes(resourcePermission.rsname)
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
