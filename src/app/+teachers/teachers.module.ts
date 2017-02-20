import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { teachersRouting } from './teachers.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {TEACHERS_COMPONENTS} from "./components/index";
import {DataTableModule,SharedModule,CalendarModule} from 'primeng/primeng';
import {TeacherService} from './services/teacher.service';
@NgModule({
  imports: [
    CommonModule,
    teachersRouting,
    SmartadminModule,
    DataTableModule,
    SharedModule,
    CalendarModule
  ],
  declarations: [TEACHERS_COMPONENTS],
  providers: [TeacherService]
})
export class TeachersModule { }
