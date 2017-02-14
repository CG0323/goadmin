import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import {UserService} from "../../user/user.service";
import {Observable} from "rxjs/Rx";


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  private isAdmin:boolean;
  private subscription;
  constructor(
    private userService: UserService
  ) {
      this.subscription = this.userService.user.subscribe(user=>{
      if(user.role === "管理员"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
