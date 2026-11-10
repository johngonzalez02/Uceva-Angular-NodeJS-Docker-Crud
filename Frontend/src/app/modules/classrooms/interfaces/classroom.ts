export interface Classroom {
  id: number;
  name: string;
  building: string;
  capacity: number;
  type: string;
  status: boolean;
}

export type CreateClassroomRequest = Omit<Classroom, 'id'>;

export type UpdateClassroomRequest = Omit<Classroom, 'id'>;

export const classroomTypes: string[] = [
  'Aula',
  'Laboratorio',
  'Auditorio',
  'Sala de Computo'
];
