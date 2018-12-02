export class CourseModel {
    constructor(
        public courseCrn: number,
        public courseTerm: string,
        public courseYear: number,
        public courseName: string,
        public instructorId: string
    ) {}
}
