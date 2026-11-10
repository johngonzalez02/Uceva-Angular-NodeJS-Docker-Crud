import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/error-message';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  today = new Date().toISOString().substring(0, 10);

  teacherForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    hiredate: ['', Validators.required],
    status: [true]
  });

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: CreateTeacherRequest = {
      name: this.teacherForm.value.name!,
      email: this.teacherForm.value.email!,
      phone: this.teacherForm.value.phone!,
      department: this.teacherForm.value.department!,
      specialty: this.teacherForm.value.specialty!,
      hiredate: this.teacherForm.value.hiredate!,
      status: this.teacherForm.value.status!
    };
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor registrado correctamente', 'success');
        this.router.navigateByUrl('/teachers/list');
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al crear el profesor');
        this.alertService.toast(message, 'error');
      }
    });
  }

}
