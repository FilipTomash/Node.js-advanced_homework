import { StudentService } from "../services/student.service.js";

export class StudentController {
  static async getAllStudents(req, res) {
    const students = await StudentService.getAllStudents();
    res.status(200).json(students);
  }
  static async getStudentsById(req, res) {
    const id = req.params.id;
    const students = await StudentService.getStudentById(id);
    res.status(200).json(students);
  }
  static async createStudent(req, res) {
    const data = req.body;
    const students = await StudentService.createStudent(data);
    res.status(200).json(students);
  }
  static async updateStudents(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updatedStudent = await StudentService.updateStudent(id, data);
    console.log(updatedStudent);
    res.status(201).json(updatedStudent);
  }
  static async deleteStudent(req, res) {
    const id = req.params.id;
    await StudentService.deleteStudent(id);
    res.sendStatus(204);
  }
}
