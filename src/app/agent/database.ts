import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Agent } from './agent';


export class Database implements InMemoryDbService{
    createDb(){
        const agents : Agent[]=[
            new Agent(1,"carlitos", 20),
            new Agent(2,"France",27),
            new Agent(3, "la_Deni",28)
        ];
        return {agents};
    }
    
}