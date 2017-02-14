import { Component, OnInit, ViewChild } from '@angular/core';
import {CertificateService} from '../services/certificate.service';
import {Certificate} from '../models/index';
import {DataTable} from 'primeng/primeng';
import { NotificationService} from "../../shared/utils/notification.service";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-cert-search',
  templateUrl: './certificates-search.component.html'
})
export class CertificatesSearchComponent implements OnInit {
  private certificates:Certificate[] = null;
  private searchText: string;
  constructor(private certificateService: CertificateService, private notificationService: NotificationService) { 
  }

  ngOnInit() {
  }

  search(){
    if(!this.searchText || this.searchText ===""){
      this.certificates = null;
      return;
    }
    
    this.certificateService.clientSearchCertificates(this.searchText)
    .subscribe(certs=> {
      this.certificates = certs;
    });
  }

    getDate(dt:string){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }

}
