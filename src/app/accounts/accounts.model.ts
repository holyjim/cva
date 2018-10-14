export enum Department {
  Engineering = 'Enginerring',
  Marketing = 'Marketing',
  PD = 'PD',
  QA = 'QA',
  Sales = 'Sales',
  TechPubs = 'Tech Pubs',
  UX = 'UX',
}

export enum AccountRole {
  Proctor = 'Proctor',
  Participant = 'Participant',
}

export interface Account {
  uid?: string;
  email: string;
  displayName: string;
  department: Department;
  role: AccountRole;
}
