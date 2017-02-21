// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

// app
import {Student} from '../models/index';
import {AppConfig} from '../../app-config';
import {CoolLocalStorage } from 'angular2-cool-storage';

@Injectable()
export class StudentService {
  constructor(
    private localStorage: CoolLocalStorage,
    private authHttp: AuthHttp,
    private http: Http
  ) {}

  getStudents():Observable<any>{
    return this.authHttp.get(AppConfig.LOGIN_BASE + 'students')
      .map(res=>res.json())
  }

  addStudent(student:Student):Observable<any>{
    return this.authHttp.post(AppConfig.LOGIN_BASE + 'student', student)
      .map(res=>res.json())
  }

  deleteStudent(id:string):Observable<any>{
    return this.authHttp.delete(AppConfig.LOGIN_BASE  + id)
      .map(res => res.json())
  }
}
