export enum Role {
  Admin = 'admin',
  Guest = 'guest',
}

export type Response<T> = {
  status: number;
  data: T;
};
export type User = {
  id: string;
  name: string;
  login: string;
  pass: string;
  role: Role;
};
