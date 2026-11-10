import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/error-message';
import { TableTeachers } from '../../components/table-teachers/table-teachers';
import { Teacher } from '../../interfaces/teacher';
import { TableTeachersEvents } from '../../interfaces/table-teachers';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-list-teachers',
  imports: [
    Button,
    TableTeachers
  ],
  templateUrl: './list-teachers.html',
})
export class ListTeachers {

  teachers: Teacher[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-teacher-button',
    title: 'Create Teacher',
    type: 'primary',
  };

  router = inject(Router);
  teacherService = inject(TeacherService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getAll().subscribe({
      next: (teachers: Teacher[]) => {
        this.teachers = teachers;
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al consultar los profesores');
        this.alertService.toast(message, 'error');
      }
    });
  }

  createTeacher() {
    this.router.navigateByUrl('/teachers/create');
  }

  tableEvents({ id, action }: TableTeachersEvents) {
    switch (action) {
      case 'detail':
        this.viewDetail(id);
        break;
      case 'edit':
        this.update(id);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  viewDetail(id: number) {
    this.router.navigateByUrl(`/teachers/detail/${id}`);
  }

  update(id: number) {
    this.router.navigateByUrl(`/teachers/update/${id}`);
  }

  async delete(id: number) {
    const title = '¿Está seguro?';
    const text = `Se va a eliminar el profesor ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if (confirm) {
      this.teacherService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Profesor eliminado correctamente', 'success');
          this.getTeachers();
        },
        error: (error: HttpErrorResponse) => {
          const message = getErrorMessage(error, 'Error al eliminar el profesor');
          this.alertService.toast(message, 'error');
        }
      });
    }
  }

}
