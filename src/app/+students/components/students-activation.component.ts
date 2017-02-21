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
      title: '支付',
      valid: false,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
      title: '完成',
      valid: true,
      checked: false,
      submitted: false,
    },
  ];

  public activeStep = this.steps[0];

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
    let idx = this.steps.indexOf(this.activeStep);
    if (idx < this.steps.length - 1) {
      this.activeStep = this.steps[idx + 1]
    }
    
  }

}
