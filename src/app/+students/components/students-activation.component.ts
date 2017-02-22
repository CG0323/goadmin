import { Component, OnInit, trigger,
  state,
  style,
  transition,
  animate, OnChanges, Input, DoCheck,} from '@angular/core';
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
  selector: 'app-students-activation',
  templateUrl: './students-activation.component.html',
  animations: [
    trigger('changePane', [
      state('out', style({
        height: 0,
      })),
      state('in', style({
        height: '*',
      })),
      transition('out => in', animate('250ms ease-out')),
      transition('in => out', animate('250ms 300ms ease-in '))
    ])
  ]
})
export class StudentsActivationComponent implements OnInit {
  // @ViewChild('dt') dataTable: DataTable;
  private students:Student[] = [];
  private selectedPackage:string = "type1";
  private expirations: Date[] = [];
  private charge:number = 0;
  constructor(
    private studentService: StudentService, 
    private localStorage: CoolLocalStorage,
    private notificationService: NotificationService,
    private router: Router, 
    private route: ActivatedRoute
    ) { 
     this.students = this.localStorage.getObject("students_to_activate");
  }

  ngOnInit() {
    this.computeExpirationAndCharge(this.selectedPackage);
  } 

  computeExpirationAndCharge(selectedPackage){
    let expirations: Date[] = [];
    let addMonth:number = selectedPackage == "type1" ? 12 : 3;
    let price:number = selectedPackage == "type1" ? 30 : 10;
    for(let i = 0; i < this.students.length; i++){
      let expired_at = this.students[i].expired_at;
      let expiration = null;
      if(expired_at){
        expiration = new Date(expired_at);
        expiration.setMonth(expiration.getMonth() + addMonth);
      }else{
        let d = new Date();
        d.setMonth(d.getMonth() + addMonth)
        expiration = d;
      }
      expirations.push(expiration);

    }
    this.expirations = expirations;

    this.charge = this.students.length * price;
  }



  ////////////

  public steps = [
    {
      key: 'step1',
      title: '选择套餐',
      valid: false,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: '微信支付',
      valid: false,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
      title: '激活完成',
      valid: true,
      checked: false,
      submitted: false,
    },
  ];

  public activeStep = this.steps[0];

  getNextLabel(){
    if(this.activeStep.key === "step3"){
      return "完成"
    }else{
      return "下一步";
    }
  }

  setActiveStep(step) {
    this.activeStep = step;
  }

  prevStep() {
    let idx = this.steps.indexOf(this.activeStep);
    if (idx > 0) {
      this.activeStep = this.steps[idx - 1]
    }
  }

  nextStep() {
    if(this.activeStep.key === "step3"){
      this.router.navigate(["students"]);
    }else if(this.activeStep.key === "step2"){
      for(let i = 0; i < this.students.length; i++){
        this.students[i].expired_at = this.expirations[i];
      }
      this.saveStudents();
      let idx = this.steps.indexOf(this.activeStep);
      this.activeStep = this.steps[idx + 1];
    }else{
      let idx = this.steps.indexOf(this.activeStep);
      this.activeStep = this.steps[idx + 1];
    }
  }

  saveStudents(){
      for(let i = 0; i < this.students.length; i++){
        let student = this.students[i];
        this.studentService.updateStudent(student)
        .catch(err=> this.handleError(err))
        .subscribe(res=>{
              this.notificationService.smallBox({
                title: "操作成功",
                content: "学员账号已激活: " + student.name,
                color: "#739E73",
                timeout: 3000,
                iconSmall: "fa fa-check",
              });
        })
      }
  }

  getDate(dt:string){
    if(!dt){
      return "";
    }
    var matchDate = new Date(dt);
    return matchDate.toLocaleDateString();
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
