import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  private id = '';
  public gradeList : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private ApiUrl: ApiurlService,
    private auth: SessionService
  ) { 
    this.id = '' + this.route.snapshot.paramMap.get('id');
    this.loadAllGrades();
  }

  ngOnInit() {
  }

  loadAllGrades() {
      var config = {
        headers: {
          "Content-Type": "application/json; charset = utf-8;",
          "Authorization": "Bearer " + this.auth.JWTToken
        }
      };
      console.log(config);
      this.http.get(this.ApiUrl.getStudentGrades + this.id, config)
        .subscribe(
          (res) => {
            console.log(res)
            this.gradeList = res;
          },
          err => {
            console.log(err);
          }
        );
  }

}
