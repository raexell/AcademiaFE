import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../student.service";
import { Student } from "../student";
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  pageTitle = "Student Details";
  private current: Student;
  private errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}
  

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.studentService.getStudentById(id).subscribe(
      a => (this.current = a),
      error => (this.errorMessage = error)
    );
  }

  onBack() {
    this.router.navigate(["/students"]);
  }

  onEdit() {
    this.router.navigate(["/students", this.current.id, "edit"]);
  }

}
