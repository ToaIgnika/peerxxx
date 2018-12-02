// Angular modules
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// App
import { ApplicationRole } from './../services/models/application-role.enum';
import { ApiurlService } from '../services/apiurl.service';
import { SessionService } from '../services/session.service';
import { CourseService } from '../services/course.service';
import { CourseModel } from '../services/models/course-model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    courses: CourseModel[];
    role: ApplicationRole;

    constructor(
        private router: Router,
        private courseService: CourseService,
        private sessService: SessionService
    ) {}

    ngOnInit(): void {
        this.getCourses();
        this.role = this.sessService.isInRole(ApplicationRole.Student)
            ? ApplicationRole.Student
            : ApplicationRole.Teacher;
    }

    isStudent(): boolean {
        return this.role === ApplicationRole.Student;
    }

    isTeacher(): boolean {
        return this.role === ApplicationRole.Teacher;
    }

    deleteCourse(courseCrn): void {
        if (confirm('Are you sure to permanently delete this course?')) {
            console.log('Implement delete functionality here');
            // create course, on success redirect

            this.courseService.deleteCourse(courseCrn).subscribe(
                (res: string) => {
                    console.log(res);
                    this.deleteCourseFromCourseArray(courseCrn);
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    getCourses(): void {
        this.courseService.getCourses().subscribe(
            (courses: CourseModel[]) => {
                console.log(courses);
                this.courses = courses;
            },
            error => {
                console.error(error);
            }
        );
    }

    sendEvaluations() {
        if (confirm('Are you sure you want to send eveluations?')) {
            // send out the forms
            console.log('implement sending forms');
        }
    }

    private deleteCourseFromCourseArray(courseCrn: number): void {
        const courseIndex = this.courses.findIndex((elem, index) => {
            return elem.courseCrn === courseCrn;
        });

        if (courseIndex) {
            this.courses.splice(courseIndex, 1);
        }
    }
}
