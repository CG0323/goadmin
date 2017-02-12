import { Component, OnInit, ViewChild } from '@angular/core';
import {CertificateService} from '../services/certificate.service';
import {Certificate} from '../models/index';
import {ModalDirective} from "ng2-bootstrap";
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import {NotificationService} from "../../shared/utils/notification.service";
@Component({
  selector: 'app-cert-manager',
  templateUrl: './certificates-manager.component.html'
})
export class CertificatesManagerComponent implements OnInit {
  @ViewChild('dt') dataTable: DataTable;
  @ViewChild('lgModal') public lgModal:ModalDirective;
  private certificates:Certificate[] = [];
  private totalCount : number = 0;
  private globalFilter: string;
  private importText:string;
  private formatError:boolean;

  constructor(private certificateService: CertificateService, private notificationService: NotificationService) { 
  }

  ngOnInit() {
  }


  getDate(dt:string){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }

  loadCertificates(event: LazyLoadEvent) {
    this.certificateService.searchCertificates(event.first, event.rows, this.globalFilter)
    .subscribe(data=>{
      this.certificates = data.certificates;
      this.totalCount = data.totalCount;
    })
  }

  filterChange(newValue){
      this.globalFilter = newValue;
      this.forceRefresh();
  }

  forceRefresh(){
    let paging = {
            first: this.dataTable.first,
            rows: 20
      };
      this.dataTable.paginate(paging);
  }

  importCertificates(){
    if(!this.importText){
      this.formatError = true;
      return;
    }
    let text = this.trim(this.importText);
    let lines = text.split('\n');
    let certs:Certificate[] = [];
    for(let i = 0; i < lines.length; i++){
      let cert = this.parseCertificateFromText(lines[i]);
      if(!cert){
        // this.formatError = true;
        // return;
      }else{
        certs.push(cert);
      }
      
    }
    this.certificateService.saveCertificates(certs).subscribe(res => {
      this.lgModal.hide();
      this.importText = "";
      this.forceRefresh();
      this.notificationService.bigBox({
        title: "批量导入完成",
        content: res.message,
        color: "#739E73",
        timeout: 3000,
        icon: "fa fa-check",
      });
    })
  }

  parseCertificateFromText(line:string):Certificate{
    let text = this.trim(line);
    let items = text.split(/\s+/g);
    if(items.length < 4){
      return null;
    }
    let cert:Certificate = <Certificate>{};
    cert.certificate_id = items[0];
    cert.name = items[1];
    cert.date = new Date(items[2]);
    cert.content = items[3];
    return cert;
  }

  textChanged(newText){
    this.formatError = false;
  }

  trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }
}
