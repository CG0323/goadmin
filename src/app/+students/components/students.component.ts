import { Component, OnInit, ViewChild } from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../models/index';
import {ModalDirective} from "ng2-bootstrap";
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import {NotificationService} from "../../shared/utils/notification.service";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  constructor(private studentService: StudentService, private notificationService: NotificationService) { 
  }

  ngOnInit() {
  }

}
