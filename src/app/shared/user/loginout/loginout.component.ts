import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";

declare var $:any;

@Component({
  selector: 'sa-loginout',
  template: `
<div id="loginout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Sign In" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
          class="fa fa-sign-in"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LoginoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService) { }

  showPopup(){
    // this.notificationService.smartMessageBox({
    //   title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
    //   content : "You can improve your security further after logging out by closing this opened browser",
    //   buttons : '[No][Yes]'

    // }, (ButtonPressed) => {
    //   if (ButtonPressed == "Yes") {
    //     this.logout()
    //   }
    // });
    this.login();
  }

  login(){
      this.router.navigate(['/auth/login'])
  }

  logout(){
      this.router.navigate(['/auth/login'])
  }

  ngOnInit() {

  }



}
