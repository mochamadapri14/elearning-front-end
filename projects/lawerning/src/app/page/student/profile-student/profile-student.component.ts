import { Component, OnInit } from '@angular/core';
import { StudentResponse } from '../../../model/student/student-response';
import { AuthService } from '../../../service/auth.service';
import { ModuleService } from '../../../service/module.service';
import { StudentService } from '../../../service/student.service';
import { Gender } from '../../../model/gender';
import { StudentUpdateRequest } from '../../../model/student/student-edit-request';
import { ToastService } from '../../../service/toast.service';
import { Router } from '@angular/router';
import { CourseService } from '../../../service/course.service';
import { CourseProgressResponse } from '../../../model/course-dto/course-progress-response';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css'],
})
export class ProfileStudentComponent implements OnInit {
  studentProfile = new StudentResponse();
  formData = new FormData();
  photo: any;

  result: any = [];

  isTwoRow: boolean = false;
  mymodules: CourseProgressResponse[];

  isDisplay = false;
  blockedDocument: boolean = false;

  constructor(
    private studentService: StudentService,
    private auth: AuthService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService
      .getCourseProgress(this.auth.getLoginResponse().userRoleId)
      .subscribe((data) => {
        this.mymodules = data.result;
        if (this.mymodules.length > 0) {
          this.mymodules.forEach((res) => {
            let val = (res.moduleComplete / res.totalModule) * 100;
            res.value = Math.ceil(val);
            if (isNaN(res.value)) {
              res.value = 0;
              console.log(res.value);
            }
          });
        }
      });

    this.studentService.getProfile().subscribe((value) => {
      this.studentProfile = value.result;
      console.log(this.studentProfile.idPhoto);

      if (!this.studentProfile.idPhoto) {
        this.photo = `assets/images/default.png`;
      } else {
        this.photo = `http://192.168.15.224:8080/file/${this.studentProfile.idPhoto}`;
      }
    });

    // this.mymodules.forEach((value) => {
    //   let percent = (value.value / value.total) * 100;

    //   this.result.push(Math.ceil(percent));
    // });
    // console.log(this.result);
  }

  showDialog() {
    this.isDisplay = true;
    this.blockedDocument = true;
  }
  cancelDialog() {
    this.blockedDocument = false;
    this.isDisplay = false;
  }

  openFormEdit(data: StudentResponse) {
    this.router.navigate(['/student/update-profile', data]);
  }
}
