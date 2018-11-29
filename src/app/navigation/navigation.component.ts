import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public auth:SessionService) {

   }

  ngOnInit() {
  }

   
}
