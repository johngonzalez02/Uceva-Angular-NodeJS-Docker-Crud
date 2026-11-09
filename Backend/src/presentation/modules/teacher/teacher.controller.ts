import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDTO } from "../../../domain/dtos/create-teacher.dto";
import { UpdateTeacherDTO } from "../../../domain/dtos/update-teacher.dto";

export class TeacherController {

    private readonly teacherService = new TeacherService();

    getAllTeachers = (req: Request, res: Response): void => {
        this.teacherService.getAllTeachers()
        .then((teachers) => res.status(200).json(teachers))
        .catch((error) => HandleError.error(error, res));
    };

    getTeacherById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        this.teacherService.getTeacherById(id)
        .then((teacher) => res.status(200).json(teacher))
        .catch((error) => HandleError.error(error, res));
    };

    createTeacher = (req: Request, res: Response) => {
        const [error, createTeacherDTO] = CreateTeacherDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.teacherService.createTeacher(createTeacherDTO!)
        .then((teacher) => res.status(201).json(teacher))
        .catch((error) => HandleError.error(error, res));
    };

    updateTeacher = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        const [error, updateTeacherDTO] = UpdateTeacherDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.teacherService.updateTeacher(id, updateTeacherDTO!)
        .then((teacher) => res.status(200).json(teacher))
        .catch((error) => HandleError.error(error, res));
    };

    deleteTeacher = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        this.teacherService.deleteTeacher(id)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => HandleError.error(error, res));
    };

}
