export interface Agent {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  sex: string;

  birthdate?: Date;
  adress: string;
  city: string;
  zip: string;
  hourlyRate: number;
  phone: number;
  email: string;
  website: string;
  employee: boolean;
}
