import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from "./components/students.component";
import {ModuleWithProviders} from "@angular/core";
import {TeacherGuard} from '../teacher.guard.service';

export const studentsRoutes: Routes = [
    {
        path: '',
        component: StudentsComponent,
        data: {
            pageTitle: '学员账号管理'
        },
        canActivate: [TeacherGuard]
    }
];

export const studentsRouting:ModuleWithProviders = RouterModule.forChild(studentsRoutes);

