import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiurlService {
  //domains
  public domain ="https://groupgradingapi.azurewebsites.net/api";
  
  // auth
  public registerStudentUrl = this.domain + "/auth/teacher/register"
  public registerTeacherUrl = this.domain + "/auth/student/register"
  public loginUrl = this.domain + "/auth/login";

  // 
  constructor() { }
}
