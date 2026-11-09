export interface Classroom {
    id: number;
    name: string;
    building: string;
    capacity: number;
    type: string;
    status: boolean;
}

export type CreateClassroom = Omit<Classroom, "id">;

export type UpdateClassroom = Omit<Classroom, "id">;
