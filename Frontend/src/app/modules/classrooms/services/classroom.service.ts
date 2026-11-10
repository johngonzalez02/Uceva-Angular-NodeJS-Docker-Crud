import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClassroomRequest, Classroom, UpdateClassroomRequest } from '../interfaces/classroom';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {

  http = inject(HttpClient);
  url = 'http://localhost:3000/api/classrooms';

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.url);
  }

  getById(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.url}/${id}`);
  }

  create(classroom: CreateClassroomRequest): Observable<Classroom> {
    return this.http.post<Classroom>(this.url, classroom);
  }

  update(id: number, classroom: UpdateClassroomRequest): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.url}/${id}`, classroom);
  }

  delete(id: number): Observable<{ result: boolean }> {
    return this.http.delete<{ result: boolean }>(`${this.url}/${id}`);
  }

}
