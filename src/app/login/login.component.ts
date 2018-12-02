// Angular modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// App modules
import { SessionService } from '../services/session.service';
import { LoginModel } from '../services/models/login-model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginModel: LoginModel;
    remember: boolean;
    errorMsg: string;

    constructor(private authService: SessionService, private router: Router) {
        this.loginModel = {} as LoginModel;
        this.remember = false;
    }

    login() {
        // log the form values
        console.log(`userName: ${this.loginModel.userName}`);
        console.log(`password: ${this.loginModel.password}`);
        console.log(`remember: ${this.remember}`);

        // clear any previous errors
        this.errorMsg = undefined;

        // submit login request
        this.authService.login(this.loginModel, this.remember).subscribe(
            (res: String) => {
                console.log(res); // successful login
                this.router.navigate(['/dashboard']); // redirect to dashboard
            },
            error => {
                console.error(error); // invalid login attempt
                this.errorMsg = error; // set the error message
            }
        );
    }
}
