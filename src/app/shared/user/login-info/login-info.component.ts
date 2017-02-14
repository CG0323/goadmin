import {Component, OnInit, OnDestroy, Input,NgZone} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";

@Component({
  selector: 'sa-login-info',
  templateUrl: './login-info.component.html'
})
export class LoginInfoComponent implements OnInit {

  private user:any;
  private subscription;

  constructor(
    private userService: UserService,
    private layoutService: LayoutService) {
      
  }

  ngOnInit() {
    this.user = this.userService.userInfo;
    this.subscription = this.userService.getLoginInfo()
    .subscribe(user=>{
      this.user = user;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
