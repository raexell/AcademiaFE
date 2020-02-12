import { Component, OnInit } from "@angular/core";
import { CourseEditionService } from "../course-edition.service";
import { CourseEdition } from "../course-edition";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  pageTitle = "Course List";
  private coursesEdition: CourseEdition[];
  private course: CourseEdition;
  constructor(private ceService: CourseEditionService) {}

  ngOnInit() {
    this.ceService.getCourses().subscribe(
      ce => {
        this.coursesEdition = ce;
        console.log(ce);
      },
      error => console.log(error)
    );
  }
}
