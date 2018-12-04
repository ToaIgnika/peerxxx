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
  ]

  public evaluationList: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    public auth: SessionService
  ) {
    if (auth.role == 'Teacher') {
      this.loadCourses();
    } else if (auth.role == 'Student') {
      this.loadEvaluations();
    } else {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  deleteCourse(id) {
    if (confirm("Are you sure to permanently delete this course?")) {
      //console.log("Implement delete functionality here");
      // create course, on success redirect

      var config = {
        headers: {
          "Content-Type": "application/json; charset = utf-8;",
          "Authorization": "Bearer " + this.auth.JWTToken
        }
      };
      //console.log(config);
      this.http.delete(this.ApiUrl.deleteCourse + id, config)
        .subscribe(
          (res) => {
           // console.log(res);
            this.loadCourses();
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
    this.http.get(this.ApiUrl.instructorCourses + this.auth.uid, config)
      .subscribe(
        (res) => {
          //console.log(res);
          this.courseList = res;
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  loadEvaluations() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.getStudentCourseEvaluation + this.auth.uid, config)
      .subscribe(
        (res) => {
          //console.log(res);
          this.evaluationList = res;
        },
        err => {
          console.log(err);
        }
      );
  }

 

}
