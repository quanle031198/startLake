(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = '${ADMIN_BACKEND_URL}/api/v1',

  window.__env.REALMS_NAME = '${KEYCLOAK_REALM}',
  window.__env.BASE_URL = '${BASE_URL_ADMIN_PORTAL}',
  window.__env.HOST_KEY_CLOAK =  '${KEYCLOAK_URL}',
  // CLIENT_ID: 'lakehouse-portal-web',
  // CLIENT_ID_ROLE: 'lakehouse-portal-be',
  window.__env.CLIENT_ID =  '${ADMIN_FE_CLIENT_ID}',
  window.__env.CLIENT_ID_ROLE =  '${ADMIN_BE_CLIENT_ID}',


  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
