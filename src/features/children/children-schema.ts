import { Assessment } from "../assessments/assessment-schema";

export interface Child {
  _id: string;
  caregiverId: string;
  displayName: string;
  pseudonym: string;
  dateOfBirth: string;
  sex: string;
  photoUrl: null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ChildWithAssessment extends Child {
  lastAssessment?: Assessment
}
