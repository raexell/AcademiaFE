import { StudentService } from "../student.service";
import { Component, OnInit } from '@angular/core';
import { Student } from "../student";
import { ActivatedRoute, Router } from "@angular/router";

@Component({

  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  pageTitle = "Student List";
  private current: Student;
  private errorMessage: string;
  constructor(
    private studentService: StudentService,  
    private route: ActivatedRoute,
    private router: Router,) {}

  ngOnInit(): void {
    this.loadData();
  }
  private messagge = "Ciao lista componenti";
  private students: Student[];
/*
  onDelete(id: number) {
    console.log("click");
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === id) {
        id = i;
      }
    }
    if (
      confirm(
        `Are you sure to want to delete this Student: ${this.students[id].firstname} ${this.students[id].lastname}?`
      )
    ) {
      console.log("click dentro if");
      this.studentService.deleteStudent(this.students[id].id);
      console.log(this.students[id].id);
    }*/

    onDelete(student : Student){
      console.log("Ondelete");
      if (
        confirm(
          `Are you sure to want to delete this Student: ${student.firstname} ${student.lastname}?`
        )
      ) {
        console.log("Chiamando deleteStudent");
      this.studentService.deleteStudent(student.id).subscribe(
        
        () => {
         
          console.log("Delete Student call loadData");
          this.loadData();
        },

        error => {
          this.errorMessage = error;
          console.log(error);
        }
      );
      
    }}
    
    loadData() : void {

    // this.agents= this.agentService.getAgents();
    this.studentService.getStudentsAsync().subscribe(
      st => {
        this.students = st;
        console.log("loadData");
        console.log(st);
      },
      error => console.log(error)
    );
    }

 
}
