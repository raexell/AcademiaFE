import { Agent } from './agent';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AgentService{
    private agents : Agent[];
    private url : string = "api/agents";
    constructor(private httpClient : HttpClient){
        
       /* this.agents = [
            new Agent("pippo", 21),
            new Agent("sandro", 46)
        ];*/
    }

    getAgents() : Agent[]{
        return this.agents;
    }

    getAgentsAsync() : Observable<Agent[]>{
        return this.httpClient.get<Agent[]>(this.url); 
    }
}