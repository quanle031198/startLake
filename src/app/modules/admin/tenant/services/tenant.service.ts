import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private http: HttpClient) {}
  find(params: any) {
    return this.http.get(`${environment.apiUrl}/tenant`, { params });
  }
  create(body: any) {
    return this.http.post(`${environment.apiUrl}/tenant`, body);
  }
  update(body: any) {
    return this.http.put(`${environment.apiUrl}/tenant`, body);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/tenant/${id}`);
  }
  findPartner(){
    return this.http.get(`${environment.apiUrl}/partner`);

  }
  findServicePlan(){
    return this.http.get(`${environment.apiUrl}/service-plan`);
  }
  findOwnerList(params:any){
    return this.http.get(`${environment.apiUrl}/user`,{params});

  }
}
