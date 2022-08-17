export type Response<T> = {
  status: number;
  data: T;
};
export type User = {
  id: string;
  name: string;
  email: string;
  pass: string;
};
