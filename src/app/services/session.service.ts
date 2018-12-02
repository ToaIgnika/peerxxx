// Angular modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

// App
import { ApiurlService } from '../services/apiurl.service';
import { LoginModel } from './models/login-model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public JWTToken = '';
  public expire = '';
  public loggedIn = false;
  public userData: any;
  public uid = '';
  public role;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService
  ) {}

  /**
   * Authenticate a user against the server.
   *
   * @param loginModel a user to be authenticated
   * @param remember whether or not to remember the user during their next visit
   *
   * @returns an `Observable` with a message upon success.
   */
  login(loginModel: LoginModel, remember: boolean): Observable<string> {
    return this.http
      .post(this.ApiUrl.loginUrl, loginModel, {
        observe: 'response'
      })
      .pipe(
        tap(res => {
          // store the token
          this.storeToken(res.body as LoginSuccessModel, remember);
        }),
        // pass back a success message
        map(res => AuthService.LOGIN_SUCCESS_MSG),
        // handle error
        catchError(this.handleError)
      );
    // this.http.post(this.ApiUrl.loginUrl, loginModel).subscribe(
    //   res => {
    //     this.JWTToken = res['token'];
    //     localStorage.setItem('LoggedJWT', this.JWTToken);
    //     this.expire = res['expiration'];
    //     this.decodeToken(res['token']);
    //     this.loggedIn = true;
    //     this.router.navigate(['/dashboard']);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  registerStudent(registerStudentModel) {
    let data = registerStudentModel;
    var config = {
      headers: {
        'Content-Type': 'application/json; charset = utf-8;'
      }
    };
    this.http.post(this.ApiUrl.registerStudentUrl, data, config).subscribe(
      res => {
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
        'Content-Type': 'application/json; charset = utf-8;'
      }
    };
    this.http.post(this.ApiUrl.registerTeacherUrl, data, config).subscribe(
      res => {
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
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    console.log(decodedJwtData);
    if (decodedJwtData != null) {
      this.role = decodedJwtData['roles'];
      this.uid = decodedJwtData['uid'];
      console.log(this.role);
    }
  }
}
