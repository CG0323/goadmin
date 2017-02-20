// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

// app
import {Teacher} from '../models/index';
import {AppConfig} from '../../app-config';
import {CoolLocalStorage } from 'angular2-cool-storage';

@Injectable()
export class TeacherService {
  constructor(
    private localStorage: CoolLocalStorage,
    private authHttp: AuthHttp,
    private http: Http
  ) {}

}
