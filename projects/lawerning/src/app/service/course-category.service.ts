import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCategoryCreateRequestDTO } from '../model/course-category-dto/course-category-create-request';
import { CourseCategoryResponseDTO } from '../model/course-category-dto/course-category-reponse';
import { CourseCategoryUpdateRequestDTO } from '../model/course-category-dto/course-category-update-request';
import { DeleteCourseCategoryRequestDTO } from '../model/course-category-dto/delete-course-category-request';
import { ResponseModel } from '../model/response-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSubjectCategory(): Observable<ResponseModel<CourseCategoryResponseDTO[]>> {
    return this.http.get<ResponseModel<CourseCategoryResponseDTO[]>>(`http://192.168.13.87:8080/course/category`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }

  insertCourseCategory(data:CourseCategoryCreateRequestDTO): Observable<CourseCategoryCreateRequestDTO> {
    return this.http.post<CourseCategoryCreateRequestDTO>(`http://192.168.13.87:8080/course/category`, data,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }

  updateCourseCategory(data:CourseCategoryUpdateRequestDTO): Observable<CourseCategoryUpdateRequestDTO> {
    return this.http.put<CourseCategoryUpdateRequestDTO>(`http://192.168.13.87:8080/course/category`, data,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }

  deleteCourseCategoryById(data:DeleteCourseCategoryRequestDTO): Observable<DeleteCourseCategoryRequestDTO> {
    return this.http.patch<DeleteCourseCategoryRequestDTO>(`http://192.168.13.87:8080/course/category`, data,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLoginResponse().token}`,
        },
      }
    );
  }




}