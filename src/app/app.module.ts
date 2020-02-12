import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AgentListComponent } from "./agent/agent-list/agent-list.component";
import { AgentDetailComponent } from "./agent/agent-detail/agent-detail.component";
import { AgentEditComponent } from "./agent/agent-edit/agent-edit.component";
import { RouterModule } from "@angular/router";
import { AgentAddComponent } from "./agent/agent-add/agent-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CourseListComponent } from "./course/course-list/course-list.component";
import { CourseEditComponent } from "./course/course-edit/course-edit.component";
import { CourseAddComponent } from "./course/course-add/course-add.component";
import { CourseDetailComponent } from "./course/course-detail/course-detail.component";
import { StudentAddComponent } from "./student/student-add/student-add.component";
import { StudentDetailComponent } from "./student/student-detail/student-detail.component";
import { StudentEditComponent } from "./student/student-edit/student-edit.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { HomepageComponent } from "./homepage/homepage.component";
@NgModule({
  declarations: [
    AppComponent,
    AgentListComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentAddComponent,
    CourseListComponent,
    CourseEditComponent,
    CourseAddComponent,
    CourseDetailComponent,
    StudentAddComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentListComponent,
    HomepageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "welcome", component: HomepageComponent },
      { path: "agents", component: AgentListComponent },
      { path: "agents/:id/add", component: AgentAddComponent },
      { path: "agents/:id/edit", component: AgentEditComponent },
      { path: "agents/:id/detail", component: AgentDetailComponent },
      { path: "students", component: StudentListComponent },
      { path: "student/:id/add", component: StudentAddComponent },
      { path: "students/:id/edit", component: StudentEditComponent },
      { path: "students/:id/detail", component: StudentDetailComponent },
      { path: "courses", component: CourseListComponent },
      { path: "courses/:id/add", component: CourseAddComponent },
      { path: "courses/:id/edit", component: CourseEditComponent },
      { path: "courses/:id/detail", component: CourseDetailComponent },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
