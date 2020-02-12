import { InMemoryDbService } from "angular-in-memory-web-api";
import { Agent } from "../agent/agent";

export class Database implements InMemoryDbService {
  createDb() {
    const agents: Agent[] = [
      {
        id: 1,
        firstname: "Carlito",
        lastname: "Carlito",
        sex: "M",
        age: 20
      }
      //     {
      //       id: 2,
      //       name: "Don Giovanni",
      //       age: 25
      //     },
      //     {
      //       id: 3,
      //       name: "LaDeni",
      //       age: 28
      //     }
    ];
    return { agents };
  }
}
