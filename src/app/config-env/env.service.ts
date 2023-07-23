export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrlFe = '';
  public apiUrl = '';
  public imageUrl = '';
  public sso = '';
  public webPortalURL = '';
  public appCode = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {
  }
}
