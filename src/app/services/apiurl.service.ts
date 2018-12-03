import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiurlService {
  //domains
  //public domain ="https://groupgradingapi.azurewebsites.net";
  public domain = "https://localhost:44365";

  // auth
  public registerStudentUrl = this.domain + "/api/student/register"
  public registerTeacherUrl = this.domain + "/api/teacher/register"
  public loginUrl = this.domain + "/api/login";


  // course crud 
  public instructorCourses = this.domain + "/api/course/i/"
  public studentCourses = this.domain + "/api/course/s/"
  public allCourses = this.domain + "/api/course/"
  public createCourse = this.domain + "/api/course/create";
  public deleteCourse = this.domain + "/api/course/delete/"


  // coursestudent crud
  public createCourseStudent = this.domain + "/api/CourseStudent/create"
  public deleteCourseStudent = this.domain + "/api/CourseStudent/"
  public getCourseStudents = this.domain + "/api/CourseStudent/"

  // studentgroup crud
  public createStudentGroup = this.domain + "/api/StudentGroup/create"
  public deleteStudentGroup = this.domain + "/api/StudentGroup/"
  public getStudentGroup = this.domain + "/api/StudentGroup/i/"
  public getStudentGroupS = this.domain + "/api/StudentGroup/s/"

  // evaluations
  public createCourseEvalutaions = this.domain + "/api/Evaluation/create/"
  public getStudentCourseEvaluation = this.domain + "/api/Evaluation/"
  public submitStudentEvaluation = this.domain + "/api/Evaluation/"

  constructor() { }
}
