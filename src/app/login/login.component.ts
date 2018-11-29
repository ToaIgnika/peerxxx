import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private logModel : any = {
    email : "",
    password : ""
  }
  constructor(private auth:SessionService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.logModel);
  }
}
