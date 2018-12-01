import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiurlService {
  //domains
  public domain ="https://groupgradingapi.azurewebsites.net";
  //public domain ="https://localhost:44365";

  // auth
  public registerStudentUrl = this.domain + "/student/register"
  public registerTeacherUrl = this.domain + "/teacher/register"
  public loginUrl = this.domain + "/login";


  // course crud 
  public instructorCourses = this.domain + "/api/course/i/"
  public studentCourses = this.domain + "/api/course/s/"
  public allCourses = this.domain + "/api/course/"
  public createCourse = this.domain + "/api/course/create";
  public deleteCourse = this.domain + "/api/course/"


  // coursestudent crud
  public createCourseStudent = this.domain + "/api/CourseStudent/create"
  public deleteCourseStudent = this.domain + "/api/CourseStudent/"
  public getCourseStudents = this.domain + "/api/CourseStudent/i/"

  constructor() { }
}
