import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private that = this;
  private id = '';
  private course;
  evalStatus : boolean ;

  public studentList: any = [
    {
      firstName: "Madhat",
      lastName: "Boi",
      studentId: 1
    }
  ]
  public courseGroups: any = [
    {
      groupName: "loosers",
      members: ["looser1", "amir", "looser2"]
    },
  ]
  public groups: any;

  csvContent: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    public auth: SessionService) {
    if (auth.role == 'Teacher') {
      this.id = '' + this.route.snapshot.paramMap.get('id');
      this.loadCourseStudents();
      this.loadStudentGroup();
      this.getEvaluationStatus(); 
    } else {
      router.navigate(['/home']);
    }

  }




  addCourseStudent(sId) {
    let data = {
      "StudentId": sId,
      "CourseCrn": this.id
    };
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.post(this.ApiUrl.createCourseStudent, data, config)
      .subscribe(
        (res) => {
          //console.log(res);
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }



  addStudentGroup(gName, sId, grade) {

    let data = {
      GroupName: gName,
      StudentId: sId,
      CourseCrn: this.id,
      Grade: grade
    };
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.post(this.ApiUrl.createStudentGroup, data, config)
      .subscribe(
        (res) => {
          //console.log(res);
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  loadStudentGroup() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.get(this.ApiUrl.getStudentGroup + this.id, config)
      .subscribe(
        (res) => {
          //console.log(res);
          this.groups = res;

          //this.courseGroups = res;
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
    
    this.http.post(this.ApiUrl.deleteCourseStudent + "s123/c123", config)
      .subscribe(
        (res) => {
          //console.log(res);
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }

  loadCourseStudents() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.get(this.ApiUrl.getCourseStudents + this.id, config)
      .subscribe(
        (res) => {
          //console.log(res);
          this.studentList = res;
          //this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
        }
      );
  }



  onFileSelect($event) {
    var input = $event.target;
    var input = $event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      let csvData = reader.result;
      var rows = csvData.toString().split('\n');
      for (let i = 1; i < rows.length - 1; i++) {
        var cols = rows[i].split(',');
        this.addCourseStudent(cols[1]);
        this.addStudentGroup(cols[0], cols[1], cols[2]);
      }
      this.router.navigate(['/dashboard']);

    }
  }


  sendEvaluations() {
    if (confirm("Are you sure you want to send eveluations?")) {
      // send out the forms
      var config = {
        headers: {
          "Content-Type": "application/json; charset = utf-8;",
          "Authorization": "Bearer " + this.auth.JWTToken
        }
      };
      this.http.post(this.ApiUrl.createCourseEvalutaions + this.id, config)
        .subscribe(
          (res) => {
            //console.log(res);
            this.evalStatus = true;
            alert(res);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  getEvaluationStatus() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    this.http.get(this.ApiUrl.getCourseEvaluation + this.id, config)
      .subscribe(
        (res) => {
          //console.log(res);
          if (res) {
            this.evalStatus = true;
          } else {
            this.evalStatus = false;
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }

}
