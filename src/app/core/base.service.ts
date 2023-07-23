import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonUtils} from '@shared/services/common-utils.service';

@Injectable()
export class BaseService {
  constructor(@Inject(String) public serviceUrl: string, public httpClient: HttpClient) {}

  public getRequestFile(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' });
  }

  public postRequest(url: string, data?: any): Observable<any> {
    return this.httpClient.post(url, data);
  }
  public putRequest(url: string, options?: any): Observable<any> {
    return this.httpClient.put(url, options);
  }

  getDetail(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.serviceUrl}/${id}`);
  }

  searchData(objSearch?: any): Observable<any> {
    const credentials = Object.assign({}, objSearch);
    for (const key in credentials) {
      if (credentials[key] === undefined) {
        delete credentials[key];
      }
    }
    const buildParams = CommonUtils.buildParams(credentials);
    return this.httpClient.get(`${this.serviceUrl}`, { params: buildParams })
  }

  addItem(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.serviceUrl}`, obj);
  }

  updateItem(obj: any): Observable<any> {
    return this.httpClient.put<any>(`${this.serviceUrl}`, obj);
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.serviceUrl}/${id}`);
  }
}
