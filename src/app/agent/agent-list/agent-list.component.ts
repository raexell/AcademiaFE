import { Component, OnInit } from "@angular/core";
import { Agent } from "../agent";
import { AgentService } from "../agent.service";

@Component({
  templateUrl: "./agent-list.component.html",
  styleUrls: ["./agent-list.component.css"]
})
export class AgentListComponent implements OnInit {
  pageTitle = "Agent List";

  constructor(private agentService: AgentService) {}
  ngOnInit(): void {
    // this.agents= this.agentService.getAgents();
    this.agentService.getAgentsAsync().subscribe(
      ag => {
        this.agents = ag;
        console.log(ag);
      },
      error => console.log(error)
    );
  }
  private messagge = "Ciao lista componenti";
  private agents: Agent[];

  onDelete(id: number) {
    console.log("click");
    for (let i = 0; i < this.agents.length; i++) {
      if (this.agents[i].id === id) {
        id = i;
      }
    }
    if (
      confirm(
        `Are you sure to want to delete this Agent: ${this.agents[id].firstname} ${this.agents[id].lastname}?`
      )
    ) {
      console.log("click dentro if");
      this.agentService.deleteAgent(this.agents[id].id);
      console.log(this.agents[id].id);
    }
  }
}
