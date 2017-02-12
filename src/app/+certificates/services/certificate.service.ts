// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// app
import { CERTIFICATE } from '../common/category.common';

import {Certificate} from '../models/index';
import {AppConfig} from './app-config';

@Injectable()
export class CertificateService {
  constructor(
    private http: Http
  ) {}

  searchCertificates(first:number, rows:number, search:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let params = {first:first, rows:rows, search:search};
    return this.http.post(AppConfig.API_BASE + 'certificates/search', params, options)
      .map(res => res.json());
  }

  deleteCertificate(id:string):Observable<any>{
    return this.http.delete(AppConfig.API_BASE + 'certificates/' + id)
      .map(res => {
        return {res:res.json()};
      });
  }

  saveCertificates(certificates:Certificate[]):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppConfig.API_BASE + 'certificates/bulk', certificates, options)
      .map(res=>res.json());
  //   let tasks = [];

  //   for(let i = 0; i < certificates.length; i++){
  //     let task = this.http.post(AppConfig.API_BASE + 'certificates/', certificates[i], options);
  //     tasks.push(task);
  //   }
  //   return Observable.forkJoin(tasks).map(res => res.length);
  // }
  }

}
