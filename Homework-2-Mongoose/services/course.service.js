import { Course } from "../models/course.model.js";

export class CourseServices {
  static async getAllCourses() {
    const courses = await Course.find({});
    return courses;
  }
  static async getCourseById(courseId) {
    const foundCourse = await Course.findById(courseId).populate("students");
    if (!foundCourse) throw new Error("Course not found!!!");
    return foundCourse;
  }
  static async createCourse(data) {
    if (data._id) throw new Error("Invalid input!!!");
    const newCourse = new Course(data);
    const createdCourse = newCourse.save();
    return createdCourse;
  }
  static async updateCourse(courseId, data) {
    if (data._id) throw new Error("Invalid input!!!");
    const foundCourse = await this.getCourseById(courseId);
    Object.assign(foundCourse, data);
    const updatedCourse = await foundCourse.save();
    return updatedCourse;
  }
  static async deleteCourse(courseId) {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) throw new Error("Course not found!!!");
  }
}
