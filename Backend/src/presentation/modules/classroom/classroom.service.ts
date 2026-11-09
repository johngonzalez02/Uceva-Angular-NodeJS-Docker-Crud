import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";

export class ClassroomService {

    public async getAllClassrooms(): Promise<Classroom[]> {
        const sql = `SELECT * FROM classrooms ORDER BY id;`;
        const classrooms = await pool.query<Classroom>(sql);
        return classrooms.rows;
    }

    public async getClassroomById(id: number): Promise<Classroom> {
        const sql = `SELECT * FROM classrooms WHERE id = $1;`;
        const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
        if (!classroom) {
            throw CustomError.notFound(`No existe un salon con ese id`);
        }
        return classroom;
    }

    public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
        await this.validateUniqueName(classroom.name);
        const sql = `
            INSERT INTO classrooms (
                name,
                building,
                capacity,
                type,
                status
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [
            classroom.name,
            classroom.building,
            classroom.capacity,
            classroom.type,
            classroom.status
        ];
        const classroomCreated = (await pool.query<Classroom>(sql, values)).rows[0];
        if (!classroomCreated) {
            throw CustomError.internalServer(`No se pudo crear el salon`);
        }
        return classroomCreated;
    }

    public async updateClassroom(
        id: number,
        classroom: UpdateClassroom
    ): Promise<Classroom> {
        await this.getClassroomById(id);
        await this.validateUniqueName(classroom.name, id);
        const sql = `
            UPDATE classrooms
            SET
                name = $1,
                building = $2,
                capacity = $3,
                type = $4,
                status = $5
            WHERE id = $6
            RETURNING *;
        `;
        const values = [
            classroom.name,
            classroom.building,
            classroom.capacity,
            classroom.type,
            classroom.status,
            id
        ];
        const classroomUpdated = (await pool.query<Classroom>(sql, values)).rows[0];
        if (!classroomUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el salon`);
        }
        return classroomUpdated;
    }

    public async deleteClassroom(id: number): Promise<boolean> {
        await this.getClassroomById(id);
        const sql = `
            DELETE FROM classrooms
            WHERE id = $1
            RETURNING id;
        `;
        const classroomDeleted = await pool.query(sql, [id]);
        return classroomDeleted.rowCount !== null && classroomDeleted.rowCount > 0;
    }

    private async validateUniqueName(
        name: string,
        excludeId: number = 0
    ): Promise<void> {
        const sql = `SELECT id FROM classrooms WHERE name = $1 AND id <> $2;`;
        const found = (await pool.query(sql, [name, excludeId])).rows[0];
        if (found) {
            throw CustomError.conflict(`Ya existe un salon con ese nombre`);
        }
    }

}
