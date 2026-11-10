import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { AlertService } from '../../../shared/services/alert.service';
import { TableStudents } from '../../components/table-students/table-students';
import { Student } from '../../interfaces/student';
import { TableStudentsEvents } from '../../interfaces/table-students';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-list-students',
  imports: [
    Button,
    TableStudents
  ],
  templateUrl: './list-students.html',
})
export class ListStudents {

  students: Student[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-student-button',
    title: 'Create Student',
    type: 'primary',
  };

  router = inject(Router);
  studentService = inject(StudentService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getAll().subscribe({
      next: (students: Student[]) => {
        this.students = students;
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
        this.alertService.toast('Error al consultar los estudiantes', 'error');
      }
    });
  }

  createStudent(){
    this.router.navigateByUrl('/students/create');
  }

  tableEvents({ id, action }: TableStudentsEvents){
    switch(action){
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

  viewDetail(id: number){
    this.router.navigateByUrl(`/students/detail/${id}`);
  }

  update(id: number){
    this.router.navigateByUrl(`/students/update/${id}`);
  }

  async delete(id: number){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar el estudiante ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.studentService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getStudents();
        },
        error: () => {
          this.alertService.toast('Error al eliminar el estudiante', 'error');
        }
      });
    }

  }

}
