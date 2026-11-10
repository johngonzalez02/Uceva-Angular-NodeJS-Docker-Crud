import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateStudentRequest } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  imports: [
    Back, 
    ReactiveFormsModule
  ],
  templateUrl: './create-student.html',
})
export class CreateStudent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  studentForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    birthdate: ['', Validators.required],
    semester: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    status: [true]
  });

  createStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    const student: CreateStudentRequest = {
      id: Number(this.studentForm.value.id),
      name: this.studentForm.value.name!,
      email: this.studentForm.value.email!,
      phone: this.studentForm.value.phone!,
      address: this.studentForm.value.address!,
      birthdate: new Date(this.studentForm.value.birthdate!),
      semester: Number(this.studentForm.value.semester),
      status: this.studentForm.value.status!
    };
    console.log('Estudiante para enviar al backend:', student);
    this.studentService.create(student).subscribe({
      next: () => {
        this.alertService.toast(
          'Estudiante registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/students');
      },
      error: () => {
        this.alertService.toast('Error al crear el estudiante', 'error');
      }
    })

  }
  
}
