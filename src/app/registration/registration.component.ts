import { ApplicationRole } from './../services/models/application-role.enum';
// Angular modules
import { Component } from '@angular/core';

// App modules
import { SessionService } from '../services/session.service';
import { RegisterModel } from './../services/models/register-model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    registerModel: RegisterModel;
    role: ApplicationRole;
    errorMsg: string;

    constructor(private auth: SessionService, private router: Router) {
        this.registerModel = {} as RegisterModel;
        this.role = ApplicationRole.Student; // set default role
    }

    register() {
        // remove any previous errors
        this.errorMsg = undefined;

        // log the values
        console.log(`email: ${this.registerModel.email}`);
        console.log(`firstName: ${this.registerModel.firstName}`);
        console.log(`lastName: ${this.registerModel.lastName}`);
        console.log(`userName: ${this.registerModel.userName}`);
        console.log(`password: ${this.registerModel.password}`);
        console.log(`role1: ${this.role}`);

        // submit register request
        this.auth.register(this.registerModel, this.role).subscribe(
            res => {
                console.log(res); // successful registration
                this.router.navigate(['/login']); // redirect to login
            },
            error => {
                console.log(error); // invalid registration
                this.errorMsg = error; // set the error message
            }
        );
    }
}
