import { Agent } from "./agent";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AgentService {
  private agents: Agent[];
  private url: string = "http://localhost:8080/api/agents";
  constructor(private httpClient: HttpClient) {
    /* this.agents = [
            new Agent("pippo", 21),
            new Agent("sandro", 46)
        ];*/
  }

  getAgents(): Agent[] {
    return this.agents;
  }

  getAgentsAsync(): Observable<Agent[]> {
    return this.httpClient.get<Agent[]>(this.url);
  }

  getAgentById(id: number): Observable<Agent> {
    let urlWithId = `${this.url}/${id}`;
    return this.httpClient.get<Agent>(urlWithId);
  }

  createAgent(agent: Agent) {
    const h = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<Agent>(this.url, agent, { headers: h });
  }

  updateAgent() {}
}
