import { User } from '../models/baseTypes';
import instance from './axios';

type Request = {
  status: boolean;
  data: User[];
};

class UsersService {
  static fetchUsers = async () =>
    instance.get('/users').then(data => {
      return {
        status: data.status === 200,
        data: data.data,
      };
    });
  static postUser = async (user: User) =>
    instance.post(`/users`, user).then(data => {
      return {
        status: data.status === 201,
        data: data.data,
      };
    });

  static putUser = async (user: User) =>
    instance.put(`/users/${user.id}`, user).then(data => {
      return {
        status: data.status === 200,
        data: data.data,
      };
    });
  static delUser = async (user: User) =>
    instance.delete(`/users/${user.id}`).then(data => {
      return {
        status: data.status === 200,
        data: data.data,
      };
    });
}

export type { Request };
export default UsersService;
