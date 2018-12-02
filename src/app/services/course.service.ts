// Angular modules
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// App
import { ApiurlService } from './apiurl.service';
import { SessionService } from './session.service';
import { CourseModel } from './models/course-model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private static readonly DELETE_COURSE_SUCCESS_MSG = 'delete course success';

    constructor(
        private apiUrlService: ApiurlService,
        private sessService: SessionService,
        private http: HttpClient
    ) {}

    /**
     * Delete a specific course as an instructor
     *
     * @param courseCrn the course crn number
     *
     * @returns an `Observable` with a message upon success.
     */
    deleteCourse(courseCrn: number): Observable<string> {
        const url = this.apiUrlService.deleteCourse + courseCrn;
        const token = this.sessService.getToken();

        if (!token) {
            throw Error('No token found!');
        }

        return this.http
            .delete(url, {
                observe: 'response',
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            })
            .pipe(
                // pass back a success message
                map(res => CourseService.DELETE_COURSE_SUCCESS_MSG),
                // handle error
                catchError(this.handleError)
            );
    }

    /**
     * Get all courses for a specific instructor
     *
     * @param instructorId the instructor uid
     *
     * @returns an `Observable` with an array of `CourseModel` upon success
     */
    getInstructorCourses(): Observable<CourseModel[]> {
        const token = this.sessService.getToken();

        if (!token) {
            throw Error('No token found!');
        }

        const url = this.apiUrlService.instructorCourses + token.uid;

        return this.http
            .get<CourseModel[]>(url, {
                observe: 'body',
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            })
            .pipe(
                catchError(this.handleError) // handle error
            );
    }

    /**
     * Handle an error from the `login()` method and format a custom error message
     *
     * @param error the error from the `login()` method
     *
     * @returns an error of of type `Observabe<never>` with a message
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let msg = '';

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`${error.statusText}`);
            msg = error.statusText;
        }
        // return an observable with a user-facing error message
        return throwError(msg);
    }
}
