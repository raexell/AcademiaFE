import { CourseEdition } from "./course-edition";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CourseEditionService {
  private courses: CourseEdition[];
  private url: string = "http://localhost:8080/api/courses/courseEditions";
  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<CourseEdition[]> {
    let urlId = `${this.url}/1`;
    return this.httpClient.get<CourseEdition[]>(urlId);
  }
  getCoursesById(id: number): Observable<CourseEdition> {
    let urlId = `${this.url}/${id}`;
    return this.httpClient.get<CourseEdition>(urlId);
  }
}
