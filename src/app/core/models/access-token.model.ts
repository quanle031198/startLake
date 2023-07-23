export class AccessToken {
    acr?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    allowed_origins?: Array<string>;
    aud?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    auth_time: string;
    azp?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    email_verified: boolean;
    exp?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    family_name?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    given_name?: string;
    name: string;
    iat?: string;
    iss: string;
    jti: string;
    nonce: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    preferred_username: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    realm_access: Array<string>;
    scope: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    session_state: string;
    sub: string;
    typ: string;
    email: string;
}
