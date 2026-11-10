import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTeacherRequest, Teacher, UpdateTeacherRequest } from '../interfaces/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  http = inject(HttpClient);
  url = 'http://localhost:3000/api/teachers';

  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url);
  }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/${id}`);
  }

  create(teacher: CreateTeacherRequest): Observable<Teacher> {
    return this.http.post<Teacher>(this.url, teacher);
  }

  update(id: number, teacher: UpdateTeacherRequest): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.url}/${id}`, teacher);
  }

  delete(id: number): Observable<{ result: boolean }> {
    return this.http.delete<{ result: boolean }>(`${this.url}/${id}`);
  }

}
