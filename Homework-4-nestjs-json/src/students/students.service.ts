import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Student } from './interfaces/student.interface';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentsService {
  async getAllStudents() {
    const studentsJson = await readFile(
      join(process.cwd(), 'src', 'students', 'data', 'students.json'),
      'utf-8',
    );
    let students: Student[] = JSON.parse(studentsJson);
    return students;
  }
  async saveStudents(students: Student[]) {
    await writeFile(
      join(process.cwd(), 'src', 'students', 'data', 'students.json'),
      JSON.stringify(students, null, 2),
    );
  }
  async getStudentById(id: string) {
    const students = await this.getAllStudents();
    const foundStudent = students.find((student) => student.id === id);
    if (!foundStudent) throw new NotFoundException('Student not found');
    return foundStudent;
  }
  async createStudent(studentData: CreateStudentDto) {
    const students = await this.getAllStudents();
    const newStudent: Student = { id: uuid(), ...studentData };
    console.log(newStudent);
    students.push(newStudent);
    await this.saveStudents(students);
    return newStudent;
  }
  async updateStudent(id: string, updateData: UpdateStudentDto) {
    const students = await this.getAllStudents();
    const foundStudent = await this.getStudentById(id);
    const updatedStudent = { ...foundStudent, ...updateData };
    const updatedStudentsArray = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student,
    );
    await this.saveStudents(updatedStudentsArray);
    return updatedStudent;
  }
  async deleteStudent(id: string) {
    const students = await this.getAllStudents();
    const deletedStudentArray = students.filter((student) => student.id !== id);
    if (deletedStudentArray.length === students.length)
      throw new NotFoundException('Student not found');
    await this.saveStudents(deletedStudentArray);
  }
  async deleteAllStudents() {
    await this.saveStudents([]);
  }
}
