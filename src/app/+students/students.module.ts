import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRouting } from './students.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminWizardsModule} from "../shared/forms/wizards/smartadmin-wizards.module";
import {STUDENTS_COMPONENTS} from "./components/index";
import {DataTableModule,SharedModule,CalendarModule,DropdownModule} from 'primeng/primeng';
import {StudentService} from './services/student.service';
@NgModule({
  imports: [
    CommonModule,
    studentsRouting,
    SmartadminModule,
    SmartadminWizardsModule,
    DataTableModule,
    SharedModule,
    CalendarModule,
    DropdownModule
  ],
  declarations: [STUDENTS_COMPONENTS],
  providers: [StudentService]
})
export class StudentsModule { }
