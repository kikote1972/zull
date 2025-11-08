export type Page = 'home' | 'register' | 'login' | 'members' | 'editMember' | 'scanner';

export interface Member {
  memberId: string;
  name: string;
  lastName: string;
  dni: string;
  dob: string;
  email: string;
  visitCount: number;
}