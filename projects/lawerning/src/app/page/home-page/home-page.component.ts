import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Constants from '../../constants/constant';
import { CourseAllResponse } from '../../model/course-all-response';
import { TeacherForAdminDTO } from '../../model/teacher-dto/teacher-admin-response';
import { CourseService } from '../../service/course.service';
import { TeacherService } from '../../service/teacher.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  courses: CourseAllResponse[];
  mentors: TeacherForAdminDTO[];
  responsiveOptions;

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private route: Router
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '568px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe((data) => {
      this.mentors = data.result;

      if (this.mentors.length > 0) {
        console.log(this.mentors);

        this.mentors.forEach((val) => {
          if (!val.idPhoto) {
            val.idPhoto = 'assets/images/default.png';
          } else {
            val.idPhoto = `${Constants.BASE_URL_FILE}/${val.idPhoto}`;
          }
        });
      }
    });

    this.courseService.getCourseAll().subscribe((result) => {
      this.courses = result.result;
      console.log(this.courses);

      this.courses.forEach((data) => {
        let start = new Date(data.periodStart);
        let end = new Date(data.periodEnd);
        let diff = end.valueOf() - start.valueOf();

        let oneDay = 1000 * 60 * 60 * 24;
        let day = Math.floor(diff / oneDay);

        data.duration = Math.ceil(day / 7);
        if (!data.teacher.photoId) {
          data.teacher.photoId = `assets/images/default.png`;
        } else {
          data.teacher.photoId = `${Constants.BASE_URL_FILE}/${data.teacher.photoId}`;
        }
      });
    });
  }

  viewModule(index: number) {
    let tempCourse: CourseAllResponse = this.courses[index];
    let id: string = tempCourse.id;
    this.route.navigate([`/course/module/${id}`]);
  }
}
