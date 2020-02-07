import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../agent.service';
import { Agent } from '../agent';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {
  private current : Agent;
  private errorMessage : string;
  constructor(private route : ActivatedRoute, 
    private router : Router, private agentService : AgentService) { }
  ngOnInit() {
    const id = + this.route.snapshot
    .paramMap.get('id');
     this.agentService.getAgentById(id).subscribe(
         a => this.current = a,
         error => this.errorMessage = error
     );

  }

  onBack() {
    this.router.navigate(['/agents']);
    
  }

}
