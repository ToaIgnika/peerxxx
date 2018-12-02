import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public JWTToken = "";
  public expire = "";
  public loggedIn = false;
  public userData: any;
  public uid = "";
  private jwtType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  public role;
  constructor(private router: Router, private http: HttpClient, private ApiUrl: ApiurlService) {

  }

  login(loginModel) {
    let data = loginModel;
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;"
      }
    };
    this.http.post(this.ApiUrl.loginUrl, data, config)
      .subscribe(
        (res) => {
          this.JWTToken = res["token"];
          localStorage.setItem('LoggedJWT', this.JWTToken);
          this.expire = res["expiration"];
          this.decodeToken(res['token']);
          this.loggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  registerStudent(registerStudentModel) {
    let data = registerStudentModel;
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;"
      }
    };
    this.http.post(this.ApiUrl.registerStudentUrl, data, config)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      );
  }

  registerTeacher(registerStudentModel) {
    let data = registerStudentModel;
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;"
      }
    };
    this.http.post(this.ApiUrl.registerTeacherUrl, data, config)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      );
  }


  decodeToken(token) {
    let jwt = token;
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData);
    if (decodedJwtData != null) {
      this.role = decodedJwtData["roles"];
      this.uid = decodedJwtData["uid"];
      console.log(this.role);
    }
  }
}
