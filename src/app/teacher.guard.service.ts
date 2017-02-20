import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable,OnInit, OnDestroy} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import {CoolLocalStorage} from 'angular2-cool-storage'

@Injectable()
export class TeacherGuard implements CanActivate, OnInit, OnDestroy{
  private jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private router: Router,
    private localStorage : CoolLocalStorage
    ){
  }

  ngOnInit():void {

  }

  ngOnDestroy(){
  }

  canActivate(){
      var token = this.localStorage.getItem('token');
      if(token){
        let user = this.jwtHelper.decodeToken(token);
        let expired = this.jwtHelper.isTokenExpired(token)
        if(!expired && (user.role === "管理员"|| user.role === "老师")){
          return true;
        }
      }
      this.router.navigate(['certificates/search']);
      return false;      
  }
}
