import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(id) {
    if(confirm("Are you sure to permanently delete this course?")) {
      console.log("Implement delete functionality here");
      
    }
  }
}
