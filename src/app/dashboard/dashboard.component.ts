// Angular modules
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// App
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public courseList: any = [
        {
            courseName: 'Madhat',
            courseYear: 2018,
            courseId: 111
        },
        {
            courseName: 'Amir',
            courseYear: 2018,
            courseId: 222
        },
        {
            courseName: 'Ffs',
            courseYear: 2018,
            courseId: 333
        }
    ];

    constructor(
        private router: Router,
        private http: HttpClient,
        private ApiUrl: ApiurlService,
        private auth: SessionService
    ) {
        this.loadCourses();
    }

    deleteCourse(id) {
        // if (confirm('Are you sure to permanently delete this course?')) {
        //     console.log('Implement delete functionality here');
        //     // create course, on success redirect

        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json; charset = utf-8;',
        //             Authorization: 'Bearer ' + this.auth.JWTToken
        //         }
        //     };
        //     console.log(config);
        //     this.http.delete(this.ApiUrl.deleteCourse + id, config).subscribe(
        //         res => {
        //             console.log(res);
        //             this.loadCourses();
        //             this.router.navigate(['/dashboard']);
        //         },
        //         err => {
        //             console.log(err);
        //         }
        //     );
        // }
    }

    loadCourses() {
        // var config = {
        //     headers: {
        //         'Content-Type': 'application/json; charset = utf-8;',
        //         Authorization: 'Bearer ' + this.auth.JWTToken
        //     }
        // };
        // console.log(config);
        // this.http
        //     .get(this.ApiUrl.instructorCourses + this.auth.uid, config)
        //     .subscribe(
        //         res => {
        //             console.log(res);
        //             this.courseList = res;
        //             this.router.navigate(['/dashboard']);
        //         },
        //         err => {
        //             console.log(err);
        //         }
        //     );
    }

    sendEvaluations() {
        if (confirm('Are you sure you want to send eveluations?')) {
            // send out the forms
            console.log('implement sending forms');
        }
    }
}
