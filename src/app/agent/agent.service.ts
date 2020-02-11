import { Agent } from "./agent";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

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

  updateAgent(agent: Agent): Observable<Agent> {
    const h = new HttpHeaders({ "Content-Type": "application/json" });
    const urlUp = `${this.url}/${agent.id}`;
    return this.httpClient.put<Agent>(urlUp, agent, { headers: h });
  }

  deleteAgent2(id: number): Observable<{}> {
    const urlDele = `${this.url}/${id}`;
    console.log(urlDele);
    return this.httpClient
      .delete<Agent>(urlDele)
      .pipe(tap(data => console.log("deleted " + id)));
  }

  deleteAgent(id: number): Observable<Agent> {
    let urlWithId = `${this.url}/${id}`;
    return this.httpClient.delete<Agent>(urlWithId);
  }
}
