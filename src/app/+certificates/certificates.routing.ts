import { Routes, RouterModule } from '@angular/router';
import {CertificatesManagerComponent} from "./components/certificates-manager.component";
import { CertificatesSearchComponent } from './components/certificates-search.component';
import {ModuleWithProviders} from "@angular/core";
import { AdminGuard } from '../admin.guard.service';

export const certificatesRoutes: Routes = [
    {
        path: 'manage',
        component: CertificatesManagerComponent,
        data: {
            pageTitle: '证书管理'
        },
        canActivate: [AdminGuard]
    },
    {
        path: 'search',
        component: CertificatesSearchComponent,
        data: {
            pageTitle: '证书查询'
        }
    }
];

export const certificatesRouting:ModuleWithProviders = RouterModule.forChild(certificatesRoutes);

