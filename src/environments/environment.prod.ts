// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const COMMOM_CONFIG = {
  REALMS_NAME:  window['__env']['REALMS_NAME'],
  BASE_URL: window['__env']['BASE_URL'],
  HOST_KEY_CLOAK: window['__env']['HOST_KEY_CLOAK'],
  CLIENT_ID: window['__env']['CLIENT_ID'],
  CLIENT_ID_ROLE: window['__env']['CLIENT_ID_ROLE'],
};

export const environment = {
  production: true,
  apiUrl: window['__env']['apiUrl'],
  apiPath: {
    keycloakPermission: `/realms/${COMMOM_CONFIG.REALMS_NAME}/protocol/openid-connect/token`,
  },
  keycloak: {
    // Url of the Identity Provider
    issuer: `${COMMOM_CONFIG.HOST_KEY_CLOAK}/realms/${COMMOM_CONFIG.REALMS_NAME}`,
    // URL of the SPA to redirect the user to after login
    redirectUri: `${COMMOM_CONFIG.BASE_URL}`,

    clientIdRole: `${COMMOM_CONFIG.CLIENT_ID_ROLE}`,
    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    // clientId: 'crm',
    clientId: `${COMMOM_CONFIG.CLIENT_ID}`,

    // dummyClientSecret: 'faffae86-4b61-4c74-aa54-960a67fa0ad6',
    // dummyClientSecret: `${COMMOM_CONFIG.CLIENT_SECRET}`,

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    showDebugInformation: false,
    disableAtHashCheck: true,
  },

  logoutUrl: `${COMMOM_CONFIG.HOST_KEY_CLOAK}/realms/${COMMOM_CONFIG.REALMS_NAME}/logout?client_id=${
    COMMOM_CONFIG.CLIENT_ID}&returnTo=${encodeURIComponent(COMMOM_CONFIG.BASE_URL)}`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
