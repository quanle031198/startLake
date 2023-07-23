import {ResourcePermission} from '../models/resource-permission.model';
import {Injectable} from '@angular/core';
import {AccessToken} from '../models/access-token.model';
import {CryptoService} from '@shared/services';
import {ACCESS_TOKEN, USER_LOGIN} from "@core/app.constant";

@Injectable({
  providedIn: 'root'
})
class StorageData {
  resourcePermission: ResourcePermission[];
  currentUrl: any;
}

export class AppStorage {
  public static data: StorageData;
  private static exprireIn = '_exprireIn';
  private static instanceName = '_AppStorage';

  private static storage = localStorage;

  /**
   * init
   */
  public static init(): void {

  }

  /**
   * isExprited
   */
  public static isExprired(): boolean {
    return false;
  }

  /**
   * clear
   */
  public static clear(): void {
    this.storage.removeItem(this.instanceName);
  }

  /**
   * storedData
   */
  public static storedData(): StorageData {
    const storedData = this.storage.getItem(this.instanceName);
    if (this.isNullOrEmpty(storedData)) {
      return null;
    }
    return CryptoService.decr(storedData);
  }

  public static isNullOrEmpty(str: any): boolean {
    return !str || (str + '').trim() === '';
  }

  /**
   * get
   */
  public static get(key: string): any {
    if (this.isExprired()) {
      return null;
    }
    const storedData = this.storedData();
    if (storedData == null) {
      return null;
    }
    return storedData[key];
  }

  /**
   * get
   */
  public static set(key: string, val: any): any {
    let storedData = this.storedData();
    if (storedData == null) {
      storedData = new StorageData();
    }
    storedData[key] = val;

    this.storage.setItem(this.instanceName, CryptoService.encr(storedData));
  }


  /**
   * getAccessToken
   */
  public static getAccessToken(): AccessToken {
    return this.get(ACCESS_TOKEN);
  }

  /**
   * setAccessToken
   */
  public static setAccessToken(accessToken): void {
    return this.set(ACCESS_TOKEN, accessToken);
  }

  /**
   * getUserLogin
   */
  public static getUserLogin(): string {
    return this.get(USER_LOGIN);
  }

  /**
   * setUserLogin
   */
  public static setUserLogin(userLogin): any {
    return this.set(USER_LOGIN, userLogin);
  }


  /**
   * getResourcePermission
   */
  public static getResourcePermission(): ResourcePermission[] {
    return this.get('resourcePermission');
  }

  /**
   * setResourcePermission
   */
  public static setResourcePermission(resourcePermission): any {
    return this.set('resourcePermission', resourcePermission);
  }

  /**
   * getCurrentUrl
   */
  public static getCurrentUrl(): any {
    return this.get('currentUrl');
  }

  /**
   * setCurrentUrl
   */
  public static setCurrentUrl(currentUrl: any): void {
    this.set('currentUrl', currentUrl);
  }

  /**
   * getLanguage
   */
  public static getLanguage(): any {
    return this.get('language');
  }

  /**
   * setLanguage
   */
  public static setLanguage(language: any): void {
    this.set('language', language);
  }

  public static setEnvironment(env): any {
    return this.set('env', env);
  }

  public static getEnvironment(): any {
    return this.get('env');
  }
}
