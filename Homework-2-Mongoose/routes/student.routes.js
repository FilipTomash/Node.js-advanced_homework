import { StudentController } from "../controllers/student.controller.js";
import { Router } from "express";
export const studentRouter = Router();

studentRouter.get("/", StudentController.getAllStudents);
studentRouter.get("/:id", StudentController.getStudentsById);
studentRouter.post("/", StudentController.createStudent);
studentRouter.patch("/:id", StudentController.updateStudents);
studentRouter.delete("/:id", StudentController.deleteStudent);
