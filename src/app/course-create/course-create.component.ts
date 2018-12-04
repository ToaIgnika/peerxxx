import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  public courseModel : any = {
    courseName : "",
    courseTerm : "",
    courseYear : 2018,
    instructorId : ""
  };
  constructor(private router: Router, 
    private http: HttpClient, 
    private ApiUrl: ApiurlService,
    private auth: SessionService) { }

  ngOnInit() {
  }

  createCourse() {
    // create course, on success redirect
    let data = this.courseModel;
    data["instructorId"] = this.auth.uid;
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.post(this.ApiUrl.createCourse, data, config)
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
