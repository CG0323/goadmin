import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { certificatesRouting } from './certificates.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {CERTIFICATES_COMPONENTS} from "./components/index";
// import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {DataTableModule,SharedModule,CalendarModule} from 'primeng/primeng';
import {CertificateService} from './services/certificate.service';
@NgModule({
  imports: [
    CommonModule,
    // SmartadminDatatableModule,
    certificatesRouting,
    SmartadminModule,
    DataTableModule,
    SharedModule,
    CalendarModule
  ],
  declarations: [CERTIFICATES_COMPONENTS],
  providers: [CertificateService]
})
export class CertificatesModule { }
