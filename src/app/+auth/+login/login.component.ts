import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from '../auth.service';
import {NotificationService} from "../../shared/utils/notification.service";
import {UserService} from "../../shared/user/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private username;
  private password:string;

  constructor(private router: Router, 
  private authService: AuthService,
  private notificationService: NotificationService,
  private userService: UserService,

  ) { }

  ngOnInit() {
  }

  login(){
    event.preventDefault();
    this.authService.authenticate(this.username, this.password)
    .subscribe(user => {
        if(user){
          this.notificationService.smallBox({
          title: "登陆成功",
          content: "欢迎登陆",
          color: "#739E73",
          timeout: 3000,
          iconSmall: "fa fa-check",
        });
        this.userService.setUserInfo(user);
        this.router.navigate(['/certificates/manage'])
      }else{
          this.notificationService.bigBox({
          title: "登陆失败",
          content: "账号或密码有误，请重新输入",
          color: "#C46A69",
          icon: "fa fa-warning shake animated",
          number: "1",
          timeout: 4000
        });
      }
    })
  }

}
