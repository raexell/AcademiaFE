import { Student } from "./student";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private students: Student[];
  private url: string = "http://localhost:8080/api/students";
  constructor(private httpClient: HttpClient) {
    /* this.agents = [
            new Agent("pippo", 21),
            new Agent("sandro", 46)
        ];*/
  }

  getStudents(): Student[] {
    return this.students;
  }

  getStudentsAsync(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url);
  }

  getStudentById(id: number): Observable<Student> {
    let urlWithId = `${this.url}/${id}`;
    return this.httpClient.get<Student>(urlWithId);
  }

  createStudent(student: Student) {
    const h = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<Student>(this.url, student, { headers: h });
  }

  updateStudent(student: Student): Observable<Student> {
    const h = new HttpHeaders({ "Content-Type": "application/json" });
    const urlUp = `${this.url}/${student.id}`;
    return this.httpClient.put<Student>(urlUp, student, { headers: h });
  }

  deleteStudent2(id: number): Observable<{}> {
    const urlDele = `${this.url}/${id}`;
    console.log(urlDele);
    return this.httpClient
      .delete<Student>(urlDele)
      .pipe(tap(data => console.log("deleted " + id)));
  }

  deleteStudent3(id: number): Observable<Student> {
    let urlWithId = `${this.url}/${id}`;
    return this.httpClient.delete<Student>(urlWithId);
  }

  deleteStudent(id: number): Observable<Student> {
    let urlWithId = `${this.url}/${id}`;
    return this.httpClient.delete<Student>(urlWithId);
  }
}
