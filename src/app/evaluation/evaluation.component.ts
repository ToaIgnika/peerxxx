import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  private id  = '';
  public teamList: any = [
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
  constructor(private route: ActivatedRoute) {
    this.id = '' + this.route.snapshot.paramMap.get('id');

   }

  ngOnInit() {
  }

}
