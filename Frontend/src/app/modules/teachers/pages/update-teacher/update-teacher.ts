import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/error-message';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isInteger(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher) => {
        this.setValues(teacher);
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al consultar el profesor');
        this.alertService.toast(message, 'error');
        this.goToList();
      }
    });
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      specialty: teacher.specialty,
      hiredate: teacher.hiredate.substring(0, 10),
      status: teacher.status
    });
  }

  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm.getRawValue();
    const teacher: UpdateTeacherRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      department: formValue.department!,
      specialty: formValue.specialty!,
      hiredate: formValue.hiredate!,
      status: formValue.status!
    };
    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al actualizar el profesor');
        this.alertService.toast(message, 'error');
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('/teachers/list');
  }

}
