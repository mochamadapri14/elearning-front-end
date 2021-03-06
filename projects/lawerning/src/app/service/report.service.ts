import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Constants from '../constants/constant';
import { AttendanceReport } from '../model/attendance-report';
import { ReportScoreResponse } from '../model/report-score-response';
import { ResponseModel } from '../model/response-model';
import { StudentReportResponse } from '../model/student-report-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  downloadReporting() {
    let header = new HttpHeaders();
    return this.http.get(
      `${Constants.BASE_URL}/student/report/${
        this.auth.getLoginResponse().userRoleId
      }`,
      { headers: header.set('Accept', 'application/pdf'), responseType: 'blob' }
    );
  }

  getStudentReporting(): Observable<ResponseModel<StudentReportResponse[]>> {
    return this.http.get<ResponseModel<StudentReportResponse[]>>(
      `${Constants.BASE_URL}/student/report?studentId=${
        this.auth.getLoginResponse().userRoleId
      }`
    );
  }

  getAttendanceReportTeacher(
    courseId: string
  ): Observable<ResponseModel<AttendanceReport[]>> {
    return this.http.get<ResponseModel<AttendanceReport[]>>(
      `${Constants.BASE_URL}/course/attendance/reports/${courseId}`
    );
  }

  getReportScore(
    moduleId: string
  ): Observable<ResponseModel<ReportScoreResponse[]>> {
    return this.http.get<ResponseModel<ReportScoreResponse[]>>(
      `${Constants.BASE_URL}/teacher/reports/${moduleId}`
    );
  }
}
