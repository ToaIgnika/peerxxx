import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { GradesComponent } from './grades/grades.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'course/:id', component: CourseComponent},
  { path: 'evaluation/:id', component: EvaluationComponent},
  { path: 'course-create', component: CourseCreateComponent},
  { path: 'grades/:id', component: GradesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
