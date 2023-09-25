import { Student } from "../models/student.model.js";

export class StudentService {
  // 1.Get all students
  static async getAllStudents() {
    const students = await Student.find({}).setOptions({ sanitizeFilter: true });
    return students;
  }
  // 2.Get student by Id
  static async getStudentById(studentId) {
    const foundStudent = await Student.findById(studentId).populate({ path: "courses", select: "-_id title" });
    if (!foundStudent) throw new Error("Student not found");
    return foundStudent;
  }
  // 3.Create student
  static async createStudent(data) {
    if (data._id) throw new Error("Invalid input");
    const newStudent = new Student(data);
    const createdStudent = await newStudent.save();
    return createdStudent;
  }
  // 4.Update student
  static async updateStudent(studentId, data) {
    let student = await this.getStudentById(studentId);
    if (data._id) throw new Error("invalid input");
    Object.assign(student, data);
    const updatedStudent = await student.save();
    return updatedStudent;
  }
  // 5.Delete student
  static async deleteStudent(studentId) {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) throw new Error("Student not found!!!");
  }
}
