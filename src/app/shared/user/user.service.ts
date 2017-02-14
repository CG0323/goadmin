import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import { Http,Response } from '@angular/http';
import {AppConfig} from '../../app-config';
import {JsonApiService} from '../../core/api/json-api.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
@Injectable()
export class UserService {
  public user: Subject<any>;
  public userInfo: any;

  constructor(
    private http: Http,
    private jsonApiService: JsonApiService,
    private localStorage: CoolLocalStorage
    ) {
      this.userInfo = this.localStorage.getObject('user');
      
      if(!this.userInfo){
        this.resetUserInfo();
      }
      this.user = new Subject();
      this.user.next(this.userInfo);
  }

  resetUserInfo(){
    this.userInfo = {
          username: 'Guest',
          name: '访客',
          role: '访客',
          token: null
        };
    this.localStorage.setObject('user',this.userInfo);
    this.user.next(this.userInfo);
  }

  setUserInfo(userInfo:any){
    if(userInfo){
      this.userInfo = userInfo;
      this.localStorage.setObject('user',this.userInfo);
      this.user.next(userInfo);
    }
  }

  getLoginInfo():Observable<any> {
    this.user.next(this.userInfo);
    return this.user.asObservable();
  }

}
