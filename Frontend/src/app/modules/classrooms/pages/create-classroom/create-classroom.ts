import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/error-message';
import { classroomTypes, CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-create-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-classroom.html',
})
export class CreateClassroom {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  types = classroomTypes;

  classroomForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: ['', [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern(/^[0-9]+$/)]],
    type: ['', Validators.required],
    status: [true]
  });

  createClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const classroom: CreateClassroomRequest = {
      name: this.classroomForm.value.name!,
      building: this.classroomForm.value.building!,
      capacity: Number(this.classroomForm.value.capacity),
      type: this.classroomForm.value.type!,
      status: this.classroomForm.value.status!
    };
    this.classroomService.create(classroom).subscribe({
      next: () => {
        this.alertService.toast('Salón registrado correctamente', 'success');
        this.router.navigateByUrl('/classrooms/list');
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al crear el salón');
        this.alertService.toast(message, 'error');
      }
    });
  }

}
