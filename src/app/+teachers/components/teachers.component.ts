import { Component, OnInit, ViewChild } from '@angular/core';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/index';
import {ModalDirective} from "ng2-bootstrap";
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import {NotificationService} from "../../shared/utils/notification.service";
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit {

  constructor(private teacherService: TeacherService, private notificationService: NotificationService) { 
  }

  ngOnInit() {
  }

}
