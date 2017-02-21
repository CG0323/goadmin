// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

// app
import { CERTIFICATE } from '../common/category.common';

import {Certificate} from '../models/index';
import {AppConfig} from '../../app-config';
import {NotificationService} from "../../shared/utils/notification.service";
import { CoolLocalStorage } from 'angular2-cool-storage';

@Injectable()
export class CertificateService {
  constructor(
    private localStorage: CoolLocalStorage,
    private authHttp: AuthHttp,
    private http: Http,
    private notificationService: NotificationService
  ) {}

  searchCertificates(first:number, rows:number, search:string):Observable<any>{
    let params = {first:first, rows:rows, search:search};
    return this.authHttp.post(AppConfig.API_BASE + 'certificates/search', params)
      .map(res => res.json());
  }

  deleteCertificate(id:string):Observable<any>{
    return this.authHttp.delete(AppConfig.API_BASE + 'certificates/' + id)
      .map(res => res.json());
  }

  saveCertificates(certificates:Certificate[]):Observable<any>{
    return this.authHttp.post(AppConfig.API_BASE + 'certificates/bulk', certificates)
      .map(res=>res.json());
  }

  saveCertificate(certificate:Certificate):Observable<any>{
    return this.authHttp.post(AppConfig.API_BASE + 'certificates/', certificate)
      .map(res=>res.json());
  }

  clientSearchCertificates(search:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(AppConfig.API_BASE + 'certificates/client-search/'+search,  options)
      .map(res => res.json());
  }


}
