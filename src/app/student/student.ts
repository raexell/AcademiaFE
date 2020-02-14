export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  sex: string;
  dateOfBirth: Date; 
  email: string;
  phone: string;
  degreeType: number;
  degreeTitle: string;
  independent: false;
  idClient: number;
}
