import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TeacherForAdminDTO as TeacherForAdminResponse } from '../../../model/teacher-dto/teacher-admin-response';
import { CreateTeacherRequest } from '../../../model/teacher-dto/create-teacher-request';
import { AuthService } from '../../../service/auth.service';
import { TeacherService } from '../../../service/teacher.service';
import { UpdateTeacherRequest } from '../../../model/teacher-dto/update-teacher-request';
import { ToastService } from '../../../service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../../../model/gender';
import StringUtil from '../../../util/string-util';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css'],
})
export class AdminTeacherComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private teacherService: TeacherService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}
  
  isCreateModalVisible: boolean;
  isEditModalVisible: boolean;

  teachers: TeacherForAdminResponse[];
  createRequest: CreateTeacherRequest;
  updateRequest: UpdateTeacherRequest;

  selectedTeachers: TeacherForAdminResponse[];

  submitted: boolean;

  genders: { key: string; value: string }[];
  selectedGender: string;

  ngOnInit(): void {
    this.genders = Object.keys(Gender)
      .filter((item) => isNaN(Number(item)))
      .map((item) => {
        return { key: item.toUpperCase(), value: item };
      });
    this.defineTeachers();
  }

  defineTeachers() {
    this.teacherService.getAllTeachersForAdmin().subscribe(
      (val) => {
        this.teachers = val.result;
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  openNew() {
    this.createRequest = new CreateTeacherRequest();
    this.submitted = false;
    this.isCreateModalVisible = true;
  }

  deleteSelectedTeachers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected teachers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teachers = this.teachers.filter(
          (val) => !this.selectedTeachers.includes(val)
        );
        this.selectedTeachers = null;
        alert('Teachers Deleted');
      },
    });
  }

  editTeacher(teacher: TeacherForAdminResponse) {
    this.isEditModalVisible = true;
    this.updateRequest = {
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: null,
      gender: teacher.gender,
      titleDegree: null,
      updatedBy: this.authService.getUserId(),
    };
  }

  updateTeacher() {
    this.teacherService.updateTeacherProfile(this.updateRequest).subscribe(
      (response) => {
        if (response.code === 200) {
          this.toastService.emitSuccessMessage(
            'Updated',
            response.result
          );
          this.hideModal();
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.emitHttpErrorMessage(
          error,
          'Failed to update teacher.'
        );
      }
    );
  }

  deleteTeacher(teacher: TeacherForAdminResponse) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${teacher.firstName} ${teacher.lastName} ?`,
      header: 'Delete Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teacherService
          .deleteTeacher({
            id: teacher.id,
            updatedBy: this.authService.getUserId(),
          })
          .subscribe(
            (response) => {
              if (response.code === 200 && response.result) {
                this.toastService.emitSuccessMessage(
                  'Deleted',
                  response.result
                );
                this.teachers = this.teachers.filter(
                  (value) => value.id !== teacher.id
                );
              }
            },
            (error: HttpErrorResponse) => {
              this.toastService.emitHttpErrorMessage(
                error,
                'Failed to delete teacher'
              );
            }
          );
      },
    });
  }

  createTeacher() {
    this.submitted = true;
    this.createRequest.gender = Gender[this.selectedGender];
    this.createRequest.createdBy = this.authService.getUserId();
    this.teacherService.createTeacher(this.createRequest).subscribe(
      (response) => {
        if (response.code === 201 && response.result) {
          this.toastService.emitSuccessMessage('Submitted', response.result);
          this.hideModal();
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.emitHttpErrorMessage(
          error,
          'Failed to add new teacher'
        );
      }
    );
  }

  hideModal() {
    this.isCreateModalVisible = false;
    this.isEditModalVisible = false;
    this.submitted = false;
  }
}
