import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {PopoverModule} from "ng2-popover";

import {CollapseMenuComponent} from "./collapse-menu/collapse-menu.component";

import {HeaderComponent} from "./header.component";

import {UtilsModule} from "../../utils/utils.module";
import {UserModule} from "../../user/user.module";
import {DropdownModule} from "ng2-bootstrap";


@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    DropdownModule,

    UtilsModule, UserModule, PopoverModule,
  ],
  declarations: [
    CollapseMenuComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
