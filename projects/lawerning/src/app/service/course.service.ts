import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseAvailableResponse } from '../model/course-available-response';
import { CourseStudentResponse } from '../model/course-student-response';
import { CourseTeacherResponse } from '../model/course-teacher-response';
import { ResponseModel } from '../model/response-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://192.168.15.224:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAvailableCourse(): Observable<ResponseModel<CourseAvailableResponse[]>> {
    return this.http.get<ResponseModel<CourseAvailableResponse[]>>(
      `${this.baseUrl}/course/available`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }
  // http://192.168.15.224:8080/student/ddbf2c2a-f0ad-46bc-ad64-088860fe1d9a/course
  getStudentCourse(
    id: string
  ): Observable<ResponseModel<CourseStudentResponse[]>> {
    return this.http.get<ResponseModel<CourseStudentResponse[]>>(
      `${this.baseUrl}/student/${id}/course`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }

  getCourseTeacher(): Observable<ResponseModel<CourseTeacherResponse[]>> {
    return this.http.get<ResponseModel<CourseTeacherResponse[]>>(
      `${this.baseUrl}/teacher/dashboard/${
        this.authService.getLoginResponse().userId
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }
}