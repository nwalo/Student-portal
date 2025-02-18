export interface IStudent {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  major: string;
  level: string;
  status: string;
  enrollmentDate: string;
  gpa: number | string;
  creditsCompleted: number;
  applications?: any[];
}

export interface IStudents {
  data: IStudent[];
}

export interface StudentUploadProp {
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  major: string;
  level: string;
}
