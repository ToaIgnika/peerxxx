import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public auth:SessionService,
    private router: Router) {

   }

  ngOnInit() {
  }

  logout() {
    this.auth.JWTToken = "";
    this.auth.expire = "";
    this.auth.loggedIn = false;
    this.auth.role = "";
    this.auth.uid = "";
    this.auth.userData = "";
    this.router.navigate(['/login']);
  }

}
