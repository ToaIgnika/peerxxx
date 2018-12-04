import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public regType : boolean;
  public regModel : any = {
    email : "",
    firstName : "",
    lastName : "",
    userName : "",
    password : ""
  }

  constructor(private auth:SessionService) { }

  ngOnInit() {
  }

  register() {
    if (this.regType) {
      this.auth.registerTeacher(this.regModel);
    } else {
      this.auth.registerStudent(this.regModel);
    }
  }
}
