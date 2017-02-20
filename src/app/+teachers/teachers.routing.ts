import { Routes, RouterModule } from '@angular/router';
import {TeachersComponent} from "./components/teachers.component";
import {ModuleWithProviders} from "@angular/core";
import { AdminGuard } from '../admin.guard.service';

export const teachersRoutes: Routes = [
    {
        path: '',
        component: TeachersComponent,
        data: {
            pageTitle: '教师账号管理'
        },
        canActivate: [AdminGuard]
    }
];

export const teachersRouting:ModuleWithProviders = RouterModule.forChild(teachersRoutes);

