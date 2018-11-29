import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private id  = '';
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
      groupName : "champions",
      members : ["champ1", "champ2", "champ3"]
    },
    {
      groupName : "loosers",
      members : ["looser1", "amir", "looser2"]
    },
  ]
  constructor(private route: ActivatedRoute) { 
    this.id = '' + this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
  }

}
