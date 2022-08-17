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
}

export type { Request };
export default UsersService;
