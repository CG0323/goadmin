

import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginInfoComponent} from "./login-info/login-info.component";
import {LoginoutComponent} from "./loginout/loginout.component";

@NgModule({
  imports: [CommonModule],
  declarations: [LoginInfoComponent, LoginoutComponent],
  exports: [LoginInfoComponent, LoginoutComponent]
})
export class UserModule{}
