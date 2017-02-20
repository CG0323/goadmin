import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRouting } from './students.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {STUDENTS_COMPONENTS} from "./components/index";
import {DataTableModule,SharedModule,CalendarModule} from 'primeng/primeng';
import {StudentService} from './services/student.service';
@NgModule({
  imports: [
    CommonModule,
    studentsRouting,
    SmartadminModule,
    DataTableModule,
    SharedModule,
    CalendarModule
  ],
  declarations: [STUDENTS_COMPONENTS],
  providers: [StudentService]
})
export class StudentsModule { }
