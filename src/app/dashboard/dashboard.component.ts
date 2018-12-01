import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public courseList: any = [
    {
      courseName: "Madhat",
      courseYear: 2018,
      courseId: 111
    },
    {
      courseName: "Amir",
      courseYear: 2018,
      courseId: 222
    },
    {
      courseName: "Ffs",
      courseYear: 2018,
      courseId: 333
    },
  ]

  constructor(
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    private auth: SessionService
  ) { 
    this.loadCourses();
  }

  ngOnInit() {
  }

  deleteCourse(id) {
    if (confirm("Are you sure to permanently delete this course?")) {
      console.log("Implement delete functionality here");
      // create course, on success redirect
     
      var config = {
        headers: {
          "Content-Type": "application/json; charset = utf-8;",
          "Authorization": "Bearer " + this.auth.JWTToken
        }
      };
      console.log(config);
      this.http.delete(this.ApiUrl.deleteCourse + id, config)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/dashboard']);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  loadCourses() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.allCourses, config)
      .subscribe(
        (res) => {
          console.log(res);
          this.courseList = res;
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  addCourseStudent() {
    let data = {
      "studentId": "s123",
      "courseId": "c123",
      "courseCrn": 0,
      "courseTerm": "winter",
      "courseyear": 0
    };
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.post(this.ApiUrl.createCourseStudent, data, config)
      .subscribe(
        (res) => {
          console.log(res);
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  deleteCourseStudent() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.post(this.ApiUrl.deleteCourseStudent + "s123/c123" , config)
      .subscribe(
        (res) => {
          console.log(res);
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  sendEvaluations() {
    if (confirm("Are you sure you want to send eveluations?")) {
      // send out the forms
      console.log("implement sending forms");
    }
  }
}
