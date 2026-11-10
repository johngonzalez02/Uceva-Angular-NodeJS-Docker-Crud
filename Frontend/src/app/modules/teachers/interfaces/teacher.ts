export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialty: string;
  hiredate: string;
  status: boolean;
}

export type CreateTeacherRequest = Omit<Teacher, 'id'>;

export type UpdateTeacherRequest = Omit<Teacher, 'id'>;
