import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }
  @Get('/:id')
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(id);
  }
  @Post()
  createStudent(@Body() studentData: CreateStudentDto) {
    return this.studentsService.createStudent(studentData);
  }
  @Post('/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() updatetData: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(id, updatetData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(id);
  }
  @Delete()
  @HttpCode(204)
  deleteAllStudents() {
    return this.studentsService.deleteAllStudents();
  }
}
