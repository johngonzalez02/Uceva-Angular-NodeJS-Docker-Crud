export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: Date;
  semester: number;
  status: boolean;
}

export interface CreateStudentRequest extends Student {}

export type UpdateStudentRequest = Omit<Student, "id">;