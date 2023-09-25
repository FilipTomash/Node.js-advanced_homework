import { CourseServices } from "../services/course.service.js";

export class CourseController {
  static async getAllCourses(req, res) {
    const courses = await CourseServices.getAllCourses();
    res.status(200).json(courses);
  }
  static async getCourseById(req, res) {
    try {
      const id = req.params.id;
      const foundCourse = await CourseServices.getCourseById(id);
      res.status(200).json(foundCourse);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
  static async createCourse(req, res) {
    try {
      const data = req.body;
      const createdCourse = await CourseServices.createCourse(data);
      res.status(201).json(createdCourse);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
  static async updateCourse(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedCourse = await CourseServices.updateCourse(id, data);
      res.status(201).json(updatedCourse);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
  static async deleteCourse(req, res) {
    try {
      const id = req.params.id;
      await CourseServices.deleteCourse(id);
      res.sendStatus(204);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
}
