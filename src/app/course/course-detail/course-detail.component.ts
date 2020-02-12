import { Component, OnInit } from "@angular/core";
import { CourseEdition } from "../course-edition";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseEditionService } from "../course-edition.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"]
})
export class CourseDetailComponent implements OnInit {
  pageTitle = "Course Details";
  private currentCE: CourseEdition;
  private errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ceService: CourseEditionService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.ceService.getCoursesById(id).subscribe(
      ce => {
        this.currentCE = ce;
        console.log(this.currentCE);
        console.log(ce);
      },
      error => (this.errorMessage = error)
    );
  }
  onBack() {
    this.router.navigate(["/courses"]);
  }
}
