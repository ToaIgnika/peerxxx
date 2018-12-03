import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  private id = '';
  private teamGrade : any;
  public evaluation: any = {
    Comments: ""
  };
  public teamList: any = [
    {
      firstName: "Madhat",
      lastName: "Boi",
      studentId: 1
    }
  ]

  public teamList2: any = [
    {
      firstName: "Madhat",
      lastName: "Boi",
      studentId: 1
    }
  ]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    private auth: SessionService) {
    if (auth.loggedIn) {
      this.id = '' + this.route.snapshot.paramMap.get('id');
      this.loadEvaluation();
    } else {
      router.navigate(['/login']);
    }

  }

  ngOnInit() {
  }

  loadEvaluation() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.getStudentCourseEvaluation + this.auth.uid + '/' + this.id, config)
      .subscribe(
        (res) => {
          console.log(res);
          this.evaluation = res;
          this.loadGroupMembers();
        },
        err => {
          console.log(err);
        }
      );
  }

  loadGroupMembers() {
    var config = {
      headers: {
        "Content-Type": "application/json; charset = utf-8;",
        "Authorization": "Bearer " + this.auth.JWTToken
      }
    };
    console.log(config);
    this.http.get(this.ApiUrl.getStudentGroupS
      + this.id
      + '/' + this.evaluation.StudentGroupName
      + '/' + this.auth.uid, config)
      .subscribe(
        (res) => {
          console.log(res);
          this.teamList = res;
          this.teamList2 = [];
          this.teamList.forEach(element => {
            this.teamList2.push({
              UserName : element.UserName,
              LastName : element.LastName,
              FirstName : element.FirstName,
              Grade : 100
            })
          });
          console.log(this.teamList2);
        },
        err => {
          console.log(err);
        }
      );
  }

  submitEvaluation() {
    if (confirm("Are you sure to permanently delete this course?")) {
      console.log(this.teamList2);
      this.teamGrade = new Array();
      this.teamList2.forEach(element => {  
        this.teamGrade.push(element.Grade);
      });

      //console.log(this.teamGrade);
      this.evaluation.Grade = JSON.stringify(this.teamGrade);
      console.log(this.evaluation);

    }
  }

  updateScores(val) {
    console.log(val.target.value);
    console.log(val.target.id);
  }

}
