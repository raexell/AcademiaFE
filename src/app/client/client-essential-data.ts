export class ClientEssentialData {
    id: number;
    firstname: string; 
    lastname: string; 

    getFullname(){
        return `${this.firstname} ${this.lastname}`;
    }


    

}