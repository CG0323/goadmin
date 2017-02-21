import { Component, OnInit, ViewChild } from '@angular/core';
import {CertificateService} from '../services/certificate.service';
import {Certificate} from '../models/index';
import {ModalDirective} from "ng2-bootstrap";
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import {NotificationService} from "../../shared/utils/notification.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cert-manager',
  templateUrl: './certificates-manager.component.html'
})
export class CertificatesManagerComponent implements OnInit {
  @ViewChild('dt') dataTable: DataTable;
  @ViewChild('lgModal') public lgModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  private certificates:Certificate[] = [];
  private selectedCert:Certificate = <Certificate>{};
  private totalCount : number = 0;
  private globalFilter: string;
  private importText:string;
  private formatError:boolean;
  private cn:any;
  private dateValue:Date;

  constructor(private certificateService: CertificateService, private notificationService: NotificationService) { 
      //localization for date picker
        this.cn = {
            firstDayOfWeek: 0,
            dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };
  }

  ngOnInit() {
  }


  getDate(dt:string){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }

  onLazyLoad(event: LazyLoadEvent) {
    this.loadCertificates(event.first,event.rows,this.globalFilter);
  }

  onDeleteCertificate(id: string){
    this.notificationService.smartMessageBox({
      title: "删除确认",
      content: "确认要删除此条证书?",
      buttons: '[否][是]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "是") {
        this.certificateService.deleteCertificate(id)
            .catch(err=> this.handleError(err))
            .subscribe(res=>{
              this.forceRefresh();
              this.notificationService.smallBox({
                title: "操作成功",
                content: "证书已删除",
                color: "#739E73",
                timeout: 3000,
                iconSmall: "fa fa-check",
              });
            }, error => this.handleError)
      }
    });
  }

  onEditCertificate(certificate:Certificate){
    this.selectedCert = certificate;
    this.dateValue = new Date(certificate.date);
    this.editModal.show();
  }

  loadCertificates(first:number, rows:number, search:string){
    this.certificateService.searchCertificates(first, rows, search)
    .catch(err=> this.handleError(err))
    .subscribe(data=>{
      this.certificates = data.certificates;
      this.totalCount = data.totalCount;
    }, error => this.handleError);
  }

  filterChange(newValue){
      this.globalFilter = newValue;
      let paging = {
            first: 0,
            rows: 20
      };
      this.dataTable.paginate(paging);
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
    this.certificateService.saveCertificates(certs)
    .catch(err=> this.handleError(err))
    .subscribe(res => {
      this.lgModal.hide();
      this.importText = "";
      this.forceRefresh();
      this.notificationService.smallBox({
        title: "批量导入完成",
        content: res.message,
        color: "#739E73",
        timeout: 3000,
        iconSmall: "fa fa-check",
      }, error => this.handleError);
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



  saveCert(){
    this.selectedCert.date = this.dateValue;
    this.certificateService.saveCertificate(this.selectedCert)
    .catch(err=> this.handleError(err))
    .subscribe(res => {
      this.editModal.hide();
      this.importText = "";
      // this.forceRefresh();
      this.notificationService.smallBox({
        title: "证书修改完成",
        content: "证书已成功修改",
        color: "#739E73",
        timeout: 3000,
        iconSmall: "fa fa-check",
      }, error => this.handleError);
    })
  }

  trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }

  handleError(error: any) {
    let errMsg = error.json().message || 'Server error';
    this.notificationService.bigBox({
      title: "操作失败",
      content: errMsg,
      color: "#C46A69",
      icon: "fa fa-warning shake animated",
      number: "1",
      timeout: 4000
    });
    return Observable.throw(error);
  }

}
