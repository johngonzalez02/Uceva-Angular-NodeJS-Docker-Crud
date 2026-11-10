import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Student, UpdateStudentRequest } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-update-student',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-student.html',
})
export class UpdateStudent {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getStudent();
  }

  getStudent() {
    this.studentService.getById(this.id).subscribe({
      next: (student) => {
        this.setValues(student);
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
        this.alertService.toast('Error al consultar el estudiante', 'error');
        this.goToList();
      }
    })
  }

  setValues(student: Student): void {
    this.studentForm.patchValue({
      id: String(student.id),
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      birthdate: this.formatDate(student.birthdate),
      semester: String(student.semester),
      status: student.status
    });
  }

  private formatDate(value: Date | string): string {
    if (typeof value === 'string') {
      return value.substring(0, 10);
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  updateStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    const formValue = this.studentForm.getRawValue();
    const student: UpdateStudentRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      address: formValue.address!,
      birthdate: new Date(formValue.birthdate!),
      semester: Number(formValue.semester),
      status: formValue.status!
    };

    this.studentService.update(this.id, student).subscribe({
      next: () => {
        this.alertService.toast(
          'Estudiante actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating student:', error);
        this.alertService.toast(
          'Error al actualizar el estudiante',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('students');
  }

}
