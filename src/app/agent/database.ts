import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Agent } from './agent';


export class Database implements InMemoryDbService{
    createDb(){
        const agents : Agent[]=[
            new Agent("carlitos", 20),
            new Agent("France",27),
            new Agent("la_Deni",28)
        ];
        return {agents};
    }
    
}