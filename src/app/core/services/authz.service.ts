import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import {COMMOM_CONFIG, environment} from '@env/environment';

@Injectable({
    providedIn: 'root'
  })
export class AuthzService extends BaseService {
    constructor(public httpClient: HttpClient) {
        super(`${COMMOM_CONFIG.HOST_KEY_CLOAK}/${environment.apiPath.keycloakPermission}`, httpClient);
    }

    public checkPermissionResourceName(data: any): Observable<any> {
        const url = `${this.serviceUrl}`;
        return this.postRequest(url , data);
      }
}
