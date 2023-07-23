import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {delay, filter} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {of, Subscription} from 'rxjs';
import {environment} from '@env/environment';
import {AppStorage} from "./AppStorage";
import {UserService} from "@core/user/user.service";
import {User} from "@core/user/user.types";

@Injectable()
export class AuthConfigService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  private user: User = {};

  get decodedAccessToken(): any {
    return this._decodedAccessToken;
  }

  get decodedIDToken(): any {
    return this._decodedIDToken;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  timeout;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  tokenSub = new Subscription();

  constructor(
    private readonly _oauthService: OAuthService,
    private readonly _userService: UserService,
    private readonly authConfig: AuthConfig
  ) {

  }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolveFn, rejectFn) => {
      // setup oauthService
      this._oauthService.configure(this.authConfig);
      // this.oauthService.dummyClientSecret = environment.keycloak.dummyClientSecret;
      this._oauthService.logoutUrl = environment.logoutUrl;
      // this.oauthService.setStorage(localStorage);
      // this.oauthService.tokenValidationHandler = new NullValidationHandler();
      this._oauthService.tokenValidationHandler = new JwksValidationHandler();

      // subscribe to token events
      this._oauthService.events
        .pipe(filter((e: any): any => e.type === 'token_received'))
        .subscribe(() => this.handleNewToken());

      // continue initializing app or redirect to login-page

      this._oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        if (this.isAuthenticated()) {
          this._oauthService.setupAutomaticSilentRefresh();
          resolveFn();
        } else {
          this._oauthService.initImplicitFlow();
          rejectFn();
        }
      });

    });
  }

  handleNewToken(): any {
    this.tokenSub.unsubscribe();
    this._decodedAccessToken = this.jwtHelper.decodeToken(this._oauthService.getAccessToken());
    this._decodedIDToken = this.jwtHelper.decodeToken(this._oauthService.getIdToken());

    // this._decodedAccessToken = this.oauthService.getAccessToken();
    // this._decodedIDToken = this.oauthService.getIdToken();

    AppStorage.setAccessToken(this._decodedAccessToken);
    AppStorage.setUserLogin(this._decodedAccessToken.preferred_username);
    this.user.login = this._decodedAccessToken.preferred_username;
    this.user.firstName = this._decodedAccessToken.given_name;
    this.user.lastName = this._decodedAccessToken.family_name;
    this.user.email = this._decodedAccessToken.email;
    this._userService.user = this.user;
    this.timeout = this.jwtHelper.getTokenExpirationDate(this._oauthService.getAccessToken()).valueOf() - new Date().valueOf();
    this.tokenSub = of(null).pipe(delay(this.timeout)).subscribe(() => {
      AppStorage.clear();
      this._oauthService.logOut();
      this.tokenSub.unsubscribe();
    });
  }

  public isAuthenticated(): boolean {
    return this._oauthService.getAccessToken() && !this.jwtHelper.isTokenExpired(this._oauthService.getAccessToken());
  }

}
