export interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    specialty: string;
    hiredate: Date;
    status: boolean;
}

export type CreateTeacher = Omit<Teacher, "id">;

export type UpdateTeacher = Omit<Teacher, "id">;
