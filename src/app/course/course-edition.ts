import { Student } from "../student/student";

export interface CourseEdition {
  id: number;
  title: string;
  coursid: number;
  start: Date;
  end: Date;
  cost: number;
  leadTeacher: number;
  numStudents?: number;
  ricavatoTot?: number;
  ricavatoAttuale?: number;
  numStudentsHavePaid?: number;
  numStudentsHaventPaid?: number;
  iscritti?: Student[];
}
