import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { ClassroomService } from "./classroom.service";
import { CreateClassroomDTO } from "../../../domain/dtos/create-classroom.dto";
import { UpdateClassroomDTO } from "../../../domain/dtos/update-classroom.dto";

export class ClassroomController {

    private readonly classroomService = new ClassroomService();

    getAllClassrooms = (req: Request, res: Response): void => {
        this.classroomService.getAllClassrooms()
        .then((classrooms) => res.status(200).json(classrooms))
        .catch((error) => HandleError.error(error, res));
    };

    getClassroomById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        this.classroomService.getClassroomById(id)
        .then((classroom) => res.status(200).json(classroom))
        .catch((error) => HandleError.error(error, res));
    };

    createClassroom = (req: Request, res: Response) => {
        const [error, createClassroomDTO] = CreateClassroomDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.classroomService.createClassroom(createClassroomDTO!)
        .then((classroom) => res.status(201).json(classroom))
        .catch((error) => HandleError.error(error, res));
    };

    updateClassroom = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        const [error, updateClassroomDTO] = UpdateClassroomDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        this.classroomService.updateClassroom(id, updateClassroomDTO!)
        .then((classroom) => res.status(200).json(classroom))
        .catch((error) => HandleError.error(error, res));
    };

    deleteClassroom = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
        this.classroomService.deleteClassroom(id)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => HandleError.error(error, res));
    };

}
