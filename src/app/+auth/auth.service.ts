import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http,Response } from '@angular/http';
import {AppConfig} from '../app-config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  // isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    // private cookieService: CookieService,
    private http: Http
  ) {
  }


  authenticate(username:string, password:string):Observable<any> {
    return this.http.post(AppConfig.LOGIN_BASE + 'login', {username:username, password:password})
    .map(res=>res.json())
    .map(user=> {
      // this.isLoggedIn = true;
      return user;
    })
    .catch(()=> Observable.of(null));
  }

  // logout(): void {
  //   this.http.post(AppConfig.LOGIN_BASE + 'logtout',{})
  //   .subscribe(res=> {
  //     this.isLoggedIn = false;
  //   }, error=> {
  //     console.log(error);
  //   })
  // }
}
