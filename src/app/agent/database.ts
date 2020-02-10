import { InMemoryDbService } from "angular-in-memory-web-api";
import { Agent } from "./agent";

export class Database implements InMemoryDbService {
  createDb() {
    const agents: Agent[] = [
      {
        id: 1,
        name: "Carlito",
        age: 20
      },
      {
        id: 2,
        name: "Don Giovanni",
        age: 25
      },
      {
        id: 3,
        name: "LaDeni",
        age: 28
      }
    ];
    return { agents };
  }
}
