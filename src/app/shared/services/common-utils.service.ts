import {HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from '@core/app.constant';
import {ResourcePermission} from "@core/models/resource-permission.model";
import {AppStorage} from "@core/services/AppStorage";

@Injectable({
  providedIn: 'root'
})
export class CommonUtils {

  public static buildParams(obj: any): HttpParams {
    return Object.entries(obj || {})
      .reduce((params, [key, value]) => {
        if (value === null) {
          return params.set(key, String(''));
        } else if (typeof value === typeof {}) {
          return params.set(key, JSON.stringify(value));
        } else {
          return params.set(key, String(value));
        }
      }, new HttpParams({encoder: new CustomEncoder()}));
  }
  public static formatCurrency(value: any): any {
    if (value == null || value.toString().trim() === ''
      || isNaN(value = value.toString().replace(/,/g, ''))) {
      return null;
    }
    // value = value.toString().replace(/,/g, '');
    if (parseFloat(value).toString().indexOf('.') > -1) {
      const values = parseFloat(value).toString().split('.');
      // eslint-disable-next-line radix
      return [String(parseInt(values[0], 0)).replace(/(.)(?=(\d{3})+$)/g, '$1,'), values[1]].join('.');
    } else {
      if (value.startsWith('-')) {
        // eslint-disable-next-line radix
        return `-${String(Math.abs(parseInt(value, 0))).replace(/(.)(?=(\d{3})+$)/g, '$1,')}`;
      } else {
        // eslint-disable-next-line radix
        return String(parseInt(value, 0)).replace(/(.)(?=(\d{3})+$)/g, '$1,');
      }

    }
  }

  public static dateToString(value: any, isFullDate?: boolean): any {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    if (typeof value === 'string') {
      return value;
    }
    if (isFullDate) {
      return moment(value).format(DATE_TIME_FORMAT);
    }
    return moment(value).format(DATE_FORMAT);
  }

  public static stringToDate(value: any, isFullDate?: boolean): any {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    if (isFullDate) {
      return moment(value, DATE_TIME_FORMAT).toDate();
    }
    return moment(value, DATE_FORMAT).toDate();
  }

  public static replaceComma(value: any): string {
    if (value == null || value.toString().trim() === '') {
      return null;
    }
    return value.toString().replace(/,/g, '');
  }

  /**
   * has Permission
   */
  public static havePermission(authorize: string): boolean {
    if (!authorize) {
      return false;
    }
    const resourceKey = authorize.split('.')[0];
    const permissionKey = authorize.split('.')[1];
    const resourcePermission: ResourcePermission[] = AppStorage.getResourcePermission();
    if (resourcePermission == null) {
      return false;
    }

    const obj: ResourcePermission = resourcePermission.filter(x => x.rsname === resourceKey)[0];
    const scopes: string[] = obj.scopes;
    return obj.rsname === resourceKey && scopes.indexOf(permissionKey) > -1;
  }

  public static getPermissionByResourceCode(resourceKey: string): any {
    if (!resourceKey) {
      return null;
    }
    const resourcePermission: ResourcePermission[] = AppStorage.getResourcePermission();
    if (resourcePermission == null) {
      return null;
    }

    return resourcePermission.filter(x => x.rsname === resourceKey)[0];
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
