import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/error-message';
import { Classroom } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-detail-classroom',
  imports: [Back, NgClass],
  templateUrl: './detail-classroom.html',
})
export class DetailClassroom {

  classroom: Classroom | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private classroomService = inject(ClassroomService);
  private alertService = inject(AlertService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getClassroom(id);
  }

  getClassroom(id: number) {
    this.classroomService.getById(id).subscribe({
      next: (classroom) => {
        this.classroom = classroom;
      },
      error: (error: HttpErrorResponse) => {
        const message = getErrorMessage(error, 'Error al consultar el salón');
        this.alertService.toast(message, 'error');
        this.router.navigateByUrl('/classrooms/list');
      }
    });
  }

}
