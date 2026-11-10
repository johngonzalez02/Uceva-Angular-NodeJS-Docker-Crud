import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-detail-student',
  imports: [Back, DatePipe, CommonModule],
  templateUrl: './detail-student.html',
})
export class DetailStudent {

  student: Student | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private alertService = inject(AlertService);

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getStudent(id);
  }

  getStudent(id: number){
    this.studentService.getById(id).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
        this.alertService.toast('Error al consultar el usuario', 'error');
        this.router.navigateByUrl('/students');
      }
    })
  }

}
