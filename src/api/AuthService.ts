import { User } from '../models/baseTypes';
import instance from './axios';

class AuthService {
  static doLogin = async (email: string, pass: string) => {
    return instance.get(`/users?email=${email}&pass=${pass}`).then(data => {
      if (data.data.length) {
        return {
          status: data.status === 200,
          data: data.data[0],
        };
      }

      return {
        status: data.status === 501,
        data: {} as User,
      };
    });
  };
}
export default AuthService;
