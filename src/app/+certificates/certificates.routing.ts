import { Routes, RouterModule } from '@angular/router';
import {CertificatesManagerComponent} from "./components/certificates-manager.component";
import {ModuleWithProviders} from "@angular/core";

export const certificatesRoutes: Routes = [
    {
        path: '',
        component: CertificatesManagerComponent,
        data: {
            pageTitle: '证书管理'
        }
    }
];

export const certificatesRouting:ModuleWithProviders = RouterModule.forChild(certificatesRoutes);

