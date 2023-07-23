import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared/request-util';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {
  }

  getListUser(obj?): Observable<any> {
    const temp = {
      keyword: '',
      id: '',
      ...obj
    };
    const params = createRequestOption(temp);
    // const params = createRequestOption(obj);
    return this.http.get(`${environment.apiUrl}/user`, {params, observe: 'response'});
  }

  getUserById(id?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${id}`, {observe: 'response'});
  }

  addOrEditUser(user: any): Observable<any> {
    if (user?.id) {
      return this.http.put(`${environment.apiUrl}/user`, user, {observe: 'response'});
    } else {
      return this.http.post(`${environment.apiUrl}/user`, user, {observe: 'response'});
    }
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`, {observe: 'response'});
  }

  getListGroup(obj?: any): Observable<any> {
    const params = createRequestOption(obj);
    return this.http.get(`${environment.apiUrl}/group`, {params, observe: 'response'});
  }

  getGroupDetail(id?: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group/${id}`, {observe: 'response'});
  }

  addOrEditGroup(group: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/group`, group, {observe: 'response'});
  }

  deleteGroup(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/group/${id}`, {observe: 'response'});
  }

  getListRole(obj?: any): Observable<any> {
    const params = createRequestOption(obj);
    return this.http.get(`${environment.apiUrl}/role`, {params, observe: 'response'});
  }

  addOrEditRole(role: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/role`, role, {observe: 'response'});
  }

  deleteRole(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/role/${id}`, {observe: 'response'});
  }

  assignUserRole(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/role`, data, {observe: 'response'});
  }

  addRole(obj?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/role`, obj, {observe: 'response'});
  }

  getListMenu(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/menu`, {observe: 'response'});
  }

  getListMenuAction(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/menu/menu-action`, {observe: 'response'});
  }
}
