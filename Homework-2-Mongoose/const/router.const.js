import { Router } from "express";
import { studentRouter } from "../routes/student.routes.js";
import { courseRouter } from "../routes/coourse.routes.js";
export const globalRouter = Router();
globalRouter.use("/students", studentRouter);
globalRouter.use("/courses", courseRouter);
