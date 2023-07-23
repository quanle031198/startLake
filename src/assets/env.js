(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = 'http://103.226.248.168:31000/api/v1';
  // window.__env.apiUrl = 'http://localhost:8082/api/v1';

  window.__env.REALMS_NAME = 'external-realm';
  window.__env.BASE_URL = 'http://localhost:4200';
  window.__env.HOST_KEY_CLOAK = 'http://103.226.248.168:8080';
  // CLIENT_ID: 'lakehouse-portal-web',
  // CLIENT_ID_ROLE: 'lakehouse-portal-be',
  window.__env.CLIENT_ID = 'admin-portal-web',
  window.__env.CLIENT_ID_ROLE = 'admin-portal-backend',

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
