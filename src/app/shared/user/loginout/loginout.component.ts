import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";
import {UserService} from "../user.service";

declare var $:any;

@Component({
  selector: 'sa-loginout',
  template: `
<div id="loginout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" [title]="getTitle()" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
          [class]="getClass()"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LoginoutComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService) { }

  showPopup(){
    if(!this.userService.userInfo.token){
      this.login();
    }else{
      this.notificationService.smartMessageBox({
        title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> 退出账号 <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
        content : "确定要退出账号吗？",
        buttons : '[否][是]'

      }, (ButtonPressed) => {
        if (ButtonPressed == "是") {
          this.logout();
        }
      });
    }


  }

  login(){
      this.router.navigate(['/auth/login']);
  }

  logout(){
      this.userService.resetUserInfo();
      this.router.navigate(['']);
  }

  ngOnInit() {

  }

  getClass(){
    if(this.userService.userInfo.token){
      return "fa fa-sign-out";
    }else{
      return "fa fa-sign-in"
    }
    
  }

  getTitle(){
    if(this.userService.userInfo.token){
      return "退出账号";
    }else{
      return "登陆"
    }
  }
}
