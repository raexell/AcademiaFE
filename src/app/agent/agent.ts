export class Agent {
   
    constructor(private _id: number, private _name: String, private _age: number){
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
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