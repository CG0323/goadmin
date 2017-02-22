import { Component, OnInit, ViewChild } from '@angular/core';
import {StudentService} from '../services/student.service';
import {DataExchangeService} from '../services/data-exchange.service';
import {Student} from '../models/index';
import {ModalDirective} from "ng2-bootstrap";
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import {NotificationService} from "../../shared/utils/notification.service";
import { Observable } from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {
  // @ViewChild('dt') dataTable: DataTable;
  @ViewChild('addModal') public addModal:ModalDirective;
  private newStudent:Student = <Student>{};
  private students:Student[] = [];
  private addError = null;
  private statusList = [];
  private selectedStudents = [];
  constructor(
      private studentService: StudentService,
      private localStorage: CoolLocalStorage,
      private notificationService: NotificationService,
      private router: Router
  ) { 
    this.loadStudents();
    this.statusList = [];
    this.statusList.push({label: '所有状态', value: null});
    this.statusList.push({label: '未激活', value: '未激活'});
    this.statusList.push({label: '已激活', value: '已激活'});
    this.statusList.push({label: '已过期', value: '已过期'});
  }

  ngOnInit() {
    
  }

  loadStudents(){
    this.studentService.getStudents()
    .catch(err=> this.handleError(err))
    .subscribe(students=>{
      this.students = students;
    }, error => this.handleError);
  }

  addStudent(){
    this.studentService.addStudent(this.newStudent)
    .catch(err=>{
      this.addError = err.json().message;
      return Observable.throw(err);
    })
    .subscribe((res) => {
      this.addModal.hide();
      this.addError = null;
      this.newStudent = <Student>{};
      this.loadStudents();
      this.notificationService.smallBox({
        title: "账号添加完成",
        content: res.message,
        color: "#739E73",
        timeout: 3000,
        iconSmall: "fa fa-check",
      });
    })
  }

  deleteStudent(id: string){
    this.notificationService.smartMessageBox({
      title: "删除确认",
      content: "确认要删除此学员账号?",
      buttons: '[否][是]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "是") {
        this.studentService.deleteStudent(id)
            .catch(err=> this.handleError(err))
            .subscribe(res=>{
              this.loadStudents();
              this.notificationService.smallBox({
                title: "操作成功",
                content: "学员账号已删除",
                color: "#739E73",
                timeout: 3000,
                iconSmall: "fa fa-check",
              });
            }, error => this.handleError)
      }
    });
  }

  activate(){
    this.localStorage.setObject("students_to_activate",this.selectedStudents);
    this.router.navigate(['./students/activation']);
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

  getDate(dt:string){
    if(!dt){
      return "";
    }
    var matchDate = new Date(dt);
    return matchDate.toLocaleDateString();
  }

  usernameChanged(newText){
    this.addError = null;
  }

  getStatusClass(status:string){
    if(status === "已激活"){
      return "label label-success txt-color-white";
    }else if (status === "未激活"){
      return "label label-warning txt-color-white";
    }else{
      return "label label-default txt-color-white";
    }
  }

}
