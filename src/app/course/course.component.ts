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
  public studentList: any = [
    {
      firstName: "Madhat",
      lastName: "Boi",
      studentId: 1
    },
    {
      firstName: "jake",
      lastName: "jake",
      studentId: 2
    },
    {
      firstName: "world",
      lastName: "hello",
      studentId: 3
    },
    {
      firstName: "hangman",
      lastName: "amir",
      studentId: 4
    },
    {
      firstName: "godbdulla",
      lastName: "alex",
      studentId: 5
    },
    {
      firstName: "Josef",
      lastName: "Stalin",
      studentId: 6
    },
  ]
  public courseGroups: any = [
    {
      groupName: "champions",
      members: ["champ1", "champ2", "champ3"]
    },
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
    private auth: SessionService) {
    if (auth.role == 'Teacher') {
      this.id = '' + this.route.snapshot.paramMap.get('id');
      this.loadCourseStudents();
      this.loadStudentGroup();
    } else {
      router.navigate(['/home']);
    }

  }




  addCourseStudent(sId) {
    let data = {
      "StudentId": sId,
      "CourseCrn": this.id
    };
    console.log("i have been called");
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



  addStudentGroup(gName, sId, grade) {

    let data = {
      GroupName: gName,
      StudentId: sId,
      CourseCrn: this.id,
      Grade: grade
    };
    console.log(data);
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.post(this.ApiUrl.createStudentGroup, data, config)
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

  loadStudentGroup() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.getStudentGroup + this.id, config)
      .subscribe(
        (res) => {
          console.log(res);
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
    console.log(config);
    this.http.post(this.ApiUrl.deleteCourseStudent + "s123/c123", config)
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

  loadCourseStudents() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.getCourseStudents + this.id, config)
      .subscribe(
        (res) => {
          console.log(res);
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
      console.log(csvData);
      var rows = csvData.toString().split('\n');
      console.log(rows);
      for (let i = 1; i < rows.length - 1; i++) {
        var cols = rows[i].split(',');
        console.log(cols);
        this.addCourseStudent(cols[1]);
        this.addStudentGroup(cols[0], cols[1], cols[2]);
      }
      this.router.navigate(['/course/' + this.id]);

    }
  }


  sendEvaluations() {
    if (confirm("Are you sure you want to send eveluations?")) {
      // send out the forms
      console.log("implement sending forms");
      var config = {
        headers: {
          "Content-Type": "application/json; charset = utf-8;",
          "Authorization": "Bearer " + this.auth.JWTToken
        }
      };
      console.log(config);
      this.http.post(this.ApiUrl.createCourseEvalutaions + this.id, config)
        .subscribe(
          (res) => {
            console.log(res);
            alert(res);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  ngOnInit() {
  }

}
