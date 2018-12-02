import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

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

  csvContent: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    private auth: SessionService) {
    this.id = '' + this.route.snapshot.paramMap.get('id');

  }


  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    console.log(this.csvContent);
    // alert(this.csvContent);
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;
    if (files && files.length) {
      /*
       console.log("Filename: " + files[0].name);
       console.log("Type: " + files[0].type);
       console.log("Size: " + files[0].size + " bytes");
       */

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");
    }
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
        "Authorization": "Bearer " + this.auth.getToken()
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

  addStudentGroup() {
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
        "Authorization": "Bearer " + this.auth.getToken()
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
        "Authorization": "Bearer " + this.auth.getToken()
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

  ngOnInit() {
  }

}
