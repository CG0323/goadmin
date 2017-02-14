// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// app
import { CERTIFICATE } from '../common/category.common';

import {Certificate} from '../models/index';
import {AppConfig} from '../../app-config';
import {NotificationService} from "../../shared/utils/notification.service";
@Injectable()
export class CertificateService {
  constructor(
    private http: Http,
    private notificationService: NotificationService
  ) {}

  searchCertificates(first:number, rows:number, search:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let params = {first:first, rows:rows, search:search};
    return this.http.post(AppConfig.API_BASE + 'certificates/search', params, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteCertificate(id:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(AppConfig.API_BASE + 'certificates/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  saveCertificates(certificates:Certificate[]):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppConfig.API_BASE + 'certificates/bulk', certificates, options)
      .map(res=>res.json())
      .catch(this.handleError);
  }

  clientSearchCertificates(search:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(AppConfig.API_BASE + 'certificates/client-search/'+search,  options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = error.json().error || 'Server error';
    console.log(errMsg);
    this.notificationService.bigBox({
      title: "操作失败",
      content: errMsg,
      color: "#C46A69",
      icon: "fa fa-warning shake animated",
      number: "1",
      timeout: 4000
    });
    return Observable.throw(errMsg);
}

}
