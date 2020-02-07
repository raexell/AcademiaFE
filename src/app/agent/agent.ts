export class Agent {
    constructor(private _name: String, private _age: number){
    }
    get name(){
        return this._name;
    }
    set name(value: String){
        this._name = value;
    }
    get age(): number {
        return this._age;
    }
    set age(value: number) {
        this._age = value;
    }
}