import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from 'app/core/auth/auth.interceptor';
import {AuthConfig, OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {AuthConfigService} from '@core/services/auth-keycloak.service';
import {authConfig} from '@core/auth/auth.config';
import {COMMOM_CONFIG} from '@env/environment';
import {AuthService} from "@core/services/auth.service";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,prefer-arrow/prefer-arrow-functions
export function initApp(authConfigService: AuthConfigService) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return () => authConfigService.initAuth();
}

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: [COMMOM_CONFIG.BASE_URL],
          sendAccessToken: true
        }
      }
    ),
  ],
  providers: [
    AuthService,
    AuthConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: AuthConfig, useValue: authConfig},
    {provide: AuthConfig, useValue: authConfig},
    {provide: OAuthStorage, useValue: sessionStorage},
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthConfigService],
      multi: true,
    },
  ]
})
export class AuthModule {
}
