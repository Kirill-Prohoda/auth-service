import { User, Response } from '../models/baseTypes';
import instance from './axios';

class AuthService {
  static doLogin = async (email: string, pass: string) => {
    return instance.get(`/users?email=${email}&pass=${pass}`).then((data): Response<User> => {
      if (data.data.length) {
        return {
          status: 200,
          data: data.data[0],
        };
      }

      return {
        status: 501,
        data: {} as User,
      };
    });
  };
}
export default AuthService;
