import { Component, OnInit } from '@angular/core';
import { Agent } from '../agent';
import { AgentService } from '../agent.service';


@Component({
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit{
    constructor(private agentService: AgentService){

    }
    ngOnInit(): void {
       // this.agents= this.agentService.getAgents();
       this.agentService.getAgentsAsync().subscribe(
        ag =>  {
            this.agents= ag;
            console.log(ag);
        },
        error => console.log(error)
       );
    }
    private messagge = "Ciao lista componenti";
    private agents : Agent[];
}