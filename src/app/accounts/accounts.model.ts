export enum Department {
  PD = 'PD',
  Engineering = 'Enginerring',
  QA = 'QA',
}

export enum AccountRole {
  Proctor = 'Proctor',
  Participant = 'Participant',
}

export interface Account {
  username: string;
  password?: string;
  department: Department;
  role: AccountRole;
}
