// Angular modules
import { HttpClient } from '@angular/common/http';
import { ApiurlService } from './apiurl.service';
import { Injectable } from '@angular/core';

// App

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(
        private apiUrlService: ApiurlService,
        private http: HttpClient
    ) {}
}
