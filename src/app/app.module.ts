import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AgentListComponent } from "./agent/agent-list/agent-list.component";
import { AgentDetailComponent } from "./agent/agent-detail/agent-detail.component";
import { AgentEditComponent } from "./agent/agent-edit/agent-edit.component";
import { RouterModule } from "@angular/router";
import { Database } from "./agent/database";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { AgentAddComponent } from "./agent/agent-add/agent-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    AgentListComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentAddComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "welcome", component: AgentListComponent },
      { path: "agents", component: AgentListComponent },
      { path: "agents/:id/add", component: AgentAddComponent },
      { path: "agents/:id/edit", component: AgentEditComponent },
      { path: "agents/:id/detail", component: AgentDetailComponent },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
