import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  public courseModel : any = {
    courseCrn : "",
    courseModel : "",
    courseTerm : "",
    courseYear : "",
    instructorId : ""
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  createCourse() {
    // create course, on success redirect
    this.router.navigate(['/courses']);
  }
}
